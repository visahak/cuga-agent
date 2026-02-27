"use strict";
(self["webpackChunk_carbon_ai_chat_examples_web_components_basic"] = self["webpackChunk_carbon_ai_chat_examples_web_components_basic"] || []).push([["main-agentic_chat_src_S"],{

/***/ "../agentic_chat/src/StatusBar.tsx":
/*!*****************************************!*\
  !*** ../agentic_chat/src/StatusBar.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatusBar: function() { return /* binding */ StatusBar; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var _exampleUtterances__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exampleUtterances */ "../agentic_chat/src/exampleUtterances.ts");
/* harmony import */ var _StatusBar_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StatusBar.css */ "../agentic_chat/src/StatusBar.css");




function StatusBar({
  threadId
}) {
  const [tools, setTools] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [internalToolsCount, setInternalToolsCount] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [mode, setMode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("fast");
  const [agentMode, setAgentMode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("supervisor");
  const [subAgents, setSubAgents] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [showToolsPopup, setShowToolsPopup] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showAgentsPopup, setShowAgentsPopup] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showAgentSelector, setShowAgentSelector] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [selectedAgent, setSelectedAgent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [showMoreMenu, setShowMoreMenu] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showExamplesPopup, setShowExamplesPopup] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showModePopup, setShowModePopup] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isInputEmpty, setIsInputEmpty] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [visibleItems, setVisibleItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Set(['tools', 'mode', 'agents', 'connection']));
  const statusBarRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const agentsPopupTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const examplesPopupTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const modePopupTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Log threadId changes for debugging
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log('[StatusBar] threadId updated:', threadId);
  }, [threadId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    loadTools();
    loadSubAgents();
  }, []);

  // Cleanup timeouts on unmount
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => {
      if (agentsPopupTimeoutRef.current) {
        clearTimeout(agentsPopupTimeoutRef.current);
      }
      if (examplesPopupTimeoutRef.current) {
        clearTimeout(examplesPopupTimeoutRef.current);
      }
      if (modePopupTimeoutRef.current) {
        clearTimeout(modePopupTimeoutRef.current);
      }
    };
  }, []);

  // Monitor input field to detect if it's empty
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const checkInputEmpty = () => {
      const inputField = document.getElementById('main-input_field');
      if (inputField) {
        const isEmpty = !inputField.textContent?.trim();
        setIsInputEmpty(isEmpty);
      }
    };

    // Check initially
    checkInputEmpty();

    // Set up observer to watch for changes
    const inputField = document.getElementById('main-input_field');
    if (inputField) {
      const observer = new MutationObserver(checkInputEmpty);
      observer.observe(inputField, {
        characterData: true,
        childList: true,
        subtree: true
      });

      // Also listen for input events
      inputField.addEventListener('input', checkInputEmpty);
      return () => {
        observer.disconnect();
        inputField.removeEventListener('input', checkInputEmpty);
      };
    }
  }, []);

  // Responsive behavior - hide items when container is too narrow
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const updateVisibleItems = () => {
      if (!statusBarRef.current) return;
      const containerWidth = statusBarRef.current.offsetWidth;
      const newVisibleItems = new Set();

      // Priority order: connection (always visible), tools, mode, agents
      if (containerWidth > 800) {
        newVisibleItems.add('tools');
        newVisibleItems.add('mode');
        newVisibleItems.add('agents');
      } else if (containerWidth > 600) {
        newVisibleItems.add('tools');
        newVisibleItems.add('mode');
      } else if (containerWidth > 400) {
        newVisibleItems.add('tools');
      }
      // Connection is always visible

      setVisibleItems(newVisibleItems);
    };
    updateVisibleItems();
    const resizeObserver = new ResizeObserver(updateVisibleItems);
    if (statusBarRef.current) {
      resizeObserver.observe(statusBarRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  const loadTools = async () => {
    try {
      const response = await fetch('/api/tools/status');
      if (response.ok) {
        const data = await response.json();
        setTools(data.tools || []);
        setInternalToolsCount(data.internalToolsCount || {});
      }
    } catch (error) {
      console.error("Error loading tools:", error);
    }
  };
  const loadSubAgents = async () => {
    try {
      const response = await fetch('/api/config/subagents');
      if (response.ok) {
        const data = await response.json();
        setSubAgents(data.subAgents || []);
        setAgentMode(data.mode || "supervisor");
        setSelectedAgent(data.selectedAgent || null);
      }
    } catch (error) {
      console.error("Error loading sub-agents:", error);
    }
  };
  const toggleMode = () => {
    // Mode switching disabled - requires local setup
    return;
  };
  const toggleAgentMode = () => {
    const newMode = agentMode === "supervisor" ? "single" : "supervisor";
    if (newMode === "single") {
      // Show agent selector when switching to single mode
      setShowAgentSelector(true);
    } else {
      // Clear selected agent when switching to supervisor mode
      setSelectedAgent(null);
      setAgentMode(newMode);
      // Send agent mode change to backend
      fetch('/api/config/agent-mode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mode: newMode,
          selectedAgent: null
        })
      }).catch(err => console.error("Failed to update agent mode:", err));
    }
  };
  const selectAgent = agentName => {
    setSelectedAgent(agentName);
    setAgentMode("single");
    setShowAgentSelector(false);
    // Send agent selection to backend
    fetch('/api/config/agent-mode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mode: "single",
        selectedAgent: agentName
      })
    }).catch(err => console.error("Failed to update agent mode:", err));
  };
  const cancelAgentSelection = () => {
    setShowAgentSelector(false);
    // Keep current mode if cancelled
  };
  const toggleAgentEnabled = agentName => {
    const updatedAgents = subAgents.map(agent => agent.name === agentName ? {
      ...agent,
      enabled: !agent.enabled
    } : agent);
    setSubAgents(updatedAgents);

    // Send update to backend
    fetch('/api/config/subagents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subAgents: updatedAgents,
        mode: agentMode,
        selectedAgent: selectedAgent
      })
    }).catch(err => console.error("Failed to update agent status:", err));
  };
  const handleAgentsMouseEnter = () => {
    // Clear any pending hide timeout
    if (agentsPopupTimeoutRef.current) {
      clearTimeout(agentsPopupTimeoutRef.current);
      agentsPopupTimeoutRef.current = null;
    }
    setShowAgentsPopup(true);
  };
  const handleAgentsMouseLeave = () => {
    // Delay hiding the popup to allow mouse movement to the popup
    agentsPopupTimeoutRef.current = setTimeout(() => {
      setShowAgentsPopup(false);
    }, 300); // 300ms delay
  };
  const handleAgentsPopupMouseEnter = () => {
    // Clear the hide timeout when mouse enters the popup
    if (agentsPopupTimeoutRef.current) {
      clearTimeout(agentsPopupTimeoutRef.current);
      agentsPopupTimeoutRef.current = null;
    }
  };
  const handleAgentsPopupMouseLeave = () => {
    // Hide the popup when mouse leaves the popup area
    setShowAgentsPopup(false);
  };
  const handleExamplesMouseEnter = () => {
    // Clear any pending hide timeout
    if (examplesPopupTimeoutRef.current) {
      clearTimeout(examplesPopupTimeoutRef.current);
      examplesPopupTimeoutRef.current = null;
    }
    setShowExamplesPopup(true);
  };
  const handleExamplesMouseLeave = () => {
    // Delay hiding the popup to allow mouse movement to the popup
    examplesPopupTimeoutRef.current = setTimeout(() => {
      setShowExamplesPopup(false);
    }, 5000); // 5000ms (5 seconds) delay
  };
  const handleExamplesPopupMouseEnter = () => {
    // Clear the hide timeout when mouse enters the popup
    if (examplesPopupTimeoutRef.current) {
      clearTimeout(examplesPopupTimeoutRef.current);
      examplesPopupTimeoutRef.current = null;
    }
  };
  const handleExamplesPopupMouseLeave = () => {
    // Hide the popup when mouse leaves the popup area
    setShowExamplesPopup(false);
  };
  const handleModeMouseEnter = () => {
    console.log('[StatusBar] Mode hover entered');
    // Clear any pending hide timeout
    if (modePopupTimeoutRef.current) {
      clearTimeout(modePopupTimeoutRef.current);
      modePopupTimeoutRef.current = null;
    }
    setShowModePopup(true);
    console.log('[StatusBar] showModePopup set to true');
  };
  const handleModeMouseLeave = () => {
    console.log('[StatusBar] Mode hover left');
    // Delay hiding the popup with longer delay
    modePopupTimeoutRef.current = setTimeout(() => {
      setShowModePopup(false);
      console.log('[StatusBar] showModePopup set to false');
    }, 500);
  };
  const handleModePopupMouseEnter = () => {
    console.log('[StatusBar] Mode popup hover entered');
    // Clear the hide timeout when mouse enters the popup
    if (modePopupTimeoutRef.current) {
      clearTimeout(modePopupTimeoutRef.current);
      modePopupTimeoutRef.current = null;
    }
  };
  const handleModePopupMouseLeave = () => {
    console.log('[StatusBar] Mode popup hover left');
    // Delay hiding with longer timeout for stability
    modePopupTimeoutRef.current = setTimeout(() => {
      setShowModePopup(false);
    }, 500);
  };
  const connectedTools = tools.filter(t => t.status === "connected");
  const errorTools = tools.filter(t => t.status === "error");
  const activeAgents = subAgents.filter(a => a.enabled);
  const getSelectedAgentInfo = () => {
    if (!selectedAgent) return null;
    return subAgents.find(a => a.name === selectedAgent);
  };
  const handleExampleClick = utterance => {
    // Send the utterance to the input field
    const inputField = document.getElementById('main-input_field');
    if (inputField) {
      inputField.textContent = utterance;
      inputField.focus();
      // Trigger input event to update parent component
      const event = new Event('input', {
        bubbles: true
      });
      inputField.dispatchEvent(event);
    }
    setShowExamplesPopup(false);
  };

  // Get overflow items for the More menu
  const getOverflowItems = () => {
    const overflowItems = [];
    if (!visibleItems.has('mode')) {
      overflowItems.push({
        id: 'mode',
        label: `Mode: ${mode === 'fast' ? 'Lite' : 'Balanced'}`,
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Zap, {
          size: 14
        }),
        action: toggleMode
      });
    }
    if (!visibleItems.has('agents')) {
      overflowItems.push({
        id: 'agents',
        label: `${agentMode === 'supervisor' ? 'Supervisor' : 'Single'} (${agentMode === 'supervisor' ? activeAgents.length : selectedAgent ? getSelectedAgentInfo()?.name : 'None'})`,
        icon: agentMode === 'supervisor' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Users, {
          size: 14
        }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.User, {
          size: 14
        }),
        action: () => setShowAgentsPopup(true)
      });
    }
    if (!visibleItems.has('tools')) {
      overflowItems.push({
        id: 'tools',
        label: `Tools: ${connectedTools.length}/${tools.length}`,
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Wrench, {
          size: 14
        }),
        action: () => setShowToolsPopup(true)
      });
    }
    return overflowItems;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, showAgentSelector && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-overlay",
    onClick: cancelAgentSelection
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal",
    onClick: e => e.stopPropagation(),
    style: {
      maxWidth: "500px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Select Agent to Talk With"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "config-modal-close",
    onClick: cancelAgentSelection
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      fontSize: "20px"
    }
  }, "\xD7"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    style: {
      marginBottom: "16px",
      color: "#64748b",
      fontSize: "14px"
    }
  }, "Choose which agent you want to communicate with directly:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, subAgents.filter(a => a.enabled).length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      padding: "24px",
      textAlign: "center",
      color: "#94a3b8",
      background: "#f8fafc",
      borderRadius: "8px"
    }
  }, "No active agents available. Enable agents in Sub Agents configuration.") : subAgents.filter(a => a.enabled).map(agent => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: agent.name,
    onClick: () => selectAgent(agent.name),
    style: {
      padding: "16px",
      background: "#f8fafc",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "#667eea";
      e.currentTarget.style.background = "#f1f5f9";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "#e5e7eb";
      e.currentTarget.style.background = "#f8fafc";
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: "14px",
      color: "#1e293b",
      marginBottom: "4px"
    }
  }, agent.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontSize: "12px",
      color: "#64748b"
    }
  }, agent.role))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "cancel-btn",
    onClick: cancelAgentSelection
  }, "Cancel")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "status-bar",
    ref: statusBarRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "status-bar-left"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "status-bar-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `status-item status-examples ${isInputEmpty ? 'animate-prompt' : ''}`,
    onMouseEnter: handleExamplesMouseEnter,
    onMouseLeave: handleExamplesMouseLeave
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Lightbulb, {
    size: 14,
    className: isInputEmpty ? 'lightbulb-glow' : ''
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "status-label"
  }, "Try these examples"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "status-badge"
  }, _exampleUtterances__WEBPACK_IMPORTED_MODULE_2__.exampleUtterances.length), showExamplesPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "examples-popup",
    onMouseEnter: handleExamplesPopupMouseEnter,
    onMouseLeave: handleExamplesPopupMouseLeave
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "examples-popup-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Example Queries"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "examples-count"
  }, _exampleUtterances__WEBPACK_IMPORTED_MODULE_2__.exampleUtterances.length, " examples")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "examples-list"
  }, _exampleUtterances__WEBPACK_IMPORTED_MODULE_2__.exampleUtterances.map((utterance, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "example-item",
    onClick: () => handleExampleClick(utterance.text)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Lightbulb, {
    size: 12,
    className: "example-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "example-text"
  }, utterance.text)))))), visibleItems.has('tools') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "status-item status-tools",
    onMouseEnter: () => setShowToolsPopup(true),
    onMouseLeave: () => setShowToolsPopup(false)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Wrench, {
    size: 14
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "status-label"
  }, "Tools"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "status-badge"
  }, connectedTools.length), errorTools.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.AlertCircle, {
    size: 12,
    className: "status-warning"
  }), showToolsPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tools-popup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tools-popup-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Connected Tools"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "tools-count"
  }, connectedTools.length, "/", tools.length)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tools-list"
  }, tools.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tools-empty"
  }, "No tools configured") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, Object.entries(tools.reduce((acc, tool) => {
    if (!acc[tool.type]) {
      acc[tool.type] = {
        total: 0,
        connected: 0,
        tools: []
      };
    }
    acc[tool.type].total++;
    if (tool.status === 'connected') {
      acc[tool.type].connected++;
    }
    acc[tool.type].tools.push(tool);
    return acc;
  }, {})).map(([type, data]) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: type,
    className: "tool-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tool-group-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "tool-group-name"
  }, type), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tool-group-stats"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "tool-group-count"
  }, "Connected: ", data.connected, "/", data.total), internalToolsCount[type.toLowerCase()] !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "tool-group-internal"
  }, "Internal: ", internalToolsCount[type.toLowerCase()], " tools"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tool-group-items"
  }, data.tools.map(tool => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: tool.name,
    className: `tool-item ${tool.status}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tool-status-indicator"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tool-info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "tool-name"
  }, tool.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "tool-status-text"
  }, tool.status)))))))))), visibleItems.has('mode') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "status-item status-mode",
    style: {
      position: 'relative',
      cursor: 'pointer'
    },
    onMouseEnter: handleModeMouseEnter,
    onMouseLeave: handleModeMouseLeave
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Zap, {
    size: 14
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mode-toggle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `mode-option ${mode === "fast" ? "active" : ""} disabled`,
    style: {
      cursor: 'not-allowed',
      opacity: 0.6
    }
  }, "Lite"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `mode-option ${mode === "balanced" ? "active" : ""}`,
    style: {
      cursor: 'pointer'
    }
  }, "Balanced")), showModePopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tools-popup",
    onMouseEnter: handleModePopupMouseEnter,
    onMouseLeave: handleModePopupMouseLeave
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tools-popup-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "This feature works locally")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tools-list",
    style: {
      padding: '12px 14px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginBottom: '12px',
      color: '#64748b',
      fontSize: '13px',
      lineHeight: '1.5'
    }
  }, "Clone the repo to experience full features of CUGA:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://github.com/cuga-project/cuga-agent",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '13px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 0'
    },
    onMouseEnter: e => {
      e.currentTarget.style.textDecoration = 'underline';
    },
    onMouseLeave: e => {
      e.currentTarget.style.textDecoration = 'none';
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "github.com/cuga-project/cuga-agent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polyline", {
    points: "15 3 21 3 21 9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("line", {
    x1: "10",
    y1: "14",
    x2: "21",
    y2: "3"
  })))))), visibleItems.has('agents') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "status-item status-agents",
    onMouseEnter: handleAgentsMouseEnter,
    onMouseLeave: handleAgentsMouseLeave
  }, agentMode === "supervisor" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Users, {
    size: 14
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.User, {
    size: 14
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mode-toggle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `mode-option ${agentMode === "supervisor" ? "active" : ""}`,
    onClick: e => {
      e.stopPropagation();
      if (agentMode !== "supervisor") {
        toggleAgentMode();
      }
    }
  }, "Supervisor"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `mode-option ${agentMode === "single" ? "active" : ""} disabled`,
    title: "Single agent mode (Coming soon)"
  }, "Single")), agentMode === "supervisor" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "status-badge"
  }, activeAgents.length), showAgentsPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "agents-popup",
    onMouseEnter: handleAgentsPopupMouseEnter,
    onMouseLeave: handleAgentsPopupMouseLeave
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "agents-popup-header"
  }, agentMode === "supervisor" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Talking with All Agents"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "agents-count"
  }, activeAgents.length, " active")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Direct Agent Communication"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "agents-count"
  }, "Single mode"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "agents-list"
  }, agentMode === "supervisor" ? subAgents.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "agents-empty"
  }, "No sub-agents configured") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "agents-info-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "agents-info-label"
  }, "Available Sub-Agents (click to toggle):")), subAgents.map(agent => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: agent.name,
    className: `agent-item ${agent.enabled ? "enabled" : "disabled"}`,
    onClick: e => {
      e.stopPropagation();
      toggleAgentEnabled(agent.name);
    },
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: agent.enabled,
    onChange: () => {},
    style: {
      cursor: "pointer",
      marginRight: "8px",
      width: "16px",
      height: "16px"
    },
    onClick: e => e.stopPropagation()
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "agent-status-indicator"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "agent-info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "agent-name"
  }, agent.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "agent-role"
  }, agent.role)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "agent-status-text"
  }, agent.enabled ? "active" : "inactive")))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "agents-info-box single-mode"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.User, {
    size: 32,
    className: "single-agent-icon"
  }), selectedAgent ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "single-agent-label"
  }, "Talking with: ", getSelectedAgentInfo()?.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "single-agent-description"
  }, "Role: ", getSelectedAgentInfo()?.role), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setShowAgentSelector(true);
    },
    style: {
      marginTop: "8px",
      padding: "6px 12px",
      background: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "12px",
      cursor: "pointer"
    }
  }, "Change Agent")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "single-agent-label"
  }, "Direct Agent Communication"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "single-agent-description"
  }, "Click to select which agent to talk with."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setShowAgentSelector(true);
    },
    style: {
      marginTop: "8px",
      padding: "6px 12px",
      background: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "12px",
      cursor: "pointer"
    }
  }, "Select Agent"))))))), getOverflowItems().length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "status-item status-more",
    onMouseEnter: () => setShowMoreMenu(true),
    onMouseLeave: () => setShowMoreMenu(false)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.MoreHorizontal, {
    size: 14
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "status-label"
  }, "More"), showMoreMenu && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "more-popup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "more-popup-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "More Options")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "more-list"
  }, getOverflowItems().map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: item.id,
    className: "more-item",
    onClick: e => {
      e.stopPropagation();
      item.action();
      setShowMoreMenu(false);
    }
  }, item.icon, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "more-item-label"
  }, item.label)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "status-bar-right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "status-item status-connection"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.CheckCircle2, {
    size: 14,
    className: "status-connected"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "status-label"
  }, "Connected")))));
}

/***/ }),

/***/ "../agentic_chat/src/StreamManager.tsx":
/*!*********************************************!*\
  !*** ../agentic_chat/src/StreamManager.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   streamStateManager: function() { return /* binding */ streamStateManager; }
/* harmony export */ });
// streamStateManager.ts

class StreamStateManager {
  isStreaming = false;
  listeners = new Set();
  currentAbortController = null;
  setStreaming(streaming) {
    this.isStreaming = streaming;
    console.log("listeners", this.listeners);
    this.listeners.forEach(listener => listener(streaming));
  }
  getIsStreaming() {
    return this.isStreaming;
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  setAbortController(controller) {
    this.currentAbortController = controller;
  }
  async stopStream() {
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    try {
      const response = await fetch(`${API_BASE_URL}/stop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        console.error("Failed to stop stream on server");
      }
    } catch (error) {
      console.error("Error stopping stream:", error);
    }
    this.setStreaming(false);
  }
}
const streamStateManager = new StreamStateManager();

