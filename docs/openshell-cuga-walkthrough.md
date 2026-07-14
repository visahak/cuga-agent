# Running CUGA demo_crm Inside NVIDIA OpenShell

This is a practitioner walkthrough, not an official CUGA/OpenShell integration or support claim. The goal is to show that CUGA `demo_crm` can run as the application inside an OpenShell-managed sandbox, using OpenShell as an installed CLI/runtime rather than as a CUGA library.

## What Is Proven

- CUGA starts inside an OpenShell Docker-backed sandbox.
- OpenShell forwards the CUGA UI/API on port `7860`.
- CUGA uses OpenShell inference routing through `https://inference.local/v1`.
- The real OpenAI-compatible API key, base URL, and selected model are supplied at runtime.
- A simple `demo_crm` task succeeds through the CUGA `/stream` API.

## What Is Not Claimed

- This is not official CUGA support for OpenShell.
- This is not official OpenShell support for CUGA.
- This does not cover CUGA browser-extension/hybrid mode.
- This does not cover nested CUGA Docker sandboxing.

## Files Added

- `Dockerfile.openshell`: builds a CUGA image suitable for OpenShell custom-image launch.
- `cuga-policy.yaml`: grants the filesystem, process, local service, and `inference.local` access needed by this demo.
- `scripts/openshell/cuga-openshell-demo.sh`: container entrypoint for `cuga start demo_crm`.
- `scripts/openshell/run-cuga-demo.sh`: host launcher that sets up the OpenShell provider/inference route and creates the sandbox.
- `scripts/openshell/run-rancher-gateway-proxy.sh`: optional Rancher Desktop callback workaround used in the local validation environment.

## Starting Point

Use the existing CUGA checkout:

```bash
cd /Users/vatcheisahagian/UserData/VSCode/cuga-agent
```

Confirm CUGA works outside OpenShell from the existing virtual environment:

```bash
source .venv/bin/activate
cuga start demo_crm
```

Stop that baseline process before starting the OpenShell run.

## Runtime Model Configuration

Keep model configuration out of committed files. The launcher reads these values from your shell environment or from the local uncommitted `.env` file:

```bash
OPENAI_API_KEY=...
OPENAI_BASE_URL=...
MODEL_NAME=...
```

The script creates or updates an OpenShell provider named `cuga-openai`:

```bash
openshell provider create \
  --name cuga-openai \
  --type openai \
  --credential OPENAI_API_KEY \
  --config "OPENAI_BASE_URL=$OPENAI_BASE_URL"
```

Then it configures OpenShell inference routing:

```bash
openshell inference set \
  --provider cuga-openai \
  --model "$MODEL_NAME" \
  --timeout 300
```

Inside the sandbox, CUGA sees only:

```bash
OPENAI_BASE_URL=https://inference.local/v1
MODEL_NAME=openshell-routed-model
AGENT_SETTING_CONFIG=settings.openai.toml
```

That keeps the real upstream base URL, credential, and model choice at runtime rather than hardcoded in repo artifacts.

## OpenShell Setup Used For Local Validation

The normal path is to install OpenShell and use the selected local gateway:

```bash
curl -LsSf https://raw.githubusercontent.com/NVIDIA/OpenShell/main/install.sh | sh
openshell --version
openshell gateway list
```

On the validation Mac, the Homebrew install path was blocked by outdated Command Line Tools, so the OpenShell `v0.0.46` release binaries were used directly:

```bash
mkdir -p /private/tmp/openshell-v0.0.46/bin

curl -L -o /private/tmp/openshell-aarch64-apple-darwin.tar.gz \
  https://github.com/NVIDIA/OpenShell/releases/download/v0.0.46/openshell-aarch64-apple-darwin.tar.gz

curl -L -o /private/tmp/openshell-gateway-aarch64-apple-darwin.tar.gz \
  https://github.com/NVIDIA/OpenShell/releases/download/v0.0.46/openshell-gateway-aarch64-apple-darwin.tar.gz

tar -xzf /private/tmp/openshell-aarch64-apple-darwin.tar.gz \
  -C /private/tmp/openshell-v0.0.46/bin

tar -xzf /private/tmp/openshell-gateway-aarch64-apple-darwin.tar.gz \
  -C /private/tmp/openshell-v0.0.46/bin

/private/tmp/openshell-v0.0.46/bin/openshell --version
```

Create the Docker-backed temporary gateway config:

```bash
cat > /private/tmp/openshell-v0.0.46/gateway-docker.toml <<'EOF'
[openshell]
version = 1

[openshell.gateway]
bind_address = "127.0.0.1:17670"
log_level = "info"
compute_drivers = ["docker"]

[openshell.drivers.docker]
grpc_endpoint = "http://host.openshell.internal:17670"
network_name = "openshell-docker"
image_pull_policy = "IfNotPresent"
EOF
```

