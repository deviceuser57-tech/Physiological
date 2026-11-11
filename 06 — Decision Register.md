# PsychoContext V8 — Decision Register

**Document ID:** PC-V8-06 | **Version:** 1.0 draft | **Status:** For owner and specialist review; decisions below are not represented as approved unless explicitly marked | **Date:** 9 November 2026

## Purpose and relationship to the package

This register captures decisions that must not be silently inferred while moving from blueprint to implementation. It is governed by **01 — Master Architecture** for product scope and authority; decision-specific knowledge is in **02 — Knowledge Architecture**; technical alternatives are in **03 — Technical Implementation Blueprint**; historical evidence and provenance are in **04 — Conversation Audit & Gap Analysis**; sequenced work and gates are in **05 — Enhancement Roadmap**. Requirement IDs and decision links are indexed in **07 — Requirement Traceability Matrix**.

### Status vocabulary

- **Open:** decision required; no approval evidence found.
- **Proposed:** recommended direction, not owner approval.
- **Approved:** explicit approval recorded with approver/date/source.
- **Blocked:** cannot proceed until dependency/evidence is satisfied.
- **Deferred:** intentionally scheduled for a later phase with a trigger.

No item is marked Approved in this initial register because the materials reviewed do not provide a decision log with approver/date for these decisions. The recommendation column is not a substitute for owner or qualified-professional approval.

## Decision register

| ID | Decision required | Proposed direction for review | Status | Decision owner / required reviewers | Evidence or dependency | Affected docs / requirements |
|---|---|---|---|---|---|---|
| ADR-001 | What is the first release: clinician-facing clinical MVP, civilian readiness pilot, or another scope? | Choose one primary user journey; do not combine clinical care and readiness in one undifferentiated release | Open / Blocked | Product owner; clinical lead; legal/privacy | Initial population, service operator, operating jurisdiction | 01, 03, 05; RTM-01 |
| ADR-002 | What exact instruments may be used in the first release? | Smallest set with exact form, rights, language evidence, scoring rules and intended use documented | Open / Blocked | Psychometrician; rights counsel; clinical lead | Primary publications, license terms, Arabic/Egyptian evidence, item-level scoring tests | 02, 03, 05; RTM-04 |
| ADR-003 | How should environmental and socioeconomic context affect interpretation? | Capture context for formulation; do not mathematically alter validated scores until instrument-specific validation supports it | Proposed | Psychometrician; clinical lead; owner | Earlier 25% context adjustment is a reported proposal without established validation | 01, 02, 04; RTM-05 |
| ADR-004 | Is speech/audio intake included, and what is retained? | Optional, separate consent; clinician verifies extracted facts; default audio deletion after transcription unless a reviewed purpose requires retention | Open | Product owner; privacy/security; clinical lead; legal | Provider terms, data-flow map, age/minor policy | 01, 03, 05; RTM-06 |
| ADR-005 | What AI providers may process clinical information, under what terms and region? | No clinical data transmission until provider, retention, training-use, location and incident terms are reviewed | Open / Blocked | Security/privacy; legal; clinical owner | Provider contracts/settings and data residency | 01, 03, 05; RTM-07 |
| ADR-006 | What is meant by “RAG 5”? | Treat phrase as undefined; adopt no technical meaning until the owner defines it and architecture review records it | Open | Product owner; AI/knowledge architect | Historical phrase only; no established project definition found | 02, 03, 04; RTM-08 |
| ADR-007 | How are minors handled? | Defer access until age thresholds, consent/assent, safeguarding and escalation are reviewed for applicable jurisdiction | Open / Blocked | Legal; child/adolescent clinical lead; privacy owner | Local law and operational safeguarding plan | 01, 03, 05; RTM-09 |
| ADR-008 | What safety/emergency response is operationally available? | No public safety workflow without named human responder, verified local resources, escalation ownership and tested coverage | Open / Blocked | Clinical safety lead; operations; legal | Service hours, geography, referral contacts and tabletop exercise | 01, 03, 05; RTM-10 |
| ADR-009 | How are roles, clinician credentials and tenant boundaries established? | Server/data-layer enforcement; independently verified professional access; least privilege; audited delegation | Proposed | Security owner; clinical governance; operations | Identity provider and organizational credentialing process | 01, 03, 05; RTM-11 |
| ADR-010 | What data retention, deletion, correction and consent-withdrawal rules apply? | Define per data class and purpose before production; preserve lawful audit history while honoring applicable rights | Open / Blocked | Privacy/legal; data controller; clinical lead | Jurisdictional review, data inventory, backup policy | 01, 03, 05; RTM-12 |
| ADR-011 | How should AI/clinician disagreement be used? | Store separate hypotheses and clinician decisions; do not treat disagreement as error labels or automatic model training | Proposed | Clinical lead; AI governance; research lead | Approved protocol, data governance and validity plan before research | 01, 02, 03, 05; RTM-13 |
| ADR-012 | What is the status and scope of the readiness/MIL-PREP concept? | Civilian developmental education only; no admission, fitness, pass/fail or official-affiliation claims; separate consent/data | Proposed | Owner; legal; psychometrician; clinical lead | Exact construct, population, rights and validation evidence | 01, 02, 04, 05; RTM-14 |
| ADR-013 | What is the initial technology and hosting architecture? | Evaluate Python/FastAPI + TypeScript/React + PostgreSQL modular monolith; approve only after deployment, residency and operational assessment | Proposed | Engineering owner; security; product owner | Hosting region, identity, support and migration constraints | 03, 05; RTM-15 |
| ADR-014 | What constitutes a legally adequate clinician sign-off? | Use authenticated, attributable decision event; obtain jurisdiction-specific legal review before claiming electronic signature status | Open | Legal; clinical governance; engineering | Applicable signature and recordkeeping requirements | 01, 03, 05; RTM-16 |
| ADR-015 | Is the future Fitrah model part of initial scientific architecture? | Keep separate as future research; Islamic psychology may be one independently governed perspective where measures are appropriate | Proposed | Owner; relevant scholars/researchers; psychometrician; clinical lead | Construct definition, governance and evidence plan | 01, 02, 04; RTM-17 |
| ADR-016 | What source code and conversation artifacts are authoritative for implementation audit? | Require exact repository commit, raw conversation/action exports, deployed build and tests before assigning verified status | Open / Blocked | Owner; engineering reviewer | Source tree and reproducible environment | 04, 05; RTM-18 |