/***/ }),

/***/ "../agentic_chat/src/StreamingWorkflow.ts":
/*!************************************************!*\
  !*** ../agentic_chat/src/StreamingWorkflow.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchStreamingData: function() { return /* binding */ fetchStreamingData; }
/* harmony export */ });
/* unused harmony exports streamViaBackground, USE_FAKE_STREAM, FAKE_STREAM_FILE, FAKE_STREAM_DELAY */
/* harmony import */ var _microsoft_fetch_event_source__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/fetch-event-source */ "../node_modules/.pnpm/@microsoft+fetch-event-source@2.0.1/node_modules/@microsoft/fetch-event-source/lib/esm/index.js");
/* harmony import */ var _StreamManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StreamManager */ "../agentic_chat/src/StreamManager.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../agentic_chat/src/constants.ts");
/* harmony import */ var _uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uuid */ "../agentic_chat/src/uuid.ts");





// When built without webpack DefinePlugin, `FAKE_STREAM` may not exist at runtime.
// Declare it for TypeScript and compute a safe value that won't throw if undefined.

const USE_FAKE_STREAM =  true ? !!false : 0;
const FAKE_STREAM_FILE = "/fake_data.json"; // Path to your JSON file
const FAKE_STREAM_DELAY = 1000; // Delay between fake stream events in milliseconds
// Unique timestamp generator for IDs
const generateTimestampId = () => {
  return Date.now().toString();
};
function renderPlan(planJson) {
  console.log("Current plan json", planJson);
  return planJson;
}
function getCurrentStep(event) {
  console.log("getCurrentStep received: ", event);
  switch (event.event) {
    case "__interrupt__":
      return;
    case "Stopped":
      // Handle the stopped event from the server
      if (window.aiSystemInterface) {
        window.aiSystemInterface.stopProcessing();
      }
      return renderPlan(event.data);
    default:
      return renderPlan(event.data);
  }
}
const simulateFakeStream = async (instance, query) => {
  console.log("Starting fake stream simulation with query:", query.substring(0, 50));

  // Create abort controller for this stream
  const abortController = new AbortController();
  _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setAbortController(abortController);
  let fullResponse = "";
  let workflowInitialized = false;
  let workflowId = "workflow_" + generateTimestampId();

  // Set streaming state AFTER setting abort controller
  _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setStreaming(true);
  try {
    // Check if already aborted before starting
    if (abortController.signal.aborted) {
      console.log("Stream aborted before starting");
      return fullResponse;
    }

    // Load the fake stream data from JSON file
    const response = await fetch(FAKE_STREAM_FILE, {
      signal: abortController.signal // Pass abort signal to fetch
    });
    if (!response.ok) {
      throw new Error(`Failed to load fake stream data: ${response.status} ${response.statusText}`);
    }
    const fakeStreamData = await response.json();
    if (!fakeStreamData.steps || !Array.isArray(fakeStreamData.steps)) {
      throw new Error("Invalid fake stream data format. Expected { steps: [{ name: string, data: any }] }");
    }
    workflowInitialized = true;

    // Card manager message is already created in customSendMessage, so we don't need to create another one here
    if (window.aiSystemInterface) {
      console.log("Card manager interface available for fake stream, skipping duplicate message creation");
    }

    // Use abortable delay for initial wait
    await abortableDelay(300, abortController.signal);

    // Process each step from the fake data
    for (let i = 0; i < fakeStreamData.steps.length; i++) {
      // Check abort signal at the start of each iteration
      if (abortController.signal.aborted) {
        console.log("Fake stream process aborted by user at step", i);
        break;
      }
      const step = fakeStreamData.steps[i];
      console.log(`Processing step ${i + 1}/${fakeStreamData.steps.length}: ${step.name}`);

      // Use abortable delay instead of regular setTimeout
      await abortableDelay(FAKE_STREAM_DELAY, abortController.signal);

      // Check again after delay in case it was aborted during the wait
      if (abortController.signal.aborted) {
        console.log("Fake stream process aborted during delay at step", i);
        break;
      }

      // Simulate the event
      const fakeEvent = {
        event: step.name,
        data: step.data
      };
      console.log("Simulating fake stream event:", fakeEvent);
      let currentStep = getCurrentStep(fakeEvent);
      let stepTitle = step.name;

      // Add the message (this is not abortable, but it's fast)
      // Use the card manager if available, otherwise add individual messages
      if (window.aiSystemInterface) {
        window.aiSystemInterface.addStep(stepTitle, currentStep);
      } else {
        await instance.messaging.addMessage({
          message_options: {
            response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
          },
          output: {
            generic: [{
              id: workflowId + stepTitle,
              response_type: "user_defined",
              user_defined: {
                user_defined_type: "my_unique_identifier",
                data: currentStep,
                step_title: stepTitle
              }
            }]
          }
        });
      }

      // Final check after adding message
      if (abortController.signal.aborted) {
        console.log("Fake stream process aborted after adding message at step", i);
        break;
      }
    }

    // If we completed all steps without aborting
    if (!abortController.signal.aborted) {
      console.log("Fake stream completed successfully");
    }
    return fullResponse;
  } catch (error) {
    if (error.name === "AbortError" || abortController.signal.aborted) {
      console.log("Fake stream was cancelled by user");

      // Add a message indicating the stream was stopped
      await instance.messaging.addMessage({
        message_options: {
          response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
        },
        output: {
          generic: [{
            id: workflowId + "_stopped",
            response_type: "text",
            text: `<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; color: #64748b; text-align: center; margin: 8px 0; display: flex; align-items: center; justify-content: center; gap: 8px;"><div style="font-size: 1.1rem;"></div><div><div style="font-size: 0.9rem; font-weight: 500; margin: 0; color: #475569;">Processing Stopped</div><div style="font-size: 0.75rem; opacity: 0.8; margin: 0; color: #64748b;">You stopped the task</div></div></div>`
          }]
        }
      });
      return fullResponse; // Return partial response
    } else {
      console.error("Fake streaming error:", error);

      // Add error message
      await instance.messaging.addMessage({
        message_options: {
          response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
        },
        output: {
          generic: [{
            id: workflowId + "_error",
            response_type: "text",
            text: "❌ An error occurred while processing your request."
          }]
        }
      });
      throw error;
    }
  } finally {
    // Always reset streaming state when done
    console.log("Cleaning up fake stream state");
    _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setStreaming(false);
    _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setAbortController(null);
  }
};

// Helper function to create abortable delays
function abortableDelay(ms, signal) {
  return new Promise((resolve, reject) => {
    // If already aborted, reject immediately
    if (signal.aborted) {
      reject(new Error("Aborted"));
      return;
    }
    const timeoutId = setTimeout(() => {
      resolve();
    }, ms);

    // Listen for abort signal
    const abortHandler = () => {
      clearTimeout(timeoutId);
      reject(new Error("Aborted"));
    };
    signal.addEventListener("abort", abortHandler, {
      once: true
    });
  });
}

// Enhanced streaming function that integrates workflow component
// Helper function to send messages easily
const addStreamMessage = async (instance, workflowId, stepTitle, data, responseType = "user_defined") => {
  // For the new card system, we don't add individual messages
  // Instead, we let the CardManager handle the steps through the global interface
  if (window.aiSystemInterface && responseType === "user_defined") {
    console.log("Adding step to card manager:", stepTitle, data);
    console.log("aiSystemInterface available:", !!window.aiSystemInterface);
    console.log("addStep function available:", !!window.aiSystemInterface.addStep);
    try {
      window.aiSystemInterface.addStep(stepTitle, data);
      console.log("Step added successfully");
    } catch (error) {
      console.error("Error adding step:", error);
    }
    return;
  } else {
    console.log("Not using card manager - aiSystemInterface:", !!window.aiSystemInterface, "responseType:", responseType);
  }

  // For text messages, still add them normally
  if (responseType === "text") {
    const messageConfig = {
      id: workflowId + stepTitle,
      response_type: "text",
      text: typeof data === "string" ? data : JSON.stringify(data)
    };
    await instance.messaging.addMessage({
      message_options: {
        response_user_profile: _constants__WEBPACK_IMPORTED_MODULE_2__.RESPONSE_USER_PROFILE
      },
      output: {
        generic: [messageConfig]
      }
    });
  }
};
const fetchStreamingData = async (instance, query, action = null, threadId) => {
  // Check if we should use fake streaming
  if (USE_FAKE_STREAM) {
    console.log("Using fake stream simulation");
    return simulateFakeStream(instance, query);
  }
  console.log("🚀 Starting new fetchStreamingData with query:", query.substring(0, 50));

  // Create abort controller for this stream
  const abortController = new AbortController();
  _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setAbortController(abortController);
  let fullResponse = "";
  let workflowInitialized = false;
  let workflowId = "workflow_" + generateTimestampId();

  // Set streaming state
  _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setStreaming(true);
  console.log("🎯 Set streaming to true, abort controller set");

  // Add abort listener for debugging
  abortController.signal.addEventListener("abort", () => {
    console.log("🛑 ABORT SIGNAL RECEIVED IN FETCH STREAM!");
  });
  try {
    // Check if already aborted before starting
    if (abortController.signal.aborted) {
      console.log("🛑 Stream aborted before starting");
      return fullResponse;
    }

    // Do not reset the existing UI; we want to preserve prior cards/history

    // Check after reset delay
    if (abortController.signal.aborted) {
      console.log("🛑 Stream aborted after UI reset");
      return fullResponse;
    }

    // First create the workflow component
    console.log("💬 Initializing workflow without adding placeholder chat message");
    workflowInitialized = true;

    // Give a moment for the new CardManager message to mount
    await abortableDelayV2(300, abortController.signal);

    // Check after initialization delay
    if (abortController.signal.aborted) {
      console.log("🛑 Stream aborted after initialization");
      return fullResponse;
    }
    console.log("🌊 Beginning stream connection");

    // Start streaming with abort signal
    await (0,_microsoft_fetch_event_source__WEBPACK_IMPORTED_MODULE_0__.fetchEventSource)(`${_constants__WEBPACK_IMPORTED_MODULE_2__.API_BASE_URL}/stream`, {
      headers: {
        "Content-Type": "application/json",
        ...(threadId ? {
          "X-Thread-ID": threadId
        } : {})
      },
      method: "POST",
      body: query ? JSON.stringify({
        query
      }) : JSON.stringify(action),
      signal: abortController.signal,
      // 🔑 KEY: Pass abort signal to fetchEventSource

      async onopen(response) {
        console.log("🌊 Stream connection opened:", response.status);

        // Check if aborted during connection
        if (abortController.signal.aborted) {
          console.log("🛑 Stream aborted during connection opening");
          return;
        }
        // Intentionally no chat message here to avoid polluting history
      },
      async onmessage(ev) {
        // Check if aborted before processing message
        if (abortController.signal.aborted) {
          console.log("🛑 Stream aborted - skipping message processing");
          return;
        }
        let currentStep = getCurrentStep(ev);
        if (currentStep) {
          let stepTitle = ev.event;
          console.log("⚡ Processing step:", stepTitle);
          await addStreamMessage(instance, workflowId, stepTitle, currentStep, "user_defined");
        }

        // Check if aborted after processing message
        if (abortController.signal.aborted) {
          console.log("🛑 Stream aborted after processing message");
          return;
        }
      },
      async onclose() {
        console.log("🌊 Stream connection closed");
        console.log("🌊 Signal aborted state:", abortController.signal.aborted);
      },
      async onerror(err) {
        console.error("🌊 Stream error:", err);
        console.log("🌊 Error name:", err.name);
        console.log("🌊 Signal aborted:", abortController.signal.aborted);

        // Don't add error message if stream was aborted by user
        if (abortController.signal.aborted) {
          console.log("🛑 Stream error was due to user abort - not adding error message");
          return;
        }

        // Add error step for real errors
        if (workflowInitialized) {
          await addStreamMessage(instance, workflowId, "error", `An error occurred during processing: ${err.message}`, "text");
        }
      }
    });

    // Check if completed successfully or was aborted
    if (abortController.signal.aborted) {
      console.log("🛑 Stream completed due to abort");
    } else {
      console.log("🎉 Stream completed successfully");
    }
    return fullResponse;
  } catch (error) {
    console.log("❌ Caught error in fetchStreamingData:", error);
    console.log("❌ Error name:", error.name);
    console.log("❌ Signal aborted:", abortController.signal.aborted);

    // Handle abort vs real errors
    if (error.name === "AbortError" || error.message === "Aborted" || abortController.signal.aborted) {
      console.log("🛑 Fetch stream was cancelled by user");

      // Add a message indicating the stream was stopped
      if (workflowInitialized) {
        await addStreamMessage(instance, workflowId, "stopped", `<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 8px; padding: 12px 16px; color: white; text-align: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); margin: 8px 0; display: flex; align-items: center; justify-content: center; gap: 8px;"><div style="font-size: 1.2rem;">⏹</div><div><div style="font-size: 0.9rem; font-weight: 600; margin: 0;">Processing Stopped</div><div style="font-size: 0.75rem; opacity: 0.9; margin: 0;">Stopped by user</div></div></div>`, "text");
      }
      return fullResponse; // Return partial response
    } else {
      console.error("💥 Real error in fetchStreamingData:", error);

      // Add error step if workflow is initialized
      if (workflowInitialized) {
        await addStreamMessage(instance, workflowId, "error", `❌ An error occurred: ${error.message}`, "text");

        // Signal completion to the system on error
        if (window.aiSystemInterface && window.aiSystemInterface.setProcessingComplete) {
          window.aiSystemInterface.setProcessingComplete(true);
        }
      }
      throw error;
    }
  } finally {
    // Always reset streaming state when done
    console.log("🧹 Cleaning up fetch stream state");
    _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setStreaming(false);
    _StreamManager__WEBPACK_IMPORTED_MODULE_1__.streamStateManager.setAbortController(null);
    console.log("🧹 Fetch stream cleanup complete");
  }
};

// Enhanced abortable delay function (same as before but with logging)
function abortableDelayV2(ms, signal) {
  console.log(`⏰ Creating abortable delay for ${ms}ms, signal.aborted:`, signal.aborted);
  return new Promise((resolve, reject) => {
    // If already aborted, reject immediately
    if (signal.aborted) {
      console.log("⏰ Delay rejected immediately - already aborted");
      reject(new Error("Aborted"));
      return;
    }
    const timeoutId = setTimeout(() => {
      console.log("⏰ Delay timeout completed normally");
      resolve();
    }, ms);

    // Listen for abort signal
    const abortHandler = () => {
      console.log("⏰ Delay abort handler called - clearing timeout");
      clearTimeout(timeoutId);
      reject(new Error("Aborted"));
    };
    signal.addEventListener("abort", abortHandler, {
      once: true
    });
    console.log("⏰ Abort listener added to delay");
  });
}
const waitForInterfaceReady = async (timeoutMs = 3000, intervalMs = 100) => {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (window.aiSystemInterface && typeof window.aiSystemInterface.addStep === "function") {
      return;
    }
    await new Promise(r => setTimeout(r, intervalMs));
  }
  console.warn("aiSystemInterface not available after", timeoutMs, "ms");
};
const streamViaBackground = async (instance, query) => {
  // Guard against empty query
  if (!query?.trim()) {
    return;
  }

  // -------------------------------------------------------------
  // Replicate the original workflow UI behaviour (same as in
  // fetchStreamingData) so that incoming agent responses are
  // rendered through the side-panel component.
  // -------------------------------------------------------------

  // Preserve previous cards/history; do not force-reset the UI here

  // 2. Insert an initial user_defined message that hosts our Workflow UI
  const workflowId = "workflow_" + generateTimestampId();

  // For the new card system, we don't need to add the initial message here
  // as it's already handled in customSendMessage
  // await instance.messaging.addMessage({
  //   output: {
  //     generic: [
  //       {
  //         id: workflowId,
  //         response_type: "user_defined",
  //         user_defined: {
  //           user_defined_type: "my_unique_identifier",
  //           text: "Processing your request...",
  //         },
  //       } as any,
  //     },
  //   },
  // });

  // Wait until the workflow component has mounted
  await waitForInterfaceReady();

  // Track whether processing has been stopped
  let isStopped = false;
  const responseID = (0,_uuid__WEBPACK_IMPORTED_MODULE_3__.randomUUID)();
  let accumulatedText = "";

  // We no longer push plain chat chunks for each stream segment because
  // the workflow component renders them in its own UI. Keeping chat
  // payloads suppressed avoids duplicate, unformatted messages.
  const pushPartial = _text => {};
  const pushComplete = _text => {};

  // -------------------------------------------------------------
  // Helper : parse the `content` received from the background into
  // an object compatible with the old fetchEventSource `ev` shape.
  // -------------------------------------------------------------
  const parseSSEContent = raw => {
    let eventName = "Message";
    const dataLines = [];
    raw.split(/\r?\n/).forEach(line => {
      if (line.startsWith("event:")) {
        eventName = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        dataLines.push(line.slice(5).trim());
      } else if (line.trim().length) {
        // If the line isn't prefixed, treat it as data as well
        dataLines.push(line.trim());
      }
    });
    return {
      event: eventName,
      data: dataLines.join("\n")
    };
  };

  // Add initial step indicating that the connection has been established
  if (window.aiSystemInterface) {
    window.aiSystemInterface.addStep("Connection Established", "Processing request and preparing response...");
  }

  // -------------------------------------------------------------
  // Listener for streaming responses coming back from the background
  // -------------------------------------------------------------
  const listener = message => {
    if (!message || message.source !== "background") return;
    switch (message.type) {
      case "agent_response":
        {
          const rawContent = message.content ?? "";

          // Convert the raw content into an SSE-like event structure so we can
          // reuse the original render logic.
          const ev = parseSSEContent(rawContent);

          // Handle workflow-step visualisation
          if (!isStopped && window.aiSystemInterface && !window.aiSystemInterface.isProcessingStopped()) {
            const currentStep = getCurrentStep(ev);
            if (currentStep) {
              const stepTitle = ev.event;
              if (ev.event === "Stopped") {
                // Graceful stop handling
                window.aiSystemInterface.stopProcessing();
                isStopped = true;
              } else if (!window.aiSystemInterface.hasStepWithTitle(stepTitle)) {
                window.aiSystemInterface.addStep(stepTitle, currentStep);
              }
            }
          }

          // No longer sending plain chat messages – only updating workflow UI
          accumulatedText += ev.data;
          break;
        }
      case "agent_complete":
        {
          // Finalise UI state (no plain chat message)

          if (window.aiSystemInterface && !isStopped) {
            window.aiSystemInterface.setProcessingComplete?.(true);
          }
          window.chrome.runtime.onMessage.removeListener(listener);
          break;
        }
      case "agent_error":
        {
          // Report error in workflow UI
          window.aiSystemInterface?.addStep("Error Occurred", `An error occurred during processing: ${message.message}`);
          if (window.aiSystemInterface && !isStopped) {
            window.aiSystemInterface.setProcessingComplete?.(true);
          }
          window.chrome.runtime.onMessage.removeListener(listener);
          break;
        }
      default:
        break;
    }
  };

  // Register the listener *before* dispatching the query so that no
  // early backend messages are missed.
  window.chrome.runtime.onMessage.addListener(listener);

  // -------------------------------------------------------------
  // Now dispatch the query to the background service-worker. We do
  // NOT await the response here because the background script keeps
  // the promise pending until the stream completes, which would block
  // our execution and cause UI updates to stall.
  // -------------------------------------------------------------

  window.chrome.runtime.sendMessage({
    source: "popup",
    type: "send_agent_query",
    query
  }).then(bgResp => {
    if (bgResp?.type === "error") {
      console.error("Background returned error during dispatch", bgResp);
      window.aiSystemInterface?.addStep("Error Occurred", bgResp.message || "Background error");
      window.aiSystemInterface?.setProcessingComplete?.(true);
    }
  }).catch(err => {
    console.error("Failed to dispatch agent_query", err);
    if (window.aiSystemInterface) {
      window.aiSystemInterface.addStep("Error Occurred", `An error occurred: ${err.message || "Failed to dispatch query"}`);
      window.aiSystemInterface.setProcessingComplete?.(true);
    }
  });
};