Start the gateway:

```bash
export DOCKER_HOST="unix://$HOME/.rd/docker.sock"

DOCKER_HOST="$DOCKER_HOST" \
  /private/tmp/openshell-v0.0.46/bin/openshell-gateway \
  --config /private/tmp/openshell-v0.0.46/gateway-docker.toml \
  --disable-tls \
  --log-level info
```

Register it from another terminal:

```bash
export PATH="/private/tmp/openshell-v0.0.46/bin:$PATH"
export XDG_CONFIG_HOME=/private/tmp/openshell-v0.0.46/config
export XDG_STATE_HOME=/private/tmp/openshell-v0.0.46/state

openshell gateway add http://127.0.0.1:17670 --local --name local-direct
openshell gateway select local-direct
```

## Rancher Desktop Callback Workaround

In the local validation environment, OpenShell's Docker supervisor tried to call back to `host.openshell.internal:17670`, but Rancher Desktop resolved that name to an address that did not reach the Mac-hosted gateway. The workaround was a local-only TCP relay inside Rancher Desktop's Docker VM:

```bash
export DOCKER_HOST="unix://$HOME/.rd/docker.sock"
scripts/openshell/run-rancher-gateway-proxy.sh
```

This is a local environment workaround, not a CUGA integration requirement. It forwards only `host.openshell.internal:17670` to `host.rancher-desktop.internal:17670` so the OpenShell sandbox supervisor can fetch policy and attach to the gateway.

## Launch CUGA In OpenShell

With the gateway running and selected:

```bash
export DOCKER_HOST="unix://$HOME/.rd/docker.sock"
export PATH="/private/tmp/openshell-v0.0.46/bin:$PATH"
export XDG_CONFIG_HOME=/private/tmp/openshell-v0.0.46/config
export XDG_STATE_HOME=/private/tmp/openshell-v0.0.46/state

scripts/openshell/run-cuga-demo.sh
```

The launcher builds a temporary OpenShell context and then runs:

```bash
openshell sandbox create \
  --name cuga-demo \
  --from "$BUILD_CONTEXT" \
  --forward 7860 \
  --provider cuga-openai \
  --policy cuga-policy.yaml \
  -- /usr/local/bin/cuga-openshell-demo
```

The temporary build context is intentional. In local testing, passing `--from ./Dockerfile.openshell` directly failed because OpenShell expected a build context containing a file named `Dockerfile`.

## Validate

Check sandbox state:

```bash
openshell sandbox list
```

Expected phase:

```text
cuga-demo  ...  Ready
```

Check the local forward:

```bash
openshell forward list
curl -sS http://127.0.0.1:7860/health/readiness
curl -sS http://127.0.0.1:7860/api/apps
```

Expected readiness includes:

```json
{"status":"ready","ready":true}
```

Expected apps include:

```json
{"name":"crm","type":"api"}
```

Run the smoke task:

```bash
curl -sS -N --max-time 300 \
  -H 'Content-Type: application/json' \
  -H 'X-Disable-History: true' \
  -H 'X-Thread-ID: openshell-cuga-smoke' \
  -X POST http://127.0.0.1:7860/stream \
  --data '{"query":"from contacts.txt show me which users belong to the crm system"}'
```

The validated run read `contacts.txt`, called the CRM API, fetched 1000 contacts, and found 4 matches:

```text
Sarah Bell
Sharon Jimenez
Ruth Ross
Dorothy Richardson
```

## Policy Notes

The demo policy intentionally allows:

- read-only application/runtime paths including `/app`, `/usr`, `/proc`, and `/sys`;
- read-write paths under `/sandbox` and `/tmp`;
- process execution as the non-root `sandbox` user;
- `inference.local:443` for OpenShell-routed model calls;
- loopback CUGA services on `7860`, `8001`, and `8007`.

It does not allow broad unrestricted egress. During validation, OpenShell denied attempts to reach `raw.githubusercontent.com` for LiteLLM price metadata and `huggingface.co` for the local embedding model. The demo still completed because those paths had fallbacks or degraded behavior.

One policy fix was required during validation: `/sys` had to be added as read-only. Without it, the demo server reached policy initialization but ONNX Runtime failed while probing CPU/system information for the local embedding path.

## Cleanup

```bash
openshell sandbox delete cuga-demo
docker rm -f openshell-rd-gateway-proxy
```

Stop the temporary gateway process with `Ctrl+C`.

## Current Limitations

- The Rancher Desktop relay is a local workaround for this validation setup.
- The local embedding model download was blocked by policy, so vector search degraded; the demo task still worked.
- The policy is narrow enough for the proven `demo_crm` API-mode smoke task, not a blanket policy for every CUGA mode.
- Browser-extension/hybrid mode and nested Docker mode remain out of scope.