## Decision record template

For each update, append rather than erase history:

- Decision ID and title
- Status, date, approver(s), role and source reference
- Context and requirement IDs
- Options considered, including “do nothing/defer”
- Chosen option and rationale/evidence
- Consequences, risks and mitigations
- Required implementation/test evidence
- Review trigger/date and superseded decision ID

## Review checklist

Before implementation, confirm each P0/Blocked item has an owner and resolution path; confirm Proposed items have been explicitly accepted or remain proposals; ensure no draft recommendation is described as a settled owner decision; and update the traceability matrix after each material decision.

## Addendum — Owner-approved clarifications from the supplied master prompt

**Source:** user-provided `pasted_content_3.txt`, Part 4, §§4.1–4.8, supplied 9 November 2026. The source explicitly labels these as authoritative owner decisions. These records are additive; existing ADR identifiers and meanings are preserved. They do not close unrelated open implementation/legal decisions. Status is **OWNER APPROVED (per explicit owner prompt)**; implementation and scientific/operational readiness are separate.

| Stable ID | Owner-approved decision | Consequence / boundary | Related docs |
|---|---|---|---|
| OD-001 | CBDNA is an independent core engine for multidimensional, contextual, dynamic, longitudinal cognitive/behavioral patterns. | Not diagnosis/personality/universal score/autonomous decision-maker; candidate mathematical model chosen only through scientific evaluation. | 01,08,16; RTM-29–31,37 |
| OD-002 | Multi-axial taxonomy with many-to-many relationships. | Links do not imply interchangeability or permission to combine scores. | 02,10; RTM-38 |
| OD-003 | Patient clinical memory may generate candidate patterns through governed transformation. | No single-case generalization or automatic score/instrument changes; protect source and require specialist/scientific/ethics/privacy controls. | ADR-010/011; 09,14,16; RTM-30,32 |
| OD-004 | Hybrid AI-assisted knowledge evolution is approved. | AI may discover/summarize/propose; specialists and scientific/methodological/ethical governance approve changes; one clinician approval alone does not create general fact. | ADR-010/011; 09,17; RTM-30,32 |
| OD-005 | Qualified clinician is final authority; AI is advisory throughout. | Enforce across architecture, roles, models, APIs, workflows, gateway, audit and tests. | ADR-014; 01,03,11; RTM-02,36 |
| OD-006 | “RAG 5” refers to anticipated latest practices, not an official standardized version; working name is PsychoContext Advanced Adaptive RAG Architecture. | Evaluate methods against Arabic quality, clinical relevance, traceability, privacy, security, cost, latency and maintainability. | ADR-006; 02,03,17; RTM-31,33 |
| OD-007 | Preserve complete platform vision through capability maturity levels 1–4, not by removing/indefinitely postponing domains. | L1 Foundational, L2 Enhanced, L3 Advanced, L4 Research-grade; first release slice remains separate/open. | ADR-001; 01,05,15; RTM-34 |
| OD-008 | Intended Military Applicant Psychological Readiness Program is a free, civilian psychological wellbeing service for Egyptian military-college applicants. | Not physical preparation, rehabilitation, medical clearance, official assessment/admissions authority or guarantee/prediction; no deception coaching. | ADR-012; 01,13,15; RTM-35 |