/***/ }),

/***/ "../agentic_chat/src/SubAgentsConfig.tsx":
/*!***********************************************!*\
  !*** ../agentic_chat/src/SubAgentsConfig.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SubAgentsConfig; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var _ConfigModal_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigModal.css */ "../agentic_chat/src/ConfigModal.css");



function SubAgentsConfig({
  onClose
}) {
  const [config, setConfig] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    mode: "supervisor",
    subAgents: [],
    supervisorStrategy: "adaptive",
    availableTools: []
  });
  const [saveStatus, setSaveStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("idle");
  const [expandedAgent, setExpandedAgent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [availableApps, setAvailableApps] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [appToolsCache, setAppToolsCache] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [loadingApps, setLoadingApps] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showAddAgentModal, setShowAddAgentModal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [newAgentSource, setNewAgentSource] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("direct");
  const [newAgentUrl, setNewAgentUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [newAgentName, setNewAgentName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [newAgentEnvVars, setNewAgentEnvVars] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [newAgentStreamType, setNewAgentStreamType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("http");
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    loadConfig();
    loadApps();
  }, []);
  const loadConfig = async () => {
    try {
      const response = await fetch('/api/config/subagents');
      if (response.ok) {
        const data = await response.json();
        const updatedData = {
          ...data,
          subAgents: data.subAgents.map(agent => ({
            ...agent,
            assignedApps: agent.assignedApps || [],
            source: agent.source || {
              type: "direct"
            }
          }))
        };
        setConfig(updatedData);
      }
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };
  const loadApps = async () => {
    setLoadingApps(true);
    try {
      const response = await fetch('/api/apps');
      if (response.ok) {
        const data = await response.json();
        setAvailableApps(data.apps || []);
      }
    } catch (error) {
      console.error("Error loading apps:", error);
    } finally {
      setLoadingApps(false);
    }
  };
  const loadAppTools = async appName => {
    if (appToolsCache[appName]) {
      return appToolsCache[appName];
    }
    try {
      const response = await fetch(`/api/apps/${encodeURIComponent(appName)}/tools`);
      if (response.ok) {
        const data = await response.json();
        const tools = data.tools || [];
        setAppToolsCache(prev => ({
          ...prev,
          [appName]: tools
        }));
        return tools;
      }
    } catch (error) {
      console.error(`Error loading tools for app ${appName}:`, error);
    }
    return [];
  };
  const saveConfig = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch('/api/config/subagents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };
  const openAddAgentModal = () => {
    setNewAgentSource("direct");
    setNewAgentUrl("");
    setNewAgentName("");
    setNewAgentEnvVars([]);
    setNewAgentStreamType("http");
    setShowAddAgentModal(true);
  };
  const closeAddAgentModal = () => {
    setShowAddAgentModal(false);
  };
  const addEnvVar = () => {
    setNewAgentEnvVars([...newAgentEnvVars, {
      key: "",
      value: ""
    }]);
  };
  const updateEnvVar = (index, key, value) => {
    const newEnvVars = [...newAgentEnvVars];
    newEnvVars[index] = {
      key,
      value
    };
    setNewAgentEnvVars(newEnvVars);
  };
  const removeEnvVar = index => {
    setNewAgentEnvVars(newAgentEnvVars.filter((_, i) => i !== index));
  };
  const createAgent = () => {
    const sourceConfig = {
      type: newAgentSource
    };
    if (newAgentSource === "a2a" || newAgentSource === "mcp") {
      if (newAgentSource === "a2a") {
        sourceConfig.url = newAgentUrl;
        sourceConfig.name = newAgentName;
      } else {
        sourceConfig.url = newAgentUrl;
        sourceConfig.streamType = newAgentStreamType;
      }
      const envVarsObj = {};
      newAgentEnvVars.forEach(env => {
        if (env.key.trim()) {
          envVarsObj[env.key.trim()] = env.value;
        }
      });
      if (Object.keys(envVarsObj).length > 0) {
        sourceConfig.envVars = envVarsObj;
      }
    }
    const newAgent = {
      id: Date.now().toString(),
      name: newAgentSource === "a2a" && newAgentName ? newAgentName : "New Agent",
      role: "Assistant",
      description: "",
      enabled: true,
      capabilities: [],
      tools: config.availableTools.map(tool => ({
        name: tool,
        enabled: false
      })),
      assignedApps: [],
      policies: [],
      source: sourceConfig
    };
    setConfig({
      ...config,
      subAgents: [...config.subAgents, newAgent]
    });
    closeAddAgentModal();
  };
  const assignApp = async (agentId, appName) => {
    const agent = config.subAgents.find(a => a.id === agentId);
    if (!agent) return;
    if (agent.assignedApps.some(a => a.appName === appName)) {
      return;
    }
    const tools = await loadAppTools(appName);
    const newAssignedApp = {
      appName,
      tools: tools.map(t => ({
        name: t.name,
        enabled: true
      }))
    };
    updateAgent(agentId, {
      assignedApps: [...agent.assignedApps, newAssignedApp]
    });
  };
  const unassignApp = (agentId, appName) => {
    const agent = config.subAgents.find(a => a.id === agentId);
    if (agent) {
      updateAgent(agentId, {
        assignedApps: agent.assignedApps.filter(a => a.appName !== appName)
      });
    }
  };
  const toggleAppTool = (agentId, appName, toolName) => {
    const agent = config.subAgents.find(a => a.id === agentId);
    if (agent) {
      const newAssignedApps = agent.assignedApps.map(app => app.appName === appName ? {
        ...app,
        tools: app.tools.map(t => t.name === toolName ? {
          ...t,
          enabled: !t.enabled
        } : t)
      } : app);
      updateAgent(agentId, {
        assignedApps: newAssignedApps
      });
    }
  };
  const addPolicy = agentId => {
    const agent = config.subAgents.find(a => a.id === agentId);
    if (agent) {
      updateAgent(agentId, {
        policies: [...agent.policies, ""]
      });
    }
  };
  const updatePolicy = (agentId, index, value) => {
    const agent = config.subAgents.find(a => a.id === agentId);
    if (agent) {
      const newPolicies = [...agent.policies];
      newPolicies[index] = value;
      updateAgent(agentId, {
        policies: newPolicies
      });
    }
  };
  const removePolicy = (agentId, index) => {
    const agent = config.subAgents.find(a => a.id === agentId);
    if (agent) {
      const newPolicies = agent.policies.filter((_, i) => i !== index);
      updateAgent(agentId, {
        policies: newPolicies
      });
    }
  };
  const toggleTool = (agentId, toolName) => {
    const agent = config.subAgents.find(a => a.id === agentId);
    if (agent) {
      const newTools = agent.tools.map(t => t.name === toolName ? {
        ...t,
        enabled: !t.enabled
      } : t);
      updateAgent(agentId, {
        tools: newTools
      });
    }
  };
  const updateAgent = (id, updates) => {
    setConfig({
      ...config,
      subAgents: config.subAgents.map(agent => agent.id === id ? {
        ...agent,
        ...updates
      } : agent)
    });
  };
  const removeAgent = id => {
    setConfig({
      ...config,
      subAgents: config.subAgents.filter(agent => agent.id !== id)
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Sub-Agents Configuration"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "config-modal-close",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 20
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-content"
  }, config.mode === "supervisor" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Sub-Agents"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "add-btn",
    onClick: openAddAgentModal
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
    size: 16
  }), "Add Agent")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sources-list"
  }, config.subAgents.map(agent => {
    const isExpanded = expandedAgent === agent.id;
    const enabledTools = agent.tools.filter(t => t.enabled).length;
    const totalAppTools = agent.assignedApps.reduce((sum, app) => sum + app.tools.filter(t => t.enabled).length, 0);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: agent.id,
      className: "agent-config-card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "agent-config-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "agent-config-top"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
      type: "checkbox",
      checked: agent.enabled,
      onChange: e => updateAgent(agent.id, {
        enabled: e.target.checked
      })
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
      type: "text",
      value: agent.name,
      onChange: e => updateAgent(agent.id, {
        name: e.target.value
      }),
      className: "agent-config-name",
      placeholder: "Agent Name"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
      type: "text",
      value: agent.role,
      onChange: e => updateAgent(agent.id, {
        role: e.target.value
      }),
      placeholder: "Role",
      style: {
        width: "120px"
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "expand-btn",
      onClick: () => setExpandedAgent(isExpanded ? null : agent.id)
    }, isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronUp, {
      size: 16
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronDown, {
      size: 16
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "delete-btn",
      onClick: () => removeAgent(agent.id)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Trash2, {
      size: 16
    }))), !isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "agent-summary"
    }, agent.source && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "agent-summary-item",
      title: `Source: ${agent.source.type.toUpperCase()}${agent.source.url ? ` - ${agent.source.url}` : ''}`
    }, agent.source.type === "direct" ? "Direct" : agent.source.type === "a2a" ? "A2A" : "MCP"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "agent-summary-item"
    }, agent.assignedApps.length, " app", agent.assignedApps.length !== 1 ? 's' : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "agent-summary-item"
    }, totalAppTools + enabledTools, " tool", totalAppTools + enabledTools !== 1 ? 's' : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "agent-summary-item"
    }, agent.policies.length, " polic", agent.policies.length !== 1 ? 'ies' : 'y'))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "agent-config-details"
    }, agent.source && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Source Configuration"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "source-info-card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "source-info-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Type:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, agent.source.type === "direct" ? "Direct" : agent.source.type === "a2a" ? "A2A Protocol" : "MCP Server")), agent.source.url && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "source-info-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "URL:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, agent.source.url)), agent.source.name && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "source-info-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Name:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, agent.source.name)), agent.source.streamType && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "source-info-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Stream Type:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, agent.source.streamType.toUpperCase())), agent.source.envVars && Object.keys(agent.source.envVars).length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "source-info-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Environment Variables:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "env-vars-display"
    }, Object.entries(agent.source.envVars).map(([key, value]) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: key,
      className: "env-var-display-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", null, key), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "="), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", null, value))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
      value: agent.description,
      onChange: e => updateAgent(agent.id, {
        description: e.target.value
      }),
      placeholder: "What this agent does...",
      rows: 2
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Capabilities"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
      type: "text",
      value: agent.capabilities.join(", "),
      onChange: e => updateAgent(agent.id, {
        capabilities: e.target.value.split(",").map(c => c.trim()).filter(c => c)
      }),
      placeholder: "research, code, planning, analysis"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Comma-separated list of capabilities")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Assigned Apps"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
      value: "",
      onChange: e => {
        if (e.target.value) {
          assignApp(agent.id, e.target.value);
          e.target.value = "";
        }
      },
      style: {
        width: "200px",
        marginLeft: "auto"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
      value: ""
    }, "Select an app to assign..."), availableApps.filter(app => !agent.assignedApps.some(a => a.appName === app.name)).map(app => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
      key: app.name,
      value: app.name
    }, app.name)))), agent.assignedApps.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "policies-empty"
    }, "No apps assigned. Select an app from the dropdown above.") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "apps-list"
    }, agent.assignedApps.map(assignedApp => {
      const app = availableApps.find(a => a.name === assignedApp.appName);
      const enabledCount = assignedApp.tools.filter(t => t.enabled).length;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: assignedApp.appName,
        className: "app-config-section"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "app-config-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, assignedApp.appName), app?.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", {
        style: {
          display: "block",
          color: "#666",
          marginTop: "4px"
        }
      }, app.description)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "remove-btn",
        onClick: () => unassignApp(agent.id, assignedApp.appName),
        title: "Remove app"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
        size: 14
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "app-tools-section"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group-header",
        style: {
          marginTop: "8px",
          marginBottom: "8px"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
        style: {
          fontSize: "0.9em",
          margin: 0
        }
      }, "Tools (", enabledCount, "/", assignedApp.tools.length, " enabled)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "tools-grid"
      }, assignedApp.tools.map(tool => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
        key: tool.name,
        className: "tool-checkbox-label"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "checkbox",
        checked: tool.enabled,
        onChange: () => toggleAppTool(agent.id, assignedApp.appName, tool.name)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, tool.name))))));
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Assign apps and configure which tools from each app this agent can use")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Legacy Tools"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "tools-count-small"
    }, enabledTools, "/", agent.tools.length, " enabled")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "tools-grid"
    }, agent.tools.map(tool => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
      key: tool.name,
      className: "tool-checkbox-label"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
      type: "checkbox",
      checked: tool.enabled,
      onChange: () => toggleTool(agent.id, tool.name)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, tool.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Legacy tool configuration (deprecated - use apps above)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Policies (Natural Language)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "add-small-btn",
      onClick: () => addPolicy(agent.id)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
      size: 12
    }), "Add Policy")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "policies-list"
    }, agent.policies.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "policies-empty"
    }, "No policies defined. Add policies to control agent behavior.") : agent.policies.map((policy, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: index,
      className: "policy-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
      value: policy,
      onChange: e => updatePolicy(agent.id, index, e.target.value),
      placeholder: "e.g., Always verify information from multiple sources before making decisions",
      rows: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "remove-btn",
      onClick: () => removePolicy(agent.id, index)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
      size: 14
    }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Define behavior rules in plain English"))));
  })), config.subAgents.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No sub-agents configured. Click \"Add Agent\" to create one.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "cancel-btn",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `save-btn ${saveStatus}`,
    onClick: saveConfig,
    disabled: saveStatus === "saving"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Save, {
    size: 16
  }), saveStatus === "idle" && "Save Changes", saveStatus === "saving" && "Saving...", saveStatus === "success" && "Saved!", saveStatus === "error" && "Error!"))), showAddAgentModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-overlay",
    onClick: closeAddAgentModal
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal add-agent-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Add New Sub-Agent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "config-modal-close",
    onClick: closeAddAgentModal
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 20
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Agent Source"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "How to create this agent?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: newAgentSource,
    onChange: e => setNewAgentSource(e.target.value)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "direct"
  }, "Direct (Local Agent)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "a2a"
  }, "A2A Protocol"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "mcp"
  }, "MCP Server")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, newAgentSource === "direct" && "Create a local agent directly", newAgentSource === "a2a" && "Connect via A2A protocol", newAgentSource === "mcp" && "Connect to an MCP server via HTTP or SSE")), newAgentSource === "a2a" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Agent Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: newAgentName,
    onChange: e => setNewAgentName(e.target.value),
    placeholder: "e.g., research-agent"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Name identifier for the A2A agent")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "URL"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: newAgentUrl,
    onChange: e => setNewAgentUrl(e.target.value),
    placeholder: "e.g., http://localhost:8080"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "A2A protocol endpoint URL"))), newAgentSource === "mcp" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "MCP Server URL"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: newAgentUrl,
    onChange: e => setNewAgentUrl(e.target.value),
    placeholder: "e.g., http://localhost:8001"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "MCP server endpoint URL")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Stream Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: newAgentStreamType,
    onChange: e => setNewAgentStreamType(e.target.value)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "http"
  }, "HTTP (Streamable)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "sse"
  }, "SSE (Server-Sent Events)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Communication protocol for MCP server"))), (newAgentSource === "a2a" || newAgentSource === "mcp") && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Environment Variables"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "add-small-btn",
    onClick: addEnvVar
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
    size: 12
  }), "Add Variable")), newAgentEnvVars.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policies-empty"
  }, "No environment variables. Click \"Add Variable\" to add one.") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "env-list"
  }, newAgentEnvVars.map((env, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "env-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: env.key,
    onChange: e => updateEnvVar(index, e.target.value, env.value),
    placeholder: "Variable name",
    style: {
      width: "200px"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "="), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: env.value,
    onChange: e => updateEnvVar(index, env.key, e.target.value),
    placeholder: "Variable value",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "remove-btn",
    onClick: () => removeEnvVar(index)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 14
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Environment variables to pass to the agent"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "cancel-btn",
    onClick: closeAddAgentModal
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "save-btn",
    onClick: createAgent,
    disabled: newAgentSource === "a2a" && (!newAgentUrl || !newAgentName) || newAgentSource === "mcp" && !newAgentUrl
  }, "Create Agent")))));
}

/***/ }),

/***/ "../agentic_chat/src/ToolReview.tsx":
/*!******************************************!*\
  !*** ../agentic_chat/src/ToolReview.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ToolCallFlowDisplay; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");


function ToolCallFlowDisplay({
  toolData
}) {
  const toolCallData = toolData;
  const getArgIcon = (key, value) => {
    if (typeof value === "number") return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Hash, {
      className: "w-3 h-3 text-blue-500"
    });
    if (typeof value === "string") return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Type, {
      className: "w-3 h-3 text-green-500"
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Database, {
      className: "w-3 h-3 text-gray-500"
    });
  };
  const formatArgValue = value => {
    if (typeof value === "string") return `"${value}"`;
    return String(value);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg shadow-md border p-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, toolCallData.name != "run_new_flow" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Shield, {
    className: "w-5 h-5 text-emerald-600"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.CheckCircle, {
    className: "w-4 h-4 text-emerald-500"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "text-lg font-semibold text-gray-800"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Settings, {
    className: "w-4 h-4 text-blue-600"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm font-medium text-blue-800"
  }, "Flow Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "font-mono text-lg font-semibold text-blue-900 bg-white px-3 py-2 rounded border"
  }, toolCallData.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Database, {
    className: "w-4 h-4 text-green-600"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm font-medium text-green-800"
  }, "Inputs")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "space-y-2"
  }, Object.entries(toolCallData.args).map(([key, value]) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: key,
    className: "bg-white rounded border p-3 flex items-center gap-3"
  }, getArgIcon(key, value), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "font-mono text-sm font-semibold text-gray-700"
  }, key, ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "font-mono text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded"
  }, formatArgValue(value)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
  }, typeof value))))), toolCallData.name != "run_new_flow" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between pt-2 border-t border-gray-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.CheckCircle, {
    className: "w-4 h-4 text-emerald-500"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm text-gray-600"
  }, "Verified and trusted flow")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200 border border-blue-200 hover:border-blue-300",
    onClick: () => {
      try {
        window.open(`${API_BASE_URL}/flows/flow.html`, "_blank");
      } catch (error) {
        alert("Local server not running. Please start your development server.");
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Flow explained"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ExternalLink, {
    className: "w-3 h-3"
  })))))));
}

/***/ }),

/***/ "../agentic_chat/src/ToolsConfig.tsx":
/*!*******************************************!*\
  !*** ../agentic_chat/src/ToolsConfig.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ToolsConfig; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var js_yaml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-yaml */ "../node_modules/.pnpm/js-yaml@4.1.1/node_modules/js-yaml/dist/js-yaml.mjs");
/* harmony import */ var _ConfigModal_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConfigModal.css */ "../agentic_chat/src/ConfigModal.css");




