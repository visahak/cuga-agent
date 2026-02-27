from typing import List, Literal, Optional
from pydantic import BaseModel, Field

class DimensionScores(BaseModel):
    """Optional structured scores (0-5 scale) per dimension to reduce evaluator variance."""
    novelty_102: Optional[int] = Field(default=None, ge=0, le=5, description="Novelty score (0-5)")
    nonobviousness_103: Optional[int] = Field(default=None, ge=0, le=5, description="Non-obviousness score (0-5)")
    enablement_112: Optional[int] = Field(default=None, ge=0, le=5, description="Enablement score (0-5)")
    eligibility_101: Optional[int] = Field(default=None, ge=0, le=5, description="Eligibility score (0-5)")
    ibm_value: Optional[int] = Field(default=None, ge=0, le=5, description="IBM business value score (0-5)")
    discoverability: Optional[int] = Field(default=None, ge=0, le=5, description="Infringement discoverability score (0-5)")
    terminology_uniqueness: Optional[int] = Field(default=None, ge=0, le=5, description="Terminology uniqueness score (0-5)")

class InnovationEvaluationOutput(BaseModel):
    innovation_understanding: str = Field(
        description="A detailed analysis of the innovation's core claims, technical features, and problem-solution fit, demonstrating a deep understanding of the disclosed document."
    )
    clarity_and_enablement: str = Field(
        description="MANDATORY: State the core invention in ONE clear sentence (or 'complex but coherent' statement if single sentence isn't realistic). Include any enablement (112) or eligibility (101) concerns. If the core innovation is unclear/ambiguous after full analysis, explain why and classify as 'do-not-file'."
    )
    novelty_score: Literal["Search-1", "Search-2", "Search-3", "do-not-file"] = Field(
        description="The filing strength classification: 'Search-1' (Strong File), 'Search-2' (File/Narrow File), 'Search-3' (Weak File/Consider Scope Control), or 'do-not-file' (internal disposition — do NOT pursue patent filing). Based on novelty (102), non-obviousness (103), enablement (112), eligibility (101), IBM value, and infringement discoverability."
    )
    novelty_and_nonobviousness: str = Field(
        description="Combined 35 USC 102 (novelty/anticipation) and 103 (non-obviousness/inventive step) analysis. Address: Would PHOSITA have reason to combine references? Do references teach away? Are there unexpected results? Specific technical hurdles overcome?"
    )
    ibm_business_value: str = Field(
        description="IBM business value assessment: HIGH (core strategic technology), MEDIUM (useful but not critical), or LOW (minimal strategic impact). Include justification based on alignment with IBM focus areas (AI/ML, Hybrid Cloud, Quantum, Security, Sustainability, Enterprise Automation)."
    )
    infringement_discoverability_rating: str = Field(
        description="Infringement discoverability rating: HIGH (no purchase required or by observation), MEDIUM (by interaction or reverse engineering), or LOW (undiscoverable or requires insider knowledge)."
    )
    detectability_method: str = Field(
        description="Specific detection method: No purchase required, By observation, By interaction, By reverse engineering, or Undiscoverable. Explain how infringement would be detected in practice."
    )
    terminology_uniqueness: str = Field(
        description="Assessment of technical terminology uniqueness for patent search and marketplace monitoring: High/Medium/Low. Include key search tokens/phrases that could be used for monitoring."
    )
    prior_art_confidence: str = Field(
        description="Confidence in prior art coverage: High/Medium/Low. Note any gaps in the research or suggested additional search directions if coverage seems limited or biased."
    )
    claim_strategy_notes: str = Field(
        description="Suggestions for improving claim detectability or scope if applicable. Consider: system/client-side observable artifacts, API/protocol signaling, workflow/UI indicia, data structure claims with distinctive characteristics."
    )
    standards_oss_risks: str = Field(
        description="Assessment of standard-essential patent potential or open-source software entanglement risks. Note any conflicts with existing standards or OSS licenses."
    )
    trade_secret_recommended: bool = Field(
        description="True if trade secret protection is recommended instead of patenting (especially when IBM value is HIGH but infringement discoverability is LOW and claim strategy variants won't help)."
    )
    implementation_difficulty_signal: str = Field(
        description="Domain-aware feasibility signal: Could a skilled person implement this within a typical sprint using standard tools without novel algorithmic work? Non-dispositive — simple ideas can still be non-obvious."
    )

    # Optional scores object to reduce evaluator variance
    scores: Optional[DimensionScores] = Field(
        default=None,
        description="Optional structured scores (0-5 scale) per dimension to reduce evaluator variance."
    )

class InnovationSummaryOutput(BaseModel):
    summary: str = Field(..., description="A concise summary of the innovation document.")
    key_features: List[str] = Field(..., description="List of key features or claims found in the document.")
    potential_applications: List[str] = Field(..., description="List of potential applications or use cases.")
    keywords: List[str] = Field(..., description="List of relevant keywords extracted from the document.")

from langchain_core.output_parsers import PydanticOutputParser

parser_evaluation = PydanticOutputParser(pydantic_object=InnovationEvaluationOutput)
parser_summary = PydanticOutputParser(pydantic_object=InnovationSummaryOutput)
