from typing import Literal

from langchain_core.messages import AIMessage
from langchain_core.runnables.config import RunnableConfig
from langgraph.types import Command

from cuga.backend.cuga_graph.nodes.shared.base_node import BaseNode
from cuga.backend.cuga_graph.nodes.shared.base_agent import create_partial
from cuga.backend.cuga_graph.state.agent_state import AgentState
from cuga.backend.cuga_graph.nodes.innovation.research_agent import ResearchAgent
from loguru import logger
import json


class ResearchNode(BaseNode):
    def __init__(self):
        super().__init__()
        self.agent = ResearchAgent()
        self.node = create_partial(
            ResearchNode.node_handler,
            agent=self.agent,
            name=self.agent.name,
        )

    @staticmethod
    async def node_handler(
        state: AgentState, agent: ResearchAgent, name: str, config: RunnableConfig
    ) -> Command[Literal["FinalAnswerAgent"]]:
        
        logger.info("ResearchNode: Executing...")
        state.sender = name
        
        # Run the agent
        result: AIMessage = await agent.run(state)
        
        # Append the result to messages
        state.messages.append(result)
        
        # Parse the result to update state.last_planner_answer
        try:
            content = json.loads(result.content)
            
            if "error" in content:
                state.last_planner_answer = f"❌ Research Error: {content['error']}"

            elif "report" in content:
                # Web research or URL summary — raw markdown report
                state.last_planner_answer = content["report"]

            elif "novelty_score" in content:
                # Innovation evaluation — structured output
                ranking = content.get('novelty_score', 'N/A')

                # Build assessment summary
                assessment_lines = [
                    f"### Innovation Evaluation\n",
                    f"**Ranking:** {ranking}\n",
                ]

                # Add key assessments if available
                if 'ibm_business_value' in content:
                    assessment_lines.append(f"**IBM Business Value:** {content.get('ibm_business_value')}\n")

                if 'infringement_discoverability_rating' in content:
                    assessment_lines.append(f"**Infringement Discoverability:** {content.get('infringement_discoverability_rating')}\n")

                if 'novelty_and_nonobviousness' in content:
                    assessment_lines.append(f"\n**Novelty & Non-Obviousness (102/103):**\n{content.get('novelty_and_nonobviousness')}\n")

                # Add core analysis sections
                assessment_lines.extend([
                    f"\n**Innovation Understanding:**\n{content.get('innovation_understanding', 'N/A')}\n",
                    f"\n**Clarity & Enablement:**\n{content.get('clarity_and_enablement', 'N/A')}\n",
                ])

                if 'implementation_difficulty_signal' in content:
                    assessment_lines.append(f"\n**Implementation Difficulty Signal:**\n{content.get('implementation_difficulty_signal')}\n")

                if 'claim_strategy_notes' in content and content.get('claim_strategy_notes'):
                    assessment_lines.append(f"\n**Claim Strategy Notes:**\n{content.get('claim_strategy_notes')}\n")

                if 'trade_secret_recommended' in content:
                    trade_secret = "Yes" if content.get('trade_secret_recommended') else "No"
                    assessment_lines.append(f"\n**Trade Secret Recommended:** {trade_secret}\n")

                # Append the full research report at the bottom, visually separated
                if 'research_report' in content and content.get('research_report'):
                    assessment_lines.extend([
                        "\n\n\n\n\n---\n\n\n\n\n",
                        "### Research Report\n\n",
                        content.get('research_report'),
                    ])

                summary = "".join(assessment_lines)
                state.last_planner_answer = summary

            elif "summary" in content:
                # Document summarization — structured output
                features = "\n".join(f"- {f}" for f in content.get("key_features", []))
                apps = "\n".join(f"- {a}" for a in content.get("potential_applications", []))
                keywords = ", ".join(content.get("keywords", []))
                summary = (
                    f"### Document Summary\n\n"
                    f"{content.get('summary')}\n\n"
                    f"**Key Features:**\n{features}\n\n"
                    f"**Potential Applications:**\n{apps}\n\n"
                    f"**Keywords:** {keywords}"
                )
                state.last_planner_answer = summary

            else:
                state.last_planner_answer = f"Research Result: {result.content}"
                
        except json.JSONDecodeError:
            state.last_planner_answer = result.content

        if isinstance(state.last_planner_answer, list):
            logger.warning(f"ResearchNode: Detected list in last_planner_answer: {state.last_planner_answer}. Forcing to string.")
            state.last_planner_answer = str(state.last_planner_answer)

        logger.info(f"ResearchNode: final last_planner_answer type={type(state.last_planner_answer)}, content={str(state.last_planner_answer)[:200]}...")

        # # Go to FinalAnswerAgent
        # return Command(update=state.model_dump(), goto="FinalAnswerAgent")
        # Go to PlanControllerAgent to conclude correctly for UI
        return Command(update=state.model_dump(), goto="PlanControllerAgent")