function ToolsConfig({
  onClose
}) {
  const [configData, setConfigData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    services: [],
    mcpServers: {},
    apps: [],
    appTools: {}
  });
  const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("apps");
  const [saveStatus, setSaveStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("idle");
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    loadConfig();
  }, []);
  const loadConfig = async () => {
    setLoading(true);
    try {
      // Load tools config (includes services and mcpServers)
      const configResponse = await fetch('/api/config/tools');
      let configData = {
        services: [],
        mcpServers: {},
        apps: [],
        appTools: {}
      };
      if (configResponse.ok) {
        const toolsConfig = await configResponse.json();
        configData = {
          ...configData,
          services: toolsConfig.services || [],
          mcpServers: toolsConfig.mcpServers || {}
        };
        console.log('Loaded tools config:', toolsConfig);
      }

      // Load available apps
      const appsResponse = await fetch('/api/apps');
      if (appsResponse.ok) {
        const appsData = await appsResponse.json();
        const apps = appsData.apps || [];
        configData.apps = apps;

        // Load tools for each app
        const appTools = {};
        for (const app of apps) {
          try {
            const toolsResponse = await fetch(`/api/apps/${app.name}/tools`);
            if (toolsResponse.ok) {
              const toolsData = await toolsResponse.json();
              appTools[app.name] = toolsData.tools || [];
            }
          } catch (error) {
            console.warn(`Failed to load tools for app ${app.name}:`, error);
            appTools[app.name] = [];
          }
        }
        configData.appTools = appTools;
      }
      console.log('Final config data:', configData);
      setConfigData(configData);
    } catch (error) {
      console.error("Error loading config:", error);
    } finally {
      setLoading(false);
    }
  };
  const saveConfig = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch('/api/config/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(configData)
      });
      if (response.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    } catch (error) {
      console.error("Error saving config:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };
  const addMcpServer = () => {
    const serverName = prompt("Enter MCP server name:");
    if (serverName && !configData.mcpServers?.[serverName]) {
      setConfigData({
        ...configData,
        mcpServers: {
          ...configData.mcpServers,
          [serverName]: {
            command: "uv",
            args: [],
            transport: "stdio",
            description: "",
            env: {}
          }
        }
      });
    }
  };
  const removeMcpServer = serverName => {
    const {
      [serverName]: removed,
      ...rest
    } = configData.mcpServers || {};
    setConfigData({
      ...configData,
      mcpServers: rest
    });
  };
  const updateMcpServer = (serverName, field, value) => {
    setConfigData({
      ...configData,
      mcpServers: {
        ...configData.mcpServers,
        [serverName]: {
          ...configData.mcpServers?.[serverName],
          [field]: value
        }
      }
    });
  };
  const addArg = serverName => {
    const currentServer = configData.mcpServers?.[serverName];
    const newArgs = [...(currentServer?.args || []), ""];
    updateMcpServer(serverName, "args", newArgs);
  };
  const updateArg = (serverName, index, value) => {
    const currentServer = configData.mcpServers?.[serverName];
    const newArgs = [...(currentServer?.args || [])];
    newArgs[index] = value;
    updateMcpServer(serverName, "args", newArgs);
  };
  const removeArg = (serverName, index) => {
    const currentServer = configData.mcpServers?.[serverName];
    const newArgs = (currentServer?.args || []).filter((_, i) => i !== index);
    updateMcpServer(serverName, "args", newArgs);
  };
  const addEnvVar = serverName => {
    const key = prompt("Enter environment variable name:");
    if (key) {
      const currentServer = configData.mcpServers?.[serverName];
      updateMcpServer(serverName, "env", {
        ...(currentServer?.env || {}),
        [key]: ""
      });
    }
  };
  const updateEnvVar = (serverName, key, value) => {
    const currentServer = configData.mcpServers?.[serverName];
    updateMcpServer(serverName, "env", {
      ...(currentServer?.env || {}),
      [key]: value
    });
  };
  const removeEnvVar = (serverName, key) => {
    const currentServer = configData.mcpServers?.[serverName];
    const {
      [key]: removed,
      ...rest
    } = currentServer?.env || {};
    updateMcpServer(serverName, "env", rest);
  };
  const exportConfig = () => {
    const yamlStr = js_yaml__WEBPACK_IMPORTED_MODULE_2__["default"].dump(configData);
    const blob = new Blob([yamlStr], {
      type: 'text/yaml'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mcp_servers_config.yaml';
    a.click();
    URL.revokeObjectURL(url);
  };
  const importConfig = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.yaml,.yml';
    input.onchange = async e => {
      const file = e.target.files?.[0];
      if (file) {
        const text = await file.text();
        try {
          const data = js_yaml__WEBPACK_IMPORTED_MODULE_2__["default"].load(text);
          setConfigData(data);
        } catch (error) {
          alert('Failed to parse YAML file');
        }
      }
    };
    input.click();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Tools Configuration"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "config-modal-close",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 20
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-tabs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `config-tab ${activeTab === "apps" ? "active" : ""}`,
    onClick: () => setActiveTab("apps")
  }, "Apps & Tools"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `config-tab ${activeTab === "mcpServers" ? "active" : ""}`,
    onClick: () => setActiveTab("mcpServers")
  }, "MCP Servers"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `config-tab ${activeTab === "services" ? "active" : ""}`,
    onClick: () => setActiveTab("services")
  }, "Services")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-toolbar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "toolbar-btn",
    onClick: importConfig,
    disabled: true,
    title: "Import disabled"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Upload, {
    size: 14
  }), "Import YAML"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "toolbar-btn",
    onClick: exportConfig,
    disabled: true,
    title: "Export disabled"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Download, {
    size: 14
  }), "Export YAML")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-content"
  }, activeTab === "apps" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "apps-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Available Apps & Tools"), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "loading-text"
  }, "Loading...")), (configData.apps || []).length === 0 && !loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No apps available. Make sure the registry service is running.")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "apps-grid"
  }, (configData.apps || []).map(app => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: app.name,
    className: "app-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "app-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, app.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: `app-type ${app.type}`
  }, app.type)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "app-description"
  }, app.description || "No description available"), app.url && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "app-url"
  }, app.url), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "app-tools"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h5", null, "Available Tools (", (configData.appTools?.[app.name] || []).length, ")"), (configData.appTools?.[app.name] || []).length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "no-tools"
  }, "No tools available") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tools-list"
  }, (configData.appTools?.[app.name] || []).map((tool, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "tool-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "tool-name"
  }, tool.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "tool-description"
  }, tool.description || "No description"))))))))), activeTab === "mcpServers" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mcp-servers-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "MCP Servers"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "add-btn",
    onClick: addMcpServer,
    disabled: true,
    title: "Add server disabled"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
    size: 16
  }), "Add Server")), Object.entries(configData.mcpServers || {}).map(([serverName, server]) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: serverName,
    className: "config-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-card-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, serverName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "delete-btn",
    onClick: () => removeMcpServer(serverName),
    disabled: true,
    title: "Delete disabled"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Trash2, {
    size: 16
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
    value: server.description || "",
    onChange: e => updateMcpServer(serverName, "description", e.target.value),
    rows: 2,
    placeholder: "Server description...",
    disabled: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Command"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: server.command || "",
    onChange: e => updateMcpServer(serverName, "command", e.target.value),
    placeholder: "e.g., uv, python, node",
    disabled: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Transport"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: server.transport || "stdio",
    onChange: e => updateMcpServer(serverName, "transport", e.target.value),
    disabled: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "stdio"
  }, "stdio"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "sse"
  }, "sse")))), server.transport !== "sse" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Arguments"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "add-small-btn",
    onClick: () => addArg(serverName),
    disabled: true,
    title: "Add argument disabled"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
    size: 12
  }), "Add Arg")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "args-list"
  }, (server.args || []).map((arg, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "arg-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: arg,
    onChange: e => updateArg(serverName, index, e.target.value),
    placeholder: "Argument",
    disabled: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "remove-btn",
    onClick: () => removeArg(serverName, index),
    disabled: true,
    title: "Remove disabled"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 14
  })))))), server.transport === "sse" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "URL"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: server.url || "",
    onChange: e => updateMcpServer(serverName, "url", e.target.value),
    placeholder: "http://localhost:8000/sse",
    disabled: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Environment Variables"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "add-small-btn",
    onClick: () => addEnvVar(serverName),
    disabled: true,
    title: "Add environment variable disabled"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
    size: 12
  }), "Add Env")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "env-list"
  }, Object.entries(server.env || {}).map(([key, value]) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: key,
    className: "env-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "env-key"
  }, key), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: value,
    onChange: e => updateEnvVar(serverName, key, e.target.value),
    placeholder: "Value",
    disabled: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "remove-btn",
    onClick: () => removeEnvVar(serverName, key),
    disabled: true,
    title: "Remove disabled"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 14
  }))))))))), Object.keys(configData.mcpServers || {}).length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No MCP servers configured. Click \"Add Server\" to get started."))), activeTab === "services" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "services-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "OpenAPI Services"), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "loading-text"
  }, "Loading...")), (configData.services || []).length === 0 && !loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No services configured. Services are defined in the YAML configuration file.")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "services-list"
  }, (configData.services || []).map((serviceObj, index) => {
    // Each service is an object with one key (the service name)
    const serviceName = Object.keys(serviceObj)[0];
    const service = serviceObj[serviceName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: index,
      className: "config-card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "config-card-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, serviceName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "service-badge"
    }, "OpenAPI")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "config-form"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
      className: "service-description"
    }, service.description || "No description available")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "OpenAPI URL"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
      className: "service-url"
    }, service.url))));
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "cancel-btn",
    onClick: onClose
  }, "Close"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `save-btn ${saveStatus}`,
    onClick: saveConfig,
    disabled: true,
    title: "Save disabled - read-only mode"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Save, {
    size: 16
  }), "Save Changes"))));
}

/***/ }),

/***/ "../agentic_chat/src/VariablePopup.tsx":
/*!*********************************************!*\
  !*** ../agentic_chat/src/VariablePopup.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marked */ "../node_modules/.pnpm/marked@16.3.0/node_modules/marked/lib/marked.esm.js");
/* harmony import */ var _VariablePopup_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VariablePopup.css */ "../agentic_chat/src/VariablePopup.css");



const VariablePopup = ({
  variable,
  onClose
}) => {
  const handleDownload = () => {
    // Check if variable is a dict type and try to download as JSON
    if (variable.type === 'dict') {
      try {
        // Attempt to parse the value_preview as JSON
        const jsonData = JSON.parse(variable.value_preview);
        const content = JSON.stringify(jsonData, null, 2);
        // Use octet-stream to force the browser to respect the .json extension
        const blob = new Blob([content], {
          type: "application/octet-stream"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${variable.name}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return;
      } catch (error) {
        // If JSON parsing fails, fall back to markdown
        console.warn('Failed to parse dict as JSON, falling back to markdown download:', error);
      }
    }

    // Default to markdown download
    const content = `# Variable: ${variable.name}\n\n**Type:** ${variable.type}\n\n${variable.description ? `**Description:** ${variable.description}\n\n` : ""}**Value:**\n\`\`\`\n${variable.value_preview}\n\`\`\``;
    const blob = new Blob([content], {
      type: "text/markdown"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${variable.name}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const formattedContent = `## ${variable.name}\n\n**Type:** \`${variable.type}\`${variable.count_items ? ` (${variable.count_items} items)` : ""}\n\n${variable.description ? `**Description:** ${variable.description}\n\n` : ""}**Value:**\n\`\`\`\n${variable.value_preview}\n\`\`\``;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variable-popup-overlay",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variable-popup-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variable-popup-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Variable Details"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variable-popup-actions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "variable-popup-download-btn",
    onClick: handleDownload,
    title: variable.type === 'dict' ? "Download as JSON" : "Download as Markdown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "currentColor"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M8.5 1a.5.5 0 0 0-1 0v8.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M3 13h10a1 1 0 0 0 1-1v-1.5a.5.5 0 0 0-1 0V12H3v-.5a.5.5 0 0 0-1 0V12a1 1 0 0 0 1 1z"
  })), "Download ", variable.type === 'dict' ? 'JSON' : 'MD'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "variable-popup-close-btn",
    onClick: onClose
  }, "\xD7"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variable-popup-body",
    dangerouslySetInnerHTML: {
      __html: (0,marked__WEBPACK_IMPORTED_MODULE_1__.marked)(formattedContent)
    }
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (VariablePopup);

/***/ }),

/***/ "../agentic_chat/src/VariablesSidebar.tsx":
/*!************************************************!*\
  !*** ../agentic_chat/src/VariablesSidebar.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VariablePopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VariablePopup */ "../agentic_chat/src/VariablePopup.tsx");
/* harmony import */ var _VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VariablesSidebar.css */ "../agentic_chat/src/VariablesSidebar.css");



const VariablesSidebar = ({
  variables,
  history = [],
  selectedAnswerId,
  onSelectAnswer
}) => {
  const [isExpanded, setIsExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [selectedVariable, setSelectedVariable] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const variableKeys = Object.keys(variables);
  console.log('VariablesSidebar render - variableKeys:', variableKeys.length, 'history:', history.length, 'selectedAnswerId:', selectedAnswerId);
  if (variableKeys.length === 0 && history.length === 0) {
    console.log('VariablesSidebar: No variables or history, not rendering');
    return null;
  }

  // Always show sidebar if there's history, even if no current variables
  const shouldShowSidebar = variableKeys.length > 0 || history.length > 0;
  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `variables-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-sidebar-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "variables-sidebar-toggle",
    onClick: () => setIsExpanded(!isExpanded),
    title: isExpanded ? "Collapse variables panel" : "Expand variables panel"
  }, isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polyline", {
    points: "15 18 9 12 15 6"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polyline", {
    points: "9 18 15 12 9 6"
  }))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-sidebar-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M4 7h16M4 12h16M4 17h16"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Variables"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "variables-count"
  }, variableKeys.length)), history.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    className: "variables-history-select",
    value: selectedAnswerId || '',
    onChange: e => onSelectAnswer && onSelectAnswer(e.target.value),
    onClick: e => e.stopPropagation(),
    title: "Select which conversation turn to view variables from"
  }, history.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    key: item.id,
    value: item.id
  }, item.title, " - ", Object.keys(item.variables).length, " variable", Object.keys(item.variables).length !== 1 ? 's' : '', " (", formatTimestamp(item.timestamp), ")"))))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-sidebar-content"
  }, history.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-history-info"
  }, "Viewing: ", history.find(h => h.id === selectedAnswerId)?.title || 'Latest turn', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "history-count"
  }, history.length, " turns total")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-list"
  }, variableKeys.length === 0 && history.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "no-variables-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No variables in current turn."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Select a previous turn from the dropdown above to view its variables.")) : variableKeys.map(varName => {
    const variable = variables[varName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: varName,
      className: "variable-item",
      onClick: () => setSelectedVariable({
        name: varName,
        ...variable
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "variable-item-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", {
      className: "variable-name"
    }, varName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "variable-type"
    }, variable.type)), variable.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "variable-description"
    }, variable.description), variable.count_items !== undefined && variable.count_items > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "variable-meta"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "variable-count"
    }, variable.count_items, " items")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "variable-preview"
    }, variable.value_preview ? variable.value_preview.substring(0, 80) + (variable.value_preview.length > 80 ? "..." : "") : ""));
  })))), !isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "variables-sidebar-floating-toggle",
    onClick: () => setIsExpanded(true),
    title: "Show variables panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("polyline", {
    points: "9 18 15 12 9 6"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "variables-floating-count"
  }, variableKeys.length)), selectedVariable && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_VariablePopup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    variable: selectedVariable,
    onClose: () => setSelectedVariable(null)
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (VariablesSidebar);

/***/ }),

/***/ "../agentic_chat/src/WorkspacePanel.tsx":
/*!**********************************************!*\
  !*** ../agentic_chat/src/WorkspacePanel.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspacePanel: function() { return /* binding */ WorkspacePanel; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var _WorkspacePanel_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WorkspacePanel.css */ "../agentic_chat/src/WorkspacePanel.css");



function WorkspacePanel({
  isOpen,
  onToggle,
  highlightedFile
}) {
  const [fileTree, setFileTree] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [expandedFolders, setExpandedFolders] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Set());
  const [selectedFile, setSelectedFile] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [deleteConfirmation, setDeleteConfirmation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isDragOver, setIsDragOver] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const loadWorkspaceTree = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      setError(null);
      const {
        workspaceService
      } = await __webpack_require__.e(/*! import() */ "agentic_chat_src_workspaceService_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./workspaceService */ "../agentic_chat/src/workspaceService.ts"));
      const data = await workspaceService.getWorkspaceTree();
      setFileTree(data.tree || []);
    } catch (err) {
      console.error("Error loading workspace:", err);
      setError("Error loading workspace");
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isOpen) {
      loadWorkspaceTree();
      // Set up polling for live updates
      const interval = setInterval(loadWorkspaceTree, 15000);
      return () => clearInterval(interval);
    }
  }, [isOpen, loadWorkspaceTree]);
  const toggleFolder = path => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };
  const handleFileClick = async file => {
    if (file.type === "directory") {
      toggleFolder(file.path);
      return;
    }

    // Check if it's a text or markdown file
    const textExtensions = ['.txt', '.md', '.json', '.yaml', '.yml', '.log', '.csv', '.html', '.css', '.js', '.ts', '.py'];
    const isTextFile = textExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!isTextFile) {
      alert("Only text and markdown files can be previewed");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/workspace/file?path=${encodeURIComponent(file.path)}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedFile({
          path: file.path,
          content: data.content,
          name: file.name
        });
      } else {
        alert("Failed to load file");
      }
    } catch (err) {
      console.error("Error loading file:", err);
      alert("Error loading file");
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = async (filePath, fileName) => {
    try {
      const response = await fetch(`/api/workspace/download?path=${encodeURIComponent(filePath)}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Failed to download file");
      }
    } catch (err) {
      console.error("Error downloading file:", err);
      alert("Error downloading file");
    }
  };
  const handleDeleteClick = file => {
    // Disabled: Delete functionality is not available
    // setDeleteConfirmation({ file, isOpen: true });
  };
  const handleDeleteConfirm = async () => {
    if (!deleteConfirmation) return;
    const {
      file
    } = deleteConfirmation;
    setLoading(true);
    try {
      const response = await fetch(`/api/workspace/file?path=${encodeURIComponent(file.path)}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Refresh the workspace tree after successful deletion
        await loadWorkspaceTree();
        // Close any open file viewer if the deleted file was being viewed
        if (selectedFile && selectedFile.path === file.path) {
          setSelectedFile(null);
        }
      } else {
        alert("Failed to delete file");
      }
    } catch (err) {
      console.error("Error deleting file:", err);
      alert("Error deleting file");
    } finally {
      setLoading(false);
      setDeleteConfirmation(null);
    }
  };
  const handleDeleteCancel = () => {
    setDeleteConfirmation(null);
  };

  // Drag and drop handlers - DISABLED
  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    // Disabled: Upload functionality is not available
    // if (e.dataTransfer?.types.includes('Files')) {
    //   setIsDragOver(true);
    // }
  };
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    // Disabled: Upload functionality is not available
    // const rect = e.currentTarget.getBoundingClientRect();
    // const x = e.clientX;
    // const y = e.clientY;
    // if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
    //   setIsDragOver(false);
    // }
  };
  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = async e => {
    e.preventDefault();
    e.stopPropagation();
    // Disabled: Upload functionality is not available
    // setIsDragOver(false);
    // const files = Array.from(e.dataTransfer.files);
    // if (files.length > 0) {
    //   await handleFileUpload(files);
    // }
  };
  const handleFileUpload = async files => {
    setLoading(true);
    setError(null);
    try {
      const uploadPromises = files.map(async file => {
        const formData = new FormData();
        formData.append('file', file);

        // Upload to cuga_workspace directory
        const response = await fetch('/api/workspace/upload', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}: ${response.statusText}`);
        }
        return await response.json();
      });
      await Promise.all(uploadPromises);

      // Refresh the workspace tree after successful uploads
      await loadWorkspaceTree();
    } catch (err) {
      console.error('Error uploading files:', err);
      setError(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };
  const renderFileTree = (nodes, level = 0) => {
    return nodes.map(node => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: node.path,
      style: {
        marginLeft: `${level * 16}px`
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: `file-tree-item ${node.type === "directory" ? "directory" : "file"} ${highlightedFile === node.path ? "highlighted" : ""}`,
      onClick: () => handleFileClick(node)
    }, node.type === "directory" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, expandedFolders.has(node.path) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronDown, {
      size: 16,
      className: "folder-icon"
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronRight, {
      size: 16,
      className: "folder-icon"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Folder, {
      size: 16,
      className: "item-icon"
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "folder-icon-spacer"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.File, {
      size: 16,
      className: "item-icon"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "item-name"
    }, node.name), node.type === "file" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "file-actions"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "download-icon-btn",
      onClick: e => {
        e.stopPropagation();
        handleDownload(node.path, node.name);
      },
      title: "Download file"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Download, {
      size: 14
    })))), node.type === "directory" && expandedFolders.has(node.path) && node.children && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "folder-children"
    }, renderFileTree(node.children, level + 1))));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `workspace-panel ${isOpen ? "open" : "closed"} ${isDragOver ? "drag-over" : ""}`,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "workspace-panel-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "workspace-panel-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Folder, {
    size: 18
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Workspace"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "workspace-info-tooltip-wrapper",
    onClick: e => e.stopPropagation(),
    onMouseEnter: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Info, {
    size: 16,
    className: "info-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "workspace-info-tooltip"
  }, "This is the CUGA workspace. Tag files directly from your working directory using ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", null, "@")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "workspace-panel-actions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "workspace-refresh-btn",
    onClick: loadWorkspaceTree,
    title: "Refresh"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.RefreshCw, {
    size: 16
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "workspace-close-btn",
    onClick: onToggle,
    title: "Close"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronRight, {
    size: 18
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "workspace-panel-content"
  }, error ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "workspace-error"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, error), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: loadWorkspaceTree
  }, "Retry")) : fileTree.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "workspace-empty"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Folder, {
    size: 48,
    className: "empty-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Workspace is empty"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Files created by agents will appear here")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "file-tree"
  }, renderFileTree(fileTree)))), !isOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "workspace-toggle-btn",
    onClick: onToggle,
    title: "Open Workspace"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Folder, {
    size: 18
  })), selectedFile && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "file-viewer-overlay",
    onClick: () => setSelectedFile(null)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "file-viewer-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "file-viewer-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "file-viewer-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.FileText, {
    size: 18
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, selectedFile.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "file-viewer-actions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "file-viewer-btn",
    onClick: () => handleDownload(selectedFile.path, selectedFile.name)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Download, {
    size: 16
  }), "Download"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "file-viewer-close",
    onClick: () => setSelectedFile(null)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 18
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "file-viewer-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("pre", null, selectedFile.content)))), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "workspace-loading-overlay"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "workspace-spinner"
  })));
}

