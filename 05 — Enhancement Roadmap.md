# PsychoContext V8 — Enhancement Roadmap

**Version:** 2.0-proposed | **Status:** Progression plan; owner decision 7 preserves full scope; dates and staffing intentionally unset pending evidence

## 1. Roadmap principle

Do not remove or indefinitely postpone a major domain merely to simplify the first release. Track each domain at a capability-maturity level: **L1 Foundational**, **L2 Enhanced**, **L3 Advanced**, **L4 Research-grade**. Levels describe readiness, depth and evidence burden, not importance. Each feature still requires applicable scientific, clinical, legal, privacy and security gates. This is consistent with the owner-approved decision 7.

## 2. Workstreams and priorities

| Workstream | Initial maturity target | Sequence/dependency | Acceptance gate |
|---|---|---|---|
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
