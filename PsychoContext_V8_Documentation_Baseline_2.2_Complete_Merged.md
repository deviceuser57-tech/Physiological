# PsychoContext V8 — Documentation Baseline 2.2.2: Repository-Reconciled Working Revision

**Revision:** 2.2.2-proposed (repository-reconciled documentation revision; owner/specialist ratification required)
**Base artifact:** Documentation Baseline 2.2, merged 2026-11-13 09:41:21 +02:00
**Included documents:** 20 Markdown documents, numbered 00–19; document count and order are preserved.
**Integrity note:** SHA-256 values embedded below identify the original raw source files as received before the 2.2 merge. They are provenance hashes, not hashes of the corrected embedded text in this maintained revision. Original 2.2 remains preserved on `main`.
**Content note:** This is a maintained corrective copy of the 20-document merged artifact, with a repository-reconciliation update and execution-control cross-references. Selected embedded sections are corrected for cross-document consistency; source filenames, source timestamps and original provenance hashes remain historical metadata.
**Change control:** Corrections are limited to documentation consistency, canonical entity/API naming, decision status, and repository-baseline evidence. No application code, schema, dependency, deployment, clinical workflow or instrument approval is changed or authorized by this document.

## Contents

- [00 — PsychoContext V8 Documentation Master Index.md](#doc-00)

- [01 — Master Architecture.md](#doc-01)

- [02 — Knowledge Architecture.md](#doc-02)

- [03 — Technical Implementation Blueprint.md](#doc-03)

- [04 — Conversation Audit & Gap Analysis.md](#doc-04)

- [05 — Enhancement Roadmap.md](#doc-05)

- [06 — Decision Register.md](#doc-06)

- [07 — Requirement Traceability Matrix.md](#doc-07)

- [08 — CBDNA Research and Technical Specification.md](#doc-08)

- [09 — Knowledge Evolution and Learning Governance.md](#doc-09)

- [10 — Architecture Reconciliation Matrix.md](#doc-10)

- [11 — Clinical Governance and AI Authority Framework.md](#doc-11)

- [12 — Psychometric Instrument Governance and Licensing.md](#doc-12)

- [13 — Military Applicant Psychological Readiness Program.md](#doc-13)

- [14 — Privacy Security and Data Governance.md](#doc-14)

- [15 — Product Scope and Capability Maturity.md](#doc-15)

- [16 — CBDNA Data Dictionary and Entity Model.md](#doc-16)

- [17 — Advanced Adaptive RAG Specification.md](#doc-17)

- [18 — Proposed Updates to Original Seven and Evidence Limits.md](#doc-18)

- [19 — Consistency Validation Gaps and Implementation Plan.md](#doc-19)

<a id="doc-00"></a>

# Document 00 — PsychoContext V8 Documentation Master Index.md

> **Source filename:** `00 — PsychoContext V8 Documentation Master Index.md`
**Purpose:** Index, authority, document status, reading order and package change control
**Source last modified:** 2026-11-13 09:32:55 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `163338f51281277e892c8be746eef99ea6f9a0478afba819c371d2e065793134`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Documentation Master Index

**Package status:** Documentation & Architecture Baseline 2.2.1 — corrective proposal / owner and specialist review required; not implementation or clinical authorization | **Package revision:** 2.2.1-proposed | **Base revision:** 2.2-proposed | **Revision date:** 13 November 2026
**Version policy:** Package revision is independent of each document's own version; retain document-level versions, statuses and approval evidence in their respective files.

## Authority and source policy

This is a versioned 20-document package copied from the 12 November 2.1 proposal and updated for the owner's final audit. It does not overwrite the earlier seven-file baseline or previous merged artifact. OD-001–OD-008 remain approved only as explicitly stated in the supplied owner prompt; other recommendations remain Proposed/Open until approved by their identified owners. Read-only repository observations are recorded in 04/19, not as runtime or security certification. Pre-existing Git deletions/untracked materials are preserved; no cleanup was performed.

| ID | Document | Authority and purpose | Dependencies / related docs | Status |
| --- | --- | --- | --- | --- |
| 01 | [Master Architecture](01%20%E2%80%94%20Master%20Architecture.md) | Product identity, complete vision, capability maturity and system-wide clinical/AI authority | 08, 11, 13, 15 | Proposed reconciled version |
| 02 | [Knowledge Architecture](02%20%E2%80%94%20Knowledge%20Architecture.md) | Multi-axial taxonomy, registries, evidence and separate knowledge/memory domains | 08, 09, 12, 16, 17 | Proposed reconciled version |
| 03 | [Technical Implementation Blueprint](03%20%E2%80%94%20Technical%20Implementation%20Blueprint.md) | Python/TS/PostgreSQL responsibilities, APIs, security, operations, testing, migration | 11, 14, 16, 17 | Proposed reconciled version |
| 04 | [Conversation Audit & Gap Analysis](04%20%E2%80%94%20Conversation%20Audit%20%26%20Gap%20Analysis.md) | Chronology, source classification, historical claims and limitations | 18, evidence inventory | Proposed reconciled version; transcript incomplete |
| 05 | [Enhancement Roadmap](05%20%E2%80%94%20Enhancement%20Roadmap.md) | Workstreams, progressive capability maturity, gates and acceptance outcomes | 06, 07, 18, 19 | Proposed; preserves full scope |
| 06 | [Decision Register](06%20%E2%80%94%20Decision%20Register.md) | Eight owner decisions plus remaining genuinely open decisions | 07, 18, 19 | Eight classified as owner-approved per supplied prompt; others open/proposed |
| 07 | [Requirement Traceability Matrix](07%20%E2%80%94%20Requirement%20Traceability%20Matrix.md) | Stable requirements linked to architecture, data, UI/API, test, ADR and status | All documents | Proposal; acceptance criteria require review |
| 08 | [CBDNA Research & Technical Specification](08%20%E2%80%94%20CBDNA%20Research%20and%20Technical%20Specification.md) | Core engine purpose, candidate mathematical approaches, limits and validation | 11, 16, 07 | Core-engine architecture owner-approved; models/features and clinical use remain unvalidated/gated |
| 09 | [Knowledge Evolution & Learning Governance](09%20%E2%80%94%20Knowledge%20Evolution%20and%20Learning%20Governance.md) | Evidence authority, memory separation, research transformation, AI-assisted updates | 02, 12, 16, 17 | Proposed governance |
| 10 | [Architecture Reconciliation Matrix](10%20%E2%80%94%20Architecture%20Reconciliation%20Matrix.md) | Contradictions, sources, decisions, resolutions, owners and tests | 04, 06, 07 | Reconciliation proposal |
| 11 | [Clinical Governance & AI Authority Framework](11%20%E2%80%94%20Clinical%20Governance%20and%20AI%20Authority%20Framework.md) | Human clinical authority, safety, oversight, workflows and incident response | 03, 08, 13, 18 | For clinical/operational/legal review |
| 12 | [Psychometric Instrument Governance & Licensing](12%20%E2%80%94%20Psychometric%20Instrument%20Governance%20and%20Licensing.md) | Measure admission, evidence, permissions, scoring and monitoring | 02, 07, 11 | No instrument approved by this document |
| 13 | [Military Applicant Psychological Readiness Program](13%20%E2%80%94%20Military%20Applicant%20Psychological%20Readiness%20Program.md) | Free, civilian, non-official applicant wellbeing/preparation service | 01, 11, 12, 14 | Owner scope adopted; operations/evidence pending |
| 14 | [Privacy, Security & Data Governance](14%20%E2%80%94%20Privacy%20Security%20and%20Data%20Governance.md) | Data classes, consent, security, provider processing, retention and research | 03, 09, 11, 13 | Jurisdiction review required |
| 15 | [Product Scope & Capability Maturity](15%20%E2%80%94%20Product%20Scope%20and%20Capability%20Maturity.md) | Unified services/populations with Level 1–4 maturity; no domain silently dropped | 01, 05, 13 | Owner decision 7 reflected |
| 16 | [CBDNA Data Dictionary & Entity Model](16%20%E2%80%94%20CBDNA%20Data%20Dictionary%20and%20Entity%20Model.md) | CBDNA entities, many-to-many links, provenance, time, uncertainty, versions | 02, 08, 03 | Conceptual model pending validation |
| 17 | [Advanced Adaptive RAG Specification](17%20%E2%80%94%20Advanced%20Adaptive%20RAG%20Specification.md) | Adaptive retrieval architecture, ingestion, security, Arabic evaluation, cost/latency | 02, 03, 09, 14 | Working architecture name; not a formal RAG-version claim |
| 18 | [Proposed Updates to Original Seven & Evidence Limits](18%20%E2%80%94%20Proposed%20Updates%20to%20Original%20Seven%20and%20Evidence%20Limits.md) | Section-level corrections/additions for unchanged baseline and missing-source inventory | 04, 06, 10 | Proposal; originals preserved |
| 19 | [Consistency, Validation Gaps & Implementation Plan](19%20%E2%80%94%20Consistency%20Validation%20Gaps%20and%20Implementation%20Plan.md) | Cross-document QC, scientific/clinical/privacy gaps, next steps and release gates | All | Review report; no implementation certification |

## Reading order

Read 00 → 01/15 for vision and capability maturity → 04/10/18 for history and reconciliation → 06/07 for decisions and traceability → 02/08/09/12/16/17 for knowledge and technical science → 11/13/14 for service and safeguards → 03 for target technology → 05/19 for gates and next steps.

## Global interpretation rules

1. The complete long-term vision is retained; capability maturity governs sequencing, not whether a domain matters.

1. Owner decisions 1–8 are recorded as approved **because the owner-provided prompt explicitly states they are authoritative**; exact operational details still require the specified scientific/legal/clinical reviews.

1. No raw psychometric score is context-adjusted without exact-purpose validation and approval.

1. AI remains advisory; qualified clinician is authoritative for clinical diagnosis and treatment.

1. CBDNA is a core architectural engine but not a diagnosis or autonomous decision-maker; clinical deployment of any derived construct remains gated.

1. The military applicant program is a free, civilian psychological wellbeing/readiness service; not physical preparation, rehabilitation, official assessment, or admission preparation authority.

1. No “Built” claim becomes verified without repository/runtime evidence.

## Update note — psychometric proposal integration (11 November 2026)

The latest proposal supplied as `pasted_content_5.txt` is **PROPOSED / PENDING OWNER APPROVAL**. PDA-001–005 and RTM-39–52 remain proposed; no implementation is claimed.

## Baseline 2.2 change and status register

This revision corrects known misreferences: ADR-017 removed because it does not exist; ADR-015 excluded from CBDNA/safety because it concerns future Fitrah; first-release scope mapped to ADR-001, not ADR-009; RTM-02 linked to OD-005; RTM-42 retained as a stable legacy umbrella and decomposed into RTM-53–55. It adds engine/module/API/data ownership, fail-closed instrument states, safety and privacy operations gates, and Current → Target → Migration handoff. No unapproved item is upgraded to approved.

| File | Status / purpose | Baseline 2.2 focus |
| --- | --- | --- |
| 00 | Reference | Package authority, status and change control |
| 01 | Proposed | Engine ownership and interaction boundaries |
| 02 | Proposed | Knowledge source-of-truth and relation semantics |
| 03 | Proposed | API/entity/role/test/migration contract |
| 04 | Evidence / Reference | Conversation and repository facts with confidence limits |
| 05 | Proposed | Dependency-ordered gates and exit evidence |
| 06 | Mixed: OD approved; ADR/PDA mixed | Decision status and corrected cross-references |
| 07 | Proposed | Stable RTM plus independently testable RTM-53–55 |
| 08 | Proposed | CBDNA contracts and safety/failure boundary |
| 09 | Proposed | Governance authority and release/review proposal |
| 10 | Proposed | Reconciliation and traceability correction |
| 11 | Proposed | Human-owned indicator-to-action workflow |
| 12 | Proposed | Instrument lifecycle and exact scoped approval |
| 13 | Mixed: service boundary approved; operations open | Eligibility, separation and safety gate |
| 14 | Proposed | Data-flow, purpose and privacy gates |
| 15 | Proposed | Maturity-to-module/enablement mapping |
| 16 | Proposed | Entity ownership, cardinality and lineage |
| 17 | Proposed | Retrieval benchmarks, abstention and security gates |
| 18 | Reference | Source update map and preservation history |
| 19 | Proposed | Documentation-to-repository baseline transition |

### Corrective revision 2.2.1 change record

This maintained copy resolves confirmed documentation defects and adds a remote implementation evidence gate: (1) canonical entity names/cardinalities are aligned between the technical blueprint, RTM and CBDNA data dictionary; (2) ADR-006 and ADR-012 status fields now reflect their superseding owner decisions OD-006 and OD-008 while preserving unresolved implementation work; (3) CBDNA is consistently described as an owner-approved core engine with model/feature/clinical-use maturity still gated; (4) local-checkout evidence is explicitly separated from the current GitHub remote head; and (5) the current remote source inspection records authentication, authorization, Firestore test-target, AI endpoint and false-success persistence blockers. Original 2.2 remains preserved in Git history. Original 2.2 remains unchanged on `main`; this branch is the proposed corrective copy. The source SHA-256 values remain provenance hashes of the original pre-merge files.

No application code, database schema, migrations, dependencies or deployment are changed or authorized by this documentation correction. Build/lint/tests were not run; implementation conformance remains unverified.


## Addendum — execution authority and repository reconciliation (Revision 2.2.2)

The controlled, file-level implementation sequence is maintained in `docs/execution/PsychoContext_V8_Master_Execution_Plan.md`, Revision 1.1-reconciled-draft. It is a delivery-control plan, not a replacement for this architecture package. It remains a proposal pending owner approval.

The inspected repository contains older standalone root copies of documents 00–19 (for example, root 00 and 03 identify themselves as 2.0-proposed) alongside this merged 2.2.1 artifact. Until a synchronization decision is approved, this merged package is the controlling reconciled architecture reference; the root standalone copies are legacy snapshots and must not override it. Phase 0/1 must establish a document authority manifest and either synchronize canonical standalone copies or formally designate the root copies as historical. Do not maintain two active authorities.

The repository-reconciled execution plan makes ADR-013 a Phase 0 hard gate, requires an owner-selected first user journey under ADR-001, and prohibits parallel Firebase/FastAPI/PostgreSQL sources of truth without an explicitly approved hybrid ownership contract. OD-001–OD-008 remain unchanged and owner-approved only within their stated boundaries. No open ADR or proposed psychometric recommendation is promoted by this addendum.

## Addendum — execution authority and repository reconciliation (Revision 2.2.2)

The controlled, file-level implementation sequence is maintained in `docs/execution/PsychoContext_V8_Master_Execution_Plan.md`, Revision 1.1-reconciled-draft. It is a delivery-control plan, not a replacement for this architecture package. It remains a proposal pending owner approval.

The inspected repository contains older standalone root copies of documents 00–19 (for example, root 00 and 03 identify themselves as 2.0-proposed) alongside this merged 2.2.1 artifact. Until a synchronization decision is approved, this merged package is the controlling reconciled architecture reference; the root standalone copies are legacy snapshots and must not override it. Phase 0/1 must establish a document authority manifest and either synchronize canonical standalone copies or formally designate the root copies as historical. Do not maintain two active authorities.

The repository-reconciled execution plan makes ADR-013 a Phase 0 hard gate, requires an owner-selected first user journey under ADR-001, and prohibits parallel Firebase/FastAPI/PostgreSQL sources of truth without an explicitly approved hybrid ownership contract. OD-001–OD-008 remain unchanged and owner-approved only within their stated boundaries. No open ADR or proposed psychometric recommendation is promoted by this addendum.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-01"></a>

# Document 01 — Master Architecture.md

> **Source filename:** `01 — Master Architecture.md`
**Purpose:** Master product vision, system architecture and engine boundaries
**Source last modified:** 2026-11-13 09:32:59 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `b3020104a14d5562841875fc30db6bb22b6fd7d9c671bd36b3162becf946c3ea`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Master Architecture

**Version:** 2.2-proposed | **Status:** Documentation baseline for owner/specialist review; OD-001–008 as sourced approvals; not implementation authorization | **Date:** 13 November 2026

## 1. Product identity and complete vision

PsychoContext is a unified, comprehensive platform for multidimensional psychological assessment, consultation, clinician support, knowledge evolution, research and specialized programs serving patients, students, adolescents (subject to safeguards), employees, families, universities, schools, institutions and community beneficiaries. It is not a questionnaire website, diagnostic chatbot, clinic-management-only system, single-school system or unrelated test collection.

Human functioning is multidimensional, dynamic, contextual, interconnected and longitudinal. Preserve relationships among cognitive, behavioral, emotional, social, environmental, cultural, developmental and other justified dimensions. Distinguish screening, psychometric measurement, contextual assessment, formulation, diagnosis, treatment, follow-up and research. Non-normative behavior is not automatically pathology. Raw validated psychometric scores remain as specified; context informs interpretation and formulation, not unauthorized score alteration.

## 2. Owner-approved architectural decisions reflected here

The owner-supplied master prompt explicitly establishes eight decisions as authoritative owner clarifications: (1) CBDNA is an independent core engine; (2) taxonomy is multi-axial with many-to-many links; (3) patient memory may generate research candidates only through governed transformation; (4) AI-assisted knowledge evolution is hybrid and specialist-reviewed; (5) qualified clinician has absolute final clinical authority; (6) use the working name PsychoContext Advanced Adaptive RAG Architecture, without claiming “RAG 5” is an official standard; (7) preserve full product scope through four capability-maturity levels; (8) define a free Military Applicant Psychological Readiness Program for Egyptian applicants as a distinct civilian wellbeing service, not military rehabilitation/physical preparation/official admissions testing.

These are **owner-approved decisions in this documentation baseline**. Scientific validity, legal permissibility, service operations and implementation remain separately pending where stated.

## 3. Core architecture domains

- **CBDNA Engine:** independent platform engine for multidimensional, contextual, dynamic and longitudinal pattern representation. It connects sources and constructs but does not diagnose, prescribe, produce a universal score or overrule clinicians. Candidate mathematics and use maturity are specified in 08/16.

- **Measurement & Psychometric Evolution:** instrument and evidence registries, governed forms, deterministic scoring and versioning. Knowledge updates never automatically alter validated instruments or scoring.

- **Clinical Formulation & Treatment Support:** clinician-authored formulation, diagnosis, care plan, longitudinal follow-up and optional AI decision support. Clinician remains authoritative.

- **Knowledge evolution:** controlled clinical evidence, research knowledge, platform knowledge, patient clinical memory, clinician working memory and AI session context remain distinct stores with governed flow.

- **Unified programs/services:** clinical, educational, family, institutional and community journeys share platform foundations but have scoped consent, roles and data boundaries. Do not fragment every program into a separate product.

## 4. Capability maturity, not deleted scope

All intended domains remain in the architecture. Each capability is assigned maturity: **Level 1 Foundational** safe/basic function; **Level 2 Enhanced** deeper workflow and integrations; **Level 3 Advanced** cross-domain analytics and sophisticated workflows; **Level 4 Research-grade** features requiring studies, scientific/ethics review or research protocols. Maturity is not importance. A Level 4 capability may be visible in the roadmap and architecture while disabled in production until validated. The initial release itself remains an open owner choice (ADR-001); do not construe the earlier synthetic-prototype recommendation as an approved removal or deferral of whole domains.

## 5. Clinical and AI authority

AI may retrieve evidence, summarize, extract candidate facts, suggest assessments, identify candidate patterns, compare information and offer possible explanations with limitations. AI may not make final diagnosis/treatment decisions, override the clinician, modify validated scores, autonomously initiate/change treatment, or present hypotheses as approved conclusions. Enforce in architecture, permissions, APIs, data models, UI, orchestration, audit and tests—not by disclaimer alone.

## 6. Military Applicant Psychological Readiness Program

The owner-defined service is **برنامج الاستعداد النفسي للمتقدمين للكليات العسكرية** / **Military Applicant Psychological Readiness Program**, intended to be free for Egyptian young men applying after secondary education. It addresses wellbeing under academic pressure, examination disappointment, application anxiety, confidence, emotional balance, coping, self-understanding and monitored progress. It may include appropriate initial assessment, education, developmental exercises, follow-up and reassessment.

It is a civilian service provided independently by PsychoContext. It is not physical military preparation, military rehabilitation, medical clearance, official assessment, official admissions preparation authority, military affiliation or replacement for official procedures. It cannot guarantee acceptance or predict outcomes; it must not coach concealment/manipulation of official test responses. Owner rationale—that support may help applicants approach assessments in a more balanced state—is recorded as intended benefit, not established effect on admission outcomes. Full specification is in 13.

## 7. Islamic psychology and Fitrah

Islamic psychology may appear as one governed assessment/knowledge perspective when measures, evidence and rights support it. It is not the sole scientific foundation. Future Quran-and-Sunnah-based Fitrah research is separate, not an already validated measure or diagnostic model.

## 8. Data, roles and governance

Roles include beneficiary/patient, student/applicant, clinician, supervisor, researcher, family/program participant, institution/program administrator and platform administrator as applicable. Define least privilege, purpose-specific consent, tenant separation and service boundaries. Clinical, military-applicant program, research and institutional records require explicit separation rules. Clinician credentials and emergency operations must be verified before live clinical service.

## 9. Development and authority

Documents 02 and 08/16 govern knowledge/CBDNA; 03/17 technical design; 11 clinical authority/safety; 12 instruments; 13 the named applicant program; 14 privacy; 15 capability maturity; 06 decisions; 07 traceability. Conflicts are documented in 10 and 18. No source implementation claim is verified by this architecture package. Implementation proceeds by capability and evidence gates without erasing future scope.

## Proposed enhancement — Psychometric Governance & Adaptive Assessment Architecture (pending approval)

A proposed platform component is a governed psychometric registry plus an adaptive assessment recommendation service. This extends, but does not replace, the approved architecture. It must distinguish contextual integration of separate evidence from mathematical score aggregation and causal inference. A clinician may synthesize evidence-informed relationships among separate results in a contextual formulation while preserving each measure, score, source, version and limitation. The platform must not combine scores into an unsupported composite, infer causality from correlation, or context-adjust validated scores without a validated scoring method. Final instrument selection and clinical interpretation remain with the qualified clinician.

## Baseline 2.2 engine contracts (target; ratification pending)

| Engine/module | Owns authoritative records | Reads | Output | Prohibited authority |
| --- | --- | --- | --- | --- |
| Identity & Access | User, membership, role grant, credential state, consent | Authenticated identity, organization/service scope | Authorization decision and audit event | Self-grant professional/research role; infer authority from UI |
| Psychometric Registry & Scoring | Instrument version, exact approval scope, scoring specification/result | Authorized response set and versioned scoring rules | Immutable original result/subscales and scoring trace | AI selection/order; arbitrary score edits or composites |
| CBDNA | Feature definitions/versions, observations, typed relations, lineage, uncertainty | Authorized source references and reviewed observations | Candidate/descriptive longitudinal evidence with provenance | Diagnose, prescribe, assign/alter/close risk, author clinician decision or own score |
| Clinical Formulation & Decision | Clinician formulation, diagnosis/decision, treatment plan/amendments | Verified facts, approved measures, reviewed evidence/CBDNA candidates | Draft formulation and attributable clinician decision | Directly sign/finalize AI or CBDNA output |
| Safety Operations | Protocol version, human assessment, referral/escalation, coverage config | Authorized indicator/referral inputs | Human-owned assessment/action events | Depend on AI/CBDNA/RAG; claim unverified staffing/coverage |
| Knowledge/RAG | Source registry/version, rights state, retrieval traces | Authorized, purpose-matched sources | Cited retrieval candidate or abstention | Approve science, grant rights, retrieve other patients by default |
| Research Governance | Protocol, legal/consent and ethics/privacy review, de-identification, approved findings | Authorized research candidates | Versioned finding and rollback record | Promote a single case automatically to shared knowledge |

Required flows: `source → typed observation → optional CBDNA candidate → clinician review → clinician-authored decision`; separately `approved instrument version + response → deterministic scoring → immutable result → contextual formulation`; and `possible safety indicator → qualified human assessment → approved operational action`. Research transfer follows a segregated protocol/review path. Engines may reference but may not mutate another engine's authoritative record except through its documented authorized command. When owner decisions or operational evidence are open, dependent features remain disabled or synthetic-only; the developer must not guess a substitute. See 03, 07, 08, 11, 12, 16.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-02"></a>

# Document 02 — Knowledge Architecture.md

> **Source filename:** `02 — Knowledge Architecture.md`
**Purpose:** Knowledge taxonomy, source-of-truth and evidence/memory architecture
**Source last modified:** 2026-11-13 09:33:01 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `00d4dc56c34502d65321bb0625903d33c196329d1f7954f463a7a9ff2978de69`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Knowledge Architecture

**Version:** 2.2-proposed | **Status:** Proposed source-of-truth contract; scientific claims and governance roles remain gated

## 1. Authority and domain distinction

This document defines taxonomy, ontology, construct/instrument/evidence registries and knowledge-store boundaries. Product scope is in 01/15; technical realization is in 03; CBDNA details are in 08/16; RAG in 17; governance in 09/12. The owner-approved multi-axial taxonomy decision is reflected here: categories are many-to-many, but related constructs or instruments are not thereby interchangeable and their scores must not be mathematically combined without evidence.

## 2. Separate architecture layers

- **Taxonomy:** navigational classification labels and facets.

- **Ontology:** formal concepts, definitions, relations, constraints and versioned semantics.

- **Construct Registry:** operational construct definition, dimensions, boundaries, populations, evidence and status.

- **Instrument Registry:** measures/forms/versions, items where authorized, administration, scoring, rights and approval.

- **Clinical Evidence Repository:** curated publications, guidelines and validated rules.

- **Research Knowledge Base:** governed, approved, de-identified findings and protocols.

- **Platform Knowledge Base:** approved workflow, service and educational content.

- **Patient Clinical Memory:** patient-specific care records; not general knowledge.

- **CBDNA:** independent core engine linking time-bounded observations and candidate constructs, never an instrument or diagnosis.

## 3. Multi-axial taxonomy

Use `Domain ↔ Category ↔ Subcategory ↔ Construct ↔ Dimension/Indicator`, supporting many-to-many mappings and relationship types (measured_by, associated_with, contextualized_by, may_overlap_with, evidence_for, not_equivalent_to). Potential domains include mood, anxiety/stress, trauma, personality/individual differences, cognition, emotional regulation, behavioral patterns, sleep, somatic experience, social and family functioning, development/adolescence, educational/occupational functioning, aging, socioeconomic/environmental context, wellbeing and Islamic psychology. This is an extensible index, not a claim of scientific completeness.

Every relation has definition, directionality (if applicable), evidence/provenance, status, author/reviewer, version, effective date and confidence/limitations. Avoid semantic links that imply causation or interchangeability without evidence.

## 4. Instrument hierarchy and evidence

`Instrument family → exact form/version/language → authorized item set → response options → scoring specification/version → interpretation rule → evidence/norm record → source/right/license → approval state`.

Each instrument record covers original source/author, purpose, construct, target population, language and translation lineage, Arabic/Egyptian evidence where available, reliability/validity and limitations, scoring/cutoff provenance, digital administration/reproduction rights, qualification/training, confidentiality, effective version, review date and approval. Public availability is not a license. Candidate status is not readiness. See 12 for release policy. Never invent norms, cutoffs, rights, translations or validation.

## 5. Evidence and knowledge lifecycle

A knowledge claim stores source, claim text, evidence type, population, design, sample, date, limitations, rights where relevant, reviewers, decision status, version and affected uses. Lifecycle: candidate → appraisal → specialist review → approved for bounded purpose → monitored → revised/suspended/retired. AI may suggest candidates but not self-publish knowledge. A specialist’s approval of a single case does not create a generalized scientific fact.

## 6. Data-store separation

Patient clinical memory, clinician working memory, AI task/session context, CBDNA feature graph, research knowledge, clinical evidence and platform knowledge are distinct by purpose, access, retention and version. Cross-store transfer requires authorized transformation and audit. Details of controlled discovery are in 09; CBDNA model/data in 08/16; privacy in 14.

## 7. Scoring and interpretation

Scoring is deterministic, versioned and tied to exact authorized form. Preserve raw validated scores and subscales. Keep DASS-21 subscales distinct. Do not average unrelated scales into a universal score, apply an unvalidated contextual coefficient, or infer diagnosis from screening. Context is a linked formulation input. Interpretation shows version, population scope, limits and source.

## 8. Knowledge retrieval

The working system name is PsychoContext Advanced Adaptive RAG Architecture (owner decision 6). RAG 5 is not claimed as a standard. Use 17 for ingestion/retrieval/evaluation specification. Enforce authorization before retrieval, provenance and version awareness, evidence citation, Arabic evaluation and patient-memory isolation.

## 9. Islamic psychology and Fitrah

Represent Islamic psychology as one domain/perspective where instruments/evidence/rights permit. Future Fitrah model has separate construct/research governance and cannot be treated as validated without evidence and review. See ADR-015, 08 and 10.

## Proposed enhancement — instrument lifecycle and version authority (pending approval)

An instrument’s presence in a registry is not approval for administration. Proposed lifecycle states: `Discovered → Under Review → Evidence Reviewed → Rights Verified → Language Validated → Approved → Suspended / Retired`. State transitions are evidence-backed, attributable and may be conditional; `Approved` must be scoped to **Instrument + Version + Language + Population + Context + Intended Purpose**. Preserve separate source records for original form, published translation, cultural adaptation, psychometrically evaluated version and PsychoContext digital implementation. Each exact version links to rights, evidence, administration/scoring rules, changes and approvals. Any content, administration, scoring or interpretation change creates a new version and immutable change record. Contextual cross-measure formulation may relate distinct evidence; it does not authorize score aggregation or causal claims.

## Baseline 2.2 authoritative ownership map (target)

| Information object | Authoritative owner | Canonical record | Other modules may hold |
| --- | --- | --- | --- |
| Instrument version, rights and approval scope | Psychometric registry under 12 | `InstrumentVersion`, `ScopedApproval`, `RightsDossier` | Read-only references only; no copied approval state |
| Responses and original score | Assessment/scoring service | `AssessmentAdministration`, `ResponseSet`, `ScoreResult` | CBDNA/formulation reference only; cannot rewrite |
| Patient report / clinician-verified fact | Clinical record | `SourceRecord`, `VerifiedFact` | Pseudonymous reference in analytics only if authorized |
| CBDNA definition, candidate relation, derivation | CBDNA engine | `FeatureDefinition`, `FeatureVersion`, `FeatureObservation`, `DerivationLineage` | Candidate reference and review state |
| Diagnosis/formulation/treatment decision | Qualified clinician workflow | `ClinicianDecision`, `Formulation`, `TreatmentPlan` | Scoped read-only references |
| Safety disposition/action | Human-owned safety workflow | `HumanSafetyAssessment`, `SafetyAction` | Indicator references; no autonomous write authority |
| Approved research finding | Protocol-governed research store | `ApprovedFinding` with protocol/review/version | No raw patient memory or general researcher case retrieval |
| Retrieval result | Request trace, not a new fact | `RetrievalTrace`, source/version/span | Draft citation only; source approval remains elsewhere |

Controlled relation predicates: `measured_by`, `candidate_indicator_of`, `associated_with`, `contextualized_by`, `contradicts`, `derived_from`, `supported_by`, `reviewed_by`, `supersedes`. General taxonomy excludes a `causes` edge; a causal claim requires a separate reviewed evidence model. Every relation carries source, scope, temporal validity, status/reviewer and limitations. Schema relationships do not license score combination, diagnosis or treatment.


--- END FULL SOURCE CONTENT ---

---

<a id="doc-03"></a>

# Document 03 — Technical Implementation Blueprint.md

> **Source filename:** `03 — Technical Implementation Blueprint.md`
**Purpose:** Technical stack, modules, APIs, entities, security, tests and migration contracts
**Source last modified:** 2026-11-13 09:36:36 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `3df8a63c47fa26728dc5ee222510dd32b5c3f39f27c86442b7e723b4f31e34ab`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Technical Implementation Blueprint

**Version:** 2.2-proposed | **Status:** Target design contract; not implementation evidence or final hosting selection

## 1. Target direction

Adopt the owner-specified planning direction: Python/FastAPI backend; Pydantic contracts; SQLAlchemy/Alembic persistence; TypeScript/React frontend; PostgreSQL system of record; optional pgvector only after retrieval evaluation; encrypted object storage where needed; modular monolith first. No unnecessary microservices. Hosting, identity vendor, residency, budget and operations remain ADR decisions.

Python owns domain rules, deterministic psychometric scoring, validation, AI orchestration, knowledge processing, CBDNA derivation, retrieval and research processing. TypeScript owns UI, interaction, navigation, accessibility, state presentation and workflow. Share API schemas through generated/validated contracts; never duplicate scoring logic in browser.

## 2. Logical modules

Identity/access; organizations/tenancy; consent; clinical patients/encounters; applicant/program participants; assessment and instrument registry; formulation/diagnosis; treatment; safety; CBDNA engine; knowledge/evidence; advanced adaptive RAG; research governance; programs; audit/operations. Modules share platform services but enforce purpose boundaries. Clinical and applicant records are separately identified and authorized.

## 3. Core data entities and naming authority

Use the canonical entity names below across the domain model, OpenAPI schemas, persistence mappings, RTM rows and tests. Documents 02/12 own knowledge and instrument semantics; 16 owns CBDNA entity semantics; 03 owns the cross-domain API and implementation contract. A name used only as a UI label or API projection must not silently become a second persisted source of truth.

- **Identity and access:** `User`, `Organization`, `Membership`, `RoleGrant`, `Credential`, `Consent`.
- **Clinical source and formulation:** `Patient`, `Encounter`, `SourceRecord`, `ExtractedFact` (unverified candidate), `VerifiedFact` (human-verified fact linked to its source), `ContextRecord`, `Formulation`, `ClinicianDecision`, `TreatmentPlan`.
- **Psychometrics:** `Instrument`, `InstrumentVersion`, `ScopedApproval`, `AssessmentOrder`, `AssessmentAdministration`, `ResponseSet`, `ScoreResult`, `Interpretation`. One administration binds to exactly one immutable instrument version; one response set and each score result retain that version and scoring-spec lineage.
- **CBDNA:** `FeatureDefinition`, `FeatureVersion`, `FeatureObservation`, `FeatureValue`, `SourceAttribution`, `ContextRecord`, `TemporalWindow`, `UncertaintyRecord`, `ContradictoryObservation`, `DerivationMethod`, `DerivationLineage`, `ReviewEvent`, `Relation`. The authoritative definitions and cardinalities are in 16.
- **Safety:** `SafetyIndicator`, `HumanSafetyAssessment`, `SafetyAction`, `CoverageConfig`; a `SafetyEvent` may be an aggregate/workflow container only and is not a substitute for these three independently attributable records.
- **Knowledge and research:** `SourceDocument`, `SourceVersion`, `KnowledgeCandidate`, `ResearchProtocol`, `ProtocolApproval`, `ExportApproval`, `ResearchCandidate`, `ApprovedFinding`, `AuditEvent`, `ProviderCall`, `Incident`.
- **Retrieval:** `RAGIndexVersion`, `RetrievalTrace`, `CitationSpan`; index records retain source-version and deletion lineage.

**Canonical-name corrections:** `FeatureDefinitionVersion` is not a separate entity; use `FeatureDefinition` + `FeatureVersion`. `CBDNAFeatureDefinition`/`CBDNAFeatureVersion` are deprecated aliases; use the same canonical pair. `Session`/`Response`/`Score` in the earlier illustrative inventory mean `AssessmentAdministration`/`ResponseSet`/`ScoreResult` only when they refer to psychometric administration data. `AssessmentResult` is not a separate authoritative entity; use `ScoreResult`. `ClinicalReview` is a view/aggregate over append-only `ReviewEvent` records, not a competing write model. `EvidenceLink` is an API projection of a typed `Relation`, not a second source of truth. Do not use `FeatureDefinitionVersion`, `AssessmentResult`, or generic `Score` in new schema/API work.

## 4. API principles and examples

Use versioned REST/OpenAPI contracts, schema validation, least-privilege authorization in every handler and service, tenant/purpose filters, idempotency for writes, optimistic concurrency, explicit errors, pagination, correlation IDs and audit events. Example endpoints: `POST /v1/encounters`; `POST /v1/intake/extractions` returning candidates with source spans but not verified writes; `POST /v1/assessment-orders` only for approved instrument versions; `POST /v1/cbdna/observations` with provenance and review state; `POST /v1/knowledge-candidates` requiring workflow state; `GET /v1/knowledge/search` with authorization/version metadata; `POST /v1/clinician-decisions` authenticated and attributable. No AI final-diagnosis or treatment-write endpoint.

## 5. CBDNA engine boundary

A domain service manages feature definitions/versions, observation ingestion, provenance, context/temporal links, contradictions, derivations and clinician review. Mathematical models are pluggable, versioned, purpose-specific and disabled until approved. Engine output is candidate/descriptive by default. It cannot independently initiate safety event, diagnosis or treatment. Failures must not block independent clinical safety procedures. See 08/16 and RTM-23–28.

## 6. Advanced Adaptive RAG boundary

Ingestion and retrieval pipeline in 17; retrieval indexes exclude patient memory unless a distinct authorized clinical-memory search is invoked. Separate access scopes, indexes/partitions, query routing and audit. Do not cross-retrieve other patients’ data. Knowledge graph links express curated relations, not automatic truth. Version index and embedding changes; evaluate Arabic queries and retrieval quality.

## 7. Security and privacy

Backend authorization; tenant isolation; RBAC/ABAC where justified; MFA for privileged roles; credential verification; TLS, encryption at rest, key management, secrets manager; restricted object links; retention/deletion; consent purpose checks; protected audit; logging minimization; rate limits; secure headers; dependency scanning; backup/restore drills; incident response; production/demo separation. No clinical data in localStorage. AI provider adapter blocks disallowed data and captures model/prompt/source versions. No real data to external AI before provider review.

## 8. Asynchronous operations and observability

Use a task queue for transcription (if approved), indexing, de-identification and research jobs. Idempotent retries, explicit state and dead-letter handling. Monitor latency, failures, queue depth, permissions, source freshness, RAG abstention/citation metrics, CBDNA derivation reproducibility and audit integrity—without logging sensitive content unnecessarily. Failures must surface as failed/pending, never false success.

## 9. Testing

Unit tests for scoring test vectors, many-to-many ontology relations, CBDNA lineage, uncertainty and non-comparability; integration tests for auth, consent, tenant isolation, DB failure, provider timeout and RAG access filters; E2E for clinician workflow and separate applicant program; security tests for privilege escalation, prompt injection, cross-patient retrieval, reidentification, exports; research approval-state tests; Arabic/RTL/accessibility; backup restore and migration reconciliation. RTM provides acceptance criteria.

## 10. Migration and deployment

The current repository and selected source files were inspected read-only as recorded in 04/19; runtime, full schemas, provider settings and test environment were not verified. Before migration, complete the repository baseline and audit every claim. Build an isolated target with synthetic data, map only necessary/authorized fields, dry-run, reconcile counts/checksums, privacy review and rollback. Controlled cutover only after explicit release sign-off. See 18/19.

## Proposed enhancement — adaptive assessment recommendation service (pending approval)

Add a recommendation service returning candidate instruments, not an automatically selected battery. Inputs may include age band, language/version availability, stated purpose, context, already available information, prior instruments and burden. Each recommendation must return reason, evidence/source/version, limitations, rights/approval scope, alternatives/overlap, estimated respondent burden and missing-data caveats. API records the clinician’s final selection, acceptance/rejection/replacement and rationale separately from AI suggestions. Proposed endpoints: `POST /v1/assessment-recommendations` (draft candidates); `POST /v1/assessment-orders` (clinician-authorized order only); `POST /v1/instrument-version-changes` (governance workflow). Enforce exact approval scope server-side. Reports preserve original results and each source/version. Test that AI cannot directly order a measure, unapproved versions cannot be ordered, score outputs remain separate, and recommendation/rejection decisions are auditable.

## Baseline 2.2 domain/API contract (proposed)

All writes require an authenticated principal, tenant/service scope, purpose, schema validation, server-side authorization, idempotency, audit correlation and explicit failure response. AI outputs remain draft objects; no service-principal endpoint may mutate a clinician decision, instrument approval, safety disposition or approved knowledge.

| Module | Illustrative versioned endpoints | Authoritative entities | Role guard |
| --- | --- | --- | --- |
| Identity/consent | `GET /v1/me`; `POST /v1/consents`; `POST /v1/role-grants` | User, Membership, RoleGrant, Credential, Consent | Role grant by authorized admin/verifier; no self-elevation |
| Clinical | `POST /v1/encounters`; `POST /v1/source-records`; `POST /v1/formulations/drafts`; `POST /v1/clinician-decisions` | Encounter, SourceRecord, VerifiedFact, Formulation, ClinicianDecision | Only credentialed clinician finalizes decisions |
| Psychometrics | `GET /v1/instruments`; `POST /v1/assessment-orders`; `POST /v1/assessment-administrations`; `POST /v1/score-runs` | InstrumentVersion, ScopedApproval, Administration, ResponseSet, ScoreResult | Exact scope checked server-side; deterministic scorer writes result |
| CBDNA | `POST /v1/cbdna/observations`; `GET /v1/cbdna/subjects/{id}/timeline`; `POST /v1/cbdna/reviews` | FeatureDefinition, FeatureVersion, FeatureObservation, ContextRecord, DerivationLineage, ReviewEvent | Candidate state explicit; no safety/diagnosis write |
| Safety | `POST /v1/safety/indicators`; `POST /v1/safety/assessments`; `POST /v1/safety/actions` | SafetyIndicator, HumanSafetyAssessment, SafetyAction, CoverageConfig | Assessment/action require authorized human |
| Knowledge/research | `POST /v1/knowledge/candidates`; `POST /v1/knowledge/reviews`; `POST /v1/research/exports` | SourceVersion, Candidate, Review, Protocol, ExportApproval, Finding | Export fails closed until required approvals |
| RAG | `POST /v1/knowledge/search`; `GET /v1/retrieval-traces/{id}` | RetrievalTrace, SourceVersion, CitationSpan | Permission filtering before retrieval and response |

Use explicit error codes: `401 unauthenticated`, `403 scope_denied`, `409 stale_version_or_state`, `422 invalid_or_unapproved_scope`, `503 dependency_unavailable`. A failed save must never return success. CBDNA/RAG/AI availability is not a precondition for the human safety workflow.

### Entity/cardinality contract

One instrument family has many immutable versions; each approval names exact version and language/population/context/purpose. One administration uses exactly one approved version and has many responses and separately defined score outputs. A CBDNA observation references source records; every derivation has a versioned method and immutable input lineage. Clinical decisions reference, but do not absorb, AI hypotheses or raw scores. Safety preserves separate indicator, human assessment and action. Research findings link to approved protocol and de-identification review.

### Current → Target migration contract

The repository baseline must map each current route/component/collection/rule/utility to `Keep / Adapt / Replace / Retire`, evidence path+commit, target module/entity/API, data class, tests, owner and rollback. At minimum map Firebase Auth/Firestore, patient/visit collections, client scoring, Gemini server route, local/offline behavior, role rules, assessment UI, clinical notes and tests. No clinical migration before lawful purpose, consent, retention, source-to-target reconciliation and rollback approval. A write path that returns success after persistence failure is a defect candidate requiring a reproducible test, not a conforming feature.

### Target deployment diagram (text)

`React/TypeScript client → FastAPI gateway → modular domain services → PostgreSQL`. Identity/consent authorization precedes access. Encrypted object storage holds approved artifacts. A worker handles approved indexing/research jobs. Provider adapters receive minimum authorized payload and cannot commit decisions. Human safety path remains callable independently. During migration, Firebase is isolated behind an adapter until mapping and cutover/rollback pass; no big-bang assumption.


## Addendum — technology choice and migration gate (Revision 2.2.2)

The inspected repository currently contains a React/TypeScript/Vite application, an Express server, Firebase Authentication/Firestore integration and Gemini routes. The target direction described above (FastAPI/PostgreSQL) is not yet an implemented backend and is not approved merely by appearing in this blueprint.

**ADR-013 must be resolved before backend, identity or persistence implementation begins.** The owner and engineering/security reviewers must select one of: (A) retain Firebase as the authoritative backend and remediate it; (B) migrate to FastAPI/PostgreSQL using a staged, tested migration and cutover; or (C) approve a bounded hybrid with explicit ownership for identity, authorization, each entity, audit and persistence. A hybrid cannot leave two writable sources of truth.

Until ADR-013 is approved, no new backend scaffold, database migration, production data movement or parallel identity system may be treated as authorized. The Current→Target→Migration map must identify exact existing files, target modules, data owners, read/write transition, reconciliation, rollback and the condition for retiring each legacy path. The existing Firebase implementation must not be deleted or bypassed before migration evidence and rollback are accepted.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-04"></a>

# Document 04 — Conversation Audit & Gap Analysis.md

> **Source filename:** `04 — Conversation Audit & Gap Analysis.md`
**Purpose:** Conversation evidence audit, repository observations and source limitations
**Source last modified:** 2026-11-13 09:36:39 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `c7a3ebb65f58ac3f8a3a736f75e7e7aa8f3fd8c9e0f823e9340320b9f540ccca`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Conversation Audit & Gap Analysis

**Version:** 2.2-proposed | **Status:** Source-bounded reconstruction plus limited read-only repository inventory; not exhaustive transcript or runtime audit

## 1. Evidence classification

Use OWNER REQUIREMENT; OWNER-APPROVED DECISION; OWNER-APPROVED PROPOSAL; ASSISTANT PROPOSAL; HISTORICAL IMPLEMENTATION CLAIM; LOVABLE CLAIM; VERIFIED IMPLEMENTATION; UNVERIFIED IMPLEMENTATION; ARCHITECTURAL RECOMMENDATION; SCIENTIFIC VALIDATION REQUIRED; LEGAL/ETHICAL REVIEW REQUIRED; PENDING OWNER DECISION. The latest owner-supplied prompt explicitly labels decisions 1–8 as authoritative owner clarifications; this audit treats them as OWNER-APPROVED DECISIONS from that source. No application feature is independently verified in this documentation review.

## 2. Available evidence

Available: master prompt; `Start building this app from html.docx` (partial Nov 6 action history); `PsychoContext.docx`; `TASK.docx`; V2 assessment/blueprint; V7 master blueprint and appended proposals; evolution/history summaries; prior V2 implementation audit; seven baseline documents; combined 01–07 reference artifact; owner clarification prompt; and the current repository at the confirmed path, whose limited read-only inspection is summarized below. Still missing: clearly complete verbatim conversation export; deployment/runtime and test results; instrument rights dossiers; independent local validation evidence; provider contracts/settings; clinical operations evidence. Prior audit defects remain reported findings until reproduced.

## 3. Evolution and corrected understanding

- **Early prototype (Nov 6, summarized):** Arabic assessment, contextual variables, measures, progress UI, audio complaint/intake; action histories use “Built” claims.

- **Clinical expansion:** owner requests references, further measures only with authoritative items/scoring, CBT, clinician-edited diagnosis, AI treatment suggestions and case memory. Prior audit alleges partial/local/mock features; unverified here.

- **Broader platform vision (Nov 8–9):** multidimensional psychological platform, knowledge architecture, research and services; clinician authority and evidence caution.

- **New explicit clarifications (current attachment):** CBDNA is an independent core engine; multi-axial many-to-many taxonomy; governed patient-memory-to-research process; hybrid AI-assisted knowledge evolution; absolute qualified-clinician authority; “RAG 5” refers to anticipated latest practices, but is not a formal standard and working name is Advanced Adaptive RAG; complete vision remains across capability maturity levels; military service is specifically a free civilian Military Applicant Psychological Readiness Program for Egyptian applicants—not generic readiness, MIL-PREP as an official test, physical preparation or military rehabilitation.

## 4. Eight owner-approved decisions in supplied prompt

1. CBDNA independent core engine; multidimensional/time/context; not diagnosis/personality/universal score.

1. Multi-axial taxonomy with many-to-many relationships; association does not authorize score combination.

1. Patient clinical memory may generate research candidates through governed, de-identified and reviewed transformation; no automatic generalization or score changes.

1. Hybrid AI-assisted knowledge evolution; specialist and methodological review required; no single-case fact promotion.

1. Qualified clinician is authoritative; AI advisory across system, enforced architecturally.

1. Working architecture name is PsychoContext Advanced Adaptive RAG Architecture; “RAG 5” not official standard; evaluate techniques by evidence, Arabic performance, privacy, cost and maintainability.

1. Preserve full product vision through Level 1 Foundational, 2 Enhanced, 3 Advanced, 4 Research-grade capability maturity—not by deleting or indefinitely postponing domains.

1. Free Egyptian Military Applicant Psychological Readiness Program; service goal is wellbeing, coping, confidence, emotional balance and progress; explicitly non-official, non-predictive, no admissions coaching/deception, not physical preparation/rehabilitation.

## 5. Historical claims and gaps

Prior documents report React/TypeScript, Firebase/Firestore, Gemini, scale content/scoring, speech, CBT local storage, diagnosis UI, AI pathways, mock memory bank and potential false-success saves/role flaws. These remain HISTORICAL/LOVABLE CLAIM or UNVERIFIED IMPLEMENTATION until exact repository and runtime are inspected. A listed instrument is not proof of rights or validation. A UI is not a verified service. A previous audit’s defect is not a current reproduced defect.

## 6. Major contradictions and reconciliations

| Conflict | Source distinction | Reconciled target | Status |
| --- | --- | --- | --- |
| Context adjustment vs raw scores | Historical prototype claim vs repeated owner requirement to preserve validity | Context enriches formulation; raw validated scores unchanged absent validation | Resolved as architectural rule; any future model requires evidence |
| Full vision vs MVP narrowing | Assistant safety proposal vs owner decision 7 | Preserve every domain; use maturity levels and release gates | Owner-approved scope principle; initial release choice remains open |
| CBDNA vs clinical authority | Owner engine decision vs safety boundary | Core engine can organize/analyze patterns; cannot make clinical decisions | Owner-approved boundary |
| Memory vs generalized science | Owner wants case learning vs governance | Candidate extraction → specialist/method review → ethics/de-identification → approved research knowledge | Owner-approved governance direction; operational protocol pending |
| AI learning vs scientific validity | AI capability vs owner decision 4 | AI assists discovery; only approved evidence updates knowledge | Owner-approved direction; validation criteria remain to be detailed |
| RAG 5 | Earlier undefined phrase vs owner clarification | Use working name Advanced Adaptive RAG; not an official version | Owner clarification accepted; implementation design in 17 |
| Military scope | Earlier MIL-PREP/generic readiness reinterpretation vs clarified actual service | Free civilian psychological wellbeing/preparation for Egyptian applicants; no official/admission function | Owner-approved clarification; operational/clinical/legal review pending |
| Islamic psychology/Fitrah | Domain vs future model | One perspective where evidence/rights exist; Fitrah distinct future research | Prior owner boundary preserved |
| “7 validated scales” | Historical assistant claim vs missing evidence | Candidate instruments remain individually gated | Evidence pending |
| Full history/implementation | Summaries/action claims vs requested exhaustive audit | Mark missing transcript/source; no verification claims | Blocked on source recovery |

## 7. Gaps

Scientific: construct ontology, Arabic population evidence, CBDNA model selection, measurement invariance, validation plan, instrument rights, military applicant program outcome evidence. Clinical: accountable service owner, pathways and safety staffing, minors policy, scope-of-practice and sign-off. Technical: full repository/runtime baseline, model/feature lineage, implemented API contracts, RAG Arabic benchmark, security and restore tests. Privacy/legal: jurisdiction, consent, residency, provider terms, research basis. Product: first implementation slice within the preserved complete vision and maturity framework.

## 8. Recommended next evidence

Acquire raw conversation/action histories, source repository/commit and test deployment; audit with trace evidence; obtain instrument source/rights/local validation dossiers; assign clinical, psychometric, legal, privacy, engineering and operations owners; then approve the capability-level release plan. See 18/19 for update report and actions.

## Additional source reviewed — proposed psychometric enhancement (11 November 2026)

The supplied `pasted_content_5.txt` is explicitly a **proposed enhancement pending owner approval**, not a new owner decision. It proposes Psychometric Governance & Adaptive Assessment Architecture; it clarifies contextual integration versus score aggregation; and recommends lifecycle/version controls, interpretable instrument recommendations, clinical report provenance and operational safety steps. The supplied text itself states it ends part-way through its impact list and gives no detailed change requirements for documents 13–19. This audit records the source and its stated limits; it is not evidence that the application already implements these functions or that cited external standards were verified.

## Repository Implementation Baseline — read-only observations (13 November 2026)

**Scope/method:** Read-only inventory and source inspection at the owner-confirmed `D:\Physo\Physiological`. Git was queried with a command-scoped safe-directory override; no global Git setting or tracked source was changed. Inspected root/package metadata, `server.ts`, `src/services/clinicalDatabase.ts`, `src/utils/psychometrics.ts`, `firestore.rules`, and `firestore.rules.test.ts`. This is not runtime execution or a security audit.

**Observed:** branch `main` tracks `origin/main`; last observed commit `3404a0f` dated 8 November 2026 (`feat(db): enable offline persistence and add military prep scale`). Declared dependencies include React 19, TypeScript 7, Vite 8, Express/tsx, Firebase 13 and Google GenAI; scripts include `build`, `lint` (`tsc --noEmit`) and `dev/start`. `server.ts` defines a Gemini scale-recommendation endpoint whose prompt includes complaint/demographic content and requests tone/speech-rate estimates based on text. `clinicalDatabase.ts` writes patient/visit records using Firestore and includes a fallback returning a patient ID after a write error. `psychometrics.ts` contains scoring and severity labels. `firestore.rules` grants read/write to users satisfying a broad `doctor` role. The single rules test is labelled conceptual/mock, reads `DRAFT_firestore.rules`, and has an incomplete ownership test. These are code observations only; each behavior requires dedicated tests/review before defect classification.

**Worktree preservation:** Git reported two tracked Arabic Markdown files deleted and multiple untracked materials (`.manus/`, `.work/`, `Existing_Documents/`, proposal folders, `Source_Conversation/`, `outputs/`, and a proposal ZIP). Preserve these; do not reset, delete, stage or overwrite them. Recheck exact worktree state before any code change.

**Remote/local commit reconciliation (verified during corrective revision 2.2.1):** GitHub `main` currently points to full commit `754a3b82b6abff80506835a76b0f5bb4364308b0` (parent `3e0a6519b80bbdea8b8ea8e93d20b7d75f57e815`, commit message `Add files via upload`, 13 November 2026 08:13:14Z). This is not the same identifier as the local checkout's last-observed short commit `3404a0f` (8 November 2026). The local observation may describe a different/stale checkout; its ancestry and file-tree equivalence to remote `main` have not been established. Therefore the source inventory above must not be represented as a verified inspection of remote commit `754a3b82...`. Before implementation mapping, inspect the exact remote tree/commit and rerun the repository inventory against that SHA.

### Remote GitHub source inspection — read-only (13 November 2026)

**Exact inspected commit:** `58ddd366ca3759d05a26a9515cd73c65743038c4` (the documentation-correction commit current at inspection). The recursive tree contains 80 files. Relevant files read include `package.json`, `server.ts`, `firestore.rules`, `DRAFT_firestore.rules`, `firestore.rules.test.ts`, `src/services/clinicalAuth.ts`, `src/services/clinicalDatabase.ts`, `src/lib/firebase.ts`, `src/utils/psychometrics.ts`, `src/App.tsx` and `src/types/clinical.ts`. This is static source inspection only; no code was executed.

**P0 security/data-integrity findings requiring remediation before any real clinical data or live deployment:**

1. `src/services/clinicalAuth.ts` contains built-in staff accounts with the PIN `123456`, accepts the literal values `123456`, `admin` or `doctor` as login alternatives, and stores the resulting staff identity/role in browser `localStorage`. `loginStaff` does not establish Firebase Authentication identity for those preset accounts. This is not a trustworthy authentication or clinician-credential verification boundary.
2. `firestore.rules` grants patient and visit read/write access to any signed-in user whose user document says `role == 'doctor'`; it does not enforce per-patient ownership or tenant/service scope. The `/users` collection is readable by every signed-in user. The stricter owner-scoped rules are in `DRAFT_firestore.rules`, not the active `firestore.rules` file.
3. `firestore.rules.test.ts` loads `DRAFT_firestore.rules` rather than `firestore.rules`; its second test contains only a comment and no assertion. Therefore it does not establish that the active deployed rules enforce the intended controls.
4. `server.ts` exposes `POST /api/ai/recommend-scales`; the inspected route has no visible authentication/authorization middleware and forwards complaint and demographic fields to Gemini. Provider authorization, data minimization, retention terms and consent controls are not established by the route. The prompt also asks the model to infer voice tone and speech rate from text, which is not an audio measurement and must not be represented as one.
5. `src/services/clinicalDatabase.ts` returns a generated `patientId` from the `upsertPatient` catch block after Firestore persistence fails. Callers can therefore receive a success-shaped result even though the patient record was not saved. This directly conflicts with the target rule that persistence failure must be explicit.

**Additional implementation constraints:** `package.json` declares `build` and `lint` scripts but no test script. `src/utils/psychometrics.ts` contains client-side scoring and threshold logic; this must not remain authoritative in the browser under the target architecture. Instrument permissions/versions and local validation are not evidenced by these source files. These findings are reproducible source facts, not proof of production exploitation or deployed configuration.

**Not established:** runtime behavior, deployed build, actual role assignments, production rules, database contents, provider retention configuration, instrument rights/validity, safety operation, or pass/fail status. `npm run lint` did not complete because the terminal session became unavailable; build/tests were not run. No implementation, security, legal, scientific or clinical readiness is certified.

Use labels precisely: `Observed source` = path read; `Declared` = package metadata; `Not run` = no execution result; `Inferred risk` = requires reproduction. Do not call an inferred risk a defect until a test reproduces it, or a declared script a pass without command/log/exit code.


## Addendum — additional repository findings from the inspected main commit

The repository tree and source inspection at `main` commit `3445d55a4cca583d67546ca69c87e025fc0edd45` also identified the following static findings. These are not runtime test results:

6. `src/services/clinicalDatabase.ts` contains a default hybrid scale named `MIL-PREP` with military-applicant wording, item weights and a generic unified percentage/severity interpretation. This must be disabled from active assessment paths until an exact instrument dossier, rights, population/language evidence and intended-use approval exist. The free civilian service boundary in document 13 must not be converted into an official admissions assessment or predictor.
7. `src/App.tsx` reads/writes assessment and memory-case content through browser localStorage. Sensitive clinical content must not be treated as a browser preference; its storage, consent, access and retention must be governed.
8. `src/services/clinicalDatabase.ts` accesses appointments and clinic settings, while the inspected active `firestore.rules` does not show explicit policies for those collections. Inventory all accessed collections and define deny-by-default policies.
9. The repository has no visible Python/FastAPI backend, PostgreSQL schema, SQLAlchemy/Alembic migration set or CI workflow in the inspected tree. These are target-state work only if ADR-013 approves them.
10. Root standalone documents 00–19 are older snapshots than the merged 2.2.1 artifact; a single document authority and synchronization decision is required.
11. The existing `firestore.rules.test.ts` reads `DRAFT_firestore.rules`, includes an incomplete test without an assertion, and the package manifest does not expose a test command. The exact active ruleset and test runner must be selected and verified.
12. The execution sequence previously placed clinical workflow before the still-open ADR-001 first-journey decision. The corrected plan makes Phase 4 the owner-selected first end-to-end journey and does not assume clinical-first.

All findings must be rechecked at the exact implementation baseline commit. Static source inspection does not establish deployed configuration, exploitation, runtime behavior or security certification.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-05"></a>

# Document 05 — Enhancement Roadmap.md

> **Source filename:** `05 — Enhancement Roadmap.md`
**Purpose:** Capability roadmap, dependencies, gates and exit evidence
**Source last modified:** 2026-11-13 09:34:27 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `2d6467bd7d5d9acc7c0eee34441fcbfa2febd0a413a3276183241de1c1b342f8`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Enhancement Roadmap

**Version:** 2.2-proposed | **Status:** Dependency-ordered plan; dates, staffing and remaining approvals open

## 1. Roadmap principle

Do not remove or indefinitely postpone a major domain merely to simplify the first release. Track each domain at a capability-maturity level: **L1 Foundational**, **L2 Enhanced**, **L3 Advanced**, **L4 Research-grade**. Levels describe readiness, depth and evidence burden, not importance. Each feature still requires applicable scientific, clinical, legal, privacy and security gates. This is consistent with the owner-approved decision 7.

## 2. Workstreams and priorities

| Workstream | Initial maturity target | Sequence/dependency | Acceptance gate |
| --- | --- | --- | --- |
| Source recovery and implementation verification | L1 governance foundation | Obtain exact repo, commit, tests, environment and raw records first | Claims mapped screen/API/data/test; no unsupported “verified” labels |
| Platform foundations (identity, roles, consent, audit, persistence) | L1 | Before any real-data workflow | Tenant/role tests, save-failure tests, audit, backup/restore, privacy review |
| Clinical assessment and instrument governance | L1 catalog, limited administration only if approved | Exact version/rights/evidence and scoring vectors | Each active form cleared for population/use; no composite score |
| Clinical formulation and clinician authority | L1 workflow; L2 decision support | Verified clinician roles and safe workflow | AI cannot sign/finalize; amendment history, clinical governance sign-off |
| CBDNA engine | L1 provenance ledger/design; L2 reviewed longitudinal display; L3 modeled analysis; L4 validated research models | Construct framework and privacy controls precede computed relationships | RTM-23–28; model-specific evidence and review |
| Knowledge evolution and Advanced Adaptive RAG | L1 curated retrieval; L2 hybrid/reranked; L3 adaptive/graph/contextual only if evidence supports; L4 research discovery | Source governance, rights, Arabic benchmark, privacy and cost assessment | Citation entailment, access control, injection, Arabic quality, abstention, monitoring |
| Military Applicant Psychological Readiness Program | L1 free civilian psychoeducation and support specification; expanded assessment/follow-up only after evidence | Distinct product journey, safety/clinical review, no official test equivalence | Free-service representation, boundaries, no admission prediction or deceptive test coaching; measures gated |
| CBT and other therapy support | L1 clinician-authored goals/session records; L2 homework/outcomes; later approaches | Clinical content/scope review, persistence and RBAC | Education vs treatment distinction; clinician controls treatment |
| School/university/family/workplace/community programs | L1 program catalog and defined pilot workflows; L2 reporting; L3 multi-program analytics | Purpose/role/aggregate privacy model | One program defined end-to-end; privacy and suppress small cells |
| Research and local validation | L4 | Ethics/legal authorization, protocol, consent, de-identification and independent methodology | Approved study, reproducible analysis, no one-case generalization |

## 3. Phases (work sequence, not domain deletion)

### Phase A — Reconciliation and evidence recovery

Review owner decisions, recover source records and map historical claims. Assign accountable reviewers. Confirm each domain’s maturity ambition without dropping it from architecture.

### Phase B — Safe platform foundations

Implement synthetic-data platform foundations, audit, roles, consent scaffolding, domain boundaries and integration contracts. No real clinical data or unapproved measures.

### Phase C — Foundational user journeys

Build the selected first live journey only after owner scope and domain gates. Preserve other populations/programs at documented maturity levels and interfaces. The free applicant program remains specified as its own service, not renamed generic readiness.

### Phase D — Enhanced cross-domain capabilities

Expand clinician workflow, governed assessment, CBDNA reviewed display, therapy support, programs and evaluated RAG as distinct increments, each with acceptance evidence.

### Phase E — Advanced and research-grade capabilities

Adaptive retrieval, construct relationships, longitudinal/probabilistic models, local validation and research knowledge evolution only after methodology, privacy, ethics and independent validation.

## 4. Critical gates and stop conditions

- **G0 Evidence:** repository/source/history recovered; audit status credible.

- **G1 Product:** full scope and maturity map ratified; initial journey chosen without deleting domains.

- **G2 Safety/privacy:** clinical authority, staffing, consent, provider and minor decisions resolved for the selected release.

- **G3 Measurement:** instruments individually approved; no unsupported raw-score modification.

- **G4 CBDNA:** provenance, source separation, no autonomous clinical decisions; model-specific verification before higher maturity.

- **G5 RAG:** source rights, filters, Arabic evaluation, citation and security acceptance before clinical use.

- **G6 Release:** end-to-end, security, backup/restore, accessibility, monitoring and rollback approved.

## 5. Priorities

P0: source recovery, identity/access/consent foundation, scoring integrity, provider and privacy review, defined safety ownership. P1: selected L1 journeys and instrument register, clinician decision ledger, applicant program service specification. P2: enhanced CBDNA display, evaluated RAG, therapy/program functionality. P3: advanced modeling, local norms, generalized research knowledge, Fitrah research. P3 status does not mean the domain is omitted; it means evidence maturity is higher.

## Proposed workstream — psychometric governance and adaptive assessment (pending approval)

Add a gated workstream without changing the full-scope capability-maturity principle: (1) instrument/version registry and state machine; (2) exact evidence/rights/language dossiers; (3) version-specific approval scope; (4) governed recommendation service with reasons, alternatives, overlap and burden; (5) clinician choice and audit trail; (6) missing/conflicting data and longitudinal comparability tests; (7) report provenance; (8) enable clinical use only after instrument-specific review and operating approval. New instrument development is a separate research workstream. No date or clinical activation is implied by this plan.

## Baseline 2.2 execution sequence and exit evidence

| Gate | Dependency | Deliverable | Exit condition / stop rule |
| --- | --- | --- | --- |
| D0 Documentation baseline | Existing 2.1 package | Versioned 00–19, ID crosswalk, ownership/API/data/test contract | Owner review; open choices remain open; broken IDs stop progression |
| R0 Repository baseline (read-only) | D0 review; repository access | Exact commit/worktree, inventory, routes/collections/rules/provider map, command results, Current→Target table | Preserve pre-existing changes; no cleanup; logs for every claimed pass |
| D1 Scope/governance | R0 + named reviewers | ADR-001 first journey; accountable clinical, safety, psychometric, privacy/security, research and engineering owners | Unresolved required decision blocks dependent capability |
| D2 Synthetic foundation | D0/R0/D1 | API/schema plan, identity/tenant/consent/audit contracts, synthetic tests | Positive, negative, failure, isolation and rollback tests pass |
| D3 Measurement/clinical controls | D1 + exact dossiers | Version registry, deterministic server scoring, clinician decision ledger | Scoped rights/evidence; scoring vectors; AI cannot select/finalize |
| D4 Safety/service pilot | Named operations and local protocol | Human indicator-assessment-action flow; separate applicant program | Tabletop and failure cases pass; missing coverage means no safety-enabled launch |
| D5 CBDNA/RAG gates | D2–D4 + scientific review | L1 provenance/curated retrieval; later reviewed features | Stage-specific validation, Arabic benchmark, privacy/security gates |
| D6 Controlled release | All applicable prior gates | Release matrix, monitoring, incident response, restore and rollback proof | Signed release record; any P0 failure blocks release |

Each gate records owner, date, version/commit, linked requirement IDs, test command/log, reviewer and pass/fail/deferred disposition. A maturity level or calendar date does not waive a gate or imply authorization.

## Addendum — binding phase-order correction (Revision 2.2.2)

The detailed phase/file/activity control is `docs/execution/PsychoContext_V8_Master_Execution_Plan.md` Revision 1.1-reconciled-draft. The following dependency correction is binding for planning and supersedes any interpretation that the clinical journey must be implemented first:

| Phase | Required outcome |
|---|---|
| 0 | Owner approval, document authority, first-journey decision (ADR-001), technology/migration decision (ADR-013), accountable reviewers and change control |
| 1 | Exact repository/document inventory, static finding recheck, reproducible build/test baseline, Current→Target→Migration map |
| 2 | Shared verified identity, tenant/resource authorization and security foundation on the ADR-013-selected path |
| 3 | Canonical data, consent, audit, persistence, retention/deletion, migrations and rollback |
| 4 | The owner-selected first L1 end-to-end journey; not automatically clinical |
| 5 | Psychometric registry, rights/evidence governance, administration and deterministic scoring |
| 6 | Authenticated AI advisory and structured intake |
| 7 | Knowledge and evidence governance |
| 8 | Advanced Adaptive RAG with permission, Arabic quality and citation gates |
| 9 | CBDNA L1 provenance engine; higher maturity only after scientific validation |
| 10 | Therapy workspace and approved clinical capabilities |
| 11 | Remaining applicant, education, family, school, university, workplace, institutional and research journeys, each separately governed |
| 12 | Integrated verification, accessibility, safety/privacy/security review and controlled pilot readiness |
| 13 | Production release, monitoring, rollback and continuous governance |

If the owner selects the free civilian applicant wellbeing service as the first journey, its service-specific safeguards and approvals move into Phase 4. If the owner selects clinical care, the applicant program remains a separate journey. The full platform vision and maturity levels remain preserved; sequencing is not deletion.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-06"></a>

# Document 06 — Decision Register.md

> **Source filename:** `06 — Decision Register.md`
**Purpose:** Decision register, approval status and unresolved choices
**Source last modified:** 2026-11-13 09:36:41 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `d7785aa504a74dd912bc81d59483269c4d634b7dcc7062ad8903f4f0b289c517`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Decision Register

**Document ID:** PC-V8-06 | **Version:** 2.2-proposed | **Status:** Owner/specialist review; only OD-001–008 are sourced as approved; other decisions remain open/proposed | **Date:** 13 November 2026

## Purpose and relationship to the package

This register captures decisions that must not be silently inferred while moving from blueprint to implementation. It is governed by **01 — Master Architecture** for product scope and authority; decision-specific knowledge is in **02 — Knowledge Architecture**; technical alternatives are in **03 — Technical Implementation Blueprint**; historical evidence and provenance are in **04 — Conversation Audit & Gap Analysis**; sequenced work and gates are in **05 — Enhancement Roadmap**. Requirement IDs and decision links are indexed in **07 — Requirement Traceability Matrix**.

### Status vocabulary

- **Open:** decision required; no approval evidence found.

- **Proposed:** recommended direction, not owner approval.

- **Approved:** explicit approval recorded with approver/date/source.

- **Blocked:** cannot proceed until dependency/evidence is satisfied.

- **Deferred:** intentionally scheduled for a later phase with a trigger.

The base ADR-001–ADR-016 register below records the status of those individual open/proposed decisions; it does not supersede the separately sourced owner-approved clarification addendum OD-001–OD-008 at the end of this document. Those ODs are marked owner-approved only because the owner-supplied prompt explicitly states them as authoritative. Recommendations remain distinct from approvals, and implementation, clinical, scientific and legal readiness still require their own evidence and review.

## Decision register

| ID | Decision required | Proposed direction for review | Status | Decision owner / required reviewers | Evidence or dependency | Affected docs / requirements |
| --- | --- | --- | --- | --- | --- | --- |
| ADR-001 | What is the first release: clinician-facing clinical MVP, civilian readiness pilot, or another scope? | Choose one primary user journey; do not combine clinical care and readiness in one undifferentiated release | Open / Blocked | Product owner; clinical lead; legal/privacy | Initial population, service operator, operating jurisdiction | 01, 03, 05; RTM-01 |
| ADR-002 | What exact instruments may be used in the first release? | Smallest set with exact form, rights, language evidence, scoring rules and intended use documented | Open / Blocked | Psychometrician; rights counsel; clinical lead | Primary publications, license terms, Arabic/Egyptian evidence, item-level scoring tests | 02, 03, 05; RTM-04 |
| ADR-003 | How should environmental and socioeconomic context affect interpretation? | Capture context for formulation; do not mathematically alter validated scores until instrument-specific validation supports it | Proposed | Psychometrician; clinical lead; owner | Earlier 25% context adjustment is a reported proposal without established validation | 01, 02, 04; RTM-05 |
| ADR-004 | Is speech/audio intake included, and what is retained? | Optional, separate consent; clinician verifies extracted facts; default audio deletion after transcription unless a reviewed purpose requires retention | Open | Product owner; privacy/security; clinical lead; legal | Provider terms, data-flow map, age/minor policy | 01, 03, 05; RTM-06 |
| ADR-005 | What AI providers may process clinical information, under what terms and region? | No clinical data transmission until provider, retention, training-use, location and incident terms are reviewed | Open / Blocked | Security/privacy; legal; clinical owner | Provider contracts/settings and data residency | 01, 03, 05; RTM-07 |
| ADR-006 | What is meant by “RAG 5”? | Treat phrase as undefined; adopt no technical meaning until the owner defines it and architecture review records it | **Superseded by OD-006** for terminology; methods, providers, thresholds and deployment remain Open | Product owner; AI/knowledge architect | Owner clarification OD-006; method selection and operational choices remain unresolved | 02, 03, 04; RTM-08, RTM-31, RTM-33 |
| ADR-007 | How are minors handled? | Defer access until age thresholds, consent/assent, safeguarding and escalation are reviewed for applicable jurisdiction | Open / Blocked | Legal; child/adolescent clinical lead; privacy owner | Local law and operational safeguarding plan | 01, 03, 05; RTM-09 |
| ADR-008 | What safety/emergency response is operationally available? | No public safety workflow without named human responder, verified local resources, escalation ownership and tested coverage | Open / Blocked | Clinical safety lead; operations; legal | Service hours, geography, referral contacts and tabletop exercise | 01, 03, 05; RTM-10 |
| ADR-009 | How are roles, clinician credentials and tenant boundaries established? | Server/data-layer enforcement; independently verified professional access; least privilege; audited delegation | Proposed | Security owner; clinical governance; operations | Identity provider and organizational credentialing process | 01, 03, 05; RTM-11 |
| ADR-010 | What data retention, deletion, correction and consent-withdrawal rules apply? | Define per data class and purpose before production; preserve lawful audit history while honoring applicable rights | Open / Blocked | Privacy/legal; data controller; clinical lead | Jurisdictional review, data inventory, backup policy | 01, 03, 05; RTM-12 |
| ADR-011 | How should AI/clinician disagreement be used? | Store separate hypotheses and clinician decisions; do not treat disagreement as error labels or automatic model training | Proposed | Clinical lead; AI governance; research lead | Approved protocol, data governance and validity plan before research | 01, 02, 03, 05; RTM-13 |
| ADR-012 | What is the status and scope of the readiness/MIL-PREP concept? | Civilian developmental education only; no admission, fitness, pass/fail or official-affiliation claims; separate consent/data | **Service definition superseded by OD-008**; operations, measures, age/consent and evaluation remain Open/Proposed | Owner; legal; psychometrician; clinical lead | OD-008 fixes the service boundary; operational, scientific and legal evidence remains required | 01, 02, 04, 05; RTM-14, RTM-35 |
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
| --- | --- | --- | --- |
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
| --- | --- |
| ADR-001 | Still OPEN for the concrete first live release slice. OD-007 preserves the full vision but does not choose which L1 journey is implemented first. |
| ADR-006 | Its “what does RAG 5 mean?” terminology question is SUPERSEDED by OD-006. Specific methods, provider, thresholds and deployment remain open. |
| ADR-012 | Earlier generic MIL-PREP/readiness definition is SUPERSEDED as the service definition by OD-008. Operations, measures, age/consent, staffing and evaluation remain open. |
| ADR-014 | Signature/recordkeeping legal adequacy remains OPEN/BLOCKED; OD-005 settles clinician authority, not electronic-signature law. |
| ADR-010/011 | Privacy/consent and research implementation remain OPEN/BLOCKED; OD-003/004 approve direction, not a specific legal basis, protocol or production data flow. |
| ADR-015 | Fitrah remains separate future research; CBDNA core-engine status does not validate or merge Fitrah. |

For traceability, ADR-015 is not a CBDNA or clinical-safety authority. Use OD-001 for the owner-approved CBDNA engine boundary, OD-005 for clinician authority, and ADR-008 for operational safety readiness. Do not cite ADR-015 for CBDNA/safety acceptance.

OD-001–OD-008 are owner-approved as stated in the supplied prompt, not assistant recommendations. If later changed, supersede with source/date rather than rewriting history.

## Addendum — Proposed psychometric/adaptive-assessment decisions (NOT APPROVED)

**Source:** user-supplied `pasted_content_5.txt`, received 11 November 2026. The source explicitly labels this as a proposed enhancement pending owner approval. OD-001–OD-008 remain unchanged. These items are proposals only and must not be treated as approved decisions by being entered here.

| Proposal ID | Proposed decision question | Recommended direction for review | Status / reviewers |
| --- | --- | --- | --- |
| PDA-001 | Should PsychoContext implement a formal psychometric lifecycle and version registry? | Adopt instrument and exact-version lifecycle states, rights/evidence/language gates and purpose-specific approval. | PROPOSED / Owner + psychometric + rights/legal |
| PDA-002 | What may the adaptive assessment service recommend or decide? | It returns explainable candidate recommendations with evidence, alternatives, overlap, burden and limitations; the clinician alone selects/orders. | PROPOSED / Owner + clinical + psychometric + engineering |
| PDA-003 | How may different instruments be combined in reports? | Allow evidence-informed contextual formulation while preserving separate scores; prohibit unsupported score aggregation and causal inference. | PROPOSED / Owner + clinical + psychometric |
| PDA-004 | What is required to develop a new measure and compare forms over time? | Require the documented development/validation lifecycle; longitudinal comparison only for compatible forms or a validated crosswalk. | PROPOSED / Psychometric + language/cultural + legal reviewers |
| PDA-005 | What report/safety operating record is mandatory? | Separate AI suggestions, verified facts, clinician choice/opinion/decision; separate risk indicator recognition, human assessment and operational referral/escalation. | PROPOSED / Clinical safety + operations + privacy/legal |

No change is made to the approval state of owner decisions. Exact Egypt-specific safety resources, provider terms, instrument rights and local validation remain open evidence/operational tasks.

## Baseline 2.2 status note

The proposed Knowledge Governance Board quorum/sign-off model in document 09 is not a new owner decision and is not approved by inclusion here. It should be registered as a new PDA/ADR only after owner chooses the decision record/status path. The first implementation slice remains ADR-001 OPEN; ADR-009 remains role/tenant governance. ADR-015 remains Fitrah-only and must not be cited for CBDNA or safety.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-07"></a>

# Document 07 — Requirement Traceability Matrix.md

> **Source filename:** `07 — Requirement Traceability Matrix.md`
**Purpose:** Requirement traceability and formal acceptance criteria
**Source last modified:** 2026-11-13 09:36:46 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `e145a8601d806eb42c0dde504d24b558398aa0c42db9e94e3c27bfe7415192d4`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Requirement Traceability Matrix

**Document ID:** PC-V8-07 | **Version:** 2.2-proposed | **Status:** Proposed acceptance baseline; owner/specialist ratification and test ownership pending | **Date:** 13 November 2026

## Purpose and traceability rules

This matrix connects the source materials to product scope, knowledge model, technical implementation, decisions and testable acceptance evidence. It complements—not replaces—the full provenance chronology in **04 — Conversation Audit & Gap Analysis**. See **01 — Master Architecture** for product authority, **02 — Knowledge Architecture** for psychometrics and knowledge governance, **03 — Technical Implementation Blueprint** for implementation patterns, **05 — Enhancement Roadmap** for priority and sequencing, and **06 — Decision Register** for unresolved decisions.

Source classes: **OR** owner requirement; **OAP** owner-approved proposal as reported (not always supported by original turn-level evidence); **AP** assistant proposal; **LC** Lovable/action-history claim; **UI** unverified implementation claim; **AR** architectural recommendation; **PSL** pending scientific/legal decision. No row marked LC/UI is verified by this review.

## Traceability matrix

| Requirement ID | Source/class and original intent | Target treatment | Knowledge / data entities | Technical/UI mapping | Verification and acceptance criteria | Priority / decision |
| --- | --- | --- | --- | --- | --- | --- |
| RTM-01 | OR: platform is comprehensive and multidimensional, not a single questionnaire or diagnostic chatbot; Master Prompt §§4, 10 | Define bounded domains and phase gates; preserve plural explanatory models | Domain, service boundary, product decision | Navigation by role/domain; modular monolith | Approved scope and role journeys; no service appears as production-ready without supported workflow | P0 / ADR-001 |
| RTM-02 | OR: clinician retains final diagnosis and treatment authority; TASK.docx §§2, 6; Master Prompt §7 | AI outputs remain draft hypotheses; clinician independently authors and signs decisions | AIHypothesis, ClinicianDecision, DiagnosisRecord | Clinician review/sign-off UI and protected API | Tests prove AI cannot finalize or overwrite clinician decision; audit records author, time and amendments | P0 / OD-005 (authority); ADR-014 applies only to legal sign-off semantics |
| RTM-03 | OR: respect complexity; do not force rigid classifications; include social/environmental/developmental/cultural context; Master Prompt §4 | Store context and formulations with provenance; no fixed identity label | ContextFact, Construct, Formulation, provenance | Intake and longitudinal formulation view | Fields have purpose and source; reports distinguish observation, self-report and interpretation | P1 / ADR-001 |
| RTM-04 | OR: measures require references, appropriate questions/scoring, version and rights; Master Prompt §6; V7 §§4, 7 | Instrument release gate; exact version, rights, population evidence, scoring and limitations required | Instrument, InstrumentVersion, EvidenceSource, LicenseRecord, Score | Instrument catalog, clinician selection, scoring service | Disabled until all mandatory approvals; scoring tests match authoritative specification; no unverified cutoff shown | P0 / ADR-002 |
| RTM-05 | OR: contextual calibration idea; action history Nov 6 claimed 25% adjustment | Preserve context separately; prohibit unvalidated score subtraction/composite | RawScore, ContextFact, Interpretation | Results display with raw scores and separate context panel | Regression test demonstrates raw score unchanged by context; no cross-instrument aggregate | P0 / ADR-003 |
| RTM-06 | OR: up-to-three-minute voice complaint and AI extraction/recommendation; action history Nov 6 | Optional speech path with consent, source-linked extraction and clinician verification | IntakeArtifact, ExtractedFact, Consent | Intake screen with record/transcribe, edit, delete and review state | No missing fact is invented; facts map to transcript spans; no audio retained by default; save/failure tested | P1 / ADR-004 |
| RTM-07 | OR: AI preliminary analysis and assessment/treatment recommendations; Master Prompt §§7, 9 | Purpose-limited AI gateway; evidence links, uncertainty, provider review and human approval | AIInteraction, AIHypothesis, EvidenceSource | Draft panel visibly distinct from clinician content | Provider terms approved; schema/citation/abstention tests pass; no clinical data sent before approval | P1–P2 / ADR-005 |
| RTM-08 | OR: “RAG 5” term appears; Master Prompt §9 asks to determine meaning | Mark undefined; specify hybrid, metadata-filtered, version-aware retrieval without assuming “RAG 5” is a standard | KnowledgeVersion, RetrievalTrace | Evidence search and cited answer surface | Retrieval enforces access/version filters; citations resolve; insufficient evidence yields abstention; term defined only by ADR | P2 / ADR-006 |
| RTM-09 | PSL: minor protection, consent, safeguarding; Master Prompt §§12, 17 | Block minor-user launch until policy and operational safeguards approved | AgePolicy, Consent, SafetyEvent | Eligibility/consent gate; guardian/assent flow only after approval | Specialist review and scenario tests pass for applicable jurisdiction | P0 / ADR-007 |
| RTM-10 | OR: risk, emergency procedures and human escalation; Master Prompt §12 | Human-owned, location-aware safety workflow; AI is not sole risk decision-maker | SafetyEvent, Referral, EscalationRecord | Safety alert and staffed handoff | Verified contact/configuration, named coverage, tested escalation and fallback; no fabricated numbers | P0 / ADR-008 |
| RTM-11 | OR: authentication, RBAC, clinician authority; PsychoContext.docx §§5, 19–21 | Server/database-enforced least privilege; no self-assigned professional role or shared PIN | User, Membership, RoleGrant, Credential, AuditEvent | Role-specific navigation backed by API authorization | Negative direct-API tests for every role/tenant; role grant audited and revocable | P0 / ADR-009 |
| RTM-12 | OR: confidentiality, consent, retention, AI-provider data handling; Master Prompt §12 | Data minimization, purpose-bound consent, retention/deletion and audit policy | Consent, DataClass, RetentionRule, AuditEvent | Consent and privacy settings; data-status display | Legal/privacy review; deletion/withdrawal and backup behavior tested; no compliance claim without evidence | P0 / ADR-010 |
| RTM-13 | OR: compare AI preliminary view with clinician conclusion and learn from discrepancies; Master Prompt §9 | Record comparison as review signal; prohibit automatic case-derived learning; separate research pipeline | AIHypothesis, ClinicianDecision, ResearchProtocol | Comparison view with neutral labels and human rationale | No model/knowledge update from a single case; research access requires approval and de-identification evidence | P1–P3 / ADR-011 |
| RTM-14 | OR: military-preparation/readiness concept; history summary; V7 §§3–4 | Civilian developmental readiness only; no admissions, fitness, official endorsement or automatic sharing | ReadinessSubject, ReadinessAssessment, SeparateConsent | Separate service and identity boundary from clinical workspace | User-facing notice/consent; no high-stakes output; access and data-separation tests pass | P1–P2 / ADR-012 |
| RTM-15 | OAP (reported): Python backend and TypeScript frontend; V8 planning materials | Evaluate Python/FastAPI + React/TypeScript + PostgreSQL; choose modular monolith first | API contracts, domain modules, PostgreSQL entities | Typed client, accessible Arabic RTL; backend authorization | ADR approved; architecture tests and operational constraints documented; no dependency on Lovable | P0–P1 / ADR-013 |
| RTM-16 | OR: doctor may edit diagnosis and write own view; action history Nov 6 | Authenticated clinician sign-off, append-only amendment history; legal signature semantics not assumed | Formulation, DiagnosisRecord, ClinicianDecision, AuditEvent | Diagnosis/formulation editor and sign-off | Identity/authorization verified; default placeholder text absent; signature claim reviewed by counsel | P1 / ADR-014 |
| RTM-17 | OR: Islamic psychology as one assessment perspective initially; separate future Fitrah model; Master Prompt §6 | Separate governed domain and future research track; no foundational scientific authority claim | Domain, Construct, Instrument, ResearchProtocol | Knowledge taxonomy and future-research backlog | Exact measure/construct and evidence reviewed; separate ADR before Fitrah development | P2–P3 / ADR-015 |
| RTM-18 | OR: inspect full conversation and audit Lovable claims; Master Prompt §§2, 14, 17 | Obtain raw logs and source repository; classify claims separately from implementation proof | EvidenceIndex, Claim, SourceArtifact, VerificationRecord | Audit evidence links and claim-status register | Exact commit, logs, tests and runtime inspected; status cites reproducible evidence; current files alone do not meet this gate | P0 / ADR-016 |
| RTM-19 | OR: CBT module and extensible therapies; Master Prompt §8 | Start with clinician-governed CBT workspace; educational tools distinct; add other therapies only with review | TreatmentPlan, Session, Homework, OutcomeMeasure | Encounter-linked therapy workspace | Workflow supports plans, assignments, review and outcomes; access and clinical content approved | P1–P2 / Roadmap R-012 |
| RTM-20 | OR: institutional programs/services; Master Prompt §10; V7 program engine | Defer broad programs; pilot one defined service after privacy and operating model | Program, Enrollment, AggregateReport | Program portal and aggregate dashboard | Program owner, data minimization, reporting suppression and acceptance criteria approved | P2 / Roadmap R-016 |
| RTM-21 | OR: visible proof of implementation and full validation; action-history complaint and TASK.docx §10 | Feature-level definition of done with source-to-screen-to-service-to-data evidence and success/failure testing | RequirementLink, TestEvidence, AuditEvent | Visible save state; audit/evidence links for admin | Build and test evidence attached; failed saves cannot display success; demo/production separated | P0 / Roadmap R-001–R-007 |
| RTM-22 | OR: long-term longitudinal patterns/CBDNA; Master Prompt §5 | Treat as versioned, provenance-rich research model, not diagnosis or person label | CBDNAFeature, Observation, ConstructVersion, ResearchProtocol | Longitudinal trend view only after approval | Measurement model and fairness/reliability evidence reviewed; source classes remain distinguishable | P3 / Roadmap R-018–R-019 |

## Coverage and maintenance

This is a baseline traceability set, not proof that every historical conversation turn has been captured. The raw complete conversation was not located; the audit describes the available chronology and uncertainty. When an owner decision changes scope, update the corresponding row, link the ADR, update roadmap dependencies and retain prior wording/status in revision history. “Implemented” status may be added only with code path, commit, test result and runtime evidence; “scientifically validated” requires instrument/version/population-specific evidence and qualified review.

## Review sign-off

| Review area | Reviewer / date | Status / comments |
| --- | --- | --- |
| Product owner | Pending | Confirm intended first release, requirement interpretation and priority |
| Clinical lead | Pending | Review workflow, safety, diagnosis and treatment boundaries |
| Psychometric reviewer | Pending | Review instrument gates, scoring and population claims |
| Privacy/security | Pending | Review data flows, access, retention and AI processing |
| Legal/regulatory | Pending | Review jurisdiction-specific obligations, minors, rights and signatures |
| Engineering | Pending | Review feasibility, source migration and testability |

## CBDNA–Clinical Governance/Safety formal acceptance requirements (addendum)

These requirements operationalize the compatibility gaps identified between **08 — CBDNA Research and Technical Specification** and **11 — Clinical Governance and Safety Framework**. They are target requirements, not evidence that implementation exists. They require review by the owner and clinical/psychometric/privacy leads. Reference decisions: OD-001/005 and ADR-008/011 where applicable; roadmap R-018; reconciliation RC-03/RC-05/RC-07/RC-19. ADR-015 concerns separate future Fitrah research and is not a CBDNA/safety authority.

| Requirement ID | Requirement and source | Target design / scope | Verification method | Formal acceptance criteria | Priority / owner |
| --- | --- | --- | --- | --- | --- |
| RTM-23 | CBDNA must not independently determine safety status, urgency, referral, treatment, or escalation. Source: 08 §§2, 9–10; 11 §§2, 5–6. | CBDNA features are contextual, longitudinal inputs only. Safety disposition remains a human-owned workflow under an approved protocol. | Unit and integration tests attempt to trigger/close/alter a safety event using CBDNA-only input; clinician workflow and tabletop review. | (1) No CBDNA field or aggregate can autonomously create, raise, lower, close, or resolve a safety event. (2) Any safety-related use presents provenance and limits to an authorized clinician. (3) Human action is attributable and audited. (4) AI/CBDNA failure does not suppress the established safety workflow. | P0 for any safety-enabled release; Clinical safety lead + engineering |
| RTM-24 | CBDNA display must not be framed as diagnosis, personality type, deterministic prediction, or universal score. Source: 08 §§1–2, 5, 8; 11 §§2, 4. | Clinician-only, reviewable longitudinal evidence view; no “DNA score,” fixed identity badge, rank or eligibility label. | UX/content review; automated checks for prohibited labels; clinician comprehension/usability test using synthetic cases. | (1) UI identifies CBDNA as a proposed/research construct and states its limitations. (2) Every displayed feature shows source class, time/context, uncertainty and review state. (3) No aggregate/composite is shown unless separately validated and approved. (4) Intended user can distinguish it from instrument result and clinician formulation in comprehension testing. | P1 for any CBDNA prototype; Product + clinical + psychometric reviewers |
| RTM-25 | AI-derived or research-derived CBDNA features require human review before clinical use; corrections must preserve lineage. Source: 08 §§3, 6–8; 11 §§3–4. | Immutable source record plus append-only review/correction/supersession events; no silent promotion from hypothesis to fact. | Data-integrity tests, role/permission tests, audit inspection, and end-to-end correction flow. | (1) Unreviewed AI/research features are excluded from clinician-approved formulation exports by default. (2) Accept/correct/dispute/reject action records actor, time, reason and source. (3) Original value and provenance remain retrievable to authorized roles. (4) Revised feature links to source and transformation/version; prior versions are not overwritten. | P1; Clinical informatics owner + engineering + privacy |
| RTM-26 | CBDNA temporal comparison must not infer stable traits from one observation or compare incompatible measures/time windows without warning. Source: 08 §§4, 7, 9; 11 §4. | Time-bounded observations, explicit context and versioned construct definitions; comparisons gated on compatibility. | Unit tests for one-observation and mismatched-version/timeframe cases; review of example longitudinal records. | (1) Single observation is labeled as a single observation, not a persistent pattern. (2) Incompatible construct/instrument versions or recall periods block aggregation or display an explicit non-comparability warning. (3) Missingness and context changes remain visible. (4) Derived trend is reproducible from source events and method version. | P2 / P3 depending use; Psychometrician + clinical lead |
| RTM-27 | CBDNA research use or knowledge generalization requires a separate approved protocol and cannot be triggered by individual care events. Source: 08 §9; 09 §§3–8; 11 §§2, 8. | Research data pathway segregated from patient clinical memory; approval-controlled, de-identified, versioned release. | Access-control tests; protocol-state transition tests; data-flow and re-identification risk review; audit review. | (1) No single patient record or clinician-AI disagreement automatically changes shared knowledge, scoring, model parameters or construct status. (2) Research export is blocked unless protocol approval, consent/legal authority, ethics review where applicable and de-identification status are present. (3) Access and export are logged. (4) Published research-derived feature records include method, population, limitations, reviewer, version and rollback path. | P0 to permit research; Research governance + privacy/legal + psychometric lead |
| RTM-28 | Clinical safety workflow remains independently available if CBDNA, AI, retrieval or data derivation fails. Source: 11 §§5–6; 03 §§6–8; 08 §10. | Safety process cannot be coupled to successful feature calculation or AI provider response. | Fault-injection tests for unavailable model/index, corrupt CBDNA data, timeout and database failure; safety tabletop. | (1) Failure of CBDNA/AI/RAG does not block a clinician from accessing the approved safety protocol. (2) Failures are visible and logged. (3) No fabricated risk score or fallback judgment is shown. (4) Human owner and escalation instructions remain accessible as approved. | P0 for safety-enabled release; Safety operations owner + engineering |

### Implementation gate for these rows

RTM-23 and RTM-28 are **stop-ship controls** for any release that includes clinical risk/safety workflows. RTM-24 and RTM-25 are prerequisites for any clinician-facing CBDNA view. RTM-26 and RTM-27 are required before longitudinal aggregation or research reuse. CBDNA is an owner-approved independent core engine; its L1 implementation is limited to provenance/source-separated observations until built and verified, while higher-maturity models/features and clinical uses remain evidence-gated. The specification does not prove implementation or validation.

## Addendum — Requirements from owner-approved clarifications (new IDs only)

RTM-01–RTM-28 above are preserved without renumbering or reinterpretation. The following additive rows translate the new owner decisions and this conversation’s CBDNA/clinical-safety reconciliation. They are target requirements, not implementation evidence.

| ID | Source / domain | Architecture / knowledge / data | UI / API | Verification and formal acceptance criteria | Decision / priority / status |
| --- | --- | --- | --- | --- | --- |
| RTM-29 | OD-001; CBDNA core-engine boundary | Independent engine with feature definitions/versions, observations, attribution, time/context, uncertainty and lineage (08/16) | Reviewable evidence view, not final actions | Schema/API preserve source and derivation; no universal score, diagnosis, prescription or autonomous safety action; model methods gated by evidence | OD-001 / P1 foundations; higher maturity gated / Not implemented |
| RTM-30 | OD-003/004; memory and knowledge evolution | Separate patient memory, AI context, CBDNA, research candidates, approved knowledge and clinical evidence (09/14/16) | Candidate review/publish workflow | One case or clinician-AI disagreement cannot update shared knowledge/model/scoring; research transfer requires protocol, authority/consent as applicable, ethics/privacy and specialist/method review | OD-003/004 / P0 research / Not implemented |
| RTM-31 | OD-006; Advanced Adaptive RAG | Versioned ingestion/retrieval, authorization, citations, language/source metadata, measured techniques (17) | Expose exact source/version and abstention | No official “RAG 5” claim; no cross-patient retrieval; citations resolve to authorized evidence; Arabic, injection, stale-version, access and failure tests meet approved thresholds | OD-006 / P1 design; P0 clinical use / Not implemented |
| RTM-32 | OD-003/004; research pipeline | Patient memory → candidate → AI analysis → specialist/method review → de-identification/ethics/legal review → approved versioned knowledge | Attributable review, rationale and rollback | Export blocked absent protocol/lawful authorization; one case cannot establish general finding; published result includes population, method, uncertainty, limits and version | OD-003/004 / P0 research / Not implemented |
| RTM-33 | OD-006; retrieval evaluation | Select sparse/dense/hybrid, rewriting, multistage, reranking, graph/context/version/citation/adaptive methods only by evidence | Evaluation report and retrieval trace | Each method documents clinical relevance, Arabic quality, traceability, explainability, privacy/security, cost, latency and maintenance | OD-006 / P2 / Not implemented |
| RTM-34 | OD-007; full product vision | Capability registry maps all domains/populations to L1 Foundational, L2 Enhanced, L3 Advanced, L4 Research-grade | Roadmap/status shows maturity and gates | No major domain silently removed; first release choice separate; architecture is not readiness; each capability has owner, dependencies, tests and evidence | OD-007; ADR-001 remains open / P0 planning / Not implemented |
| RTM-35 | OD-008; applicant program | Free civilian program with distinct service/data/consent boundary (13) | Arabic service flow and notices | Free status clear; wellbeing purpose clear; no military affiliation, official equivalence, physical prep, rehabilitation, admission prediction/guarantee or deception coaching; measures separately approved | OD-008 / P0 boundaries; P1 service / Not implemented |
| RTM-36 | OD-001/005; clinical safety reconciliation | CBDNA separated from safety disposition and clinician-authored diagnosis/treatment (08/11/16) | Human review evidence panel | CBDNA-only input cannot create/raise/lower/close safety event, finalize diagnosis or initiate/change treatment; human action attributable; safety path remains available if CBDNA/AI/RAG fails | OD-001/005; ADR-008 staffing open / P0 safety release / Not implemented |
| RTM-37 | OD-001; mathematical method selection | Model registry links methods to construct, purpose, measurement level and evaluation | Research-only model dossier | Each method states purpose, assumptions, data, level, limits, bias, interpretability, Arabic suitability, validation and use conditions; no activation before fit-for-purpose validation | OD-001 / P3–P4 / Not implemented |
| RTM-38 | OD-002; multi-axial taxonomy | Separate taxonomy, ontology, construct/instrument registries, evidence and approval with typed many-to-many links | Multi-domain navigation | Relations are typed/versioned/provenanced; mapping across domains does not imply causality, equivalence or score aggregation | OD-002 / P1 / Not implemented |

### Legacy requirement clarification crosswalk

| Existing ID | Clarification | Handling |
| --- | --- | --- |
| RTM-01 | OD-007 retains all domains via maturity levels | Retain; apply new RTM-34 |
| RTM-02 | OD-005 makes clinician authority system-wide | Retain; strengthen through RTM-36 and 03/11 |
| RTM-08 | OD-006 clarifies RAG phrase and rejects formal-version claim | Retain history; use RTM-31/33 |
| RTM-13 | OD-003/004 establish governed candidate-pattern flow | Retain; use RTM-30/32 |
| RTM-14 | OD-008 corrects generic readiness interpretation | Retain history; RTM-35 gives definitive service boundary |
| RTM-22 | CBDNA is now an owner-approved independent core engine while models remain validation-gated | Retain history; do not interpret as denying core-engine status; use RTM-29/37 |

New IDs only; do not repurpose RTM-01–RTM-28. Before tracker import, record a crosswalk and disposition; no older requirement is silently invalidated.

## Addendum — Proposed psychometric and adaptive-assessment acceptance requirements

**Source/status:** Derived from `pasted_content_5.txt`; all rows are PROPOSED requirements pending owner and specialist ratification. Existing RTM-01–RTM-38 remain unchanged. No implementation is claimed.

| ID | Requirement / target | Verification and formal acceptance criteria | Priority / status |
| --- | --- | --- | --- |
| RTM-39 | Instrument lifecycle state is explicit and distinct from registry presence | State-machine tests cover Discovered → Under Review → Evidence Reviewed → Rights Verified → Language Validated → Approved → Suspended/Retired; unapproved states cannot be administered or ordered; every transition has evidence, actor, date and rationale | P0 before live measures / Proposed |
| RTM-40 | Approval is exact-scope and version-specific | Negative tests prove an approval for one form/language/population/purpose/context does not authorize another; UI/API state the approved scope: Instrument + Version + Language + Population + Context + Intended Purpose | P0 / Proposed |
| RTM-41 | Instrument-version lineage and change history are immutable | Changes to item content, translation/adaptation, digital form, administration, scoring or interpretation create a new version with author, reason, evidence, approval, impact assessment and rollback; prior results remain linked to the administered version | P0 / Proposed |
| RTM-42 | Legacy umbrella row for cross-instrument context, composite scoring and causality; split acceptance is defined by RTM-53–55 without changing this stable ID | Use RTM-53 for contextual synthesis, RTM-54 for composite-score prohibition/approval gate, and RTM-55 for causal inference boundary. Keep this row as a historical crosswalk only; do not use it as the sole implementation test. | Crosswalk test confirms each sub-requirement has an independent component/API/data mapping and pass/fail test; legacy references remain traceable |
| RTM-43 | Adaptive assessment recommendation is explainable and advisory | Each candidate includes purpose/age-language fit, available exact version and approval scope, evidence/source, limitations, rationale and alternatives; clinician selection is separately recorded; test proves AI cannot issue final assessment order | P1 / Proposed |
| RTM-44 | Recommendation considers measure overlap and respondent burden | For overlapping candidates, service identifies construct overlap and estimated burden; selecting multiple measures requires recorded rationale or clinician override reason; usability/test cases verify recommendations do not default to redundant batteries | P1 / Proposed |
| RTM-45 | Missing and contradictory information remains uncertain and reviewable | Test cases with missing responses/conflicting reports display missingness and both sources; no silent imputation or selection of a “winner”; clarification/review action is available and attributable | P1 / Proposed |
| RTM-46 | Longitudinal comparisons require psychometric comparability | Tests across changed form/version/language/administration/recall period block comparison or show a validated-crosswalk reference and limitations; no unsupported trend/trait inference | P1 / Proposed |
| RTM-47 | Clinical reports have complete source and decision provenance | Synthetic end-to-end report separately shows original complaint, AI-extracted candidates, clinician-verified facts, AI-suggested measures/reasons, clinician-selected measures, original scores/version, context, AI hypotheses/evidence, independent clinician opinion, disagreements, final decision/author/date and correction history | P1 / Proposed |
| RTM-48 | Safety pathway separates indicator recognition, human assessment and operational action | Scenario tests prove a scale or AI flag cannot finalize safety disposition; named qualified human assessment and approved local referral/escalation protocol are required; coverage, location, fallback and audit are verified before live use | P0 for safety-enabled release / Proposed |
| RTM-49 | New measure development follows a complete scientific lifecycle | Gate checklist covers need, operational construct, literature/existing tools, rights, content review, cognitive/language/cultural testing, pilot, appropriate reliability/validity, population suitability, interpretation limits, independent review/approval and ongoing monitoring | P2 research; P0 before new measure use / Proposed |
| RTM-50 | Reliability statistic alone is not treated as validity or overall quality | Review acceptance test rejects a dossier relying solely on Cronbach’s alpha; evidence plan justifies reliability/validity methods for construct, score interpretation, population and intended use | P0 before activation / Proposed |
| RTM-51 | Privacy/consent and retention apply to instrument answers, reports and lineage | Access/deletion/export tests cover responses, scores, source excerpts, recommendation trace and audit/version links under approved purposes and retention rules; consent scope cannot authorize unrelated research or sharing | P0 / Proposed |
| RTM-52 | Retrieval surfaces authorized, version-correct evidence for instruments | RAG tests return source/version/language/population/purpose/effective date/rights metadata, reject stale/retired or unauthorized versions, validate citations and never infer reproduction rights from source availability | P1 design; P0 clinical retrieval / Proposed |

These rows supplement RTM-29–38; they do not alter stable identifiers. Acceptance thresholds and accountable owners must be ratified before testing is used as a release gate.

## Addendum — Split acceptance requirements for the legacy RTM-42 umbrella

**Status:** Proposed and pending owner/clinical/psychometric ratification. RTM-42 remains in the register as a stable legacy umbrella and is not deleted or renumbered; the three independently testable controls below are the implementation acceptance rows.

| ID | Independent requirement | Component / API / data mapping | Verification and acceptance | Status |
| --- | --- | --- | --- | --- |
| RTM-53 | Contextual synthesis may relate separate evidence only while preserving each source/result and marking association versus clinician interpretation. | Clinical Formulation Engine; `POST /v1/formulations/drafts`; `InstrumentVersion`, `AssessmentAdministration`, `ScoreResult`, `ContextRecord`, `Relation` | Synthetic report displays each result separately with version/date/language/population/timeframe/source/limits; context does not rewrite raw score; reviewer can distinguish association from clinician-authored interpretation. | Proposed |
| RTM-54 | Cross-instrument composite scores are prohibited unless a named, purpose-specific composite has independent validation, rights and approval; registry presence alone is insufficient. | Psychometric Engine; `POST /v1/composite-definitions` (governance-only, disabled by default); `CompositeDefinition`, `ValidationDossier`, `ScopedApproval` | Negative tests reject arbitrary averaging, incompatible scales and unapproved composites; any enabled composite requires exact model/version/population/use dossier and approval, and preserves component scores. | Proposed |
| RTM-55 | No causal inference may be produced from correlation, co-occurrence or temporal association alone. | CBDNA relationship layer and Formulation Engine; `POST /v1/evidence-links`; typed `associated_with` relation distinct from any separately validated causal claim | Tests ensure correlation/co-occurrence labels remain non-causal; causal relation requires an independently reviewed method/evidence record and explicit limits; AI cannot promote association to cause. | Proposed |

For all core requirements, the component/API/data/test mapping in this addendum and the existing matrix is a target contract, not proof of implementation. Owners must approve thresholds and assign test reviewers before the corresponding gate can pass.

### Baseline 2.2 P0 implementation crosswalk

| Requirement | Component / API | Entity/control | Minimum automated acceptance evidence |
| --- | --- | --- | --- |
| RTM-02 / RTM-36 | Clinical Decision Service; `POST /v1/clinician-decisions` | `ClinicianDecision`, credential and audit | AI/service principal receives 403; human-authored decision records identity/version/amendment; no overwrite |
| RTM-04 / RTM-39–41 | Psychometric Registry/Scoring; order/admin/score endpoints | `InstrumentVersion`, `ScopedApproval`, `ScoreResult` | State-machine, exact-scope denial, authoritative test vectors, immutable historic version |
| RTM-10 / RTM-23 / RTM-28 / RTM-48 | Safety Operations; indicator/assessment/action endpoints | `SafetyIndicator`, `HumanSafetyAssessment`, `SafetyAction`, `CoverageConfig` | Model cannot disposition; human fallback available under AI/DB outage; tabletop config required; no live release without coverage |
| RTM-11 | Authorization service at every API/data handler | Membership, RoleGrant, Credential, tenant/service ID | Direct-API cross-role/cross-tenant negative tests; revocation takes effect; audit emitted |
| RTM-12 / RTM-51 | Consent/data-governance service | Consent scope, DataClass, RetentionRule, AuditEvent | Purpose mismatch denied; deletion/export/correction covers linked derived artifacts under approved policy |
| RTM-21 | Persistence boundary / UI save state | Command result, idempotency and audit | Forced write failure cannot return success; retry is idempotent; visible failed state |
| RTM-27 / RTM-30 / RTM-32 | Research export workflow | Protocol, approval, de-identification record, Finding | Export/promotion denied until each required approval exists; single-case promotion denied |
| RTM-31 / RTM-33 / RTM-52 | RAG authorization/retrieval pipeline | SourceVersion, rights, RetrievalTrace, citation span | Permission/cross-patient leakage zero-tolerance tests; stale/restricted source denied; abstention and citation trace |
| RTM-53–55 | Formulation/CBDNA/Psychometric service | EvidenceLink, CompositeDefinition, relation predicate | Context preserves original scores; unapproved composites rejected; association never labeled cause |

Acceptance status stays **Proposed** until the product owner and relevant specialists ratify scope, thresholds and reviewer assignment. The table identifies required evidence; it is not a statement that tests already exist or pass.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-08"></a>

# Document 08 — CBDNA Research and Technical Specification.md

> **Source filename:** `08 — CBDNA Research and Technical Specification.md`
**Purpose:** CBDNA research, engine contract, maturity and validation specification
**Source last modified:** 2026-11-13 09:35:32 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `8bb7e8db71cd3c7ad100920edb810855cfb710132584ed51498eaf064e3ef96e`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — CBDNA Research and Technical Specification

**Version:** 2.0-proposed | **Status:** Core-engine architecture approved by owner prompt; operational constructs and mathematics remain unvalidated

## 1. Definition, purpose and boundary

Cognitive Behavioral DNA (CBDNA) is the independent core engine intended to represent interconnected, multidimensional, contextual, dynamic and longitudinal cognitive/behavioral patterns across sources. It organizes evidence and candidate patterns to support clinician formulation and research. It is not a diagnosis, personality type, innate essence, universal score, psychometric instrument, treatment selector, safety classifier or autonomous clinical decision-maker. It does not replace validated measures or clinician judgment.

“Core engine” is an architectural/product decision, not a claim that a validated model already exists. Maturity proceeds from provenance ledger (L1) to reviewed descriptive trajectories (L2), evidence-supported analytic models (L3) and independently validated research-grade models (L4). See 15.

## 2. Feature lifecycle and epistemic types

Use immutable source classes: patient self-report; clinician-observed behavior; clinician interpretation; authorized instrument result; behavioral record; AI-generated hypothesis; research-derived finding; validated construct measurement. A record cannot change class by editing a label. Promotion to an approved construct requires a separate evidence/approval record. Distinguish adaptive, compensatory, context-dependent and potentially maladaptive patterns; none is pathology by default.

Each candidate feature definition specifies construct/operational meaning, inclusion/exclusion boundaries, observable indicators, measurement level, expected timeframe, population/language, method, permitted use, evidence, limitations, missing-data rules, safety implications and maturity level.

## 3. Candidate mathematical families — evaluation, not selection

No universal model is imposed. Select per construct, purpose, measurement level and available data only after evaluation.

| Method family | Possible scientific purpose | Assumptions/data | Limitations/bias and interpretability | Arabic/population and validation needs | Permitted maturity |
| --- | --- | --- | --- | --- | --- |
| Descriptive longitudinal summaries / event timelines | Display observed change without latent inference | Comparable observations, known timestamps/context | Missingness, recall and measurement changes; relatively interpretable | Test dialect/translation metadata and culturally relevant event coding | L1–L2 after provenance tests |
| Multidimensional latent-variable models (e.g., factor/IRT families) | Estimate latent dimensions from multiple indicators | Appropriate item/measurement model, sufficient sample, invariance assumptions | Model misspecification, local dependence, differential item functioning, opaque score if misused | Require language and population measurement invariance and sample justification | L4 research; never default clinical score |
| State-space / growth / mixed-effects longitudinal models | Estimate within-person change and population trajectories | Repeated comparable measures; missingness assumptions; temporal design | Confounding, sparse time points, nonstationarity, individual-to-population errors | Need dialect/population subgroup evaluation and external replication | L3–L4 research until validated |
| Bayesian/probabilistic inference | Represent uncertainty and update hypotheses from evidence | Defensible priors/likelihoods, calibrated observations | Prior sensitivity, false precision, calibration drift; explanations needed | Validate calibration by language/population; avoid unreviewed risk probabilities | L3 research/decision support only after validation |
| Graph-based relationships / knowledge graphs | Represent relations among constructs, contexts and evidence | Curated, typed relations and provenance | Graph edges can be mistaken for causality; coverage bias | Validate relation semantics and source coverage in Arabic research | L1 curated graph; advanced inference L3–L4 |
| Temporal sequence/pattern mining | Discover candidate patterns over events | Sufficient longitudinal event density, stable coding | Spurious patterns, leakage, multiple testing, privacy risk | Assess cultural/event coding differences and replicability | Research only, L4 |
| Contextual/multilevel models | Examine environment/person interactions | Valid context measures, enough clusters/time and theory | Ecological fallacy, confounding, unfair subgroup effects | Local context variables need validity and lawful collection | Research only unless purpose-specific evidence |
| Hybrid combination | Combine descriptive, latent, temporal, graph or probabilistic components | Each component validated; explicit interface and error propagation | Complexity, cumulative bias, reduced explainability | End-to-end language/population and fairness evaluation | L4 only unless bounded subcomponent has evidence |

For every proposed method document purpose, assumptions, required data, measurement level, limitations, bias, interpretability, Arabic suitability, validation requirements and permitted use. Model choice must follow scientific evaluation, not preference.

## 4. Provenance, context, time and uncertainty

Every feature observation records pseudonymous subject reference; source/source span; author or model/provider; method and version; event/recorded time; temporal window; context record; consent purpose; raw value/unit; uncertainty/missingness; review state; lineage/transform version; and retention class. Preserve contradictory observations as concurrent evidence; do not select a winner by recency or AI confidence. Context explains interpretation; it does not alter raw validated scores.

## 5. Research transformation from patient memory

Owner-approved process: Patient Clinical Memory → Candidate Pattern Extraction → AI-assisted Analysis → Specialist Review → Scientific/Methodological Validation → appropriate de-identification and Ethics Review → Approved Research Knowledge → Versioned Repository. Patient record remains protected and separate. No one case establishes a general finding; no automatic psychometric item or scoring change. Research protocol defines question, population, sampling, data minimization, methods, uncertainty, bias, replication and publication/rollback controls. See 09/14/16.

## 6. Clinical integration boundary

CBDNA can provide a provenance-rich contextual display to an authorized clinician at approved maturity. It cannot diagnose, prescribe, determine safety, raise/lower risk, recommend emergency response autonomously, or initiate/change a treatment plan. No feature becomes part of a signed formulation without clinician review and attribution. Clinical safety workflow remains available if CBDNA, AI or retrieval fails (RTM-23–28 and RTM-36; proposed RTM-48 where the indicator-to-human-assessment-to-escalation sequence is addressed).

## 7. Validation gates

Define construct and intended use; expert/community content review; operationalization; feasibility and missingness; reliability appropriate to feature; convergent/discriminant evidence; temporal stability/change validity; measurement invariance/fairness; calibration where probabilistic; external replication; Arabic language/dialect evaluation; privacy/reidentification; and prospective impact evaluation before decision support. Ethics/legal review and consent are required for research use. A single clinician approval or model agreement rate is not validation.

## 8. Release states and stop conditions

- L1 design/provenance ledger: no inferred clinical conclusion.

- L2 descriptive trends: comparable evidence, clear uncertainty and clinician review.

- L3 analytic candidates: model-specific validation and monitored use, advisory only.

- L4 research-grade: approved protocol, independent evaluation and bounded intended use.

Stop if lineage is lost, context is hidden, model is irreproducible, contradictory evidence is suppressed, bias/reidentification risk is unacceptable or UI implies person-level certainty. Open construct/measure decisions remain owner/scientific review items; no DNA score is defined.

## Proposed clarification — contextual integration across independent measures (pending approval)

CBDNA may organize evidence-informed relationships, co-occurring patterns and temporal changes among distinct instrument results, observations and context to support clinician-authored formulation. Preserve each original result, source, version, language, administration date, timeframe and limitation. Clearly distinguish association, co-occurrence, clinician interpretation and causality. Such contextual synthesis does not authorize raw-score aggregation, instrument substitution, causal inference from correlation, or score adjustment. Longitudinal comparability requires compatible form/version, language, administration method, population and recall period, or a validated crosswalk; otherwise block comparison or label it non-comparable. AI-generated links remain hypotheses for qualified human review.

## Baseline 2.2 engine contract

**Inputs:** authorized source references retaining immutable epistemic type; exact instrument-result/version reference (never copied as editable score); context/time window; purpose/consent; optional reviewed relation. Missingness and contradiction are explicit. **Outputs:** versioned descriptive/candidate feature, typed relation, uncertainty/limitations, input lineage and review status. **Writes:** CBDNA-owned feature/derivation records only. It cannot write instrument approval/score, clinician decision/treatment, human safety disposition/action or approved finding. **Failure:** return `unavailable`, `invalid` or `non_comparable` with reason; never invent a score and never block the independent human safety path.

Minimum definition fields: stable feature ID/version; operational definition and measurement level; eligible source classes; intended use/population/language; timeframe/context requirements; missingness/contradiction policy; method/version; validation evidence and bias limits; reviewer/approval; maturity and suspend/retire reason. Observation records include source/span, author/role, event and record time, purpose, version, context, value/unit, uncertainty and retention. Corrections/retractions append events; they never overwrite history.

### Activation gates

L1 exposes provenance and source-separated observations only. L2 descriptive trajectories require comparability, visible missingness/context changes, reproducibility and clinician usability review. L3 analytic candidates require intended-use protocol, calibration/fairness where applicable, subgroup/language review, independent validation and monitoring/rollback. L4 research requires approved protocol, lawful authority/consent and ethics/privacy review where applicable. Qualified reviewers must set and freeze numerical thresholds before evaluation; post-hoc threshold changes invalidate that run. Owner approval of a core engine does not validate or enable any mathematical model.

Acceptance links: RTM-23/28/36 (safety independence/failure), RTM-24/25 (display/review/lineage), RTM-26 (temporal comparability), RTM-27/30/32 (research isolation), RTM-29/37 (engine/method), RTM-53–55 (context synthesis/composites/causality). All proposed RTM rows remain pending ratification.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-09"></a>

# Document 09 — Knowledge Evolution and Learning Governance.md

> **Source filename:** `09 — Knowledge Evolution and Learning Governance.md`
**Purpose:** Knowledge lifecycle, research transformation and governance board proposal
**Source last modified:** 2026-11-13 09:34:33 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `8f5302cd3ad7d36505af0e959cfa4300864d916d0cad7a6a60bb858a174e68be`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Knowledge Evolution and Learning Governance

**Version:** 2.2-proposed | **Status:** OD-003/004 directions are owner-approved; governance charter remains proposed and needs ratification

## 1. Three distinct evolution tracks

1. **Knowledge evolution:** curate/revise concepts, evidence, relationships, retrieval sources and approved research findings.

1. **Measurement/psychometric evolution:** instrument forms, translations, scoring, norms and interpretations; changes require independent instrument-specific evidence/rights approval.

1. **Clinical formulation/treatment support evolution:** clinician-authored patient-specific formulation and plan; final authority remains with treating clinician.

These tracks interact through provenance but are not conflated. A knowledge update cannot automatically modify a validated instrument; clinical formulation cannot modify raw scores; AI treatment suggestion cannot become a plan without clinician action.

## 2. Information stores and memory boundaries

Patient Clinical Memory: encounter-specific and longitudinal care record. Clinician Working Memory: temporary drafts and task state. AI Session Context: bounded context for one authorized task, with provider retention separately governed. CBDNA: provenance-rich feature/relationship engine. Candidate Research Patterns: unapproved hypotheses. Approved Research Knowledge: protocol-governed findings. Clinical Evidence Repository: curated external sources. Platform Knowledge Base: approved product/service content. Each store has distinct purpose, access, retention, owner and disclosure rule. No cross-patient memory retrieval by default.

## 3. Authority and source evaluation

Primary studies/manuals and authoritative guidelines are appraised for the claim and population they support; source existence does not prove license. Local validation is bounded to exact sample, language and use. Owner observations are hypotheses; assistant/AI proposals are drafts; vendor or Lovable claims are unverified. Every claim has source, date/version, population, method, limitations, rights where applicable, reviewer and approval status.

## 4. Owner-approved governed discovery pipeline

`Patient Clinical Memory → Candidate Pattern Extraction → AI-assisted Analysis → Specialist Review → Scientific and Methodological Validation → appropriate De-identification and Ethics Review → Approved Research Knowledge → Versioned Knowledge Repository`.

This is a research-discovery pipeline, not an automatic production-learning loop. The originating patient record remains protected. Transfer to research requires appropriate legal basis, consent where required, ethics review, purpose limitation, minimization, de-identification/re-identification assessment and controlled access. A single case is never sufficient to establish a general rule. Clinician approval alone does not establish scientific fact. Research finding does not modify scoring without separate measurement governance.

## 5. Distinguish operations commonly called “learning”

Retrieval locates approved source material; it does not learn. Case-based reasoning compares cases and requires strict authorization/anti-leak controls. Statistical learning estimates patterns from datasets and requires protocol, evaluation and external validation. Model training/fine-tuning changes model parameters and requires explicit lawful rights/consent, provider contract, ethics/security and independent performance analysis. Static rule tables/mock cases are not model learning. Label every capability precisely.

## 6. AI-assisted knowledge evolution

AI may discover candidate patterns, analyze longitudinal changes, identify discrepancies, suggest construct relationships, prepare evidence summaries, identify gaps and propose updates. It cannot approve evidence, generalize from one case, change validated measures, or publish into clinical knowledge autonomously. Specialist review covers clinical, psychometric, methodology, ethics/privacy, language/culture and rights as relevant. Record accepted/rejected/deferred rationale and conflicts of interest.

## 7. Knowledge version and release workflow

Candidate → source/evidence appraisal → rights review → specialist/method review → privacy/ethics review for data-derived work → approval for bounded scope → versioned release → regression/evaluation → monitoring → suspend/retire/rollback. Maintain immutable change records, effective dates, impacted instruments/workflows/indexes and historical interpretability. No silent rewrite.

## 8. RAG governance

Use owner-approved working name PsychoContext Advanced Adaptive RAG Architecture; “RAG 5” is not an official standard. Only curated/authorized, versioned sources are indexed. Filter access before retrieval, track source versions and exact citations, separate patient-specific search, defend against prompt injection, abstain when support inadequate and test Arabic performance. Full design/evaluation in 17.

## 9. Governance roles and metrics

Establish a Knowledge Governance Board (clinical, psychometric, research, privacy/security, rights, Arabic-language and engineering as appropriate). Monitor evidence coverage, overdue sources, rights status, retrieval relevance, citation entailment, abstention, Arabic quality, unauthorized access, knowledge changes and reversals. Performance metrics are not clinical efficacy. Assign suspension authority before production.

## Proposed psychometric knowledge-change controls (pending approval)

Keep separate governance events for evidence updates, instrument-register metadata updates, form/translation/adaptation changes, scoring changes and interpretation-rule changes. A new instrument requires a documented need, operational construct definition, literature/measure review, rights assessment, item/content development or adaptation review, cognitive/language/cultural testing, pilot, fit-for-purpose reliability/validity and population review, interpretation limits, independent approval and ongoing monitoring. Evidence repository updates must not silently alter a live form or scoring algorithm. Every change is versioned, impact-assessed, approved for bounded use and rollback-capable.

## Baseline 2.2 Knowledge Governance Board charter (proposed)

**Mandate:** review scoped, versioned changes to shared knowledge, research findings, instrument-related evidence links and RAG source sets. It does not replace a treating clinician, legal counsel, ethics body, data controller or rightsholder. Owner appoints chair/secretariat; no appointment is presumed. Required competence includes clinical, psychometric, research/methodology, privacy/security, legal/rights, Arabic/cultural and engineering representation as relevant; conflicts are disclosed and managed.

**Quorum/sign-off proposal:** no simple majority can waive a mandatory control. A decision is valid only after each role required for that change type records approve/reject/conditional/defer: psychometric for measure/scoring claims; clinical for clinical content; methodology for generalizable findings; privacy/security and lawful-authority reviewer for patient-derived data; rights reviewer for restricted materials; Arabic/cultural reviewer for language adaptation; engineering reviewer for release/testability. Chair records dissent and rationale. Until owner ratification and appointments exist, publication to production/shared clinical knowledge is disabled; candidate work may remain in an isolated non-production queue.

Decision record contains candidate/version, evidence/rights, scope/population/language/use, reviewers/conflicts/dispositions, dissent, predeclared acceptance thresholds, tests, release date, monitoring owner, suspension triggers and rollback target. Author cannot be sole approver. Board vote cannot grant legal rights or substitute for ethics approval. A single case or clinician sign-off cannot establish general scientific fact.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-10"></a>

# Document 10 — Architecture Reconciliation Matrix.md

> **Source filename:** `10 — Architecture Reconciliation Matrix.md`
**Purpose:** Architecture conflict reconciliation and corrected reference crosswalk
**Source last modified:** 2026-11-13 09:35:35 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `d57fe05757cb9d1ab1936396f6c9859c748d21e8ba44e0f8d7127b5e4821e6c7`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Architecture Reconciliation Matrix

**Version:** 2.2-proposed | **Status:** Integrated proposal; OD-001–008 remain as sourced approvals; all other resolutions are proposed/open unless explicitly approved

| ID | Original positions and sources | Conflict/gap | Reconciled position | Decision status | Target docs / owner | Priority, dependencies and acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| RC-01 | Historical environmental score calibration in Nov 6 action history vs owner requirement preserve valid measurement | Context subtraction may invalidate score | Context informs formulation only; raw scores unchanged absent specific validated method | OWNER REQUIREMENT; resolution policy | 01,02,07,12 / psychometric lead | P0; test context invariance |
| RC-02 | Full platform vision vs earlier assistant recommendation for narrow MVP | Narrow scope could appear to remove domains | Retain all domains; four maturity levels govern capability depth, not importance | OWNER APPROVED Decision 7 | 01,05,15 / owner | P0; every domain mapped to maturity level |
| RC-03 | Earlier provisional CBDNA as emerging concept vs owner says independent core engine | “Research-only” wording could demote its architectural role | CBDNA is an independent core engine in architecture; individual models/features mature through gates; not clinical authority | OWNER APPROVED Decision 1 | 01,08,16 / owner + scientific lead | P1 core / L4 for research models; provenance and boundary tests |
| RC-04 | Exclusive hierarchy vs cross-domain links | Single branch loses interconnection | Multi-axial many-to-many taxonomy; links do not imply equivalence/score combination | OWNER APPROVED Decision 2 | 02,07 / knowledge owner | P1; schema/link semantics tests |
| RC-05 | Patient cases as learning memory vs no automatic generalization | Privacy and validity conflict | Patient memory generates candidates through specialist/method/ethics/de-ID pipeline only | OWNER APPROVED Decision 3 | 08,09,14,16 / research governance | P0 research; block auto-update tests |
| RC-06 | “Self-learning” AI vs human evidence authority | Model output may be mistaken for approved knowledge | Hybrid AI-assisted discovery; specialists review; approval/versioned release required | OWNER APPROVED Decision 4 | 09,11,17 / governance board | P1; audit every update and test single-case block |
| RC-07 | AI recommendation vs clinician final authority | Risk of automation bias/override | Clinician authoritative throughout; enforce in role, API, data, UI, orchestration, audit and tests | OWNER APPROVED Decision 5 | 01,03,11 / clinical governance | P0; negative authorization/E2E tests |
| RC-08 | Undefined “RAG 5” vs new clarification | Possible false claim it is a formal standard | Working name Advanced Adaptive RAG; evaluate methods selectively; never claim official version | OWNER APPROVED Decision 6 | 02,03,17 / AI/knowledge owner | P1 design; benchmark and provenance criteria |
| RC-09 | Historical MIL-PREP/generic civilian readiness/defense preparation language vs clarified applicant service | Prior interpretation changed actual offering | Free Military Applicant Psychological Readiness Program for Egyptian applicants; specific developmental/wellbeing goals and non-official boundaries | OWNER APPROVED Decision 8 | 01,13,15 / owner + service lead | P1 specification; acceptance checks language, free status, boundaries |
| RC-10 | Service may be confused with physical military preparation, rehabilitation or official admissions | High-stakes/official-affiliation risk | Explicit exclusions; no prediction/guarantee/deception coaching or official equivalence | OWNER APPROVED Decision 8 | 11,13,14 / legal + clinical | P0 safeguards; content review and no forbidden outcomes |
| RC-11 | Islamic psychology as assessment perspective vs future Fitrah | Could conflate domain and model | Keep one perspective where evidence/rights exist; Fitrah is separate future research | Prior owner requirement retained | 01,02,08 / owner + scholars/researchers | P2; separate construct/approval gate |
| RC-12 | Seven scales claimed validated vs absent proof/rights in prior audit | Bibliographic citations treated as validation/license | Instrument-by-instrument status; no activation without evidence and permissions | OWNER REQUIREMENT + PSL | 02,12 / psychometric + legal | P0; dossier required |
| RC-13 | Clinician-selects assessment vs AI can apply recommendation | Workflow can overwrite source of decision | Store clinician initial choice, AI suggestion, edits, final clinician order separately | OWNER REQUIREMENT + reported implementation gap | 03,07,11 / clinical+engineering | P1; audit/event test |
| RC-14 | Diagnosis/treatment AI support vs independent clinical decision | UI may appear final | AI hypothesis separate; authenticated clinician authors final diagnosis/treatment and amendments | OWNER APPROVED Decision 5 | 03,11,18 / clinical+legal | P0; API cannot finalize AI output |
| RC-15 | CBDNA vs CBT nomenclature | Similar acronym/confusion | Always expand Cognitive Behavioral DNA as CBDNA and Cognitive Behavioral Therapy as CBT; glossary and UI disambiguation | ARCHITECTURAL RECOMMENDATION | 01,02,08,11 / product owner | P1; terminology/accessibility review |
| RC-16 | Broad repositories/Google Drive-only Smart Guardian vs curated/versioned evidence | Source authority, permissions, staleness unclear | Authorized, curated, versioned sources; no source ingested solely because uploaded | OWNER Decision 6 + recommendation | 09,17 / knowledge governance | P1; rights and freshness tests |
| RC-17 | Historical “Built” vs prior audit reports and missing repo | Unclear current state | Preserve claims as unverified until source/runtime evidence; report old defects as prior findings | EVIDENCE RULE | 04,18,19 / engineering reviewer | P0 audit; commit + reproducible tests |
| RC-18 | Full service population vs one release decision | Scope choice still needed although vision retained | Choose first capability slice; do not erase other populations/programs from target architecture | OWNER APPROVED Decision 7; specific slice OPEN | 05,06,15 / owner | P0 planning; accepted release matrix |
| RC-19 | Patient memory/AI session/research KB/evidence repository | Memories may leak across patient or purpose | Separate storage/access/retention; governed one-way transformation to research | OWNER APPROVED Decision 3 | 02,09,14,16,17 / privacy/research | P0; access and data-flow tests |
| RC-20 | Candidate math techniques vs unvalidated universal CBDNA model | Architectural preference could fabricate science | Evaluate per construct and use; no model chosen until qualified validation | OWNER APPROVED Decision 1 | 08,16 / psychometric/research board | P3; model selection dossier |

## Decision hierarchy

The eight owner decisions in supplied prompt are authoritative. They do not waive scientific, clinical, legal, privacy, operational or security gates. For unresolved implementation choices, consult 06. Historical proposals are not owner approvals. The original seven documents remain unchanged; proposed section-level updates are listed in 18.

## Additional reconciliation — psychometric governance proposal

| Issue | Reconciled proposed rule | Status / acceptance |
| --- | --- | --- |
| Measure exists vs may be used | Registry presence is discovery only; use requires exact scoped approval | Proposed; RTM-39/40 |
| Contextual integration vs score aggregation | Evidence-informed formulation, composite-score gate and causality boundary are independent controls | Proposed; legacy RTM-42 crosswalks to RTM-53/54/55 |
| AI recommendation vs clinician choice | AI proposes with evidence/reasons/alternatives/burden; clinician alone selects the assessment order | Proposed; RTM-43/44 |
| Instrument version and longitudinal comparison | Compare only compatible versions/languages/methods/timeframes or a validated crosswalk | Proposed; RTM-46 |
| New scale vs adequate evidence | Full development/evaluation lifecycle; Cronbach’s alpha alone is insufficient evidence of quality or validity | Proposed; RTM-49/50 |

## Baseline 2.2 reference corrections and added crosswalk

| Reference issue | Correct baseline treatment | Status |
| --- | --- | --- |
| ADR-017 cited in earlier privacy/safety text | ADR-017 does not exist in the register; remove it rather than infer a new decision | Corrected in 11/14 |
| ADR-015 cited as CBDNA/safety authority | ADR-015 concerns future Fitrah only; CBDNA boundary uses OD-001, clinician authority OD-005, and operational safety ADR-008 | Corrected in 06/07/08/11 |
| ADR-009 cited for first release | ADR-009 is roles/tenant boundaries; first live capability is ADR-001 | Corrected in 15/19 |
| RTM-02 linked to ADR-014 | Authority comes from OD-005; ADR-014 covers legal sign-off semantics | Corrected in 07 |
| RTM-42 mixes contextual synthesis, composite scores and causality | Preserve RTM-42 stable ID as legacy umbrella; use independent RTM-53/54/55 tests | Proposed; approval pending |

All identifiers remain stable; no historic requirement is silently deleted. New rows are add-ons, not proof of implementation or approval.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-11"></a>

# Document 11 — Clinical Governance and AI Authority Framework.md

> **Source filename:** `11 — Clinical Governance and AI Authority Framework.md`
**Purpose:** Clinical authority, safety workflow, roles and launch gates
**Source last modified:** 2026-11-13 09:34:36 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `7121aafabf29fb2795517529319cc729de2aff7fea04e1117135b0089dfb5735`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Clinical Governance and AI Authority Framework

**Version:** 2.2-proposed | **Status:** OD-005 authority principle approved; operational safety controls proposed and not launch-approved

## 1. Foundational rule

**AI is advisory. The qualified clinician is authoritative for all clinical diagnostic and therapeutic decisions.** This owner-approved rule is architectural, not disclaimer-only. Enforce in system architecture, roles, data models, API contracts, UI, workflows, AI orchestration, audit and acceptance testing. CBDNA is a core engine but not a clinical decision-maker.

## 2. AI permitted and prohibited actions

AI may produce preliminary hypotheses, retrieve/summarize evidence, suggest assessments, identify candidate patterns/discrepancies, provide contextual insights and explain possible options with limitations. AI must never make final diagnosis/treatment, override clinician, present hypothesis as approved conclusion, modify validated scoring, autonomously initiate/change treatment or independently determine safety disposition/referral. A model confidence value is not authority.

## 3. Clinical states and attribution

Separate patient report, observed behavior, measure results, clinician interpretation, AI hypothesis, CBDNA-derived candidate, and approved clinician conclusion. Store source/model/prompt/version/retrieval evidence, author, timestamps, review state and amendment lineage. Clinician can accept/edit/reject/defer with reason; original AI content stays distinguishable. Only authenticated, appropriately credentialed clinician may create final clinical decisions. Signature semantics require local legal review.

## 4. Workflow responsibilities

Registration/consent → intake → source-grounded extraction → clinician verification → clinician-selected measures (AI suggestions optional) → authorized administration/scoring → clinician review → clinician formulation/diagnosis → optional AI comparison → clinician-owned treatment plan → follow-up/outcomes. Each transition enforces roles and audit. CBDNA may organize longitudinal evidence at approved maturity but does not convert observations into clinical facts or alter measures.

## 5. Safety and escalation

Named human clinical-safety owner, responder coverage, location-specific verified resources, escalation path for unavailable responder, privacy notice, documentation, audit, incident review and tabletop validation are prerequisites for live safety workflows. AI/CBDNA/RAG cannot independently raise/lower/close risk or trigger treatment/referral. Safety protocol remains operational during AI/CBDNA outage; no invented contacts, unstaffed monitoring claim, or model-only fallback risk determination. See RTM-23–28 and RTM-36; proposed RTM-48 addresses separation of indicator recognition, human assessment and operational escalation. Applicant-program boundaries are in 13.

## 6. CBDNA-specific safeguards

Before any clinician view: label CBDNA as a developing representation; show source type, context, time, uncertainty, reviewer, version and lineage. No universal “DNA” score, identity badge, rank, prognosis or pathology inference. Do not infer persistent traits from one observation. Incompatible measures/timeframes must be separated or visibly marked non-comparable. Patient correction/disagreement is preserved. A CBDNA feature does not enter an approved formulation without clinician review.

## 7. Governance roles

Before clinical deployment appoint clinical lead, credentialing authority, instrument reviewer, safety lead, clinical content reviewer, incident lead, privacy/security owner and operational service owner. Define delegation, access review, break-glass, complaint handling and scope-of-practice controls. Researchers do not receive care access by default; admins do not acquire clinical authority.

## 8. AI system controls and evaluation

Central AI gateway: provider/model/prompt version, purpose and consent check, data minimization, structured output validation, citation/source attribution, uncertainty/abstention, human review, audit and safe failure. Evaluate automation bias, prompt injection, contradiction, missingness, Arabic/dialect quality, subgroup impact, unsupported claims, error handling and provider outage. Monitor changes before deployment. Agreement with clinician is not ground truth or efficacy.

## 9. Incident and quality system

Define severity, containment, investigation, notification, root cause, corrective action, model/knowledge suspension and record impact. Review near misses and complaints. Any suspected unsafe AI or CBDNA output triggers human review and potential feature suspension. Preserve audit evidence under approved retention policy.

## 10. Release gates

No clinical live use until named clinician/operator, credentialing, workflow, consent, approved measures, legal/privacy review, safety staffing, verified local resources, tested escalation, audit/access controls, backup/restore, AI provider governance and acceptance tests are documented. Relevant decisions, by subject, include ADR-002 (measures), ADR-005 (AI providers), ADR-007 (minors), ADR-008 (safety operations), ADR-009 (roles/tenant boundaries), ADR-010 (privacy/retention), ADR-013 (technology/hosting) and ADR-014 (sign-off semantics); ADR-011/012 apply where research or applicant-program workflows are in scope. No ADR-017 is defined in the current register. See 07, 13, 14, 18 and 19.

## Proposed clinical workflow/report/safety refinement (pending approval)

Keep screening, assessment/measurement and diagnosis distinct in authorization, data models, UI and workflow. Safety operations have three separate stages: (1) identification of possible indicators; (2) qualified human assessment; (3) operational escalation/referral using an approved, location-appropriate protocol and accountable service owner. No score or automated indicator is a final safety decision. Local operating resources and coverage must be verified; general external guidance alone does not define Egypt-specific operations.

A clinician report should preserve, as distinct attributable sections: original complaint; AI-extracted candidate information; clinician-verified facts; measures suggested and reasons; measures actually selected by clinician; original results per exact version; context; AI hypotheses and their evidence; clinician’s independent opinion; disagreements; final decision, author and date. Corrections and amendments are traceable. The qualified clinician remains authoritative.

## Baseline 2.2 operational safety state machine (proposed)

`No indicator → possible indicator recorded → qualified human assessment pending → human disposition recorded → (if required) operational referral/escalation initiated → follow-up/closure by authorized human`. A score/model flag can create only a possible indicator, never a disposition. Human assessment records actor/credential, time, protocol version, information reviewed, decision, rationale, action/referral and follow-up owner. Closure requires an authorized human and reason. AI/CBDNA/RAG cannot raise/lower urgency, cancel an alert, close a case or trigger treatment.

### Roles and launch-blocking operating configuration

Before a safety-enabled live service appoint a clinical safety owner, trained responder(s), coverage/backup owner, service/site operator, incident reviewer and privacy contact. Define service hours, eligible geography, response expectations, out-of-hours fallback, verified referral resources, unavailable-responder escalation, handoff acknowledgement, user-facing limits and retention. Names, contacts and local protocol are owner-verified operational facts; none are invented here. Missing/expired configuration disables the live safety-dependent feature; the UI must not imply monitoring.

### Acceptance / fault-injection scenarios

Test that: (1) AI/CBDNA/scale cannot create or resolve human disposition; (2) uncredentialed role cannot assess/action; (3) missing coverage/location causes approved fallback or non-activation, never fabricated contact; (4) AI/RAG/database outage leaves human protocol accessible; (5) replay is idempotent; (6) amendments preserve earlier events; (7) referral acknowledgement/failure has an owner; (8) synthetic tabletop scenarios cover ordinary, urgent, out-of-hours and unavailable-responder cases. RTM-23/28/36 and proposed RTM-48 are stop-ship for any live safety workflow. Local protocol and coverage require clinical operations, owner and legal review.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-12"></a>

# Document 12 — Psychometric Instrument Governance and Licensing.md

> **Source filename:** `12 — Psychometric Instrument Governance and Licensing.md`
**Purpose:** Psychometric instrument evidence, rights, lifecycle and approval controls
**Source last modified:** 2026-11-13 09:34:39 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `83c14fd54883a479e25311d5d26af5037017dd4068f2d2e7ba8a99049f16230b`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Psychometric Instrument Governance and Licensing

**Version:** 2.2-proposed | **Status:** Proposed governance policy; no named scale is approved by this baseline

## 1. Purpose

Govern instruments throughout measurement evolution. Screening is not diagnosis; measurement is not formulation; formulation does not modify a validated score; treatment remains clinician-led. No arbitrary composites; DASS-21 subscales remain separate. Public availability does not grant rights to reproduce, translate, digitize, score or administer.

## 2. Instrument admission dossier

For exact form/version record: original source and purpose; construct; intended population/setting/exclusions; form language and translation/adaptation path; Arabic and Egypt-specific evidence (if any) with sample/year/method/limits; reliability/validity evidence appropriate to use; norms/cutoffs and provenance; administration/timeframe; scoring/subscales/missing rules; original author/publisher/rightsholder; reproduction, translation, digital administration, storage and scoring permissions; training/qualification; item confidentiality; clinical limitations; reviewer; approval status; effective/review dates.

## 3. Distinguish evidence and permission

Status dimensions are separate: international evidence, Arabic validation, Egyptian validation, translation-only, evidence unknown; item rights; digital administration rights; scoring rights; user qualification; target use. One approval cannot imply another. Do not infer Egyptian norms from Arabic translation or another country's sample. Do not reproduce restricted item text without appropriate permission.

## 4. Review and release workflow

Candidate → source check → scientific/psychometric appraisal → language/population review → rights/legal clearance → clinical suitability and safety review → scoring implementation/test vectors → privacy/security review → approval for bounded use → monitoring. Unknown critical data blocks activation. Screening/research/clinician-administered/restricted instruments are tagged distinctly. Any altered items or scoring create a new form needing separate review.

## 5. Scoring and interpretation controls

Implement deterministic server-side scoring with immutable specification/version and authoritative test vectors. Verify reverse coding, subscales, boundaries, missing values, timeframe and output labels. Preserve raw scores. Context is separately displayed. Do not combine unlike scores, create a universal score, infer diagnosis from cutoff, or modify scoring based on CBDNA. Display language/form/population basis and limitations.

## 6. Ongoing monitoring

Track permission expiry/terms, source updates, scoring issues, user/clinician complaints, population drift, subgroup performance and safety events. Suspend when rights uncertain, scoring defective, evidence withdrawn, use exceeds approved purpose or harm risk emerges. Preserve version history and identify impacted records.

## 7. Candidate status

PHQ-9, BDI-II, DASS-21, GDS-15, GAD-7, ISI, PSS-10, C-SSRS, PCL-5, WHO-5 and other measures mentioned in prior materials are candidates only. MIL-PREP must not be represented as official or predictive; the applicant program may use only measures cleared for its developmental purpose. Islamic psychology measures also require construct, validity and licensing review. This policy itself does not validate or license any tool.

## 8. Approvals and traceability

Psychometric reviewer, clinical owner, rights/legal reviewer, privacy/security and implementation test owner sign the instrument record as applicable. Link the core instrument-admission evidence to RTM-04 and the applicable decisions ADR-002 (instrument set) and ADR-003 (contextual interpretation); use ADR-010 and RTM-51 where privacy/retention is the subject. The additional psychometric/adaptive requirements RTM-39–50 and instrument-evidence retrieval/privacy requirements RTM-51–52 are **proposed and pending ratification**, not approved release requirements. Legal references and license terms must be verified against original documentation before use; this document makes no unverified legal claim.

## Proposed additions — lifecycle, development and psychometric interpretation (pending approval)

Use lifecycle states `Discovered`, `Under Review`, `Evidence Reviewed`, `Rights Verified`, `Language Validated`, `Approved`, `Suspended`, `Retired`; define allowed transitions, reviewers, evidence and date. Approval is bound to exact instrument version, language, population, context and intended purpose. Maintain distinct version records for original, published translation, cultural adaptation, psychometrically evaluated form and digital PsychoContext form. Record change reason, author, reviewer, approval, impact and rollback for every change to items, administration, scoring or interpretation.

For a new measure, require: documented unmet need; operational construct definition; literature and existing-measure review; rights review; content development/review; cognitive, linguistic and cultural testing; pilot; appropriate reliability and validity studies; target-population suitability; interpretation boundaries; independent review/approval; and ongoing monitoring/revalidation. Cronbach’s alpha alone is not sufficient evidence of validity or overall measure quality; select evidence methods appropriate to the construct and use. No new form is approved merely by completing this checklist; expert review and fit-for-purpose evidence are required.

## Baseline 2.2 state-transition and runtime contract (proposed)

| Transition | Required authority/evidence | System effect |
| --- | --- | --- |
| Discovered → Under Review | Curator; source identity and intended-use candidate | Internal discovery only; not orderable |
| Under Review → Evidence Reviewed | Psychometric reviewer; complete dossier and limitations | Still not orderable |
| Evidence Reviewed → Rights Verified | Rights reviewer; exact reproduction/digital/scoring permissions | Unknown right blocks item display, administration and scoring |
| Rights Verified → Language Validated | Language/cultural/psychometric review of exact form | Scope limited to reviewed version/language/population |
| Language Validated → Approved | Required psychometric, clinical, rights and privacy/security sign-offs; tests and exact scope | Server-issued approval; exact scope alone can be ordered |
| Approved → Suspended | Authorized reviewer or incident response; reason/effective time | Blocks new orders/scoring; preserves historical results and audit |
| Approved/Suspended → Retired | Governance authority; impact/retention/successor plan | Blocks future use; preserves history |

No direct `Discovered → Approved`, UI-only approval or wildcard scope. State events append actor/role/time/evidence/rationale/scope/prior/new state and supersession link. Any item, translation, digital form, administration, scoring, cutoff or interpretation change creates a new immutable version. Suspension blocks prospective use but does not rewrite past results. Negative tests cover unauthorized transitions, stale scope, expiry and concurrent state changes (RTM-39–41).

--- END FULL SOURCE CONTENT ---

---

<a id="doc-13"></a>

# Document 13 — Military Applicant Psychological Readiness Program.md

> **Source filename:** `13 — Military Applicant Psychological Readiness Program.md`
**Purpose:** Military Applicant Psychological Readiness Program service specification
**Source last modified:** 2026-11-13 09:34:42 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `b949736fa78bd1c5f68021395eca949aabc72ec059133b9cbc88199a0f209dad`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Military Applicant Psychological Readiness Program

**الاسم العربي:** برنامج الاستعداد النفسي للمتقدمين للكليات العسكرية
**Working English name:** Military Applicant Psychological Readiness Program

**Version:** 2.2-proposed | **Status:** OD-008 service boundary approved; eligibility, operations and assessment remain open

## 1. Purpose and intended population

A **free**, civilian psychological wellbeing and preparation service offered independently by PsychoContext for Egyptian young men aspiring to apply to military colleges after secondary examinations. The owner identifies prolonged academic pressure, disappointment related to results, application anxiety and fear of formal assessment/interviews as potential needs. The program is intended to help applicants understand current wellbeing, recover/stabilize after pressure, manage anxiety, build confidence/emotional balance, cope with stressful situations, understand patterns and monitor progress.

The owner’s view that wellbeing support may help applicants approach assessment in a more balanced condition is recorded as an intended rationale/benefit, **not scientifically established evidence of changing official admission outcomes**.

## 2. Service activities (proposed, subject to review)

May include an initial appropriate wellbeing assessment, psychoeducation, structured developmental exercises, voluntary follow-up and reassessment. Potential domains for evidence review: stress and performance anxiety, emotion regulation, resilience, self-confidence, adaptability, attention/cognitive functions where justified, interpersonal/social functioning, personality/individual differences and emotional stability. No measure or cutoff is approved here. Use only age/population-appropriate instruments with documented rights and evidence. Non-standardized exercises must be labeled educational/developmental, not tests.

## 3. Explicit exclusions

This program is **not** military rehabilitation, physical preparation, medical clearance, official psychological assessment, official admissions preparation authority, official test simulation, military institution, or replacement for official procedures. It has no affiliation with military authorities. It cannot guarantee acceptance, predict examination outcomes, or issue “fit/unfit,” pass/fail, acceptance/rejection recommendations. Official assessment/admission is exclusively conducted by the relevant institution. Do not train applicants to conceal, manipulate or fabricate psychological traits/answers.

## 4. User journey (target)

Clear program description and free-service notice → eligibility and purpose-specific consent → minimum necessary intake → optional reviewed assessment/educational exercises → user reflection and goals → developmental support activities → follow-up and voluntary reassessment → referral to independent support where appropriate. Show results as self-understanding/progress feedback with limitations; not as official readiness or admission likelihood. Do not share individual results with admissions bodies by default.

## 5. Clinical boundary and safety

The program is civilian and developmental. If clinical symptoms or safety concerns arise, use a separately approved referral/safety pathway with named human ownership; do not imply the program provides clinical diagnosis or emergency response unless staffed and approved. Decide whether a licensed clinician supervises any assessment or support. Age/consent policy requires Egyptian legal and child/adolescent clinical review; initial access scope remains open until approved.

## 6. Privacy and operational requirements

Separate program records and consent from clinical care records; use pseudonymous ID where practicable; collect no national ID/audio by default; no default institutional reporting at individual level. Define free-service funding/operations, staff roles, data retention and referral coverage. Small group reporting requires disclosure controls. Legal, privacy and operational requirements must be reviewed before launch.

## 7. Evaluation

Measure service outcomes such as participant comprehension, wellbeing goals and engagement under an approved evaluation plan. Do not use admission outcomes as proof of causation without appropriate design; no claim of acceptance improvement. Evaluate accessibility, equity, attrition and unintended pressure. Research requires protocol, appropriate consent/legal basis and ethics review where applicable.

## 8. Acceptance criteria

Before pilot: free status and Arabic name displayed; consent/purpose explicit; no military affiliation or official equivalence in copy; no admission prediction/fitness/pass-fail; no deception coaching; approved measures only; separate service identity/data; verified human referral/safety limits; content reviewed by qualified professionals; evaluation and complaints channel defined. Related decisions: OD-008 (approved service boundary), ADR-007 (minor safeguards) and ADR-008 (safety operations). Related requirements: historical RTM-14, definitive service-boundary RTM-35, and proposed RTM-48 for safety-stage separation. See 11, 12, 14, 15 and 19.

## Proposed assessment-governance clarification (pending approval)

Any instrument used in this program must be appropriate to the approved age range, language, population, context and developmental purpose; the exact version and rights/evidence scope must be verified under document 12 before use. Assessment recommendations remain advisory and the authorized clinician/service professional selects the measure. No measure is an official military admissions test, acceptance predictor or eligibility decision. This clarification does not change the owner-approved free/civilian program boundary.

## Baseline 2.2 eligibility and launch decision table

| Decision | Status | Required reviewer/evidence | Safe default until resolved |
| --- | --- | --- | --- |
| Age range/minor access | Open/blocked | Owner, Egyptian counsel, child/adolescent clinical lead; consent/assent/safeguarding | No minor enrollment/data collection |
| Free-service funding/capacity/geography | Open | Service owner; operational scope, staffed capacity and complaints channel | Do not advertise a live service or monitoring |
| Educational vs clinical scope | Open | Clinical owner/counsel; scope of practice and referral | Educational content only, no diagnosis/treatment |
| Measures/scoring | Open per exact version | Psychometric/rightsholder review under 12 | No live administration of uncleared measure |
| Safety/referral coverage | Open/blocked | Named human owner, verified local resources, hours, fallback and test under 11 | No safety-dependent live workflow |
| Sharing with admissions bodies | Prohibited by default | Would require a separate explicit lawful/purpose decision and consent | No individual result disclosure |

Display the free-service claim only when the operating owner confirms the actual service scope is free; availability and geography must be explicit. No readiness score, ranking, pass/fail, acceptance prediction or eligibility decision. Referral into clinical care does not silently convert records: separate consent, authorization and record creation are required. Links: OD-008, ADR-001, ADR-007/008/010, RTM-35/48/51.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-14"></a>

# Document 14 — Privacy Security and Data Governance.md

> **Source filename:** `14 — Privacy Security and Data Governance.md`
**Purpose:** Privacy, security, data-flow, consent and retention governance
**Source last modified:** 2026-11-13 09:36:49 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `ac3de5f68897fe5b86251401be6655e86de61877ce88a44599a1f5e8cfdb8d33`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Privacy, Security and Data Governance

**Version:** 2.2-proposed | **Status:** Proposed control framework for privacy/legal review; not compliance certification

## 1. Data domains and separation

Classify direct identifiers, clinical records, assessment responses/results, applicant-program records, audio/transcripts, AI prompts/outputs, CBDNA observations/derivations, clinician working drafts, research candidates, approved research findings, evidence sources, institutional aggregates, audit/security logs and public content. Each has purpose, controller/owner, access, retention and export rules. Clinical patient memory must not be generally retrievable by other patients, programs or research users. Applicant-program records are separated from clinical records and admissions bodies; no default individual sharing.

## 2. Data minimization and consent

Collect only data necessary to an approved purpose. National ID, precise location/neighborhood, audio and sensitive context are off by default. Consent is purpose-specific for care, assessment, speech, external AI, applicant program, research reuse and communications. Record consent version/time/scope and processing linkage. Revocation rules distinguish future use from lawful record retention; explain limits transparently. Consent does not itself grant instrument copyright or eliminate legal duties.

## 3. Security controls

Backend authorization on every request; least privilege; tenant/service isolation; credential verification; MFA privileged users; encryption in transit/at rest; key rotation/secrets manager; short-lived signed object access; protected append-only audit; access review; export restrictions; rate limits; secure development and dependency scanning; production/demo separation; synthetic demo data; tested backups/restores; incident response. Never store clinical data in browser localStorage. Minimize sensitive logs.

## 4. CBDNA and research data controls

CBDNA feature records carry pseudonymous IDs, purpose and provenance. Patient-level source remains in authorized clinical store. Candidate pattern extraction does not authorize research reuse. Governed pipeline requires protocol, appropriate legal basis/consent, ethics review where applicable, de-identification and re-identification assessment, access approval, retention and publication policy. Preserve linkage only where legally/ethically permitted and tightly controlled. No automatic model training or generalization from individual case.

## 5. AI/RAG provider governance

Before external transmission assess contract, subprocessor, region/residency, retention, training use, deletion, security, incident response and permitted data classes. Data minimization/redaction and explicit purpose check in AI gateway. Log model/prompt/retrieval version without unnecessarily retaining prompt content. RAG authorization filters before retrieval; separate evidence search from patient-specific memory; test cross-patient leakage and prompt injection. No “RAG 5” standard claim; work under the Advanced Adaptive RAG name.

## 6. Speech/audio

Audio disabled by default in initial release recommendation. Any future use needs separate consent, purpose, processor review, access, retention/deletion, transcript correction and alternative non-audio path. Do not infer acoustic properties from transcript text. Provide recording indicator and failure state.

## 7. Minors, vulnerable populations and legal review

Do not launch minor data processing until applicable jurisdictional rules, guardian consent/assent, confidentiality, safeguarding, referral, retention and emergency responsibilities are reviewed by qualified counsel and clinical specialists. The applicant program’s user age/eligibility must be explicitly governed; do not assume adult status from intended audience.

## 8. Retention, access rights and incidents

Set retention/deletion/correction/export schedules by data class; include backups, derived CBDNA features, AI provider copies and audit events. Define legal hold, user requests, revocation and breach response with jurisdiction counsel. Access and research exports logged. De-identification must assess quasi-identifiers and small-cell disclosures, not only direct names.

## 9. Release gates

Resolve applicable registered decisions by subject: ADR-005 (AI provider/data processing), ADR-007 (minors), ADR-008 (safety data/operations), ADR-010 (privacy/retention), ADR-011 (research/data reuse), ADR-013 (hosting/residency) and ADR-014 only where clinician sign-off record semantics affect personal data. ADR-017 is not present in the current register and is not cited. Complete threat model, data map, provider review, role tests, incident plan, restore test and legal/privacy assessment. No compliance claim without control-to-evidence review.

## Proposed assessment-record privacy additions (pending approval)

Consent and access controls for assessment responses, scores, source excerpts, recommendation rationale, clinician reports and version/change lineage must be purpose-limited. Retention, deletion, export and correction rules must cover these linked artifacts and must not turn consent for service delivery into permission for unrelated research or cross-institution sharing. Exact operational rules remain subject to jurisdictional review and ADRs.

## Baseline 2.2 purpose-flow and retention decision matrix

| Data flow | Allowed destination/purpose | Prohibited default | Decision/evidence still required |
| --- | --- | --- | --- |
| Patient care → AI provider | Only minimum necessary fields after consent/purpose and provider review | Raw identifiable complaint/demographics to unreviewed provider; provider training use | ADR-005, contract/subprocessor/region/retention settings |
| Patient memory → CBDNA candidate | Pseudonymous, scoped feature candidate in authorized clinical context | Cross-patient retrieval or shared research fact | OD-003; ADR-010/011; protocol and minimization |
| Clinical/applicant service → research | Protocol-controlled dataset after lawful basis, ethics where applicable, privacy/de-identification review | Automatic case-level sharing/model training | ADR-010/011; re-identification assessment and reviewer approval |
| Instrument response/result → report | Same authorized care/service purpose; exact version/provenance | Reuse for unrelated institution, admission decision or research by default | RTM-51; scope, recipient and retention approval |
| Source document → RAG index | Authorized version with metadata and underlying access checks | Upload implies rights; retrieval to unauthorized user | Rights review, source owner, deletion propagation, ADR-013 hosting/residency |
| Applicant program → clinical care/referral | Separate record creation only with separate consent/authority and role checks | Silent record merge or admissions-body access | OD-008; age/consent/safety decisions |

Retention schedule is deliberately not numeric pending jurisdictional counsel/data-controller decisions under ADR-010. Before production, define for each data class: active retention, archival/legal hold, deletion trigger, backup expiry/restore behavior, derived/index/cache propagation, provider deletion proof, correction/export SLA, audit exception and accountable owner. An unresolved duration or lawful basis blocks the corresponding production data flow; it does not default to indefinite retention.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-15"></a>

# Document 15 — Product Scope and Capability Maturity.md

> **Source filename:** `15 — Product Scope and Capability Maturity.md`
**Purpose:** Product scope, capability maturity and module enablement
**Source last modified:** 2026-11-13 09:35:39 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `32930475d6da932fdc6c8b4c00189ae03493c4a200732684b373a7cf0e38adeb`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Product Scope and Capability Maturity

**Version:** 2.2-proposed | **Status:** OD-007 full-vision principle approved; release and capability activation decisions remain open

## 1. Scope principle

PsychoContext is a unified psychological consultation service across patients, students, adolescents subject to safeguards, employees, families, universities, schools, institutions, researchers, program administrators and community beneficiaries. Major domains must not be removed or indefinitely postponed merely to narrow an MVP. Instead, each capability is assigned a maturity level. Service boundaries, permissions, consent and confidentiality vary by context. Not every program becomes a separate product.

## 2. Maturity levels

- **Level 1 — Foundational:** safe, usable basic capability; limited scope, explicit constraints and tested data handling.

- **Level 2 — Enhanced:** deeper workflow, richer knowledge, follow-up and approved integrations.

- **Level 3 — Advanced:** analytics, sophisticated workflows, cross-domain integration with access and validity controls.

- **Level 4 — Research-grade:** new constructs, population studies, model development or capabilities requiring protocols, validation, ethics and governance.

Level is not importance or approval. A Level 4 domain remains part of product architecture and research roadmap while advanced functions are gated.

## 3. Domain maturity map (proposed)

| Domain | L1 foundational | L2 enhanced | L3 advanced | L4 research-grade |
| --- | --- | --- | --- | --- |
| Clinical assessment | Approved catalog/limited tools, clinician-led workflow | Longitudinal comparison and validated integrations | Multi-domain decision support | Local adaptation/new measure development |
| Clinical formulation/treatment | Clinician-authored records and goals | Structured therapy modules and outcomes | Cross-session support and evidence-linked suggestions | Comparative intervention research |
| CBDNA | Provenance ledger and source-separated observations | Reviewed descriptive trajectories | Validated model-supported relationships | New construct/latent/temporal research |
| Knowledge/evidence | Curated sources and versioned metadata | Hybrid retrieval and citations | Adaptive/graph/contextual retrieval | AI-assisted evidence discovery studies |
| Applicant readiness program | Free civilian psychoeducation/support specification and safe intake | Follow-up and reassessment with approved tools | Personalized developmental pathways under review | Outcomes research; never official admissions prediction |
| Education/family/community | Program catalog and defined referral/information pathways | Structured programs and cohort follow-up | Cross-program evaluation | Population studies |
| School/university | Basic wellbeing/program pathways | Counselor workflows and privacy-protected aggregate measures | Multi-campus analytics | Psychometric/longitudinal institutional research |
| Workplace/institution | Service definition, consent and aggregate boundary | Organizational program and training | De-identified trend insights | Workplace research with independent safeguards |
| Islamic psychology/Fitrah | Evidence/rights catalog for any supported perspective | Reviewed educational/assessment pathways | Integrative research only with evidence | Separate Fitrah model research |
| Research governance | Protocol registry and data access control | Approved de-identified pipelines | Reproducible collaborative studies | New validated constructs and norms |

## 4. First release decision

ADR-001 remains open: choose the concrete first live journey (or synthetic prototype) without deleting other domains from the target architecture. ADR-009 concerns roles and tenant boundaries, not first-release scope. The previous recommendation for a synthetic prototype is an option, not owner approval. Any first release must meet its maturity-specific scientific/clinical/legal/privacy/security gates.

## 5. User/service journeys

Design role-specific journeys for individual, student, adolescent, patient, employee, family, clinician, researcher, institution/program administrator and platform administrator as applicable. No user role inherently grants access to another service’s records. Separate applicant program (13) from clinical care and institutional services. Define service ownership, eligibility, consent, referrals, outcomes and support capacity for each.

## 6. Release acceptance

Maintain a capability inventory with owner, level, status, dependencies, evidence, risks and RTM IDs. UI may expose future domain roadmap, but must clearly mark unavailable/under research. No marketing wording implies an advanced or research-grade feature is validated merely because a foundational version exists. See 05/06/07/19.

## Proposed capability entry — Psychometric Governance & Adaptive Assessment (pending approval)

Track the instrument registry, version-specific approval workflow and explainable assessment recommendation service as a platform capability. Foundational maturity may catalogue measures and display approval scope; enhanced maturity may provide clinician-reviewed recommendations with overlap/burden explanations; advanced/research-grade methods require independent evaluation. No maturity level itself grants rights or scientific validity.

## Baseline 2.2 maturity-to-module/enablement contract

| Capability | L1 module/allowed function | Higher-level dependency | Disabled until |
| --- | --- | --- | --- |
| Identity/consent/audit | Auth, consent, append-only event, synthetic test tenants | Multi-tenant operations and credential verification | Security/identity design and privacy review |
| Instruments | Registry and evidence/rights metadata only | Scoped administration/scoring and recommendations | Exact version, language, purpose, rights and scoring evidence approved |
| Clinical formulation | Drafts and clinician-authored decisions | AI-assisted evidence comparison | Credentialed clinician, workflow and safety/records policy approved |
| CBDNA | Source/lineage ledger only | Descriptive trajectory, then validated analytics | Feature-specific evidence, comparison and clinical review gates |
| RAG | Curated source lookup in synthetic/non-sensitive scope | Hybrid/adaptive/clinical retrieval | Access isolation, benchmark, source rights and provider/privacy approval |
| Applicant program | Specification and non-clinical education | Follow-up/reassessment with approved measures | ADR-001 selection, age/consent, staffing, safety and free-service operations |
| Research | Protocol/approval registry | De-identified analysis and findings | Legal authority, ethics as applicable, data minimization and independent methods |

Each capability state is `Planned`, `Design`, `Synthetic-only`, `Pilot-approved`, `Live-approved`, `Suspended` or `Retired`, with owner, version, gate evidence and RTM links. “L1” is not synonymous with live. Failed/expired gates force disabled state. ADR-001 remains the one unresolved first-release choice; ADR-009 is solely identity/role/tenant design.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-16"></a>

# Document 16 — CBDNA Data Dictionary and Entity Model.md

> **Source filename:** `16 — CBDNA Data Dictionary and Entity Model.md`
**Purpose:** CBDNA data dictionary, entity relationships, lineage and source ownership
**Source last modified:** 2026-11-13 09:35:42 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `401b7598b92a15ea106312c75cb6c3007d68b3b00788b6154e2ff43801c9b0d4`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — CBDNA Data Dictionary and Entity Model

**Version:** 2.2-proposed | **Status:** Conceptual target entity model; not final database schema or validated construct definition

## 1. Design principles

CBDNA is an independent engine, not a diagnosis or universal score. The model stores source-separated observations, relationships and derivations over time. It supports multi-axial many-to-many relations without implying equivalence. Every computed feature is reproducible and provenance-linked. Clinical and research use are purpose/access separated. Data structure does not certify scientific validity.

## 2. Core entities

| Entity | Required fields / meaning | Relationships and constraints |
| --- | --- | --- |
| `FeatureDefinition` | `feature_id`, name, operational definition, boundaries, intended use, measurement level, source class eligibility, status, owner | One definition has versions; nullable `construct_id` until approved |
| `FeatureVersion` | semantic version, effective dates, method, population/language, missingness rules, limitations, reviewers | Immutable; superseded, never overwritten |
| `ConstructReference` | controlled construct ID, definition, ontology version, evidence state | Many-to-many with domains/categories/constructs; typed relation evidence required |
| `FeatureObservation` | observation ID, subject pseudonym, feature/version, value/type, observed/recorded time, context, timeframe | Linked to one/many source records; no direct identity in analytic layer |
| `FeatureValue` | raw value, unit/scale, category or restricted text reference, missingness code | Does not imply standardized score; instrument values reference exact version |
| `SourceAttribution` | source type, source record/span, author/role/model, method, timestamp, consent purpose | Source class immutable; AI hypothesis cannot be relabeled without separate reviewed record |
| `ContextRecord` | setting, developmental period, relevant social/environmental factors, provenance, consent scope | Time-bounded; minimum necessary; context does not alter raw scores |
| `TemporalWindow` | start/end, recall period, episode/encounter, comparability metadata | Comparisons require compatible window and definition |
| `UncertaintyRecord` | ambiguity, confidence basis, missingness, measurement limitations, reviewer notes | Avoid uncalibrated numeric probability presented as truth |
| `ContradictoryObservation` | linked conflicting observations, difference type, review status | Preserve both records; no automatic winner |
| `DerivationMethod` | algorithm/model ID/version, parameters, required inputs, evaluation state | Disabled until purpose/use approval |
| `DerivationLineage` | output observation, input IDs, transformation/version, actor, time | Reproducible DAG; versioned and access-controlled |
| `ClinicalReview` | actor/credential, accept/correct/dispute/reject/defer, reason, timestamp | Append-only; original remains available |
| `ResearchApproval` | protocol, ethics/legal status, consent basis, de-id review, data purpose, reviewers | Required before research export or generalization |
| `MaturityStatus` | L1–L4, activation status, gates, intended use | Maturity does not mean validation; gate evidence linked |

## 3. Source-type enumeration

`patient_report`, `clinician_observation`, `clinician_interpretation`, `instrument_result`, `behavioral_record`, `AI_hypothesis`, `research_candidate`, `research_derived_finding`, `validated_construct_measurement`. Provenance supports multiple evidence contributors but each item retains its original epistemic type. “Validated” type requires an approved validation record tied to exact construct/version/population/use.

## 4. Relationships

Use explicit predicates such as `maps_to_domain`, `candidate_indicator_of`, `measured_by`, `contextualized_by`, `associated_with`, `contradicts`, `derived_from`, `reviewed_by`, `supported_by_evidence`, `supersedes`. Relations are many-to-many, versioned and evidence-bearing. Do not encode causation or equivalence via generic graph edges. Instrument-to-construct mapping is not permission to combine scores.

## 5. Temporal/context rules

Store event time separately from record time and validity interval. Preserve context at measurement/observation. Missing context is unknown, not absent. Do not treat one observation as a stable trait. Trend comparisons require same construct definition or validated crosswalk, compatible method/timeframe/population and explicit missing-data treatment. If not comparable, block aggregate or show warning.

## 6. Review and safety constraints

No CBDNA feature autonomously diagnoses, predicts admission, sets risk tier, opens/closes safety event, chooses treatment or modifies scoring. Clinical exports exclude unreviewed hypotheses by default. Safety workflow is independent from model/feature computation. Every view exposes source, date/context, uncertainty, version and review status.

## 7. Storage/privacy boundary

Use pseudonymous subject references and separate identity mapping under restricted access. Keep patient clinical memory, applicant program data, research candidates and approved research findings separated. Research lineage links to origin only where lawful/ethical and access-controlled. Retention, correction, deletion, de-identification and re-identification risk are governed in 14.

## 8. Validation metadata

Store study ID, protocol, population/language, sample, method, evidence results, reliability/validity/fairness/invariance results, limitations, external replication, reviewer, intended use and approval dates. Model readiness is use-specific. No field default should imply clinical validity.

## Proposed links to assessment evidence (pending approval)

CBDNA observations that refer to assessment evidence should reference, rather than duplicate or own, the authoritative `InstrumentVersion`, administration event, result/subscale, language, population/purpose scope, administration method and recall period. Add typed references to assessment result, recommendation and context records. Comparability metadata should allow the system to block or qualify longitudinal comparisons. The psychometric registry remains the authority for instrument versions and rights; CBDNA preserves lineage and contextual relations only.

## Baseline 2.2 additions: authoritative references and cardinality

| Entity / relation | Cardinality and invariant |
| --- | --- |
| `InstrumentVersion` → `ScopedApproval` | One version may have multiple approvals, each bound to explicit language/population/context/purpose; no wildcard inference |
| `AssessmentAdministration` → `ResponseSet` | Exactly one administered immutable version per administration; responses retain item/order/source where rights allow |
| `ResponseSet` → `ScoreResult` | Scoring run references exact scoring-spec version; raw answers and original score are immutable; corrected run appends a new result |
| `FeatureObservation` → `SourceAttribution` | At least one source link; source epistemic type cannot be rewritten; restricted text remains in source-of-truth store |
| `DerivationLineage` → inputs/method | One output links to all input IDs and exact method/model version, parameters, timestamp and actor/system principal |
| `Relation` | Many-to-many with typed predicate, direction, source, evidence, valid time, reviewer/status and limits; `associated_with` is not causal |
| `ReviewEvent` → feature | Append-only accept/correct/dispute/reject/defer event; previous value and author are retained |
| `SafetyIndicator` → `HumanSafetyAssessment` → `SafetyAction` | Separate 0..N records; indicator never implies human assessment/action; only authorized human writes latter two |
| `ResearchCandidate` → `ProtocolApproval` → `ApprovedFinding` | Export/promotion blocked until required authority, ethics/privacy, de-identification and method review records exist |

### System-of-record and deletion/retention behavior

Instrument metadata/rights live in the Psychometric Registry; administrations/responses/results in the protected assessment store; clinical decisions and safety actions in distinct clinician-owned stores; CBDNA stores references plus its own derived/candidate record; research findings live in a protocol-governed store; RAG indexes are derived artifacts with source-version/deletion lineage. Access/deletion/correction requests must propagate to authorized derived stores and caches under the approved retention/legal-hold policy, while preserving required audit evidence. Exact durations and lawful exceptions remain open under ADR-010; no retention period is invented.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-17"></a>

# Document 17 — Advanced Adaptive RAG Specification.md

> **Source filename:** `17 — Advanced Adaptive RAG Specification.md`
**Purpose:** Advanced Adaptive RAG ingestion, evaluation, security and release specification
**Source last modified:** 2026-11-13 09:35:45 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `747f432619b5d9bdb7d3fb0876f67d9b32f18d78bbf58f0abd72eae0d0b545d6`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Advanced Adaptive RAG Specification

**Version:** 2.2-proposed | **Working name owner-approved; implementation thresholds and methods remain proposed/open**

## 1. Purpose and design rule

PsychoContext Advanced Adaptive RAG Architecture retrieves authorized evidence for bounded tasks. It is not a clinical authority and does not create validated knowledge by retrieval. Select methods only when measured benefit justifies added privacy, cost, latency and maintenance. Clinical evidence retrieval and patient-specific memory search are separated; cross-patient retrieval is prohibited by default.

## 2. Sources and authority

Admit curated, rights-reviewed, versioned sources with source owner, jurisdiction, language, evidence authority, population, publication/effective dates, permitted use, approval, sensitivity and expiry/review date. Uploaded content is not trusted merely because it is uploaded or hosted on Google Drive. Retain original document hashes, source links and parsing lineage. Restricted instrument items are excluded unless specifically authorized.

## 3. Ingestion pipeline

`Source registration → rights/access check → malware/file validation → parsing/OCR (if permitted) → structure and metadata extraction → human quality review → chunking preserving headings/tables/citations → sensitivity/access labels → sparse index → dense embedding (model/version recorded) → optional entity/knowledge graph links → evaluation → staged publication`.

Parsing confidence, document version, page/section location, language/dialect, citation markers and errors are stored. Human review gates clinical sources. Indexing and deletion propagate to derived chunks, embeddings, caches and replicas.

## 4. Retrieval pipeline

1. Authenticate user and purpose; enforce tenant/service/record permissions before retrieval.

1. Classify query intent (clinical evidence, instrument metadata, program content, patient-specific record) without silently broadening purpose.

1. Apply metadata filters for language, population, jurisdiction, effective version, authority, rights and sensitivity.

1. Optional query rewriting/expansion; retain original query and log transformed query safely.

1. Sparse lexical retrieval; optional dense semantic retrieval; combine with evaluated hybrid method.

1. Deduplicate and rerank with version and authority signals.

1. Apply coverage/quality thresholds and risk-sensitive abstention.

1. Assemble bounded context preserving source spans, dates, limitations and contradictions.

1. Generate structured answer with source IDs/locations; validate citations and unsupported claims.

1. Apply policy/safety checks; label uncertainty and human-review state; audit retrieval trace.

No answer should present a source summary as diagnosis. Patient memory route is a distinct authorized workflow and cannot retrieve another patient’s data.

## 5. Evaluate candidate techniques selectively

| Technique | Benefit hypothesis | Evaluation and adoption condition |
| --- | --- | --- |
| Sparse retrieval | Exact terms/acronyms and robust fallback | Recall/precision for Arabic morphology and psychometric identifiers |
| Dense retrieval | Semantic paraphrase retrieval | Embedding quality by Arabic dialect, domain and population; leakage assessment |
| Hybrid retrieval | Balance exact and semantic matching | Compare nDCG/recall, missed critical evidence and cost against sparse/dense baselines |
| Query rewrite/expansion | Resolve ambiguity and synonyms | Preserve intent; measure hallucinated query drift and Arabic comprehension |
| Multi-stage retrieval | Separate candidate generation/filter/rank | Incremental quality vs latency/complexity |
| Reranking | Improve relevance and source authority order | Clinician-rated relevance, citation support, language and latency |
| Contextual retrieval | Use source surrounding headings/section context | Improve evidence location without introducing irrelevant context |
| Knowledge graph integration | Navigate curated multi-axial relations | Typed/evidence-backed edges; prevent association→causation/equivalence inference |
| Version-aware retrieval | Select current applicable evidence and preserve history | Test stale/retired source suppression and historical record reproducibility |
| Citation validation | Ensure output support | Exact-span entailment and claim-to-source audit |
| Adaptive routing | Select retrieval path by query/purpose | Gains measured across held-out questions, no permission bypass, explainable routing |

No technique is adopted simply because fashionable. Evaluate clinical relevance, retrieval quality, Arabic performance, traceability, explainability, privacy, security, cost, latency and maintainability.

## 6. Arabic and clinical evaluation

Build expert-curated test sets covering Modern Standard Arabic and relevant Egyptian Arabic phrasing, code-switching, spelling variants, transliteration and instrument terminology. Include population-specific queries, ambiguous questions, conflicting evidence, outdated sources, restricted content, prompt injection, unsafe self-harm-related content and adversarial data access. Use qualified bilingual clinical/psychometric reviewers. Report subgroup results, errors and uncertainty; do not present benchmark performance as clinical efficacy.

Metrics: recall@k, precision/nDCG, source-authority ranking, citation entailment, unsupported-claim rate, abstention precision/recall, stale-version leakage, permission violation (target zero), cross-patient leakage (target zero), prompt-injection success, latency, cost and clinician correction burden.

## 7. Security and privacy

Filter access before retrieval and again before response. Separate indexes or enforce provably isolated partitions for evidence, patient memory and program data. Defend against prompt injection in documents, retrieved content and user queries; retrieved text is data, never system authority. Redact/minimize sensitive query logs, manage provider retention, encrypt indexes, audit access, purge deleted sources and restrict embeddings/exports. Never pass a source item to a user lacking the underlying permission.

## 8. Versioning and change governance

Version parser, chunker, embedding model, index snapshot, metadata schema, retrieval/reranker, prompts and evaluation set. Stage changes; run regression; retain rollback. Cite exact document version and section. Knowledge updates require 09 workflow. “RAG 5” has no formal standard status; use the owner-approved working name while leaving implementation versions explicit.

## 9. Failure behavior and acceptance

On low evidence, conflicts, permission mismatch, stale index or provider failure: abstain or state limitation; do not fabricate. Tests must verify authorization before retrieval, citation resolution, no cross-patient leakage, stale-version handling, Arabic benchmarks, prompt injection resilience, deletion propagation, provider failure and safe fallback. Clinical usage requires approval under 11 and 14 and must not replace clinician judgment.

## Proposed psychometric evidence and version retrieval (pending approval)

For instrument-related retrieval, index only authorized references, manuals, evidence and exact version metadata. Search/results should expose source, version, language, population, purpose, publication/effective date, evidence limitations and rights status. Retrieval may help reviewers locate trusted versions and evidence; it cannot grant rights, approve an instrument or substitute for psychometric review. Test stale/retired-version suppression, conflicting evidence, citation-to-source accuracy and access restrictions. Item content remains excluded unless reproduction/use is explicitly authorized.

## Baseline 2.2 benchmark and release protocol

Before a comparison run, the knowledge/clinical/psychometric reviewers freeze: intended query classes and populations; held-out test-set version; source inclusion/rights manifest; baseline retriever; metrics; minimum thresholds; severity weights for critical misses; subgroup slices for Arabic/MSA/Egyptian phrasing; sample size rationale; and regression rules. Thresholds are not guessed in this document: owners must set them before the run and cannot tune them against the held-out set. Report raw counts, confidence intervals where suitable, reviewer disagreement and errors by query group.

**Hard zero-tolerance controls:** authorization bypass, cross-patient retrieval, disclosure of restricted item content, citation to inaccessible source, or retrieval of a retired version as current = fail and block release. Test positive and negative role/tenant cases, direct object IDs, cache hits, query rewriting, prompt injection in retrieved documents, deleted-source propagation, stale index, provider timeout and output citation validation. Failure behavior is abstain/deny with auditable reason; never silently fall back to broader permissions or claim monitoring.

Quality metrics (recall@k, precision/nDCG, source-authority ordering, citation entailment, unsupported claim/abstention rates, latency, cost and clinician correction burden) require a preapproved use-specific threshold and independent evaluation. A benchmark pass establishes retrieval performance only on its defined test distribution; it does not establish clinical efficacy, instrument validity or safe clinical deployment. Clinical release additionally requires approval under 11/14 and an authorized clinician workflow. Each model/parser/index/prompt update is versioned and reruns the frozen regression suite; failed version is not promoted and prior approved index remains rollback target.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-18"></a>

# Document 18 — Proposed Updates to Original Seven and Evidence Limits.md

> **Source filename:** `18 — Proposed Updates to Original Seven and Evidence Limits.md`
**Purpose:** Source update map, evidence limits and Baseline 2.2 change record
**Source last modified:** 2026-11-13 09:36:58 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `8b96d19d38492b5d8911c8e86b01d91523ddaf8fdf672fdcc0216116fdb94158`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Proposed Updates to Original Seven Documents and Evidence Limits

**Version:** 2.2-proposed | **Purpose:** Change map for the versioned 20-document baseline; earlier source documents and merged artifact remain preserved

## 1. Why a proposed update package is needed

The seven baseline files were written before the owner clarifications in the supplied prompt. Some recommendations—especially treating CBDNA only as future research, narrowing service scope by deferring whole domains, leaving the military program generic, and treating “RAG 5” as wholly undefined—need updating. This report tells an editor what to revise in future versioned copies; it does not overwrite baseline files or convert additional recommendations into owner approval.

## 2. Section-level proposed updates

| Original file/section | Existing statement or omission | Problem after owner clarification | Proposed addition/replacement | Source/status | Related docs |
| --- | --- | --- | --- | --- | --- |
| Master Architecture, vision/scope | Broad platform; earlier synthetic prototype might imply domain deferral | Owner decision 7 says preserve full vision using maturity levels | Add four maturity levels; state domain sequencing is not deletion; add CBDNA independent core engine and precise free applicant program | Owner-approved decisions 1,7,8 | Revised 01,08,13,15 |
| Knowledge Architecture, taxonomy | Hierarchy may suggest one branch | Owner decision 2 approves multi-axial many-to-many | Add relation semantics and explicit non-equivalence/non-aggregation rule | Owner-approved decision 2 | Revised 02,10,16 |
| Knowledge Architecture, CBDNA | Research/design-only language may understate engine role | Owner decision 1 adopts independent core engine | Distinguish engine status from model/feature validation maturity; incorporate 08/16 | Owner-approved decision 1 | 08,16 |
| Knowledge Architecture, “RAG 5” | Phrase undefined | Owner clarifies intended future-generation practices but rejects formal-standard status | Rename working architecture Advanced Adaptive RAG; evaluate methods and nonfunctional criteria | Owner-approved decision 6 | 17, revised 02/03 |
| Technical Blueprint, architecture boundaries | Technical framework mentioned but engine/module division incomplete | CBDNA and three evolution tracks require explicit technical boundaries | Add CBDNA domain service, independent memory/research stores, API and failure isolation; enforce clinician authority | Owner decisions 1,3–5 | Revised 03,08,09,11,16 |
| Conversation Audit, military scope | Earlier MIL-PREP/generic civilian readiness description | Owner clarifies actual service and corrects prior interpretation | Add corrected chronology, free service, target population, purpose and exclusions; retain old terms as history | Owner-approved decision 8 | Revised 04,13 |
| Conversation Audit, CBDNA | Concept recorded as proposal | Now owner-approved engine concept; science still pending | Reclassify concept architecture as owner-approved; distinguish model evidence/implementation status | Owner-approved decision 1 | Revised 04,08,16 |
| Enhancement Roadmap | Narrow MVP sequencing could appear to postpone major domains indefinitely | Owner decision 7: maturity, not importance/deletion | Rebuild backlog around all domains mapped to L1–L4; maintain gates per capability | Owner-approved decision 7 | Revised 05,15 |
| Decision Register | Previous owner decisions unresolved/proposed | Eight decisions now explicitly provided as authoritative | Mark decisions 1–8 OWNER APPROVED with source prompt/date; keep remaining provider/legal/first-live-slice decisions open | Supplied prompt §§4.1–4.8 | Revised 06 |
| Requirement Traceability Matrix | Older rows may not capture engine/maturity/program boundaries fully | Need system-wide technical acceptance and tests | Preserve stable legacy IDs via crosswalk; add multi-axial, maturity, applicant program, clinician authority, memory pipeline, RAG and CBDNA safety requirements | Supplied prompt + current conversation | Revised 07 |

## 3. Required change in military service terminology

Replace any statement that implies “MIL-PREP” is the owner’s actual service, an official test, physical preparation or military rehabilitation. Preserve MIL-PREP as a historical label only if the audit needs it. The actual intended service is the free civilian **Military Applicant Psychological Readiness Program** for Egyptian applicants, with boundaries in 13. Do not promise admissions benefit or coach test deception.

## 4. Required source classifications

- Decisions 1–8: OWNER-APPROVED DECISION **as stated in the attached owner prompt**.

- Model-family choices, exact CBDNA constructs, selected RAG techniques and first live release: PROPOSED or OPEN pending evidence/choice.

- Historical “Built” statements and prior defect findings: HISTORICAL/LOVABLE CLAIM or UNVERIFIED IMPLEMENTATION until re-tested.

- Instrument validity, rights and local norms: SCIENTIFIC VALIDATION REQUIRED / LEGAL REVIEW REQUIRED until instrument dossier exists.

## 5. Evidence limitations

Available source set lacks a full verbatim conversation export, deployment/runtime/test results, clinical operations, provider contracts, instrument licenses and local validation studies. The application repository and last observed commit have now been located and a limited read-only source inventory is recorded in 04/19; this does not constitute implementation verification. These limitations prevent exhaustive historical traceability, scientific validation and legal conclusions. Do not imply they disappear because documents have been reconciled.

## 6. Original-file preservation and migration

Keep original files immutable. Create versioned proposed copies (e.g., `v2-proposed`) only after owner review. Compare each copy against original and record changes, author/date, source decision, impact, approval and rollback. Update RTM/decision IDs with a crosswalk; do not silently renumber existing IDs.

## Addendum — November 11 psychometric enhancement proposal

Source `pasted_content_5.txt` explicitly identifies the material as a proposal pending owner approval and notes that its text ends during section 12. Integrate the specific recommendations only as proposed changes, never as owner-approved decisions. Main changes: instrument state/version/scope governance (02/12); explainable human-controlled recommendations (03); evidence-informed cross-measure formulation distinct from unsupported score aggregation or causality (01/08); new-measure development gates and source/decision provenance (09/11); new acceptance criteria (07); authorized exact-version evidence retrieval (17). Limited related changes are documented in 13–16. The source gives no additional detailed change specification for later documents; no unsupported content has been attributed to it. Preserve original files, prior IDs and decision statuses.

## Baseline 2.2 change map (final audit integration)

| Finding from final audit | 2.2 disposition | Files |
| --- | --- | --- |
| Package still described as 2.1 and had no distinct status map | Index now identifies 2.2-proposed, owner/specialist review required, no implementation authorization | 00 |
| Engine ownership and cross-engine write authority implicit | Named owns/reads/writes/prohibitions and safe flow added | 01,02,03,08,11,16 |
| RTM-02 linked to wrong decision; ADR-015 used for CBDNA/safety; ADR-017 nonexistent | Corrected with OD-005/OD-001/ADR-008; Fitrah and signature semantics kept subject-specific | 06,07,10,11,14 |
| RTM-42 combined three logically separate acceptance questions | Stable RTM-42 retained as historical umbrella; RTM-53/54/55 split context synthesis, composite score, causality | 07,10,19 |
| Instrument lifecycle lacked operational permission state effects | Added allowed transition reviewers, exact scope, suspension/retirement effects and fail-closed tests | 12,03,07 |
| Safety description lacked state transitions and operational configuration | Added indicator → qualified human assessment → operational action, role/config prerequisites, fail-closed state and test cases | 11,13,14,07 |
| Repository described as unavailable | Limited read-only repo facts added; runtime, build/test/security remain unverified | 04,19 |
| Current-to-target route/data migration not actionable | Added domain API/entity/role contract and per-artifact Keep/Adapt/Replace/Retire + rollback requirement | 03,19 |
| RAG/CBDNA release thresholds could be interpreted as implied | Require reviewers to freeze thresholds before tests; hard security controls fail closed; validation remains use-specific | 08,17,07 |

All changes above are proposals/target controls except the already sourced OD-001–OD-008. The earlier merged 00–19 file and 2.1 documents are not overwritten by this new folder; 2.2 is a separately versioned copy. Historical originals listed in the package remain unchanged. The repository's pre-existing deleted/untracked files are explicitly preserved. No code, schema, package lock, dependency or deployment was changed.

--- END FULL SOURCE CONTENT ---

---

<a id="doc-19"></a>

# Document 19 — Consistency Validation Gaps and Implementation Plan.md

> **Source filename:** `19 — Consistency Validation Gaps and Implementation Plan.md`
**Purpose:** Consistency review, repository-to-document transition and implementation plan
**Source last modified:** 2026-11-13 09:37:50 +02:00
**Merged at:** 2026-11-13 09:41:21 +02:00
**Source SHA-256 (raw bytes):** `613eee085797ba0379e6e85a46f8d5b9ebc8df34a9d2873d2efba8d0649b1878`

--- BEGIN FULL SOURCE CONTENT ---

# PsychoContext V8 — Consistency, Validation Gaps and Implementation Plan

**Version:** 2.2-proposed | **Status:** Documentation baseline proposed; repository inventory limited/read-only; no implementation verification or clinical/legal approval

## 1. Cross-document consistency checks

- **Complete vision:** retained in 01/15; maturity levels sequence capabilities without deleting domains (owner-approved decision 7).

- **CBDNA:** independent core engine in 01/08/16; mathematical model remains unselected until scientific evaluation; no diagnosis, universal score, autonomous safety/treatment decision (owner decision 1; 11; RTM-23–29 and RTM-36–37; proposed RTM-48 for the safety-stage workflow).

- **Taxonomy:** multi-axial many-to-many in 02; relationship does not mean equivalence/score combination (decision 2).

- **Memory/knowledge:** separate patient, clinician, AI, CBDNA, research and evidence stores; patient-memory transformation governed (decisions 3–4; 09/14/16).

- **Clinical authority:** AI advisory, clinician authoritative across architecture/API/UI/data/audit/tests (decision 5; 11).

- **RAG:** Advanced Adaptive RAG working name; no official numbered “RAG 5” claim; method selection evaluated (decision 6; 17).

- **Maturity:** all populations/domains remain in full vision at L1–L4 (decision 7; 05/15).

- **Applicant program:** free, civilian, applicant-specific psychological wellbeing program; not official, physical prep, rehabilitation or admissions authority (decision 8; 13).

- **Historical implementation:** prior build/audit claims remain unverified without code/runtime evidence (04/18).

- **Traceability:** requirements tie back to source, architecture, knowledge, data, UI/API, tests and decisions (07).

## 2. Scientific and psychometric validation gaps

CBDNA construct definitions, measures, mathematically justified methods, measurement level, Arabic suitability, invariance/fairness, longitudinal adequacy and external replication remain unvalidated. No exact instrument license or population dossier was independently checked. New patterns must not be promoted from single cases; context cannot change raw scores. The free applicant program’s outcomes and measures require purpose-appropriate evaluation; no admission effect is established. Islamic psychology measures and future Fitrah model need their own evidence and scholarly review.

## 3. Clinical and operational gaps

Need named clinical/service leads, credentialing, intended clinical scope, safety responder/coverage/geography, emergency fallback, minors policy, clinician sign-off legal basis, referral network and incident process. CBDNA must not independently determine safety, treatment or diagnosis. Applicant program support must not be confused with clinical care unless separately staffed and approved.

## 4. Privacy/security/legal gaps

Need jurisdiction-specific review of sensitive health data, applicant age/consent, cross-border processing, retention/deletion, data controller/processor responsibilities, AI provider terms, audio, research use, de-identification/reidentification, legal recordkeeping and electronic signature. Need threat model, access/tenant tests, backup restore, audit integrity and incident response. No compliance status is claimed.

## 5. Technical/implementation gaps

The confirmed repository is at `D:\Physo\Physiological`; selected source paths and Git metadata were inspected read-only as recorded below and in 04. Deployment/runtime, database contents, complete schemas, provider configuration, full security review and build/test outcomes were not verified. Prior audit defects remain findings to reproduce, not present defect claims. CBDNA APIs, RAG benchmarks, entity schema and telemetry remain target proposals.

## 6. Prioritized implementation plan

### Gate A — Owner decision and source recovery

Confirm decisions 1–8 against the supplied prompt; select the first live capability slice (open ADR-001; ADR-009 concerns roles/tenant boundaries) while keeping full scope; record the located repository commit/worktree, recover the missing raw conversation and runtime/test evidence; assign reviewers.

### Gate B — Domain evidence and governance

Complete instrument dossiers, clinical safety/operations, privacy threat/data-flow, research ethics and provider reviews. Define capability maturity owners and acceptance tests.

### Gate C — Foundation prototype

Build synthetic-data modular monolith; identity/role/consent/audit contracts; multi-axial schema; visible save/failure; no unapproved instrument content, external clinical data or autonomous CBDNA/RAG decisions.

### Gate D — L1 controlled capabilities

Select and implement L1 workflows for approved populations/services. For applicant program, display free/civilian/non-official purpose; do not claim prediction. Clinical pathways require approved operations and instruments. Test RTM acceptance rows.

### Gate E — Enhanced/advanced capabilities

Add CBDNA descriptive views, adaptive RAG, program/institution workflows and therapy enhancements only after stage-specific gates, evaluation and rollback.

### Gate F — Research-grade

Run approved research, local validation, mathematical model comparisons and Fitrah work under protocols. No automatic promotion of findings or model training.

## 7. Required implementation evidence

For every feature: commit/file path; UI/API/data flow; authorization test; positive/negative/failure tests; reviewer and approval record; source/version; metrics and monitoring; rollback; and user-facing limits. For science, additionally instrument/model-specific methods, population, evidence and independent validation. A build or document is not verification.

## 8. Conclusion

The reconciled docs preserve the owner’s clarified full vision and decisions. They prepare for controlled implementation but do not certify clinical readiness. The repository is located and partially inspected; blockers are full implementation-baseline/test evidence, missing raw conversation, initial capability slice, accountable reviewers, instrument evidence/rights, service operations, privacy/legal decisions and acceptance-test ownership. See 04,06,07,18 and roadmap 05.

## Documentation Baseline 2.2 → Repository Implementation Baseline transition gate

These are two distinct baselines. Documentation Baseline 2.2 is the proposed, versioned contract for architecture, decisions, requirements, data/API boundaries, governance and acceptance tests. Repository Implementation Baseline is the evidence-backed inventory of the exact repository commit, current runtime/build/test state, schemas/security rules, integrations and migration/rollback mapping. A documentation baseline does not authorize production use or assert that the current code matches it.

### Read-only repository evidence captured for this review (13 November 2026)

The confirmed path `D:\Physo\Physiological` contains a Git repository on branch `main` tracking `origin/main`, last observed **local-checkout** commit `3404a0f` (short SHA; 2026-11-08; `feat(db): enable offline persistence and add military prep scale`). This local identifier is not the currently observed remote GitHub `main` head; see the identity gate below. The root includes `package.json`, `server.ts`, `src/`, `public/`, Firebase configuration/rules, and one Firestore rules test file. The package declares React 19/TypeScript/Vite 8, Express/tsx, Firebase 13, and Google GenAI; scripts include `build` (Vite), `lint` (tsc --noEmit), `dev/start` (tsx server.ts). The inspected source shows a client-side Firebase database service and a server endpoint that sends complaint and demographic fields to Gemini for scale recommendation; the psychometrics utility contains inline scoring and threshold logic. Firestore rules authorize a broad `doctor` role and the test file is marked conceptual/mock and reads `DRAFT_firestore.rules`. These are source-inspection findings only, not runtime results or a full security review.

Git reported two tracked Arabic Markdown files deleted in the worktree and multiple untracked task/document folders (`.manus`, `.work`, `Existing_Documents`, both proposal folders, `Source_Conversation`, `outputs`, and the proposal ZIP). These pre-existing changes must be preserved; no reset, checkout, clean, install, migration, build, or source-code edit was performed as part of this read-only pass. The reported `npm run lint` invocation could not be completed because the terminal session became unavailable; build/test status is therefore **not run / unverified**.

### Remote/local repository identity gate — mandatory before implementation

The local checkout inventory in this document reports short commit `3404a0f` from 8 November 2026. The GitHub remote `main` head was separately verified during revision 2.2.1 as `754a3b82b6abff80506835a76b0f5bb4364308b0` (parent `3e0a6519b80bbdea8b8ea8e93d20b7d75f57e815`). These references are not interchangeable, and no tree equivalence is established. The implementation baseline must be regenerated against the exact remote commit intended for development; record its full SHA, tree SHA, branch, worktree state and inspected paths. Until then, all code observations in the earlier local inventory are historical/local evidence only, not proof of the current GitHub `main` contents.

### Remote source inspection — mandatory P0 remediation gates

The remote source snapshot above establishes several stop-ship conditions. Before any real patient/applicant data or live clinical workflow is enabled: (a) remove client-side preset credentials and role assertions; implement server-verified identity, credential status and least-privilege role grants; (b) replace broad doctor-wide Firestore access with verified tenant/service and record-level authorization, or move access behind the approved backend boundary; (c) test the exact active rules file with positive and negative owner/tenant/role cases; (d) require authenticated, purpose-authorized AI requests and complete provider/privacy review before sending any sensitive content externally; (e) change persistence APIs to return success only after confirmed durable save and test offline/timeout/retry behavior; and (f) move authoritative scoring out of the client into versioned deterministic server-side scoring with approved instrument/version rights. Keep all validation synthetic until these gates pass.

### Gate R0 — Repository Implementation Baseline evidence required before code changes

1. Owner confirms the chosen first implementation slice under **ADR-001**; ADR-009 remains role/tenant boundary design.

1. Record exact commit and worktree status, explicitly preserving the two deletions and untracked user/task materials noted above; do not use destructive Git cleanup.

1. Review full file inventory and data/security flows; inspect secrets handling without printing secret values; document current Firestore collections/rules, AI payloads/providers, local persistence/failure behavior, and every existing assessment/scoring path.

1. Run the project’s declared lint/build/tests in an approved environment; record exact commands, exit codes, logs and missing dependencies. Do not claim success if not run.

1. Produce Current → Target → Migration mappings for UI, API/server, auth/roles, data entities, scoring, AI, storage, tests and deployment; classify each item Keep / Adapt / Replace / Retire with evidence, owner and rollback.

1. No real-data migration, external clinical AI call, clinical safety activation, instrument activation or deployment until their respective governance and acceptance gates pass.

### Documentation-to-repository handoff acceptance

The handoff is eligible for owner review only when (a) all ADR/OD/PDA/RTM references resolve and carry correct statuses; (b) engine boundaries, source-of-truth entities, APIs and role permissions are explicit; (c) each P0 requirement maps to a module, endpoint/entity and test; (d) migration mapping cites inspected code/schema and exact commit; (e) synthetic-data tests include positive, negative, failure and rollback cases; and (f) open owner/specialist decisions are visibly marked Open/Blocked rather than guessed. Until accepted, status remains `Documentation Baseline 2.2 — Proposed / Review Required` and no claim of implementation readiness is made.

## Addendum — psychometric governance and adaptive-assessment integration

### Cross-document consistency

The 11 November proposal is marked pending owner approval; it does not alter OD-001–OD-008. Contextual integration across separate measures is permitted only as evidence-informed formulation with provenance and limits. Raw scores remain separate; unsupported composites, causal inference from association and unvalidated score adjustment remain prohibited. The clinician controls final measure selection and clinical interpretation. Registry presence does not equal use approval. A measure is approved only for its exact version, language, population, context and intended purpose.

### Additional gaps and implementation gates

Open work includes candidate-measure dossiers and rights, version-specific Arabic/Egyptian evidence, state-transition authority, overlap/burden methodology, validated crosswalk criteria, adaptive recommendation evaluation, exact report schema, retention/deletion mapping, new-measure development protocol, and local safety operations. Cronbach’s alpha alone is not sufficient evidence of validity or overall quality. Before clinical activation, test RTM-39–52; calibrate and approve thresholds with qualified reviewers. External sources mentioned in submitted prose were not independently verified in this documentation update. No feature implementation is certified.


## Addendum — repository-reconciled execution readiness (Revision 2.2.2)

A separate master execution plan has now been reconciled against the GitHub repository tree and source files:

- Repository: `deviceuser57-tech/Physiological`
- Inspected branch/commit: `main` / `3445d55a4cca583d67546ca69c87e025fc0edd45`
- Execution control: `docs/execution/PsychoContext_V8_Master_Execution_Plan.md`, Revision 1.1-reconciled-draft
- Planning branch: `planning/master-execution-plan-v1.1`
- Review pull request: #3 (draft; not merged)

The execution plan records findings R-01–R-12, exact current repository paths, document authority conflict, technology decision gate, corrected selectable first-journey sequence, stop-ship controls, phase exit evidence and change-control rules.

**Implementation status:** no application code, Firestore rules, dependencies, schema, migration or deployment has been changed by this documentation revision. No local build, test runner, Firebase emulator, production rules, provider contract, runtime or clinical operation was verified. Phase 1 must execute and preserve those checks. This package therefore remains proposed and does not authorize processing real clinical or applicant data.

The immediate next steps are owner review of the plan; resolution/bounding of ADR-001 and ADR-013; approval of the document authority manifest; then Phase 1 repository baseline and Phase 2 security foundation. No feature implementation begins by skipping these gates.

--- END FULL SOURCE CONTENT ---

---