/***/ }),

/***/ "../agentic_chat/src/action_agent.tsx":
/*!********************************************!*\
  !*** ../agentic_chat/src/action_agent.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AgentThoughtsComponent; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function AgentThoughtsComponent({
  agentData
}) {
  const [showFullThoughts, setShowFullThoughts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data for demonstration

  // Use props if provided, otherwise use sample data
  const {
    thoughts,
    next_agent,
    instruction
  } = agentData;
  function getAgentColor(agentName) {
    const colors = {
      ActionAgent: "bg-blue-100 text-blue-800 border-blue-300",
      ValidationAgent: "bg-green-100 text-green-800 border-green-300",
      NavigationAgent: "bg-purple-100 text-purple-800 border-purple-300",
      AnalysisAgent: "bg-yellow-100 text-yellow-800 border-yellow-300",
      TestAgent: "bg-orange-100 text-orange-800 border-orange-300"
    };
    return colors[agentName] || "bg-gray-100 text-gray-800 border-gray-300";
  }
  function getAgentIcon(agentName) {
    const icons = {
      ActionAgent: "🎯",
      QaAgent: "🔍"
    };
    return icons[agentName] || "🤖";
  }
  function truncateThoughts(thoughtsArray, maxLength = 120) {
    const firstThought = thoughtsArray[0] || "";
    if (firstThought.length <= maxLength) return firstThought;
    return firstThought.substring(0, maxLength) + "...";
  }
  function truncateInstruction(instruction, maxLength = 80) {
    if (instruction.length <= maxLength) return instruction;
    return instruction.substring(0, maxLength) + "...";
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-3xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-base"
  }, "\uD83E\uDD16"), "Agent Workflow"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "px-2 py-1 rounded text-xs bg-indigo-100 text-indigo-700"
  }, "Processing")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3 p-2 bg-gray-50 rounded border"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, getAgentIcon(next_agent)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-600"
  }, "Next:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: `px-2 py-1 rounded text-xs font-medium ${getAgentColor(next_agent)}`
  }, next_agent))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3 p-2 bg-blue-50 rounded border border-blue-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-start gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDCCB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-600 mb-1"
  }, "Current Instruction"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-700 leading-relaxed"
  }, truncateInstruction(instruction, 100))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "border-t border-gray-100 pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-400"
  }, "\uD83D\uDCAD"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, "Analysis (", thoughts.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullThoughts(!showFullThoughts),
    className: "text-xs text-gray-400 hover:text-gray-600"
  }, showFullThoughts ? "▲" : "▼"))), !showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-400 italic mt-1"
  }, truncateThoughts(thoughts, 80)), showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 space-y-1"
  }, thoughts.map((thought, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "flex items-start gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-300 mt-0.5 font-mono"
  }, index + 1, "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-500 leading-relaxed"
  }, thought))))))));
}

/***/ }),

/***/ "../agentic_chat/src/action_status_component.tsx":
/*!*******************************************************!*\
  !*** ../agentic_chat/src/action_status_component.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ActionStatusDashboard; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ActionStatusDashboard({
  actionData
}) {
  const [showFullThoughts, setShowFullThoughts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data - you can replace this with props

  const {
    thoughts,
    action,
    action_input_shortlisting_agent,
    action_input_coder_agent,
    action_input_conclude_task
  } = actionData;
  function truncateText(text, maxLength = 80) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }
  function getThoughtsSummary() {
    if (thoughts.length === 0) return "No thoughts recorded";
    const firstThought = truncateText(thoughts[0], 100);
    return firstThought;
  }
  function getActionIcon(actionType) {
    switch (actionType) {
      case "CoderAgent":
        return "👨‍💻";
      case "ShortlistingAgent":
        return "📋";
      case "conclude_task":
        return "🎯";
      default:
        return "⚡";
    }
  }
  function getActionColor(actionType) {
    switch (actionType) {
      case "CoderAgent":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "ShortlistingAgent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "conclude_task":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  // Determine which action is active
  const activeAction = action;
  const activeActionInput = action_input_coder_agent || action_input_shortlisting_agent || action_input_conclude_task;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-3xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700"
  }, "Active Action"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: `px-2 py-1 rounded text-xs font-medium ${getActionColor(activeAction)}`
  }, getActionIcon(activeAction), " ", activeAction)), activeActionInput && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `mb-3 p-2 rounded border ${getActionColor(activeAction)}`
  }, action_input_coder_agent && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDC68\u200D\uD83D\uDCBB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs font-medium text-purple-700"
  }, "Coder Agent Task")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-purple-600 leading-relaxed mb-2"
  }, action_input_coder_agent.task_description), action_input_coder_agent.context_variables_from_history && action_input_coder_agent.context_variables_from_history.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-purple-600"
  }, "Context:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-wrap gap-1 mt-1"
  }, action_input_coder_agent.context_variables_from_history.slice(0, 3).map((variable, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    key: index,
    className: "px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-xs"
  }, variable)), action_input_coder_agent.context_variables_from_history.length > 3 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-purple-500"
  }, "+", action_input_coder_agent.context_variables_from_history.length - 3, " more"))), action_input_coder_agent.relevant_apis && action_input_coder_agent.relevant_apis.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-purple-600"
  }, "APIs:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-wrap gap-1 mt-1"
  }, action_input_coder_agent.relevant_apis.slice(0, 2).map((api, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    key: index,
    className: "px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-xs"
  }, api.api_name)), action_input_coder_agent.relevant_apis.length > 2 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-purple-500"
  }, "+", action_input_coder_agent.relevant_apis.length - 2, " more")))), action_input_shortlisting_agent && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDCCB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs font-medium text-blue-700"
  }, "Shortlisting Agent Task")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-blue-600 leading-relaxed"
  }, action_input_shortlisting_agent.task_description)), action_input_conclude_task && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83C\uDFAF"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs font-medium text-green-700"
  }, "Task Conclusion")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-green-600 leading-relaxed"
  }, action_input_conclude_task.final_response))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "grid grid-cols-3 gap-2 mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `p-2 rounded text-center text-xs ${action_input_coder_agent ? "bg-purple-100 text-purple-700" : "bg-gray-50 text-gray-400"}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm mb-1"
  }, "\uD83D\uDC68\u200D\uD83D\uDCBB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "font-medium"
  }, "Coder"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs"
  }, action_input_coder_agent ? "Active" : "Inactive")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `p-2 rounded text-center text-xs ${action_input_shortlisting_agent ? "bg-blue-100 text-blue-700" : "bg-gray-50 text-gray-400"}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm mb-1"
  }, "\uD83D\uDCCB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "font-medium"
  }, "Shortlister"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs"
  }, action_input_shortlisting_agent ? "Active" : "Inactive")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `p-2 rounded text-center text-xs ${action_input_conclude_task ? "bg-green-100 text-green-700" : "bg-gray-50 text-gray-400"}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-sm mb-1"
  }, "\uD83C\uDFAF"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "font-medium"
  }, "Conclude"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs"
  }, action_input_conclude_task ? "Active" : "Inactive"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "border-t border-gray-100 pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-400"
  }, "\uD83D\uDCAD"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-500"
  }, "Analysis (", thoughts.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullThoughts(!showFullThoughts),
    className: "text-xs text-gray-400 hover:text-gray-600"
  }, showFullThoughts ? "▲" : "▼"))), !showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-400 italic mt-1"
  }, getThoughtsSummary()), showFullThoughts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 space-y-1"
  }, thoughts.map((thought, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "flex items-start gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-300 mt-0.5 font-mono"
  }, index + 1, "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-xs text-gray-500 leading-relaxed"
  }, thought))))))));
}

/***/ }),

/***/ "../agentic_chat/src/app_analyzer_component.tsx":
/*!******************************************************!*\
  !*** ../agentic_chat/src/app_analyzer_component.tsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AppAnalyzerComponent; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function AppAnalyzerComponent({
  appData
}) {
  const [showAllApps, setShowAllApps] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Sample data - you can replace this with props

  function getAppIcon(appName) {
    switch (appName.toLowerCase()) {
      case "gmail":
        return "📧";
      case "phone":
        return "📱";
      case "venmo":
        return "💰";
      case "calendar":
        return "📅";
      case "drive":
        return "📁";
      case "sheets":
        return "📊";
      case "slack":
        return "💬";
      case "spotify":
        return "🎵";
      case "uber":
        return "🚗";
      case "weather":
        return "🌤️";
      default:
        return "🔧";
    }
  }
  function getAppColor(appName) {
    switch (appName.toLowerCase()) {
      case "gmail":
        return "bg-red-100 text-red-700";
      case "phone":
        return "bg-blue-100 text-blue-700";
      case "venmo":
        return "bg-green-100 text-green-700";
      case "calendar":
        return "bg-purple-100 text-purple-700";
      case "drive":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }
  const displayedApps = showAllApps ? appData : appData.slice(0, 4);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDD0D"), "App Analysis"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "px-2 py-1 rounded text-xs bg-blue-100 text-blue-700"
  }, appData.length, " apps")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-wrap gap-1.5 mb-3"
  }, displayedApps.map((app, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: `flex items-center gap-1.5 px-2 py-1 rounded ${getAppColor(app.name)}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, getAppIcon(app.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs font-medium capitalize"
  }, app.name)))), appData.length > 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowAllApps(!showAllApps),
    className: "text-xs text-blue-600 hover:text-blue-800"
  }, showAllApps ? "▲ Less" : `▼ +${appData.length - 4} more`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-gray-500"
  }, "\u2705 Ready to use ", appData.length, " integrated services"))));
}

/***/ }),

/***/ "../agentic_chat/src/coder_agent_output.tsx":
/*!**************************************************!*\
  !*** ../agentic_chat/src/coder_agent_output.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CoderAgentOutput; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-markdown */ "../node_modules/.pnpm/react-markdown@10.1.0_@types+react@18.3.24_react@18.3.1/node_modules/react-markdown/index.js");


function CoderAgentOutput({
  coderData
}) {
  const [showFullCode, setShowFullCode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showFullOutput, setShowFullOutput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Handle both old format (summary) and new format (execution_output)
  const {
    code = "",
    summary,
    execution_output,
    variables
  } = coderData;
  const output = execution_output || summary || "";
  function getCodeSnippet(fullCode, maxLines = 4) {
    if (!fullCode) return "";
    const lines = fullCode.split("\n");
    if (lines.length <= maxLines) return fullCode;
    return lines.slice(0, maxLines).join("\n") + "\n...";
  }
  function truncateOutput(text, maxLength = 400) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }
  const codeLines = code ? code.split("\n").length : 0;
  const outputLength = output ? output.length : 0;
  const hasVariables = variables && Object.keys(variables).length > 0;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-3xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-white rounded-lg border border-gray-200 p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "text-sm font-medium text-gray-700 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm"
  }, "\uD83D\uDCBB"), "Coder Agent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "px-2 py-1 rounded text-xs bg-purple-100 text-purple-700"
  }, output ? "Complete" : "In Progress")), code && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-600"
  }, "Code (", codeLines, " lines)"), codeLines > 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullCode(!showFullCode),
    className: "text-xs text-purple-600 hover:text-purple-800"
  }, showFullCode ? "▲ Less" : "▼ More")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-gray-900 rounded p-3",
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("pre", {
    className: "text-green-400 text-xs font-mono leading-relaxed"
  }, showFullCode ? code : getCodeSnippet(code)))), output && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-600"
  }, "Execution Output (", outputLength, " chars)"), outputLength > 400 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => setShowFullOutput(!showFullOutput),
    className: "text-xs text-green-600 hover:text-green-800"
  }, showFullOutput ? "▲ Less" : "▼ More")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-green-50 rounded p-3 border border-green-200",
    style: {
      overflowY: "auto",
      maxHeight: showFullOutput ? "none" : "300px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-green-800 leading-relaxed"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_markdown__WEBPACK_IMPORTED_MODULE_1__["default"], null, showFullOutput ? output : truncateOutput(output))))), hasVariables && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-xs text-gray-600"
  }, "Variables Created (", Object.keys(variables).length, ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-blue-50 rounded p-3 border border-blue-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-xs text-blue-800 space-y-1"
  }, Object.entries(variables).slice(0, 3).map(([key, value]) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: key,
    className: "font-mono"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "font-semibold"
  }, key), ": ", JSON.stringify(value).substring(0, 60), JSON.stringify(value).length > 60 ? '...' : '')), Object.keys(variables).length > 3 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-gray-500 italic"
  }, "+ ", Object.keys(variables).length - 3, " more...")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex gap-3 text-xs text-gray-500"
  }, code && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "\uD83D\uDCCA ", codeLines, " lines"), output && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "\uD83D\uDCDD ", outputLength, " chars"), hasVariables && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "\uD83D\uDD22 ", Object.keys(variables).length, " vars"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "\uD83C\uDFAF ", output ? "Complete" : "In Progress")))));
}

/***/ }),

/***/ "../agentic_chat/src/constants.ts":
/*!****************************************!*\
  !*** ../agentic_chat/src/constants.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_BASE_URL: function() { return /* binding */ API_BASE_URL; },
/* harmony export */   RESPONSE_USER_PROFILE: function() { return /* binding */ RESPONSE_USER_PROFILE; }
/* harmony export */ });
/* unused harmony export getApiBaseUrl */
/* harmony import */ var _carbon_ai_chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @carbon/ai-chat */ "../node_modules/.pnpm/@carbon+ai-chat@0.5.1_@carbon+icon-helpers@10.65.0_@carbon+icons@11.66.0_@carbon+react@_02e49597529a0dc24a12569b39403b32/node_modules/@carbon/ai-chat/dist/es/aiChatEntry.js");


// Declare process for webpack environment variable injection

const RESPONSE_USER_PROFILE = {
  id: "ai-chatbot-user",
  userName: "CUGA",
  fullName: "CUGA Agent",
  displayName: "CUGA",
  accountName: "CUGA Agent",
  replyToId: "ai-chatbot-user",
  userType: _carbon_ai_chat__WEBPACK_IMPORTED_MODULE_0__.UserType.BOT
};

// Get the base URL for the backend API
// In production (HF Spaces), use the current origin
// In development, use localhost with port 7860 (default port)
const getApiBaseUrl = () => {
  // If running in Hugging Face Spaces or production, use current origin
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // Check if we're on HF Spaces or not localhost
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return window.location.origin;
    }
  }

  // Default to localhost:7860 for local development
  // This can be overridden by setting REACT_APP_API_URL environment variable
  // Note: In browser, process.env is injected by webpack at build time
  if (typeof process !== 'undefined' && process?.env?.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  return 'http://localhost:7860';
};
const API_BASE_URL = getApiBaseUrl();