### Effect of clarifications on prior ADRs

| Existing ADR | Retained meaning/status after clarification |
|---|---|
| ADR-001 | Still OPEN for the concrete first live release slice. OD-007 preserves the full vision but does not choose which L1 journey is implemented first. |
| ADR-006 | Its “what does RAG 5 mean?” terminology question is SUPERSEDED by OD-006. Specific methods, provider, thresholds and deployment remain open. |
| ADR-012 | Earlier generic MIL-PREP/readiness definition is SUPERSEDED as the service definition by OD-008. Operations, measures, age/consent, staffing and evaluation remain open. |
| ADR-014 | Signature/recordkeeping legal adequacy remains OPEN/BLOCKED; OD-005 settles clinician authority, not electronic-signature law. |
| ADR-010/011 | Privacy/consent and research implementation remain OPEN/BLOCKED; OD-003/004 approve direction, not a specific legal basis, protocol or production data flow. |
| ADR-015 | Fitrah remains separate future research; CBDNA core-engine status does not validate or merge Fitrah. |

OD-001–OD-008 are owner-approved as stated in the supplied prompt, not assistant recommendations. If later changed, supersede with source/date rather than rewriting history.

## Addendum — Proposed psychometric/adaptive-assessment decisions (NOT APPROVED)

**Source:** user-supplied `pasted_content_5.txt`, received 11 November 2026. The source explicitly labels this as a proposed enhancement pending owner approval. OD-001–OD-008 remain unchanged. These items are proposals only and must not be treated as approved decisions by being entered here.

| Proposal ID | Proposed decision question | Recommended direction for review | Status / reviewers |
|---|---|---|---|
| PDA-001 | Should PsychoContext implement a formal psychometric lifecycle and version registry? | Adopt instrument and exact-version lifecycle states, rights/evidence/language gates and purpose-specific approval. | PROPOSED / Owner + psychometric + rights/legal |
| PDA-002 | What may the adaptive assessment service recommend or decide? | It returns explainable candidate recommendations with evidence, alternatives, overlap, burden and limitations; the clinician alone selects/orders. | PROPOSED / Owner + clinical + psychometric + engineering |
| PDA-003 | How may different instruments be combined in reports? | Allow evidence-informed contextual formulation while preserving separate scores; prohibit unsupported score aggregation and causal inference. | PROPOSED / Owner + clinical + psychometric |
| PDA-004 | What is required to develop a new measure and compare forms over time? | Require the documented development/validation lifecycle; longitudinal comparison only for compatible forms or a validated crosswalk. | PROPOSED / Psychometric + language/cultural + legal reviewers |
| PDA-005 | What report/safety operating record is mandatory? | Separate AI suggestions, verified facts, clinician choice/opinion/decision; separate risk indicator recognition, human assessment and operational referral/escalation. | PROPOSED / Clinical safety + operations + privacy/legal |

No change is made to the approval state of owner decisions. Exact Egypt-specific safety resources, provider terms, instrument rights and local validation remain open evidence/operational tasks.