/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/StatusBar.css":
/*!************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/StatusBar.css ***!
  \************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".status-bar {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 42px;\n  background: #f9fafb;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 20px;\n  z-index: 900;\n  font-size: 13px;\n  color: #64748b;\n}\n\n.status-bar-left {\n  flex: 1;\n  display: flex;\n  align-items: center;\n}\n\n.status-bar-center {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  justify-content: center;\n}\n\n.status-bar-right {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.status-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  position: relative;\n}\n\n.status-label {\n  font-weight: 500;\n  color: #475569;\n}\n\n.status-badge {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  font-size: 10px;\n  font-weight: 600;\n  padding: 2px 6px;\n  border-radius: 10px;\n  min-width: 18px;\n  text-align: center;\n}\n\n.status-warning {\n  color: #f59e0b;\n  animation: pulse 2s ease-in-out infinite;\n}\n\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n\n.status-tools {\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 6px;\n  transition: background 0.2s;\n}\n\n.status-tools:hover {\n  background: #f1f5f9;\n}\n\n.tools-popup {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  width: 280px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  z-index: 1000;\n  animation: slideUp 0.2s ease;\n}\n\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.tools-popup-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 14px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n  border-radius: 8px 8px 0 0;\n  font-weight: 600;\n  font-size: 12px;\n  color: #1e293b;\n}\n\n.tools-count {\n  font-size: 11px;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n}\n\n.tools-list {\n  max-height: 240px;\n  overflow-y: auto;\n  padding: 8px;\n}\n\n.tools-empty {\n  padding: 20px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 12px;\n}\n\n.tool-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 10px;\n  border-radius: 6px;\n  margin-bottom: 4px;\n  transition: background 0.2s;\n}\n\n.tool-item:hover {\n  background: #f8fafc;\n}\n\n.tool-item.connected {\n  border-left: 2px solid #10b981;\n}\n\n.tool-item.error {\n  border-left: 2px solid #ef4444;\n}\n\n.tool-item.disconnected {\n  border-left: 2px solid #94a3b8;\n  opacity: 0.6;\n}\n\n.tool-status-indicator {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.tool-item.connected .tool-status-indicator {\n  background: #10b981;\n  box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);\n}\n\n.tool-item.error .tool-status-indicator {\n  background: #ef4444;\n  box-shadow: 0 0 6px rgba(239, 68, 68, 0.5);\n}\n\n.tool-item.disconnected .tool-status-indicator {\n  background: #94a3b8;\n}\n\n.tool-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.tool-name {\n  font-size: 12px;\n  font-weight: 600;\n  color: #1e293b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.tool-type {\n  font-size: 10px;\n  color: #94a3b8;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.tool-status-text {\n  font-size: 10px;\n  color: #64748b;\n  text-transform: capitalize;\n}\n\n.status-mode {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.mode-toggle {\n  display: flex;\n  align-items: center;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 2px;\n  cursor: pointer;\n  transition: border-color 0.2s;\n}\n\n.mode-toggle:hover {\n  border-color: #cbd5e1;\n}\n\n.mode-toggle.disabled {\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n\n.mode-toggle.disabled:hover {\n  border-color: #e5e7eb;\n}\n\n.mode-option {\n  padding: 3px 10px;\n  border-radius: 4px;\n  font-size: 11px;\n  font-weight: 500;\n  color: #64748b;\n  transition: all 0.2s;\n  user-select: none;\n}\n\n.mode-option.active {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);\n}\n\n.mode-option.disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n\n\n.status-connected {\n  color: #10b981;\n}\n\n.tools-list::-webkit-scrollbar {\n  width: 4px;\n}\n\n.tools-list::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.tools-list::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 2px;\n}\n\n.tools-list::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n/* Agent Mode Styles */\n.status-agents {\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 6px;\n  transition: background 0.2s;\n  position: relative;\n}\n\n.status-agents:hover {\n  background: #f1f5f9;\n}\n\n.agents-popup {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  width: 280px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  z-index: 1000;\n  animation: slideUp 0.2s ease;\n}\n\n.agents-popup-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 14px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n  border-radius: 8px 8px 0 0;\n  font-weight: 600;\n  font-size: 12px;\n  color: #1e293b;\n}\n\n.agents-count {\n  font-size: 11px;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n}\n\n.agents-list {\n  max-height: 240px;\n  overflow-y: auto;\n  padding: 8px;\n}\n\n.agents-empty {\n  padding: 20px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 12px;\n}\n\n.agent-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 10px;\n  border-radius: 6px;\n  margin-bottom: 4px;\n  transition: background 0.2s;\n}\n\n.agent-item:hover {\n  background: #f8fafc;\n}\n\n.agent-item.enabled {\n  border-left: 2px solid #667eea;\n}\n\n.agent-item.disabled {\n  border-left: 2px solid #94a3b8;\n  opacity: 0.6;\n}\n\n.agent-status-indicator {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.agent-item.enabled .agent-status-indicator {\n  background: #667eea;\n  box-shadow: 0 0 6px rgba(102, 126, 234, 0.5);\n}\n\n.agent-item.disabled .agent-status-indicator {\n  background: #94a3b8;\n}\n\n.agent-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.agent-name {\n  font-size: 12px;\n  font-weight: 600;\n  color: #1e293b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.agent-role {\n  font-size: 10px;\n  color: #94a3b8;\n  text-transform: capitalize;\n}\n\n.agent-status-text {\n  font-size: 10px;\n  color: #64748b;\n  text-transform: capitalize;\n}\n\n.agents-list::-webkit-scrollbar {\n  width: 4px;\n}\n\n.agents-list::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.agents-list::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 2px;\n}\n\n.agents-list::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n.agents-info-box {\n  padding: 12px 14px;\n  background: #f8fafc;\n  border-radius: 6px;\n  margin-bottom: 8px;\n}\n\n.agents-info-box.single-mode {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 24px 14px;\n  text-align: center;\n}\n\n.agents-info-label {\n  font-size: 11px;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.single-agent-icon {\n  color: #667eea;\n  margin-bottom: 4px;\n}\n\n.single-agent-label {\n  font-size: 13px;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.single-agent-description {\n  font-size: 11px;\n  color: #64748b;\n  line-height: 1.5;\n  max-width: 240px;\n}\n\n/* More Menu Styles */\n.status-more {\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 6px;\n  transition: background 0.2s;\n  position: relative;\n}\n\n.status-more:hover {\n  background: #f1f5f9;\n}\n\n.more-popup {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  width: 200px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  z-index: 1000;\n  animation: slideUp 0.2s ease;\n}\n\n.more-popup-header {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 12px 14px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n  border-radius: 8px 8px 0 0;\n  font-weight: 600;\n  font-size: 12px;\n  color: #1e293b;\n}\n\n.more-list {\n  padding: 4px 0;\n}\n\n.more-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px;\n  cursor: pointer;\n  transition: background 0.2s;\n  font-size: 12px;\n}\n\n.more-item:hover {\n  background: #f8fafc;\n}\n\n.more-item-label {\n  color: #475569;\n  font-weight: 500;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n  .status-bar {\n    padding: 0 12px;\n    height: 40px;\n    font-size: 12px;\n  }\n\n  .status-bar-center {\n    gap: 8px;\n  }\n\n  .status-item {\n    gap: 4px;\n  }\n\n  .status-label {\n    display: none;\n  }\n\n  .status-badge {\n    font-size: 9px;\n    padding: 1px 4px;\n    min-width: 16px;\n  }\n\n  .mode-option {\n    padding: 2px 8px;\n    font-size: 10px;\n  }\n}\n\n@media (max-width: 480px) {\n  .status-bar {\n    padding: 0 8px;\n  }\n\n  .status-bar-center {\n    gap: 4px;\n  }\n\n  .tools-popup,\n  .agents-popup,\n  .more-popup {\n    width: 180px;\n    max-height: 200px;\n  }\n\n  .tool-item,\n  .agent-item,\n  .more-item {\n    padding: 6px 8px;\n    font-size: 11px;\n  }\n}\n\n/* Tool grouping styles */\n.tool-group {\n  margin-bottom: 12px;\n}\n\n.tool-group:last-child {\n  margin-bottom: 0;\n}\n\n.tool-group-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 12px;\n  background: #f8fafc;\n  border-radius: 6px;\n  margin-bottom: 4px;\n  border: 1px solid #e5e7eb;\n}\n\n.tool-group-name {\n  font-size: 12px;\n  font-weight: 600;\n  color: #374151;\n  text-transform: capitalize;\n}\n\n.tool-group-stats {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n}\n\n.tool-group-count {\n  font-size: 10px;\n  color: #6b7280;\n  background: #e5e7eb;\n  padding: 2px 6px;\n  border-radius: 8px;\n  font-weight: 500;\n}\n\n.tool-group-internal {\n  font-size: 9px;\n  color: #9ca3af;\n  font-weight: 500;\n}\n\n.tool-group-items {\n  margin-left: 8px;\n}\n\n.tool-group-items .tool-item {\n  padding-left: 20px;\n  border-left: 2px solid #e5e7eb;\n  margin-bottom: 2px;\n}\n\n.tool-group-items .tool-item:last-child {\n  margin-bottom: 0;\n}\n\n/* Examples popup styles */\n.status-examples {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.status-examples:hover {\n  background: rgba(251, 191, 36, 0.1);\n}\n\n.status-examples:hover .status-label {\n  color: #f59e0b;\n}\n\n.status-examples:hover .status-badge {\n  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);\n  color: white;\n}\n\n/* Animated lightbulb when input is empty */\n.lightbulb-glow {\n  animation: lightbulbGlow 2s ease-in-out infinite;\n  color: #8b5cf6;\n}\n\n@keyframes lightbulbGlow {\n  0%, 100% {\n    color: #8b5cf6;\n    filter: drop-shadow(0 0 2px rgba(139, 92, 246, 0.4));\n    transform: scale(1);\n  }\n  50% {\n    color: #a78bfa;\n    filter: drop-shadow(0 0 4px rgba(167, 139, 250, 0.6));\n    transform: scale(1.1);\n  }\n}\n\n/* Animate the entire button when input is empty */\n.status-examples.animate-prompt {\n  animation: pulsePrompt 2s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n@keyframes pulsePrompt {\n  0%, 100% {\n    transform: scale(1);\n    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);\n    background: transparent;\n  }\n  50% {\n    transform: scale(1.02);\n    box-shadow: 0 0 8px rgba(139, 92, 246, 0.15);\n    background: rgba(139, 92, 246, 0.05);\n  }\n}\n\n/* Make the label slightly more prominent when animating */\n.status-examples.animate-prompt .status-label {\n  animation: labelPulse 2s ease-in-out infinite;\n}\n\n@keyframes labelPulse {\n  0%, 100% {\n    color: #475569;\n  }\n  50% {\n    color: #8b5cf6;\n  }\n}\n\n.examples-popup {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 0;\n  min-width: 450px;\n  max-width: 600px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\n  padding: 0;\n  z-index: 1000;\n  animation: slideUpFadeIn 0.2s ease;\n}\n\n.examples-popup-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 16px;\n  border-bottom: 1px solid #e5e7eb;\n  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);\n  border-radius: 12px 12px 0 0;\n}\n\n.examples-popup-header span:first-child {\n  font-weight: 600;\n  font-size: 13px;\n  color: #92400e;\n}\n\n.examples-count {\n  font-size: 11px;\n  padding: 3px 8px;\n  background: rgba(146, 64, 14, 0.1);\n  border-radius: 12px;\n  color: #92400e;\n  font-weight: 600;\n}\n\n.examples-list {\n  padding: 8px;\n  max-height: 400px;\n  overflow-y: auto;\n}\n\n.example-item {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  margin-bottom: 4px;\n  border: 1px solid transparent;\n}\n\n.example-item:hover {\n  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\n  border-color: #fbbf24;\n  transform: translateX(4px);\n}\n\n.example-icon {\n  flex-shrink: 0;\n  margin-top: 2px;\n  color: #f59e0b;\n}\n\n.example-item:hover .example-icon {\n  color: #d97706;\n}\n\n.example-text {\n  font-size: 13px;\n  color: #475569;\n  line-height: 1.5;\n  font-weight: 500;\n}\n\n.example-item:hover .example-text {\n  color: #1e293b;\n}\n\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/StatusBar.css"],"names":[],"mappings":"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","sourcesContent":[".status-bar {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 42px;\n  background: #f9fafb;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 20px;\n  z-index: 900;\n  font-size: 13px;\n  color: #64748b;\n}\n\n.status-bar-left {\n  flex: 1;\n  display: flex;\n  align-items: center;\n}\n\n.status-bar-center {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  justify-content: center;\n}\n\n.status-bar-right {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.status-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  position: relative;\n}\n\n.status-label {\n  font-weight: 500;\n  color: #475569;\n}\n\n.status-badge {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  font-size: 10px;\n  font-weight: 600;\n  padding: 2px 6px;\n  border-radius: 10px;\n  min-width: 18px;\n  text-align: center;\n}\n\n.status-warning {\n  color: #f59e0b;\n  animation: pulse 2s ease-in-out infinite;\n}\n\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n\n.status-tools {\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 6px;\n  transition: background 0.2s;\n}\n\n.status-tools:hover {\n  background: #f1f5f9;\n}\n\n.tools-popup {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  width: 280px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  z-index: 1000;\n  animation: slideUp 0.2s ease;\n}\n\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.tools-popup-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 14px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n  border-radius: 8px 8px 0 0;\n  font-weight: 600;\n  font-size: 12px;\n  color: #1e293b;\n}\n\n.tools-count {\n  font-size: 11px;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n}\n\n.tools-list {\n  max-height: 240px;\n  overflow-y: auto;\n  padding: 8px;\n}\n\n.tools-empty {\n  padding: 20px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 12px;\n}\n\n.tool-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 10px;\n  border-radius: 6px;\n  margin-bottom: 4px;\n  transition: background 0.2s;\n}\n\n.tool-item:hover {\n  background: #f8fafc;\n}\n\n.tool-item.connected {\n  border-left: 2px solid #10b981;\n}\n\n.tool-item.error {\n  border-left: 2px solid #ef4444;\n}\n\n.tool-item.disconnected {\n  border-left: 2px solid #94a3b8;\n  opacity: 0.6;\n}\n\n.tool-status-indicator {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.tool-item.connected .tool-status-indicator {\n  background: #10b981;\n  box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);\n}\n\n.tool-item.error .tool-status-indicator {\n  background: #ef4444;\n  box-shadow: 0 0 6px rgba(239, 68, 68, 0.5);\n}\n\n.tool-item.disconnected .tool-status-indicator {\n  background: #94a3b8;\n}\n\n.tool-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.tool-name {\n  font-size: 12px;\n  font-weight: 600;\n  color: #1e293b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.tool-type {\n  font-size: 10px;\n  color: #94a3b8;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.tool-status-text {\n  font-size: 10px;\n  color: #64748b;\n  text-transform: capitalize;\n}\n\n.status-mode {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.mode-toggle {\n  display: flex;\n  align-items: center;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 2px;\n  cursor: pointer;\n  transition: border-color 0.2s;\n}\n\n.mode-toggle:hover {\n  border-color: #cbd5e1;\n}\n\n.mode-toggle.disabled {\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n\n.mode-toggle.disabled:hover {\n  border-color: #e5e7eb;\n}\n\n.mode-option {\n  padding: 3px 10px;\n  border-radius: 4px;\n  font-size: 11px;\n  font-weight: 500;\n  color: #64748b;\n  transition: all 0.2s;\n  user-select: none;\n}\n\n.mode-option.active {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);\n}\n\n.mode-option.disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n\n\n.status-connected {\n  color: #10b981;\n}\n\n.tools-list::-webkit-scrollbar {\n  width: 4px;\n}\n\n.tools-list::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.tools-list::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 2px;\n}\n\n.tools-list::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n/* Agent Mode Styles */\n.status-agents {\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 6px;\n  transition: background 0.2s;\n  position: relative;\n}\n\n.status-agents:hover {\n  background: #f1f5f9;\n}\n\n.agents-popup {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  width: 280px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  z-index: 1000;\n  animation: slideUp 0.2s ease;\n}\n\n.agents-popup-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 14px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n  border-radius: 8px 8px 0 0;\n  font-weight: 600;\n  font-size: 12px;\n  color: #1e293b;\n}\n\n.agents-count {\n  font-size: 11px;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n}\n\n.agents-list {\n  max-height: 240px;\n  overflow-y: auto;\n  padding: 8px;\n}\n\n.agents-empty {\n  padding: 20px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 12px;\n}\n\n.agent-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 10px;\n  border-radius: 6px;\n  margin-bottom: 4px;\n  transition: background 0.2s;\n}\n\n.agent-item:hover {\n  background: #f8fafc;\n}\n\n.agent-item.enabled {\n  border-left: 2px solid #667eea;\n}\n\n.agent-item.disabled {\n  border-left: 2px solid #94a3b8;\n  opacity: 0.6;\n}\n\n.agent-status-indicator {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.agent-item.enabled .agent-status-indicator {\n  background: #667eea;\n  box-shadow: 0 0 6px rgba(102, 126, 234, 0.5);\n}\n\n.agent-item.disabled .agent-status-indicator {\n  background: #94a3b8;\n}\n\n.agent-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.agent-name {\n  font-size: 12px;\n  font-weight: 600;\n  color: #1e293b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.agent-role {\n  font-size: 10px;\n  color: #94a3b8;\n  text-transform: capitalize;\n}\n\n.agent-status-text {\n  font-size: 10px;\n  color: #64748b;\n  text-transform: capitalize;\n}\n\n.agents-list::-webkit-scrollbar {\n  width: 4px;\n}\n\n.agents-list::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.agents-list::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 2px;\n}\n\n.agents-list::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n.agents-info-box {\n  padding: 12px 14px;\n  background: #f8fafc;\n  border-radius: 6px;\n  margin-bottom: 8px;\n}\n\n.agents-info-box.single-mode {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 24px 14px;\n  text-align: center;\n}\n\n.agents-info-label {\n  font-size: 11px;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.single-agent-icon {\n  color: #667eea;\n  margin-bottom: 4px;\n}\n\n.single-agent-label {\n  font-size: 13px;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.single-agent-description {\n  font-size: 11px;\n  color: #64748b;\n  line-height: 1.5;\n  max-width: 240px;\n}\n\n/* More Menu Styles */\n.status-more {\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 6px;\n  transition: background 0.2s;\n  position: relative;\n}\n\n.status-more:hover {\n  background: #f1f5f9;\n}\n\n.more-popup {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  width: 200px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  z-index: 1000;\n  animation: slideUp 0.2s ease;\n}\n\n.more-popup-header {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 12px 14px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n  border-radius: 8px 8px 0 0;\n  font-weight: 600;\n  font-size: 12px;\n  color: #1e293b;\n}\n\n.more-list {\n  padding: 4px 0;\n}\n\n.more-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px;\n  cursor: pointer;\n  transition: background 0.2s;\n  font-size: 12px;\n}\n\n.more-item:hover {\n  background: #f8fafc;\n}\n\n.more-item-label {\n  color: #475569;\n  font-weight: 500;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n  .status-bar {\n    padding: 0 12px;\n    height: 40px;\n    font-size: 12px;\n  }\n\n  .status-bar-center {\n    gap: 8px;\n  }\n\n  .status-item {\n    gap: 4px;\n  }\n\n  .status-label {\n    display: none;\n  }\n\n  .status-badge {\n    font-size: 9px;\n    padding: 1px 4px;\n    min-width: 16px;\n  }\n\n  .mode-option {\n    padding: 2px 8px;\n    font-size: 10px;\n  }\n}\n\n@media (max-width: 480px) {\n  .status-bar {\n    padding: 0 8px;\n  }\n\n  .status-bar-center {\n    gap: 4px;\n  }\n\n  .tools-popup,\n  .agents-popup,\n  .more-popup {\n    width: 180px;\n    max-height: 200px;\n  }\n\n  .tool-item,\n  .agent-item,\n  .more-item {\n    padding: 6px 8px;\n    font-size: 11px;\n  }\n}\n\n/* Tool grouping styles */\n.tool-group {\n  margin-bottom: 12px;\n}\n\n.tool-group:last-child {\n  margin-bottom: 0;\n}\n\n.tool-group-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 12px;\n  background: #f8fafc;\n  border-radius: 6px;\n  margin-bottom: 4px;\n  border: 1px solid #e5e7eb;\n}\n\n.tool-group-name {\n  font-size: 12px;\n  font-weight: 600;\n  color: #374151;\n  text-transform: capitalize;\n}\n\n.tool-group-stats {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n}\n\n.tool-group-count {\n  font-size: 10px;\n  color: #6b7280;\n  background: #e5e7eb;\n  padding: 2px 6px;\n  border-radius: 8px;\n  font-weight: 500;\n}\n\n.tool-group-internal {\n  font-size: 9px;\n  color: #9ca3af;\n  font-weight: 500;\n}\n\n.tool-group-items {\n  margin-left: 8px;\n}\n\n.tool-group-items .tool-item {\n  padding-left: 20px;\n  border-left: 2px solid #e5e7eb;\n  margin-bottom: 2px;\n}\n\n.tool-group-items .tool-item:last-child {\n  margin-bottom: 0;\n}\n\n/* Examples popup styles */\n.status-examples {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.status-examples:hover {\n  background: rgba(251, 191, 36, 0.1);\n}\n\n.status-examples:hover .status-label {\n  color: #f59e0b;\n}\n\n.status-examples:hover .status-badge {\n  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);\n  color: white;\n}\n\n/* Animated lightbulb when input is empty */\n.lightbulb-glow {\n  animation: lightbulbGlow 2s ease-in-out infinite;\n  color: #8b5cf6;\n}\n\n@keyframes lightbulbGlow {\n  0%, 100% {\n    color: #8b5cf6;\n    filter: drop-shadow(0 0 2px rgba(139, 92, 246, 0.4));\n    transform: scale(1);\n  }\n  50% {\n    color: #a78bfa;\n    filter: drop-shadow(0 0 4px rgba(167, 139, 250, 0.6));\n    transform: scale(1.1);\n  }\n}\n\n/* Animate the entire button when input is empty */\n.status-examples.animate-prompt {\n  animation: pulsePrompt 2s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n@keyframes pulsePrompt {\n  0%, 100% {\n    transform: scale(1);\n    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);\n    background: transparent;\n  }\n  50% {\n    transform: scale(1.02);\n    box-shadow: 0 0 8px rgba(139, 92, 246, 0.15);\n    background: rgba(139, 92, 246, 0.05);\n  }\n}\n\n/* Make the label slightly more prominent when animating */\n.status-examples.animate-prompt .status-label {\n  animation: labelPulse 2s ease-in-out infinite;\n}\n\n@keyframes labelPulse {\n  0%, 100% {\n    color: #475569;\n  }\n  50% {\n    color: #8b5cf6;\n  }\n}\n\n.examples-popup {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 0;\n  min-width: 450px;\n  max-width: 600px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\n  padding: 0;\n  z-index: 1000;\n  animation: slideUpFadeIn 0.2s ease;\n}\n\n.examples-popup-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 16px;\n  border-bottom: 1px solid #e5e7eb;\n  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);\n  border-radius: 12px 12px 0 0;\n}\n\n.examples-popup-header span:first-child {\n  font-weight: 600;\n  font-size: 13px;\n  color: #92400e;\n}\n\n.examples-count {\n  font-size: 11px;\n  padding: 3px 8px;\n  background: rgba(146, 64, 14, 0.1);\n  border-radius: 12px;\n  color: #92400e;\n  font-weight: 600;\n}\n\n.examples-list {\n  padding: 8px;\n  max-height: 400px;\n  overflow-y: auto;\n}\n\n.example-item {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  margin-bottom: 4px;\n  border: 1px solid transparent;\n}\n\n.example-item:hover {\n  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\n  border-color: #fbbf24;\n  transform: translateX(4px);\n}\n\n.example-icon {\n  flex-shrink: 0;\n  margin-top: 2px;\n  color: #f59e0b;\n}\n\n.example-item:hover .example-icon {\n  color: #d97706;\n}\n\n.example-text {\n  font-size: 13px;\n  color: #475569;\n  line-height: 1.5;\n  font-weight: 500;\n}\n\n.example-item:hover .example-text {\n  color: #1e293b;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablePopup.css":
/*!****************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablePopup.css ***!
  \****************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".variable-popup-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 10000;\n  animation: fadeIn 0.2s ease-in-out;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.variable-popup-content {\n  background: white;\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  animation: slideUp 0.3s ease-out;\n}\n\n@keyframes slideUp {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.variable-popup-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.variable-popup-header h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.variable-popup-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.variable-popup-download-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: #4e00ec;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.variable-popup-download-btn:hover {\n  background: #3d00b8;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(78, 0, 236, 0.3);\n}\n\n.variable-popup-download-btn:active {\n  transform: translateY(0);\n}\n\n.variable-popup-close-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  font-size: 28px;\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 6px;\n  transition: all 0.2s;\n  line-height: 1;\n}\n\n.variable-popup-close-btn:hover {\n  background: #f1f5f9;\n  color: #1e293b;\n}\n\n.variable-popup-body {\n  padding: 24px;\n  overflow-y: auto;\n  flex: 1;\n}\n\n.variable-popup-body h2 {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.variable-popup-body p {\n  margin: 8px 0;\n  color: #475569;\n  line-height: 1.6;\n}\n\n.variable-popup-body strong {\n  color: #1e293b;\n  font-weight: 600;\n}\n\n.variable-popup-body code {\n  background: #f1f5f9;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 13px;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  color: #4e00ec;\n}\n\n.variable-popup-body pre {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 16px;\n  overflow-x: auto;\n  margin: 12px 0;\n}\n\n.variable-popup-body pre code {\n  background: transparent;\n  padding: 0;\n  color: #334155;\n  font-size: 13px;\n  line-height: 1.5;\n}\n\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/VariablePopup.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,8BAA8B;EAC9B,cAAc;EACd,kCAAkC;AACpC;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE,iBAAiB;EACjB,WAAW;EACX,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,gCAAgC;AAClC;;AAEA;EACE;IACE,2BAA2B;IAC3B,UAAU;EACZ;EACA;IACE,wBAAwB;IACxB,UAAU;EACZ;AACF;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,gCAAgC;AAClC;;AAEA;EACE,SAAS;EACT,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,2BAA2B;EAC3B,4CAA4C;AAC9C;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,uBAAuB;EACvB,YAAY;EACZ,eAAe;EACf,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,oBAAoB;EACpB,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,OAAO;AACT;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,wDAAwD;EACxD,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;EACb,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,uBAAuB;EACvB,UAAU;EACV,cAAc;EACd,eAAe;EACf,gBAAgB;AAClB","sourcesContent":[".variable-popup-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 10000;\n  animation: fadeIn 0.2s ease-in-out;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.variable-popup-content {\n  background: white;\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  animation: slideUp 0.3s ease-out;\n}\n\n@keyframes slideUp {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.variable-popup-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.variable-popup-header h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.variable-popup-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.variable-popup-download-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: #4e00ec;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.variable-popup-download-btn:hover {\n  background: #3d00b8;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(78, 0, 236, 0.3);\n}\n\n.variable-popup-download-btn:active {\n  transform: translateY(0);\n}\n\n.variable-popup-close-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  font-size: 28px;\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 6px;\n  transition: all 0.2s;\n  line-height: 1;\n}\n\n.variable-popup-close-btn:hover {\n  background: #f1f5f9;\n  color: #1e293b;\n}\n\n.variable-popup-body {\n  padding: 24px;\n  overflow-y: auto;\n  flex: 1;\n}\n\n.variable-popup-body h2 {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.variable-popup-body p {\n  margin: 8px 0;\n  color: #475569;\n  line-height: 1.6;\n}\n\n.variable-popup-body strong {\n  color: #1e293b;\n  font-weight: 600;\n}\n\n.variable-popup-body code {\n  background: #f1f5f9;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 13px;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  color: #4e00ec;\n}\n\n.variable-popup-body pre {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 16px;\n  overflow-x: auto;\n  margin: 12px 0;\n}\n\n.variable-popup-body pre code {\n  background: transparent;\n  padding: 0;\n  color: #334155;\n  font-size: 13px;\n  line-height: 1.5;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablesSidebar.css":
/*!*******************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablesSidebar.css ***!
  \*******************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Ensure sidebar is fixed from the very left edge */\n.variables-sidebar {\n  position: fixed !important;\n  left: 0 !important;\n  top: 0;\n  bottom: 0;\n  background: white;\n  border-right: 1px solid #e5e7eb;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  transition: width 0.3s ease, transform 0.3s ease;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);\n  margin: 0;\n  padding: 0;\n}\n\n.variables-sidebar.expanded {\n  width: 320px;\n}\n\n.variables-sidebar.collapsed {\n  /* When collapsed, slide it completely out of view */\n  transform: translateX(-100%);\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n  .variables-sidebar.expanded {\n    width: 280px;\n  }\n}\n\n@media (max-width: 640px) {\n  .variables-sidebar.expanded {\n    width: 100%;\n    max-width: 300px;\n  }\n  \n  .variables-sidebar.collapsed {\n    transform: translateX(-100%);\n  }\n}\n\n.variables-sidebar-header {\n  display: flex;\n  align-items: center;\n  padding: 16px;\n  border-bottom: 1px solid #e5e7eb;\n  gap: 12px;\n  min-height: 64px;\n  flex-wrap: wrap;\n}\n\n.variables-sidebar-toggle {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  cursor: pointer;\n  color: #64748b;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n\n.variables-sidebar-toggle:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #4e00ec;\n}\n\n.variables-sidebar.collapsed .variables-sidebar-toggle {\n  margin: 0 auto;\n}\n\n.variables-sidebar-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 16px;\n  font-weight: 600;\n  color: #1e293b;\n  flex: 1;\n}\n\n.variables-sidebar-title svg {\n  color: #4e00ec;\n}\n\n.variables-count {\n  background: #4e00ec;\n  color: white;\n  font-size: 12px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 12px;\n  margin-left: auto;\n}\n\n.variables-history-select {\n  width: 100%;\n  padding: 6px 10px;\n  font-size: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background: white;\n  color: #1e293b;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-top: 8px;\n}\n\n.variables-history-select:hover {\n  border-color: #cbd5e1;\n  background: #f8fafc;\n}\n\n.variables-history-select:focus {\n  outline: none;\n  border-color: #4e00ec;\n  box-shadow: 0 0 0 3px rgba(78, 0, 236, 0.1);\n}\n\n.variables-history-info {\n  padding: 10px 12px;\n  background: #f8fafc;\n  border-bottom: 1px solid #e5e7eb;\n  font-size: 12px;\n  color: #64748b;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.history-count {\n  font-weight: 600;\n  color: #4e00ec;\n}\n\n.variables-sidebar-content {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.variables-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px;\n}\n\n.variable-item {\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.variable-item:hover {\n  background: #f1f5f9;\n  border-color: #cbd5e1;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(78, 0, 236, 0.1);\n}\n\n.variable-item:active {\n  transform: translateY(0);\n}\n\n.variable-item-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n\n.variable-name {\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  font-size: 13px;\n  font-weight: 600;\n  color: #4e00ec;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5dbff;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.variable-type {\n  font-size: 11px;\n  font-weight: 500;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n\n.variable-description {\n  font-size: 12px;\n  color: #64748b;\n  line-height: 1.4;\n  margin-bottom: 6px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.variable-meta {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n\n.variable-count {\n  font-size: 11px;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n}\n\n.variable-preview {\n  font-size: 12px;\n  color: #475569;\n  background: white;\n  padding: 6px 8px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  line-height: 1.4;\n}\n\n/* Scrollbar styling */\n.variables-sidebar-content::-webkit-scrollbar {\n  width: 6px;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 3px;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n/* Animation */\n@keyframes slideIn {\n  from {\n    transform: translateX(-100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n\n.variables-sidebar {\n  animation: slideIn 0.3s ease-out;\n}\n\n/* Floating toggle button when sidebar is collapsed */\n.variables-sidebar-floating-toggle {\n  position: fixed;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 64px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-left: none;\n  border-radius: 0 8px 8px 0;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  z-index: 999;\n  transition: all 0.2s;\n  color: #64748b;\n}\n\n.variables-sidebar-floating-toggle:hover {\n  background: #f8fafc;\n  color: #4e00ec;\n  box-shadow: 2px 0 12px rgba(78, 0, 236, 0.2);\n}\n\n.variables-floating-count {\n  font-size: 11px;\n  font-weight: 600;\n  background: #4e00ec;\n  color: white;\n  padding: 2px 6px;\n  border-radius: 10px;\n  min-width: 20px;\n  text-align: center;\n}\n\n.no-variables-message {\n  padding: 24px 16px;\n  text-align: center;\n  color: #64748b;\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  margin: 12px;\n}\n\n.no-variables-message p {\n  margin: 0 0 8px 0;\n  font-size: 14px;\n}\n\n.no-variables-message p:last-child {\n  margin-bottom: 0;\n  font-size: 12px;\n  color: #94a3b8;\n}\n\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/VariablesSidebar.css"],"names":[],"mappings":"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","sourcesContent":["/* Ensure sidebar is fixed from the very left edge */\n.variables-sidebar {\n  position: fixed !important;\n  left: 0 !important;\n  top: 0;\n  bottom: 0;\n  background: white;\n  border-right: 1px solid #e5e7eb;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  transition: width 0.3s ease, transform 0.3s ease;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);\n  margin: 0;\n  padding: 0;\n}\n\n.variables-sidebar.expanded {\n  width: 320px;\n}\n\n.variables-sidebar.collapsed {\n  /* When collapsed, slide it completely out of view */\n  transform: translateX(-100%);\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n  .variables-sidebar.expanded {\n    width: 280px;\n  }\n}\n\n@media (max-width: 640px) {\n  .variables-sidebar.expanded {\n    width: 100%;\n    max-width: 300px;\n  }\n  \n  .variables-sidebar.collapsed {\n    transform: translateX(-100%);\n  }\n}\n\n.variables-sidebar-header {\n  display: flex;\n  align-items: center;\n  padding: 16px;\n  border-bottom: 1px solid #e5e7eb;\n  gap: 12px;\n  min-height: 64px;\n  flex-wrap: wrap;\n}\n\n.variables-sidebar-toggle {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  cursor: pointer;\n  color: #64748b;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n\n.variables-sidebar-toggle:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #4e00ec;\n}\n\n.variables-sidebar.collapsed .variables-sidebar-toggle {\n  margin: 0 auto;\n}\n\n.variables-sidebar-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 16px;\n  font-weight: 600;\n  color: #1e293b;\n  flex: 1;\n}\n\n.variables-sidebar-title svg {\n  color: #4e00ec;\n}\n\n.variables-count {\n  background: #4e00ec;\n  color: white;\n  font-size: 12px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 12px;\n  margin-left: auto;\n}\n\n.variables-history-select {\n  width: 100%;\n  padding: 6px 10px;\n  font-size: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background: white;\n  color: #1e293b;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-top: 8px;\n}\n\n.variables-history-select:hover {\n  border-color: #cbd5e1;\n  background: #f8fafc;\n}\n\n.variables-history-select:focus {\n  outline: none;\n  border-color: #4e00ec;\n  box-shadow: 0 0 0 3px rgba(78, 0, 236, 0.1);\n}\n\n.variables-history-info {\n  padding: 10px 12px;\n  background: #f8fafc;\n  border-bottom: 1px solid #e5e7eb;\n  font-size: 12px;\n  color: #64748b;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.history-count {\n  font-weight: 600;\n  color: #4e00ec;\n}\n\n.variables-sidebar-content {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.variables-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px;\n}\n\n.variable-item {\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.variable-item:hover {\n  background: #f1f5f9;\n  border-color: #cbd5e1;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(78, 0, 236, 0.1);\n}\n\n.variable-item:active {\n  transform: translateY(0);\n}\n\n.variable-item-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n\n.variable-name {\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  font-size: 13px;\n  font-weight: 600;\n  color: #4e00ec;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5dbff;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.variable-type {\n  font-size: 11px;\n  font-weight: 500;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n\n.variable-description {\n  font-size: 12px;\n  color: #64748b;\n  line-height: 1.4;\n  margin-bottom: 6px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.variable-meta {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n\n.variable-count {\n  font-size: 11px;\n  color: #64748b;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n}\n\n.variable-preview {\n  font-size: 12px;\n  color: #475569;\n  background: white;\n  padding: 6px 8px;\n  border-radius: 4px;\n  border: 1px solid #e5e7eb;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  line-height: 1.4;\n}\n\n/* Scrollbar styling */\n.variables-sidebar-content::-webkit-scrollbar {\n  width: 6px;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 3px;\n}\n\n.variables-sidebar-content::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n/* Animation */\n@keyframes slideIn {\n  from {\n    transform: translateX(-100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n\n.variables-sidebar {\n  animation: slideIn 0.3s ease-out;\n}\n\n/* Floating toggle button when sidebar is collapsed */\n.variables-sidebar-floating-toggle {\n  position: fixed;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 64px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-left: none;\n  border-radius: 0 8px 8px 0;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  z-index: 999;\n  transition: all 0.2s;\n  color: #64748b;\n}\n\n.variables-sidebar-floating-toggle:hover {\n  background: #f8fafc;\n  color: #4e00ec;\n  box-shadow: 2px 0 12px rgba(78, 0, 236, 0.2);\n}\n\n.variables-floating-count {\n  font-size: 11px;\n  font-weight: 600;\n  background: #4e00ec;\n  color: white;\n  padding: 2px 6px;\n  border-radius: 10px;\n  min-width: 20px;\n  text-align: center;\n}\n\n.no-variables-message {\n  padding: 24px 16px;\n  text-align: center;\n  color: #64748b;\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  margin: 12px;\n}\n\n.no-variables-message p {\n  margin: 0 0 8px 0;\n  font-size: 14px;\n}\n\n.no-variables-message p:last-child {\n  margin-bottom: 0;\n  font-size: 12px;\n  color: #94a3b8;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/WorkspacePanel.css":
/*!*****************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/WorkspacePanel.css ***!
  \*****************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".workspace-panel {\n  position: fixed;\n  top: 48px;\n  right: 0;\n  bottom: 32px;\n  width: 300px;\n  background: white;\n  border-left: 1px solid #e5e7eb;\n  display: flex;\n  flex-direction: column;\n  z-index: 800;\n  transition: transform 0.3s ease;\n  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);\n}\n\n.workspace-panel.closed {\n  transform: translateX(100%);\n}\n\n.workspace-panel.open {\n  transform: translateX(0);\n}\n\n.workspace-panel-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 16px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n}\n\n.workspace-panel-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  color: #1f2937;\n  flex: 1;\n}\n\n.workspace-info-tooltip-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  margin-left: 8px;\n  cursor: help;\n}\n\n.workspace-info-tooltip-wrapper .info-icon {\n  color: #94a3b8;\n  cursor: help;\n  transition: color 0.2s ease;\n  pointer-events: auto;\n}\n\n.workspace-info-tooltip-wrapper:hover .info-icon {\n  color: #667eea;\n}\n\n.workspace-info-tooltip {\n  position: fixed;\n  top: 60px;\n  right: 20px;\n  width: 320px;\n  max-width: calc(100vw - 40px);\n  padding: 14px 16px;\n  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);\n  border: 2px solid #e0e7ff;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15);\n  font-size: 13px;\n  line-height: 1.6;\n  color: #334155;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;\n  z-index: 9999;\n  pointer-events: none;\n  font-weight: 500;\n  transform-origin: top right;\n  white-space: normal;\n  word-wrap: break-word;\n  word-break: break-word;\n  overflow-wrap: break-word;\n  hyphens: auto;\n}\n\n.workspace-info-tooltip code {\n  background: #e0e7ff;\n  color: #4f46e5;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;\n  font-size: 12px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.workspace-info-tooltip-wrapper:hover .workspace-info-tooltip {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  transform: translateY(2px);\n}\n\n.workspace-panel-actions {\n  display: flex;\n  gap: 4px;\n}\n\n.workspace-refresh-btn,\n.workspace-close-btn {\n  background: none;\n  border: none;\n  color: #6b7280;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  transition: all 0.2s;\n}\n\n.workspace-refresh-btn:hover,\n.workspace-close-btn:hover {\n  background: #e5e7eb;\n  color: #1f2937;\n}\n\n.workspace-panel-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 12px;\n}\n\n.workspace-error {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 16px;\n  text-align: center;\n  color: #ef4444;\n}\n\n.workspace-error button {\n  margin-top: 12px;\n  padding: 6px 16px;\n  background: #ef4444;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 13px;\n}\n\n.workspace-error button:hover {\n  background: #dc2626;\n}\n\n.workspace-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 48px 16px;\n  text-align: center;\n  color: #9ca3af;\n}\n\n.workspace-empty .empty-icon {\n  opacity: 0.3;\n  margin-bottom: 16px;\n}\n\n.workspace-empty p {\n  font-size: 14px;\n  font-weight: 500;\n  margin: 0 0 8px 0;\n  color: #6b7280;\n}\n\n.workspace-empty small {\n  font-size: 12px;\n  color: #9ca3af;\n}\n\n.file-tree {\n  font-size: 13px;\n}\n\n.file-tree-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 8px;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: background 0.2s;\n  position: relative;\n  user-select: none;\n}\n\n.file-tree-item:hover {\n  background: #f3f4f6;\n}\n\n.file-tree-item.highlighted {\n  background: #dbeafe !important;\n  border: 1px solid #3b82f6;\n  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.3);\n}\n\n.file-tree-item.directory {\n  font-weight: 500;\n  color: #374151;\n}\n\n.file-tree-item.file {\n  color: #6b7280;\n}\n\n.folder-icon {\n  flex-shrink: 0;\n  color: #9ca3af;\n}\n\n.folder-icon-spacer {\n  width: 16px;\n  flex-shrink: 0;\n}\n\n.item-icon {\n  flex-shrink: 0;\n  color: #667eea;\n}\n\n.file-tree-item.file .item-icon {\n  color: #94a3b8;\n}\n\n.item-name {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.download-icon-btn {\n  background: none;\n  border: none;\n  color: #9ca3af;\n  cursor: pointer;\n  padding: 2px;\n  border-radius: 3px;\n  display: flex;\n  align-items: center;\n  opacity: 0;\n  transition: all 0.2s;\n}\n\n.file-tree-item:hover .download-icon-btn {\n  opacity: 1;\n}\n\n.download-icon-btn:hover {\n  background: #e5e7eb;\n  color: #667eea;\n}\n\n.folder-children {\n  margin-top: 2px;\n}\n\n.workspace-toggle-btn {\n  position: fixed;\n  top: 60px;\n  right: 16px;\n  width: 40px;\n  height: 40px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  z-index: 750;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s;\n  color: #667eea;\n}\n\n.workspace-toggle-btn:hover {\n  background: #f9fafb;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transform: translateY(-1px);\n}\n\n/* File Viewer Modal */\n.file-viewer-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1100;\n  animation: fadeIn 0.2s ease;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.file-viewer-modal {\n  background: white;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 800px;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  animation: slideUp 0.3s ease;\n}\n\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.file-viewer-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n  border-radius: 12px 12px 0 0;\n}\n\n.file-viewer-title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 15px;\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.file-viewer-title svg {\n  color: #667eea;\n}\n\n.file-viewer-actions {\n  display: flex;\n  gap: 8px;\n}\n\n.file-viewer-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  background: #667eea;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.file-viewer-btn:hover {\n  background: #5568d3;\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n}\n\n.file-viewer-close {\n  background: none;\n  border: none;\n  color: #6b7280;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  transition: all 0.2s;\n}\n\n.file-viewer-close:hover {\n  background: #e5e7eb;\n  color: #1f2937;\n}\n\n.file-viewer-content {\n  flex: 1;\n  overflow: auto;\n  padding: 20px;\n  background: #fafafa;\n}\n\n.file-viewer-content pre {\n  margin: 0;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;\n  font-size: 13px;\n  line-height: 1.6;\n  color: #1f2937;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n\n.workspace-loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1050;\n}\n\n.workspace-spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.workspace-panel-content::-webkit-scrollbar {\n  width: 6px;\n}\n\n.workspace-panel-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.workspace-panel-content::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 3px;\n}\n\n.workspace-panel-content::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n.file-viewer-content::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n\n.file-viewer-content::-webkit-scrollbar-track {\n  background: #f1f5f9;\n}\n\n.file-viewer-content::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n\n.file-viewer-content::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n/* Delete functionality styles */\n.file-actions {\n  display: flex;\n  gap: 4px;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n\n.file-tree-item:hover .file-actions {\n  opacity: 1;\n}\n\n.delete-icon-btn {\n  background: none;\n  border: none;\n  padding: 2px;\n  border-radius: 3px;\n  color: #6b7280;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n}\n\n.delete-icon-btn:hover {\n  background: #fee2e2;\n  color: #dc2626;\n}\n\n.delete-confirmation-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n\n.delete-confirmation-modal {\n  background: white;\n  border-radius: 8px;\n  padding: 0;\n  max-width: 400px;\n  width: 90%;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\n}\n\n.delete-confirmation-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px 20px 16px 20px;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.delete-confirmation-header h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.delete-icon {\n  color: #dc2626;\n}\n\n.delete-confirmation-content {\n  padding: 16px 20px;\n}\n\n.delete-confirmation-content p {\n  margin: 0 0 8px 0;\n  color: #374151;\n  font-size: 14px;\n}\n\n.delete-warning {\n  color: #dc2626;\n  font-weight: 500;\n}\n\n.delete-confirmation-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  padding: 16px 20px 20px 20px;\n  border-top: 1px solid #e5e7eb;\n}\n\n.delete-cancel-btn {\n  padding: 8px 16px;\n  border: 1px solid #d1d5db;\n  background: white;\n  color: #374151;\n  border-radius: 6px;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.delete-cancel-btn:hover:not(:disabled) {\n  background: #f9fafb;\n  border-color: #9ca3af;\n}\n\n.delete-confirm-btn {\n  padding: 8px 16px;\n  border: none;\n  background: #dc2626;\n  color: white;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.delete-confirm-btn:hover:not(:disabled) {\n  background: #b91c1c;\n}\n\n.delete-cancel-btn:disabled,\n.delete-confirm-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n/* Drag and drop styles */\n.workspace-panel.drag-over {\n  border-color: #667eea;\n  box-shadow: -2px 0 12px rgba(102, 126, 234, 0.3);\n}\n\n.workspace-drag-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(102, 126, 234, 0.1);\n  border: 2px dashed #667eea;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  pointer-events: none;\n}\n\n.workspace-drag-content {\n  text-align: center;\n  color: #667eea;\n}\n\n.workspace-drag-icon {\n  font-size: 48px;\n  margin-bottom: 12px;\n  animation: bounce 1s infinite;\n}\n\n.workspace-drag-text {\n  font-size: 16px;\n  font-weight: 600;\n  color: #667eea;\n}\n\n@keyframes bounce {\n  0%, 20%, 50%, 80%, 100% {\n    transform: translateY(0);\n  }\n  40% {\n    transform: translateY(-10px);\n  }\n  60% {\n    transform: translateY(-5px);\n  }\n}\n\n\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/WorkspacePanel.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,SAAS;EACT,QAAQ;EACR,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,8BAA8B;EAC9B,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,+BAA+B;EAC/B,0CAA0C;AAC5C;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,gCAAgC;EAChC,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,OAAO;AACT;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,2BAA2B;EAC3B,oBAAoB;AACtB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,SAAS;EACT,WAAW;EACX,YAAY;EACZ,6BAA6B;EAC7B,kBAAkB;EAClB,6DAA6D;EAC7D,yBAAyB;EACzB,mBAAmB;EACnB,gFAAgF;EAChF,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,UAAU;EACV,kBAAkB;EAClB,wEAAwE;EACxE,aAAa;EACb,oBAAoB;EACpB,gBAAgB;EAChB,2BAA2B;EAC3B,mBAAmB;EACnB,qBAAqB;EACrB,sBAAsB;EACtB,yBAAyB;EACzB,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,cAAc;EACd,gBAAgB;EAChB,kBAAkB;EAClB,oEAAoE;EACpE,eAAe;EACf,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;EACpB,0BAA0B;AAC5B;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;;EAEE,gBAAgB;EAChB,YAAY;EACZ,cAAc;EACd,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;;EAEE,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,gBAAgB;EAChB,eAAe;EACf,kBAAkB;EAClB,2BAA2B;EAC3B,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,8BAA8B;EAC9B,yBAAyB;EACzB,6CAA6C;AAC/C;;AAEA;EACE,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,cAAc;EACd,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,SAAS;EACT,WAAW;EACX,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,YAAY;EACZ,wCAAwC;EACxC,oBAAoB;EACpB,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,0CAA0C;EAC1C,2BAA2B;AAC7B;;AAEA,sBAAsB;AACtB;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,8BAA8B;EAC9B,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;EACb,2BAA2B;AAC7B;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,UAAU;EACV,gBAAgB;EAChB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,0CAA0C;EAC1C,4BAA4B;AAC9B;;AAEA;EACE;IACE,UAAU;IACV,2BAA2B;EAC7B;EACA;IACE,UAAU;IACV,wBAAwB;EAC1B;AACF;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,gCAAgC;EAChC,mBAAmB;EACnB,4BAA4B;AAC9B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,8CAA8C;AAChD;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,cAAc;EACd,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,OAAO;EACP,cAAc;EACd,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,oEAAoE;EACpE,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,oCAAoC;EACpC,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,yBAAyB;EACzB,kBAAkB;EAClB,oCAAoC;AACtC;;AAEA;EACE;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,WAAW;AACb;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA,gCAAgC;AAChC;EACE,aAAa;EACb,QAAQ;EACR,UAAU;EACV,6BAA6B;AAC/B;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,8BAA8B;EAC9B,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,UAAU;EACV,gBAAgB;EAChB,UAAU;EACV,0CAA0C;AAC5C;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,4BAA4B;EAC5B,gCAAgC;AAClC;;AAEA;EACE,SAAS;EACT,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,yBAAyB;EACzB,4BAA4B;EAC5B,6BAA6B;AAC/B;;AAEA;EACE,iBAAiB;EACjB,yBAAyB;EACzB,iBAAiB;EACjB,cAAc;EACd,kBAAkB;EAClB,eAAe;EACf,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;AACvB;;AAEA;EACE,iBAAiB;EACjB,YAAY;EACZ,mBAAmB;EACnB,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,mBAAmB;AACrB;;AAEA;;EAEE,YAAY;EACZ,mBAAmB;AACrB;;AAEA,yBAAyB;AACzB;EACE,qBAAqB;EACrB,gDAAgD;AAClD;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,oCAAoC;EACpC,0BAA0B;EAC1B,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;EACb,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE;IACE,wBAAwB;EAC1B;EACA;IACE,4BAA4B;EAC9B;EACA;IACE,2BAA2B;EAC7B;AACF","sourcesContent":[".workspace-panel {\n  position: fixed;\n  top: 48px;\n  right: 0;\n  bottom: 32px;\n  width: 300px;\n  background: white;\n  border-left: 1px solid #e5e7eb;\n  display: flex;\n  flex-direction: column;\n  z-index: 800;\n  transition: transform 0.3s ease;\n  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);\n}\n\n.workspace-panel.closed {\n  transform: translateX(100%);\n}\n\n.workspace-panel.open {\n  transform: translateX(0);\n}\n\n.workspace-panel-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 16px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n}\n\n.workspace-panel-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  color: #1f2937;\n  flex: 1;\n}\n\n.workspace-info-tooltip-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  margin-left: 8px;\n  cursor: help;\n}\n\n.workspace-info-tooltip-wrapper .info-icon {\n  color: #94a3b8;\n  cursor: help;\n  transition: color 0.2s ease;\n  pointer-events: auto;\n}\n\n.workspace-info-tooltip-wrapper:hover .info-icon {\n  color: #667eea;\n}\n\n.workspace-info-tooltip {\n  position: fixed;\n  top: 60px;\n  right: 20px;\n  width: 320px;\n  max-width: calc(100vw - 40px);\n  padding: 14px 16px;\n  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);\n  border: 2px solid #e0e7ff;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15);\n  font-size: 13px;\n  line-height: 1.6;\n  color: #334155;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;\n  z-index: 9999;\n  pointer-events: none;\n  font-weight: 500;\n  transform-origin: top right;\n  white-space: normal;\n  word-wrap: break-word;\n  word-break: break-word;\n  overflow-wrap: break-word;\n  hyphens: auto;\n}\n\n.workspace-info-tooltip code {\n  background: #e0e7ff;\n  color: #4f46e5;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;\n  font-size: 12px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.workspace-info-tooltip-wrapper:hover .workspace-info-tooltip {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  transform: translateY(2px);\n}\n\n.workspace-panel-actions {\n  display: flex;\n  gap: 4px;\n}\n\n.workspace-refresh-btn,\n.workspace-close-btn {\n  background: none;\n  border: none;\n  color: #6b7280;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  transition: all 0.2s;\n}\n\n.workspace-refresh-btn:hover,\n.workspace-close-btn:hover {\n  background: #e5e7eb;\n  color: #1f2937;\n}\n\n.workspace-panel-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 12px;\n}\n\n.workspace-error {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 16px;\n  text-align: center;\n  color: #ef4444;\n}\n\n.workspace-error button {\n  margin-top: 12px;\n  padding: 6px 16px;\n  background: #ef4444;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 13px;\n}\n\n.workspace-error button:hover {\n  background: #dc2626;\n}\n\n.workspace-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 48px 16px;\n  text-align: center;\n  color: #9ca3af;\n}\n\n.workspace-empty .empty-icon {\n  opacity: 0.3;\n  margin-bottom: 16px;\n}\n\n.workspace-empty p {\n  font-size: 14px;\n  font-weight: 500;\n  margin: 0 0 8px 0;\n  color: #6b7280;\n}\n\n.workspace-empty small {\n  font-size: 12px;\n  color: #9ca3af;\n}\n\n.file-tree {\n  font-size: 13px;\n}\n\n.file-tree-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 8px;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: background 0.2s;\n  position: relative;\n  user-select: none;\n}\n\n.file-tree-item:hover {\n  background: #f3f4f6;\n}\n\n.file-tree-item.highlighted {\n  background: #dbeafe !important;\n  border: 1px solid #3b82f6;\n  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.3);\n}\n\n.file-tree-item.directory {\n  font-weight: 500;\n  color: #374151;\n}\n\n.file-tree-item.file {\n  color: #6b7280;\n}\n\n.folder-icon {\n  flex-shrink: 0;\n  color: #9ca3af;\n}\n\n.folder-icon-spacer {\n  width: 16px;\n  flex-shrink: 0;\n}\n\n.item-icon {\n  flex-shrink: 0;\n  color: #667eea;\n}\n\n.file-tree-item.file .item-icon {\n  color: #94a3b8;\n}\n\n.item-name {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.download-icon-btn {\n  background: none;\n  border: none;\n  color: #9ca3af;\n  cursor: pointer;\n  padding: 2px;\n  border-radius: 3px;\n  display: flex;\n  align-items: center;\n  opacity: 0;\n  transition: all 0.2s;\n}\n\n.file-tree-item:hover .download-icon-btn {\n  opacity: 1;\n}\n\n.download-icon-btn:hover {\n  background: #e5e7eb;\n  color: #667eea;\n}\n\n.folder-children {\n  margin-top: 2px;\n}\n\n.workspace-toggle-btn {\n  position: fixed;\n  top: 60px;\n  right: 16px;\n  width: 40px;\n  height: 40px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  z-index: 750;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s;\n  color: #667eea;\n}\n\n.workspace-toggle-btn:hover {\n  background: #f9fafb;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transform: translateY(-1px);\n}\n\n/* File Viewer Modal */\n.file-viewer-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1100;\n  animation: fadeIn 0.2s ease;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.file-viewer-modal {\n  background: white;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 800px;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  animation: slideUp 0.3s ease;\n}\n\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.file-viewer-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n  border-radius: 12px 12px 0 0;\n}\n\n.file-viewer-title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 15px;\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.file-viewer-title svg {\n  color: #667eea;\n}\n\n.file-viewer-actions {\n  display: flex;\n  gap: 8px;\n}\n\n.file-viewer-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  background: #667eea;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.file-viewer-btn:hover {\n  background: #5568d3;\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n}\n\n.file-viewer-close {\n  background: none;\n  border: none;\n  color: #6b7280;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  transition: all 0.2s;\n}\n\n.file-viewer-close:hover {\n  background: #e5e7eb;\n  color: #1f2937;\n}\n\n.file-viewer-content {\n  flex: 1;\n  overflow: auto;\n  padding: 20px;\n  background: #fafafa;\n}\n\n.file-viewer-content pre {\n  margin: 0;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;\n  font-size: 13px;\n  line-height: 1.6;\n  color: #1f2937;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n\n.workspace-loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1050;\n}\n\n.workspace-spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.workspace-panel-content::-webkit-scrollbar {\n  width: 6px;\n}\n\n.workspace-panel-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.workspace-panel-content::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 3px;\n}\n\n.workspace-panel-content::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n.file-viewer-content::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n\n.file-viewer-content::-webkit-scrollbar-track {\n  background: #f1f5f9;\n}\n\n.file-viewer-content::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n\n.file-viewer-content::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n/* Delete functionality styles */\n.file-actions {\n  display: flex;\n  gap: 4px;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n\n.file-tree-item:hover .file-actions {\n  opacity: 1;\n}\n\n.delete-icon-btn {\n  background: none;\n  border: none;\n  padding: 2px;\n  border-radius: 3px;\n  color: #6b7280;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n}\n\n.delete-icon-btn:hover {\n  background: #fee2e2;\n  color: #dc2626;\n}\n\n.delete-confirmation-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n\n.delete-confirmation-modal {\n  background: white;\n  border-radius: 8px;\n  padding: 0;\n  max-width: 400px;\n  width: 90%;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\n}\n\n.delete-confirmation-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px 20px 16px 20px;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.delete-confirmation-header h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.delete-icon {\n  color: #dc2626;\n}\n\n.delete-confirmation-content {\n  padding: 16px 20px;\n}\n\n.delete-confirmation-content p {\n  margin: 0 0 8px 0;\n  color: #374151;\n  font-size: 14px;\n}\n\n.delete-warning {\n  color: #dc2626;\n  font-weight: 500;\n}\n\n.delete-confirmation-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  padding: 16px 20px 20px 20px;\n  border-top: 1px solid #e5e7eb;\n}\n\n.delete-cancel-btn {\n  padding: 8px 16px;\n  border: 1px solid #d1d5db;\n  background: white;\n  color: #374151;\n  border-radius: 6px;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.delete-cancel-btn:hover:not(:disabled) {\n  background: #f9fafb;\n  border-color: #9ca3af;\n}\n\n.delete-confirm-btn {\n  padding: 8px 16px;\n  border: none;\n  background: #dc2626;\n  color: white;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.delete-confirm-btn:hover:not(:disabled) {\n  background: #b91c1c;\n}\n\n.delete-cancel-btn:disabled,\n.delete-confirm-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n/* Drag and drop styles */\n.workspace-panel.drag-over {\n  border-color: #667eea;\n  box-shadow: -2px 0 12px rgba(102, 126, 234, 0.3);\n}\n\n.workspace-drag-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(102, 126, 234, 0.1);\n  border: 2px dashed #667eea;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  pointer-events: none;\n}\n\n.workspace-drag-content {\n  text-align: center;\n  color: #667eea;\n}\n\n.workspace-drag-icon {\n  font-size: 48px;\n  margin-bottom: 12px;\n  animation: bounce 1s infinite;\n}\n\n.workspace-drag-text {\n  font-size: 16px;\n  font-weight: 600;\n  color: #667eea;\n}\n\n@keyframes bounce {\n  0%, 20%, 50%, 80%, 100% {\n    transform: translateY(0);\n  }\n  40% {\n    transform: translateY(-10px);\n  }\n  60% {\n    transform: translateY(-5px);\n  }\n}\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/WriteableElementExample.css":
/*!**************************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/WriteableElementExample.css ***!
  \**************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".floating-toggle {\n  width: fit-content;\n  margin-bottom: 6px;\n  top: 20px;\n  right: 20px;\n  background: #e0f2fe;\n  border-radius: 20px;\n  border: 1px solid #b3e5fc;\n  cursor: pointer;\n  z-index: 1000;\n  transition: all 0.2s ease;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  user-select: none;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  height: 32px;\n  box-sizing: border-box;\n}\n\n.floating-toggle:hover {\n  background: #b3e5fc;\n  transform: translateY(-1px);\n}\n\n.toggle-icon {\n  font-size: 14px;\n  line-height: 1;\n}\n\n.toggle-text {\n  font-size: 12px;\n  font-weight: 500;\n  color: #0277bd;\n  line-height: 1;\n}\n\n/* Mobile positioning */\n@media (max-width: 768px) {\n  .floating-toggle {\n    top: 15px;\n    right: 15px;\n    height: 30px;\n    padding: 5px 10px;\n  }\n\n  .toggle-icon {\n    font-size: 13px;\n  }\n\n  .toggle-text {\n    font-size: 11px;\n  }\n}\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/WriteableElementExample.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,mBAAmB;EACnB,mBAAmB;EACnB,yBAAyB;EACzB,eAAe;EACf,aAAa;EACb,yBAAyB;EACzB,8EAA8E;EAC9E,iBAAiB;EACjB,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,iBAAiB;EACjB,YAAY;EACZ,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;EACnB,2BAA2B;AAC7B;;AAEA;EACE,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,cAAc;AAChB;;AAEA,uBAAuB;AACvB;EACE;IACE,SAAS;IACT,WAAW;IACX,YAAY;IACZ,iBAAiB;EACnB;;EAEA;IACE,eAAe;EACjB;;EAEA;IACE,eAAe;EACjB;AACF","sourcesContent":[".floating-toggle {\n  width: fit-content;\n  margin-bottom: 6px;\n  top: 20px;\n  right: 20px;\n  background: #e0f2fe;\n  border-radius: 20px;\n  border: 1px solid #b3e5fc;\n  cursor: pointer;\n  z-index: 1000;\n  transition: all 0.2s ease;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  user-select: none;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  height: 32px;\n  box-sizing: border-box;\n}\n\n.floating-toggle:hover {\n  background: #b3e5fc;\n  transform: translateY(-1px);\n}\n\n.toggle-icon {\n  font-size: 14px;\n  line-height: 1;\n}\n\n.toggle-text {\n  font-size: 12px;\n  font-weight: 500;\n  color: #0277bd;\n  line-height: 1;\n}\n\n/* Mobile positioning */\n@media (max-width: 768px) {\n  .floating-toggle {\n    top: 15px;\n    right: 15px;\n    height: 30px;\n    padding: 5px 10px;\n  }\n\n  .toggle-icon {\n    font-size: 13px;\n  }\n\n  .toggle-text {\n    font-size: 11px;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../agentic_chat/src/StatusBar.css":
/*!*****************************************!*\
  !*** ../agentic_chat/src/StatusBar.css ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_StatusBar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!./StatusBar.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/StatusBar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_StatusBar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_StatusBar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_StatusBar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_StatusBar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/VariablePopup.css":
/*!*********************************************!*\
  !*** ../agentic_chat/src/VariablePopup.css ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_VariablePopup_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!./VariablePopup.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablePopup.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_VariablePopup_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_VariablePopup_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_VariablePopup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_VariablePopup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/VariablesSidebar.css":
/*!************************************************!*\
  !*** ../agentic_chat/src/VariablesSidebar.css ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!./VariablesSidebar.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/VariablesSidebar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_VariablesSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/WorkspacePanel.css":
/*!**********************************************!*\
  !*** ../agentic_chat/src/WorkspacePanel.css ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_WorkspacePanel_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!./WorkspacePanel.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/WorkspacePanel.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_WorkspacePanel_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_WorkspacePanel_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_WorkspacePanel_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_WorkspacePanel_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/WriteableElementExample.css":
/*!*******************************************************!*\
  !*** ../agentic_chat/src/WriteableElementExample.css ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!./WriteableElementExample.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/WriteableElementExample.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_WriteableElementExample_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

}]);
//# sourceMappingURL=main-agentic_chat_src_S.a6a0c9140fd302424bfd.js.map