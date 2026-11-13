# PsychoContext V8 — Master Execution Plan
**Document ID:** PC-V8-MEP-001  
**Version:** 1.0-draft  
**Status:** Proposed execution baseline — requires owner approval before Phase 1 implementation  
**Repository:** `deviceuser57-tech/Physiological`  
**Planning branch:** `planning/master-execution-plan-v1`  
**Baseline:** Documentation Baseline 2.2.1-proposed and the current repository source snapshot inspected during the November 2026 audit  
**Purpose:** One controlled, traceable plan for modifying the existing repository and completing the PsychoContext application through sequential, formally accepted phases.

---

## 1. How this plan governs the build

This is the master execution control document. It does not replace the 20-document architecture package; it converts that package into ordered, file-level implementation work.

### 1.1 Mandatory execution rules

1. **One phase at a time.** Work may be prepared for later phases, but implementation does not skip a phase gate.
2. **No undefined work.** Before an activity starts, its requirement IDs, exact files, expected change, dependencies, tests, owner/reviewer and acceptance evidence must be listed in the phase work packet.
3. **Existing repository first.** Inspect and map current code before creating parallel implementations. Reuse, refactor, replace or retire only through an explicit decision and migration plan.
4. **No direct unreviewed production changes.** Work on a dedicated phase branch. Use pull requests (or an equivalent reviewed commit) into the integration branch. Protect `main`.
5. **Phase acceptance is explicit.** A phase is not complete because code was written or a build passed. It is complete only when all mandatory acceptance criteria and evidence are reviewed and the owner records approval.
6. **Traceability is continuous.** Every implementation change links to one or more RTM requirements, a decision (ADR/OD), affected architecture documents, tests and evidence.
7. **Change control is mandatory.** Any addition, deletion, scope change, dependency change or discovered constraint updates this plan and its linked records before the affected implementation proceeds.
8. **No false implementation claims.** “Implemented”, “tested”, “secure”, “validated” and “production-ready” require their corresponding evidence. A static source inspection is not a runtime test.
9. **Synthetic data only** in development, demonstrations and test environments until privacy, security, legal, clinical operations and release gates are approved.
10. **Clinical authority remains human.** AI is advisory. CBDNA is an independent core engine but not a diagnosis, safety classifier, universal score or autonomous decision-maker.
11. **No instrument is enabled by assumption.** Exact instrument version, language, rights, digital administration permission, scoring and intended-use evidence must be approved.
12. **Full product vision is preserved.** Capability maturity determines sequencing; deferral of a domain is not deletion from product scope.

### 1.2 Phase status vocabulary

| Status | Meaning |
|---|---|
| Not started | No activity has been authorized or performed |
| Ready | Scope, files, dependencies, owner and acceptance tests are specified |
| In progress | Work is underway on the approved phase branch |
| Blocked | A named dependency, decision or evidence item prevents safe progress |
| In review | Implementation and evidence are submitted for review |
| Accepted | All phase gates passed and owner approval is recorded |
| Rejected / Rework | Acceptance failed; corrective work remains in the same phase |
| Deferred | Explicitly moved to a later phase by approved change control |

### 1.3 File notation

- **[EXISTING]**: observed in the inspected repository or supplied documentation inventory.
- **[NEW]**: proposed file to be created when its phase is authorized.
- **[MODIFY]**: existing file expected to be changed.
- **[REVIEW]**: read as a governing source; do not change it unless change control requires it.
- Proposed target paths are architectural destinations, not claims that those files already exist.

---

## 2. Governing documentation and source map

| ID | Governing file | Role during implementation |
|---|---|---|
| D00 | `PsychoContext_V8_Documentation_Baseline_2.2_Complete_Merged.md` [EXISTING, updated on main to 2.2.1-proposed] | Preserves the 20-document merged baseline and reconciliations; source package, not a substitute for this execution plan |
| D01 | `00 — PsychoContext V8 Documentation Master Index.md` [EXISTING] | Document authority, reading order and source status |
| D02 | `01 — Master Architecture.md` [REVIEW] | Product identity, full scope, authority and maturity |
| D03 | `02 — Knowledge Architecture.md` [EXISTING] | Taxonomy, ontology, construct/instrument/evidence registries and knowledge boundaries |
| D04 | `03 — Technical Implementation Blueprint.md` [REVIEW] | Target technical architecture, service boundaries, data and migration |
| D05 | `04 — Conversation Audit & Gap Analysis.md` [REVIEW] | Source provenance, historical claims and verification limits |
| D06 | `05 — Enhancement Roadmap.md` [REVIEW/MODIFY by change control] | Product workstreams and maturity sequencing |
| D07 | `06 — Decision Register.md` [EXISTING] | Open/proposed/approved decisions; decision authority |
| D08 | `07 — Requirement Traceability Matrix.md` [EXISTING] | Requirement IDs, implementation links and acceptance criteria |
| D09 | `08 — CBDNA Research and Technical Specification.md` [EXISTING] | CBDNA purpose, candidate methods, limitations and maturity gates |
| D10 | `09 — Knowledge Evolution and Learning Governance.md` [REVIEW] | Knowledge lifecycle and governed research transformation |
| D11 | `10 — Architecture Reconciliation Matrix.md` [REVIEW] | Cross-document contradictions and reconciled resolutions |
| D12 | `11 — Clinical Governance and AI Authority Framework.md` [REVIEW] | Clinical authority, safety and human oversight |
| D13 | `12 — Psychometric Instrument Governance and Licensing.md` [REVIEW] | Instrument admission, rights and scoring controls |
| D14 | `13 — Military Applicant Psychological Readiness Program.md` [REVIEW; separate service scope] | Civilian readiness service; not official admission or fitness assessment |
| D15 | `14 — Privacy Security and Data Governance.md` [REVIEW] | Data classes, consent, access, retention, processors and research |
| D16 | `15 — Product Scope and Capability Maturity.md` [REVIEW] | Complete product scope and Level 1–4 maturity |
| D17 | `16 — CBDNA Data Dictionary and Entity Model.md` [REVIEW] | CBDNA entities, provenance, temporal data and versions |
| D18 | `17 — Advanced Adaptive RAG Specification.md` [REVIEW] | Ingestion, retrieval, authorization, Arabic evaluation and monitoring |
| D19 | `18 — Proposed Updates to Original Seven and Evidence Limits.md` [REVIEW] | Baseline history and evidence limits |
| D20 | `19 — Consistency Validation Gaps and Implementation Plan.md` [REVIEW/MODIFY by change control] | Existing gates, risks and validation gaps |

**Authority rule:** If documents conflict, do not silently choose one. Record the conflict in D11, identify the decision owner in D07, update D08 and this plan, then proceed only after the decision is recorded. Owner decisions explicitly classified as approved in the reconciled package remain authoritative within their stated boundaries; recommendations and open ADRs remain proposals.

---

## 3. Repository baseline and known stop-ship findings

The following are findings from static inspection of the repository snapshot documented in the 2.2.1 corrective revision. They are not runtime test results and must be rechecked against the exact commit used to start implementation.

| Finding | Inspected path | Required disposition |
|---|---|---|
| Preset staff identities/PIN alternatives and browser-stored role identity are not trustworthy authentication | `src/services/clinicalAuth.ts` [EXISTING] | Replace with verified identity-provider authentication and server-side authorization; remove embedded credentials |
| Active Firestore rules appear broader than owner-scoped draft rules | `firestore.rules`, `DRAFT_firestore.rules` [EXISTING] | Establish one authoritative ruleset; least-privilege tenant and patient scoping; test the exact deployed rules |
| Rules tests load the draft rules rather than the active rules; one test lacks an assertion | `firestore.rules.test.ts` [EXISTING] | Test the exact active rules and prove both allowed and denied cases |
| AI recommendation route lacks visible route-level authorization in inspected code and forwards complaint/demographic data | `server.ts` [EXISTING] | Authenticate, authorize, minimize payload, validate consent/purpose and review provider terms before enabling |
| Persistence error path can return a generated patient ID after failed save | `src/services/clinicalDatabase.ts` [EXISTING] | Return explicit failure; never return success-shaped identifiers for failed persistence |
| Scoring/threshold logic exists client-side | `src/utils/psychometrics.ts` [EXISTING] | Move authoritative scoring to deterministic, versioned backend service after instrument approval |
| Firebase initialization and client coupling need architecture review | `src/lib/firebase.ts`, `src/App.tsx`, `src/types/clinical.ts` [EXISTING] | Map current responsibilities and migrate deliberately |
| No test script was identified in package manifest during inspection | `package.json` [EXISTING] | Establish reproducible lint, typecheck, unit, integration, security and build commands |

**P0 release rule:** No real clinical data, public clinical pilot or production clinical deployment until authentication, authorization/tenant isolation, persistence integrity, auditability, privacy/data-flow review and required clinical safety operations are accepted.

---

## 4. End-to-end phase roadmap

| Phase | Name | Main outcome | Gate / cannot proceed until |
|---|---|---|---|
| 0 | Execution governance and scope lock | Approved plan, decision baseline, roles, branch policy and first-release boundary | Owner accepts this plan; ADR-001 and all blocking scope decisions are resolved or explicitly bounded |
| 1 | Repository discovery and reproducible baseline | Verified source inventory, architecture map, build/test baseline and migration map | Exact starting commit and repeatable baseline evidence recorded |
| 2 | Secure identity, authorization and tenant foundation | Real authentication, server-side permissions, tenant/patient isolation and secure API boundary | Negative authorization tests pass against active rules/services |
| 3 | Data foundation, migrations and audit | Canonical entities, schema migrations, persistence integrity, audit and data lifecycle controls | Data integrity, migration, backup/restore and access tests pass |
| 4 | Core clinical workspace and verified workflow | Patient, encounter, complaint, clinician verification, formulation and sign-off workflow | Clinical workflow approved; no AI-dependent or unsafe shortcut |
| 5 | Psychometric registry, administration and scoring | Governed instrument catalog, versioned administrations and deterministic scoring | Each enabled instrument independently passes rights/evidence/scoring gates |
| 6 | AI advisory and structured intake | Controlled extraction and recommendations with human verification and provider governance | Provider, privacy, consent, authorization and clinical review gates pass |
| 7 | Knowledge management and evidence governance | Versioned taxonomy, constructs, evidence and content lifecycle | Specialist review and permission boundaries are tested |
| 8 | Advanced Adaptive RAG | Secure, cited, version-aware retrieval with Arabic evaluation | Retrieval security, benchmark, quality and failure tests pass |
| 9 | CBDNA L1 core and gated L2 descriptive views | Provenance ledger first; later comparable descriptive timelines | RTM-23–28 gates and scientific/clinical review for each maturity increment |
| 10 | Therapy workspace and service modules | Clinician-governed CBT workspace and extensible service framework | Clinical content, workflows, population and operating model approved |
| 11 | Longitudinal research, readiness and institutional programs | Segregated research pathway and separately governed non-clinical services | Separate protocol, consent, legal, operational and evidence approvals |
| 12 | System-wide verification, accessibility and pilot readiness | End-to-end proof, security/privacy/clinical validation and controlled pilot package | All P0/P1 release criteria, operational readiness and sign-offs complete |
| 13 | Production release, monitoring and continuous governance | Controlled deployment, rollback, incident response and change lifecycle | Production go-live approval; monitoring and accountable owners active |

---

# 5. Detailed phase execution register

## Phase 0 — Execution governance and scope lock

**Objective:** Convert the architecture package into an executable contract. No feature code is changed in this phase.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 0.1 Confirm the authoritative repository, default branch, exact commit and preserved baseline | `D00` [REVIEW], repository metadata, [NEW] `docs/execution/BASELINE_MANIFEST.md` | Prevents work against an outdated or ambiguous source snapshot | Commit SHA, branch, file inventory and checksums recorded |
| 0.2 Approve this plan and phase-gate policy | [NEW] `docs/execution/MASTER_EXECUTION_PLAN.md`, `D07` [MODIFY], `D08` [MODIFY] | Makes the plan binding and links open decisions/requirements to phases | Owner approval record and versioned plan |
| 0.3 Resolve first-release boundary without deleting the long-term vision | `D02`, `D06`, `D07` (ADR-001), `D08` (RTM-01), `D16` | Determines which user journey is enabled first and which domains remain deferred | ADR-001 approved; included/excluded/deferred scope matrix |
| 0.4 Confirm user roles, tenant model and professional credential process | `D04`, `D12`, `D15`, `D07` (ADR-009) | Required before implementing clinical access | Approved role/tenant/credential matrix |
| 0.5 Confirm jurisdiction, data controller/operator, hosting region and provider constraints | `D15`, `D07` (ADR-005, ADR-010, ADR-013), [NEW] `docs/governance/DATA_PROCESSING_REGISTER.md` | Prevents designing a clinical data flow without a lawful operational context | Named owners and documented legal/privacy review plan |
| 0.6 Define approval authority and reviewers for each gate | [NEW] `docs/execution/PHASE_APPROVAL_MATRIX.md`, `D12`, `D13`, `D15` | Establishes who can accept product, engineering, clinical, psychometric and legal work | RACI/approval matrix with named roles |
| 0.7 Establish change request and decision templates | [NEW] `docs/execution/CHANGE_REQUEST_TEMPLATE.md`, [NEW] `docs/execution/PHASE_EXIT_TEMPLATE.md`, `D07`, `D08` | Standardizes scope changes and phase closure | Templates reviewed and adopted |

**Phase 0 exit gate:** Owner-approved plan; ADR-001 resolved or explicitly bounded; all blocking decisions have owners and due gates; phase approval authority, branch strategy and change-control process established.

## Phase 1 — Repository discovery and reproducible baseline

**Objective:** Know exactly what exists, what runs, what is duplicated, and how the current application maps to the target design.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 1.1 Inventory all repository files and classify app, tests, rules, config, assets and docs | Entire repository; [NEW] `docs/engineering/REPOSITORY_INVENTORY.md` | Prevents missing hidden dependencies or duplicating existing modules | Complete path inventory at exact commit |
| 1.2 Recheck known P0 findings against current HEAD | `src/services/clinicalAuth.ts`, `firestore.rules`, `DRAFT_firestore.rules`, `firestore.rules.test.ts`, `server.ts`, `src/services/clinicalDatabase.ts`, `src/utils/psychometrics.ts` | Confirms whether audit findings still apply | Finding-by-finding evidence with line references and commit SHA |
| 1.3 Establish current build, lint, typecheck and test baseline | `package.json`, lockfile, TS config, test configs, CI workflows | Separates pre-existing failures from regressions | Captured command outputs; no claim of passing where not run |
| 1.4 Map current UI routes, components, API routes, services and data access | `src/App.tsx`, `src/types/clinical.ts`, `server.ts`, all route/service/component paths | Provides current-state architecture before refactor | Current-state component/service/data-flow diagrams |
| 1.5 Map Current → Target → Migration for each domain | `D04`, `D11`, [NEW] `docs/engineering/CURRENT_TARGET_MIGRATION_MAP.md` | Avoids destructive rewrite and defines safe migration order | Approved mapping with keep/refactor/replace/retire decisions |
| 1.6 Establish local development and environment setup | `package.json`, lockfile, environment examples; [NEW] `README.md` or [MODIFY] existing README; [NEW] `.env.example` | Makes work reproducible without committing secrets | Fresh-clone setup succeeds using documented synthetic configuration |
| 1.7 Establish CI quality gates | CI config [NEW if absent], package scripts, test config | Prevents untested changes entering integration | CI runs formatting/lint/typecheck/tests/build on pull requests |

**Phase 1 exit gate:** Exact baseline commit and source inventory recorded; existing app can be reproduced or blockers documented; Current→Target→Migration map accepted; CI baseline exists.

## Phase 2 — Secure identity, authorization and tenant foundation

**Objective:** Eliminate the current unsafe identity model and enforce access at the server/data layer before real clinical data is possible.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 2.1 Select and document the identity provider and authentication flow | `D04`, `D15`, ADR-009; [NEW] `docs/security/IDENTITY_AND_ACCESS_DESIGN.md` | Establishes trusted user identity, session lifecycle and account recovery | Approved architecture and threat review |
| 2.2 Remove preset staff accounts, hardcoded PINs and browser role-as-identity logic | [MODIFY] `src/services/clinicalAuth.ts`; related login components and tests | Removes trivial impersonation and false identity assurance | No embedded credentials; tests reject bypass values |
| 2.3 Implement authentication integration and server-side identity verification | [NEW] backend auth module (target path: `backend/app/security/auth.py`); [MODIFY] frontend auth adapter | Every protected request must resolve to a verified principal | Valid/invalid/expired/revoked session tests |
| 2.4 Define tenant, organization, clinician, staff and patient relationship model | `D04`, `D15`, `D07` ADR-009; [NEW] `docs/security/TENANCY_AND_AUTHORIZATION_MATRIX.md` | Prevents cross-clinic and cross-patient access | Approved matrix and threat model |
| 2.5 Implement role + relationship + resource-level authorization | [NEW] backend policy module (target: `backend/app/security/policies.py`); API dependencies and repository layer | Role-only checks are insufficient for patient isolation | Positive and negative tests for every protected resource |
| 2.6 Replace permissive database rules with one authoritative least-privilege ruleset | [MODIFY] `firestore.rules`; review/remove ambiguity in `DRAFT_firestore.rules`; [MODIFY] `firestore.rules.test.ts` | Ensures active rules, not a draft, are tested | Tests explicitly load active rules; cross-tenant and cross-patient reads/writes denied |
| 2.7 Secure AI and other server endpoints | [MODIFY] `server.ts`; [NEW] backend API auth middleware | Prevents unauthenticated access to sensitive AI routes | Unauthorized requests rejected; payload minimization verified |
| 2.8 Add security event logging and session revocation | [NEW] security/audit modules; [NEW] `docs/security/SECURITY_EVENT_CATALOG.md` | Makes identity changes and denied access reviewable | Audit events are attributable and tamper-resistant by design |
| 2.9 Add automated security regression tests | auth/policy/rules test files; CI config | Stops reintroduction of access bypasses | All P0 authorization tests pass |

**Phase 2 exit gate:** No hardcoded staff credential path; verified authentication; server/data-layer enforcement; tenant and patient isolation; active rules tested; all unauthorized cases denied. No real patient data yet.

## Phase 3 — Data foundation, migrations and audit

**Objective:** Create a stable, versioned data layer and prevent false success, silent overwrites or untraceable clinical changes.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 3.1 Approve canonical domain entities and ownership boundaries | `D04`, `D12`, `D15`, `D17`; [NEW] `docs/data/DOMAIN_ENTITY_CATALOG.md` | Aligns data model with approved architecture | Entity catalog and relationship diagram accepted |
| 3.2 Define database technology and migration approach | `D04`, ADR-013; [NEW] `backend/app/db/README.md`, [NEW] migration configuration | Avoids unplanned technology migration; PostgreSQL target remains proposed until approved | ADR-013 decision and operational fit assessment |
| 3.3 Implement canonical entities and schema constraints | [NEW] backend models/schemas; migration files; [MODIFY] `src/types/clinical.ts` only as typed API contract, not database authority | Makes server-side schema authoritative | Schema tests and referential integrity tests |
| 3.4 Define canonical identity and clinical record entities | Canonical names: `AssessmentAdministration`, `ResponseSet`, `ScoreResult`, `FeatureDefinition`, `FeatureVersion`, `Relation`, `ReviewEvent`; [NEW] entity modules and docs | Prevents competing names and ambiguous records | Entity naming and mapping checks |
| 3.5 Implement transactional persistence and explicit failure semantics | [MODIFY] `src/services/clinicalDatabase.ts`; target backend repositories/services | Fixes success-shaped response after failed save | Failure injection proves failed writes return explicit errors and no false ID |
| 3.6 Implement append-only audit events and amendment history | [NEW] `backend/app/audit/`; [NEW] `docs/data/AUDIT_EVENT_CATALOG.md` | Preserves who changed what, when, why and from which source | Audit tests cover create/read/update/sign-off/export |
| 3.7 Implement consent, data classification, retention and deletion hooks | `D15`, ADR-010; [NEW] consent/retention services and policy files | Gives every data class a defined purpose and lifecycle | Data-flow map, consent state tests and deletion/retention tests |
| 3.8 Define backup, restore, migration rollback and disaster recovery | [NEW] `docs/operations/BACKUP_RESTORE_RUNBOOK.md`, migration scripts, CI/ops config | Prevents irreversible schema and data loss | Restore rehearsal and migration rollback evidence |
| 3.9 Seed synthetic fixtures and test factories | [NEW] `backend/tests/factories/`, [NEW] `frontend/src/test/fixtures/` | Enables safe end-to-end development | No real identifiable patient data in fixtures |

**Phase 3 exit gate:** Canonical data model accepted; migrations are repeatable and reversible; failed persistence cannot appear successful; audit and consent/retention foundations tested; restore rehearsal documented.

## Phase 4 — Core clinical workspace and verified workflow

**Objective:** Deliver the minimum coherent clinician workflow, with verified human input and explicit clinical authorship.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 4.1 Define the clinical workflow state machine | `D02`, `D12`, `D04`, RTM clinical requirements; [NEW] `docs/clinical/CLINICAL_WORKFLOW_SPEC.md` | Makes each step and transition explicit | Clinical lead approval and state-transition table |
| 4.2 Implement patient registration and demographic data minimization | Existing patient UI/services; target patient API/domain modules | Supports the patient record without collecting unnecessary data | Validation, authorization and minimization tests |
| 4.3 Implement encounter/visit creation and status lifecycle | [NEW] encounter domain/API/UI modules | Separates longitudinal patient from each clinical encounter | Encounter lifecycle tests |
| 4.4 Implement complaint/intake capture and source attribution | Existing complaint components if present; target intake API/schema | Preserves patient-authored content and timestamp/source | Source and amendment history visible |
| 4.5 Implement clinician verification/correction of extracted or entered facts | [NEW] review UI/domain events | Prevents unverified information becoming a clinical fact | Review state and actor recorded; unreviewed data visibly distinguished |
| 4.6 Implement formulation, diagnosis record and differential hypotheses as separate entities | `D12`; target clinical formulation modules | Distinguishes clinician judgment from AI hypothesis and raw data | Role tests, version history and attribution |
| 4.7 Implement clinician sign-off and append-only amendment | ADR-014; `D12`; target sign-off module | Makes authorship and later changes explicit; does not claim legal e-signature without review | Authenticated attributable sign-off; legal semantics not overstated |
| 4.8 Implement patient timeline and encounter navigation | Frontend routes/components and API contracts | Gives clinicians a coherent record view | UX review and access-control tests |
| 4.9 Implement Arabic RTL, accessibility and responsive foundations | Shared frontend layout/design system; [NEW] `docs/ux/ARABIC_RTL_ACCESSIBILITY_STANDARD.md` | Core usability requirement, not a cosmetic late addition | RTL, keyboard, contrast and screen-size test evidence |

**Phase 4 exit gate:** Synthetic end-to-end clinical journey works from registration through encounter and clinician sign-off; every data source and author is distinguishable; clinical lead accepts workflow; AI is not required for safe operation.

## Phase 5 — Psychometric registry, administration and scoring

**Objective:** Build an instrument-governance system before enabling any assessment instrument.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 5.1 Define instrument admission workflow and approval states | `D13`, `D03`, `D08`; [NEW] `docs/psychometrics/INSTRUMENT_ADMISSION_WORKFLOW.md` | Prevents unlicensed or unvalidated measures entering production | Psychometric and rights review approved |
| 5.2 Create versioned instrument registry | [NEW] instrument domain, API, admin UI and database migrations | Tracks exact form/language/version and rights | Registry schema and version tests |
| 5.3 Create scoring specification registry | `D03`, `D13`; [NEW] scoring specification entities | Separates items, response options, scoring and interpretation versions | Reproducible scoring-spec version record |
| 5.4 Move authoritative scoring from browser to deterministic backend | [MODIFY] `src/utils/psychometrics.ts`; target backend scoring engine | Prevents client manipulation and inconsistent results | Golden test vectors and cross-version reproducibility |
| 5.5 Implement assessment administration and response capture | Canonical `AssessmentAdministration`, `ResponseSet`, `ScoreResult`; UI/API modules | Separates administered form from calculated result | Completeness, immutability and access tests |
| 5.6 Implement rights, population and language evidence checks | `D13`, `D15`; instrument metadata and approval workflow | Public availability is not a license; translation is not validation | Instrument blocked unless exact permissions and intended-use gates pass |
| 5.7 Implement interpretation with limitations and source display | `D03`, `D13`; report UI/API | Avoids unsupported diagnosis, norms or cutoffs | Every interpretation links to exact evidence/version/limitations |
| 5.8 Add instrument-specific validation suites | scoring and administration tests | Detects formula errors and regression | Reviewer-signed test vectors for each enabled form |

**Phase 5 exit gate:** No instrument is enabled without exact rights, population/language evidence and scoring approval. Scoring is deterministic, versioned, server-authoritative and reproducible. Raw scores remain distinct; no universal composite is introduced.

## Phase 6 — AI advisory and structured intake

**Objective:** Add AI only after identity, data controls and human workflow exist.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 6.1 Resolve AI provider, region, retention, training-use and processor terms | ADR-005, `D15`; [NEW] `docs/ai/AI_PROVIDER_APPROVAL_RECORD.md` | Blocks sensitive data transmission until reviewed | Written security/privacy/legal approval |
| 6.2 Define AI purpose boundaries, prohibited outputs and human review | `D12`, `D15`; [NEW] `docs/ai/AI_USE_CASE_REGISTER.md` | Keeps AI advisory and prevents diagnosis/treatment/safety authority | Approved use-case matrix and policy tests |
| 6.3 Build structured extraction with source spans and uncertainty | Existing `server.ts` route reviewed; new backend AI orchestration/extraction modules | Converts narrative to reviewable candidate facts | Schema validation, provenance and uncertainty tests |
| 6.4 Require clinician verification before extracted facts enter approved formulation | Phase 4 review events; AI UI components | Prevents model output becoming a clinical fact | Unreviewed extraction excluded from signed formulation |
| 6.5 Build assessment recommendation as a non-binding suggestion | Replace/secure existing `/api/ai/recommend-scales`; `D13` | Supports workflow without selecting instruments autonomously | Recommendation includes evidence/limits; clinician chooses |
| 6.6 Implement prompt/version/provider logging with data minimization | AI modules, audit catalog, provider policy | Enables reproducibility and incident review without excessive sensitive logging | Approved logs and retention tests |
| 6.7 Add provider outage, timeout, malformed output and prompt-injection tests | AI integration tests and CI | Ensures safe fallback and no workflow dependency | Failures are visible; clinician workflow remains available |
| 6.8 Remove unsupported inference from text-only input | AI prompt/spec and UI labels | Text cannot substantiate voice tone, speech rate or audio characteristics | Tests and UX copy prohibit claims not supported by input modality |

**Phase 6 exit gate:** Provider and data processing approved; all AI routes authenticated and authorized; output is advisory, attributable, versioned and reviewed; failure cannot block core care or fabricate results.

## Phase 7 — Knowledge management and evidence governance

**Objective:** Implement the governed knowledge architecture as a managed, versioned domain, not an unreviewed content dump.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 7.1 Define canonical taxonomy/ontology model and multi-axial relations | `D03`, `D17`; [NEW] knowledge schema/domain modules | Supports many-to-many classification without implying equivalence | Relation type and semantic constraint tests |
| 7.2 Build construct registry and construct version lifecycle | `D03`, `D09`; [NEW] construct registry API/admin UI | Separates construct definition from instrument and observation | Versioning and approval tests |
| 7.3 Build evidence and claim repository with provenance | `D03`, `D10`; [NEW] evidence/claim entities and UI | Each claim carries source, population, design, limits and review | Source-to-claim traceability |
| 7.4 Build knowledge candidate → appraisal → specialist review → approval workflow | `D10`; workflow modules | AI cannot self-publish knowledge | State transition and role tests |
| 7.5 Build instrument-to-construct and evidence relationships | `D03`, `D13`; relation APIs | Supports discovery while retaining distinctions | No invalid score combination or equivalence inferred |
| 7.6 Add content versioning, effective dates, retirement and rollback | Knowledge modules and audit events | Prevents silent edits to approved knowledge | Historical version retrieval and rollback tests |
| 7.7 Create specialist review and admin work queues | Frontend admin components and APIs | Operationalizes governance | Reviewer task lifecycle demo and audit evidence |

**Phase 7 exit gate:** Knowledge entities, relations and claims are versioned; publication requires authorized specialist review; provenance and retirement are testable; patient memory remains separate.

## Phase 8 — PsychoContext Advanced Adaptive RAG

**Objective:** Deliver secure, evidence-grounded retrieval only after the knowledge and authorization foundations exist.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 8.1 Approve retrieval scope, corpus classes and user permissions | `D18`, `D15`, `D03`; [NEW] `docs/rag/RAG_DATASET_AND_PERMISSION_MATRIX.md` | Prevents mixing patient records and shared knowledge | Approved corpus and access matrix |
| 8.2 Implement ingestion, parsing, chunking and metadata lineage | RAG backend modules, ingestion jobs and source registry | Makes retrieved passages traceable to source/version | Ingestion replay and provenance tests |
| 8.3 Implement authorization filtering before retrieval | Backend security policies and retrieval pipeline | Unauthorized documents must never enter candidate context | Cross-tenant/patient retrieval leakage tests |
| 8.4 Implement hybrid retrieval, query rewriting and reranking as evaluated components | RAG service modules and config | Each component must justify quality/cost; no fashionable component by default | Benchmark comparison and documented configuration |
| 8.5 Implement answer grounding, citations and abstention | AI orchestration and response schema | Distinguishes evidence from inference and handles missing evidence | Citation validity and unsupported-answer tests |
| 8.6 Build Arabic/Egyptian dialect benchmark and evaluation set | [NEW] `tests/rag/arabic_benchmark/`, evaluation scripts | Project-specific retrieval quality cannot be inferred from English benchmarks | Human-reviewed benchmark and baseline metrics |
| 8.7 Add prompt injection, poisoning, leakage and stale-version tests | RAG security tests | Protects against hostile content and cross-context leakage | Security test report |
| 8.8 Add latency, cost, freshness and retrieval-quality monitoring | RAG metrics/dashboard and ops docs | Keeps retrieval operationally sustainable | Thresholds, alerts and runbook approved |

**Phase 8 exit gate:** Retrieval is permission-filtered, source-cited, version-aware and evaluated in Arabic/Egyptian contexts; security, abstention, freshness, cost and failure behavior meet approved thresholds.

## Phase 9 — CBDNA L1 core and gated L2 descriptive views

**Objective:** Implement CBDNA as an independent, provenance-first engine without presenting unvalidated constructs as clinical truth.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 9.1 Lock CBDNA L1 scope and forbidden interpretations | `D09`, `D17`, `D12`, RTM-23–28 | L1 is a provenance ledger, not a predictive/personality score | Clinical/psychometric review of boundaries |
| 9.2 Implement source classes as immutable typed records | CBDNA domain modules and schema | Distinguishes self-report, clinician observation, interpretation, instrument result, AI hypothesis and research finding | Source-class immutability tests |
| 9.3 Implement FeatureDefinition and FeatureVersion registries | `D09`, `D17`; backend CBDNA modules | Separates stable definition/version from observation | Version and lineage tests |
| 9.4 Implement Observation, Relation and ReviewEvent lineage | `D09`, `D17`; audit/event modules | Preserves provenance, contradiction, review and correction | Append-only history and correction tests |
| 9.5 Implement time/context/uncertainty/missingness metadata | CBDNA entities and API schemas | Prevents context-free or falsely certain longitudinal claims | Required-field and missingness tests |
| 9.6 Build L1 clinician/research review display only if authorized | Frontend CBDNA view; `D12`, RTM-24/25 | Makes sources and review states distinguishable | Comprehension/UX review; no diagnosis/personality/universal score language |
| 9.7 Evaluate L2 descriptive trajectories separately | [NEW] `docs/cbdna/L2_DESCRIPTIVE_VALIDATION_PLAN.md`, evaluation code | L2 requires comparable observations and explicit limitations | Approved validation plan and reproducible trend tests |
| 9.8 Gate all clinical use and research reuse | `D09`, `D15`, RTM-23–28, ADR-011 | Prevents safety authority and automatic generalization | Protocol, access, de-identification and failure-mode tests |

**Phase 9 exit gate:** L1 provenance ledger works and preserves source classes, uncertainty, time, context and review history. L2 is not activated until its separate scientific/clinical approval. No safety, diagnosis, treatment, eligibility or autonomous decision authority is assigned to CBDNA.

## Phase 10 — Therapy workspace and service modules

**Objective:** Add therapy support and service-specific experiences without turning the application into an undifferentiated set of modules.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 10.1 Define therapy workspace boundary and clinical content governance | `D02`, `D12`, RTM-19; [NEW] `docs/clinical/THERAPY_WORKSPACE_SPEC.md` | Distinguishes treatment record from generic educational content | Clinical lead approves workflows and content owner |
| 10.2 Implement CBT workspace as clinician-governed tools | Therapy domain/API/UI modules | Supports thought records, restructuring, behavioral activation, experiments, homework and session review | Workflow tests and content review |
| 10.3 Define extensible therapy protocol registry | Therapy modules and evidence registry | Allows future modalities without hardcoding unsupported protocols | Protocol version/approval tests |
| 10.4 Implement treatment plan, session, homework and outcome entities | Data models, migrations, APIs and UI | Links activities to responsible clinician and encounter | Authorization and lifecycle tests |
| 10.5 Add family/adolescent/parenting/school/occupational services only by approved scope | `D02`, `D16`, `D12`, `D15`; separate service specs | Each population/service has distinct consent, safeguarding and operational requirements | Separate approval and acceptance pack per service |
| 10.6 Define minors, safeguarding and referral gates before any minor-facing workflow | ADR-007, ADR-008; `D12`, `D15` | Prevents unsafe access without age/consent/escalation model | Legal and clinical safeguarding approval |

**Phase 10 exit gate:** CBT workspace passes clinical review and workflow tests. Additional therapy/service modules remain disabled until their own content, population, consent and operational gates pass.

## Phase 11 — Longitudinal research, readiness and institutional programs

**Objective:** Extend the platform into research and separately governed programs while maintaining strict data and purpose boundaries.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 11.1 Define research governance and approved protocol lifecycle | `D10`, `D15`, `D09`; [NEW] research protocol modules/docs | Prevents care events from automatically becoming research | Protocol approval, consent/legal basis and audit tests |
| 11.2 Implement de-identification and research export controls | Research data pipeline and access policies | Limits re-identification and unauthorized secondary use | Re-identification risk review and export approval tests |
| 11.3 Implement research dataset versioning and reproducibility | Dataset manifest, transformation code, analysis notebooks/reports | Makes derived findings auditable and reproducible | Dataset lineage and rerun evidence |
| 11.4 Define civilian readiness service as separate product journey | `D14`, `D02`, ADR-012, `D15`; [NEW] `docs/services/READINESS_SERVICE_OPERATING_MODEL.md` | Prevents confusion with official military admission/fitness assessment | Explicit non-official scope, consent, age and referral model approved |
| 11.5 Build readiness modules only after its separate approvals | Readiness API/UI/data modules | Keeps readiness data and identity separate from clinical care as required | Separate access, consent and data-separation tests |
| 11.6 Define institutional program and aggregate reporting controls | `D02`, `D16`, `D15`; [NEW] `docs/services/INSTITUTIONAL_PROGRAM_SPEC.md` | Prevents individual re-identification through reports | Suppression/minimum cohort and permission tests |
| 11.7 Define future Fitrah research as a separate governed track | `D03`, `D09`, ADR-015 | Preserves the idea without asserting scientific validation | Separate construct, research and approval plan |

**Phase 11 exit gate:** Research, readiness and institutional pathways have separate purpose, identity/access, consent, data-flow and approval controls. No secondary use is automatic. No official admission/fitness claims.

## Phase 12 — System-wide verification, accessibility and pilot readiness

**Objective:** Prove that the assembled application behaves safely and correctly across real user journeys before any controlled pilot.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 12.1 Build full RTM-to-code-to-test traceability | `D08`; [NEW] `docs/quality/RELEASE_TRACEABILITY_REPORT.md` | Shows every release requirement has implementation and evidence | No orphaned P0/P1 requirement |
| 12.2 Execute unit, integration, contract and end-to-end suites | All backend/frontend test suites and CI | Detects defects across boundaries | Signed test run on release candidate commit |
| 12.3 Execute security testing and threat-model review | Security docs, auth/rules/API/RAG tests | Revalidates least privilege, tenant isolation, secrets and injection controls | Security review and remediation closure |
| 12.4 Execute privacy/data lifecycle verification | `D15`, consent/retention/export/deletion code and tests | Verifies purpose, access, retention and deletion behavior | Privacy review and data-flow sign-off |
| 12.5 Execute clinical safety tabletop and failure-mode tests | `D12`, RTM-23/28, runbooks | Ensures safety processes survive AI/RAG/CBDNA/database failure | Named responder, escalation coverage and tabletop record |
| 12.6 Execute psychometric verification for every enabled instrument | `D13`, golden vectors and scoring tests | Confirms exact scoring, form version and permitted interpretation | Psychometric reviewer sign-off per instrument |
| 12.7 Execute Arabic RTL, accessibility and usability testing | UX standard and frontend tests | Validates practical use in intended language and device contexts | Defect list closed or explicitly accepted |
| 12.8 Run synthetic pilot with defined users and scenarios | [NEW] `docs/release/PILOT_PROTOCOL.md`, synthetic fixtures | Tests workflow without exposing real clinical data | Pilot findings, severity triage and owner acceptance |
| 12.9 Produce operational runbooks and support readiness | [NEW] deployment, incident, backup, monitoring, support runbooks | Ensures service can be operated safely | Named on-call/escalation owners and rehearsal |
| 12.10 Produce release dossier | [NEW] `docs/release/RELEASE_DOSSIER.md` | Consolidates all evidence and unresolved risks | All release sign-offs attached |

**Phase 12 exit gate:** All P0/P1 release criteria passed; no unresolved critical/high-risk defect without explicit risk acceptance; clinical, psychometric, privacy/legal, security and engineering approvals recorded; pilot is synthetic or separately authorized.

## Phase 13 — Production release, monitoring and continuous governance

**Objective:** Release in a controlled way and maintain the application as a governed clinical/research product.

| Activity | Files to use / create / modify | Importance and role | Completion evidence |
|---|---|---|---|
| 13.1 Approve production go-live and deployment scope | Release dossier, ADRs, `D15`; [NEW] deployment checklist | Prevents an informal transition from pilot to production | Signed go-live decision |
| 13.2 Configure production secrets, identity, network, encryption and backups | Infrastructure/config files; secret manager; runbooks | Protects production environment | Configuration review; no secrets in repository |
| 13.3 Deploy with migration and rollback controls | CI/CD, migration scripts, deployment manifests | Limits outage and irreversible changes | Deployment rehearsal and rollback proof |
| 13.4 Enable monitoring, audit review and incident response | Metrics/logging/alert config; incident runbook | Detects security, data and availability failures | Alert test and incident tabletop |
| 13.5 Monitor clinical/AI/psychometric quality within approved intended use | Evaluation dashboards and governance reports | Detects drift and unintended impact | Periodic review and escalation thresholds |
| 13.6 Manage defects, changes and future capability maturity | This plan, `D06`, `D07`, `D08`, `D16` | Keeps future changes traceable and phased | Updated plan/RTM/ADR and accepted next phase |
| 13.7 Conduct periodic access, vendor, retention and evidence reviews | `D12`, `D13`, `D15`, `D18` | Maintains compliance and scientific trust | Dated review records and remediation tracking |

**Phase 13 exit gate:** Production approval is explicit; rollback, monitoring, incident response and accountable operators are active. Continuous changes return through change control and the relevant phase gate.

---

## 6. Cross-phase file and workstream ownership

| Workstream | Governing documents | Main implementation area | Primary verification |
|---|---|---|---|
| Product scope and workflow | D02, D06, D16 | Frontend routes, product/service modules | User journey and scope acceptance |
| Architecture and migration | D04, D11 | Backend/frontend boundaries, API contracts, migrations | Architecture and migration tests |
| Identity and security | D12, D15, ADR-009 | Auth, policies, rules, sessions, audit | Negative authorization/security tests |
| Clinical workflow | D02, D12 | Patient, encounter, formulation, sign-off | Clinical scenario and role tests |
| Psychometrics | D03, D13 | Instrument registry, administration, scoring | Rights review and golden scoring vectors |
| AI | D12, D15 | AI gateway, extraction, recommendation | Provider approval, schema and human-review tests |
| Knowledge | D03, D10 | Taxonomy, ontology, construct/evidence registries | Specialist workflow and provenance tests |
| RAG | D18, D15 | Ingestion, retrieval, reranking, citations | Arabic benchmark and leakage tests |
| CBDNA | D09, D17, D12 | Feature definitions, observations, relations, review events | RTM-23–28 and scientific gates |
| Therapy/services | D02, D12, D14, D16 | Therapy and service modules | Per-service clinical/operational approval |
| Research | D09, D10, D15 | De-identification, protocols, research datasets | Ethics/legal/protocol and reproducibility |
| Release/operations | D04, D15, D19 | CI/CD, monitoring, backups, incident response | Release dossier and operational rehearsals |

---

## 7. Required phase work packet

Before starting any phase, create a phase-specific packet at:

`docs/execution/phases/PHASE-XX-<slug>.md` [NEW]

It must contain:

1. Phase objective and scope.
2. Included and explicitly excluded features.
3. Activity IDs from this master plan.
4. Exact repository paths to be read, created, modified or deleted.
5. For every file: current status, intended change, owner and reviewer.
6. RTM requirement IDs and decision IDs.
7. Dependencies and blocking conditions.
8. Data/security/clinical/privacy impact assessment.
9. Test cases and acceptance criteria.
10. Migration and rollback plan where relevant.
11. Branch name and starting commit SHA.
12. Deliverables and evidence links.
13. Known risks and unresolved questions.
14. Phase exit checklist and approval record.

**No phase implementation starts until this packet is marked Ready.** If a new file is discovered or a path differs from this plan, update the packet before editing.

---

## 8. Change control — additions, deletions, modifications and blockers

Every proposed change receives a Change ID: `CR-YYYY-NNN`.

| Change type | Required action before implementation |
|---|---|
| Add a feature or activity | Define purpose, user, scope, dependencies, risk, affected phases/files, RTM row and acceptance criteria |
| Delete or defer a feature | Record reason, impact, replacement or deferred phase, affected requirements and owner approval; never erase the historical decision |
| Modify architecture or technology | Update D04 and D11; open/update ADR in D07; update migration map and affected phase packets |
| Change clinical/psychometric behavior | Obtain relevant clinical/psychometric approval; update D12/D13 and RTM; add regression and validation tests |
| Change data collected, purpose, retention or provider | Update D15 and data-flow register; complete privacy/legal/security review before coding or transmission |
| Change CBDNA model, feature, maturity or permitted use | Update D09/D17 and RTM-23–28; require scientific/clinical review; do not silently advance maturity |
| Change RAG corpus, retrieval or model behavior | Update D18, corpus/permission matrix and evaluation benchmark; rerun security and quality tests |
| Change scope or phase order | Update this master plan, D06, D07 and D08; record owner approval and revised dependencies |
| Discover a blocker | Create blocker record with evidence, severity, owner, resolution options and phase impact; mark affected activity Blocked |
| Fix a defect without scope change | Link issue to original activity/requirement, add regression test and preserve traceability |

### 8.1 Change workflow

1. Raise CR and describe the problem/opportunity.
2. Identify affected requirements, decisions, files, data classes and phases.
3. Perform impact analysis: product, technical, security, privacy, clinical, psychometric, cost and schedule.
4. Obtain the relevant decision owner/reviewer approval.
5. Update this plan and linked documents (D06/D07/D08/D11 plus domain docs as applicable).
6. Update the phase packet and test plan.
7. Implement on the phase branch.
8. Verify, review and record evidence.
9. Close the CR only after the change is merged and all records are synchronized.

No silent scope changes are permitted.

---

## 9. Definition of Done — activity, phase and application

### Activity Definition of Done
- Code/document changes are limited to the approved activity scope.
- Every changed file is listed in the phase packet.
- Relevant automated tests pass; manual tests have reproducible steps and evidence.
- No secrets or real patient data are committed.
- Accessibility, localization and authorization are considered where applicable.
- RTM and decision links are updated.
- Reviewer has inspected the diff and evidence.

### Phase Definition of Done
- All mandatory activities are Accepted or explicitly deferred by approved CR.
- All phase acceptance tests pass.
- No unresolved blocker remains that invalidates the phase's safety or architecture.
- Documentation, RTM, ADRs, migration map and runbooks reflect the delivered state.
- A phase exit report and owner approval are recorded.
- The accepted commit SHA is tagged/referenced.
- Only then may the next phase move from Ready to In Progress.

### Application Definition of Done
The application is complete only when:
- Every approved product capability in D02/D16 is either implemented and accepted or explicitly excluded/deferred by owner decision.
- All enabled user journeys are proven from UI to API/service to persistence and back, including failure behavior.
- Security, tenant isolation, privacy, consent, audit and data lifecycle controls pass.
- Every enabled instrument has exact rights/evidence/scoring approval.
- AI, RAG and CBDNA stay within their approved maturity and authority boundaries.
- Clinical workflows and safety operations are approved by qualified accountable professionals.
- Arabic/RTL, accessibility and usability are tested.
- Production deployment, monitoring, incident response, backup/restore and rollback are rehearsed.
- Final release dossier and owner sign-off are complete.

---

## 10. Initial implementation sequence and immediate next action

The first code change is **not** to add a new clinical feature. It is to complete Phase 0 approval and Phase 1 repository baseline, then execute Phase 2 security remediation before any real clinical workflow or real data is enabled.

Recommended branch pattern:

- `planning/master-execution-plan-v1` — this plan only.
- `phase/01-repository-baseline`
- `phase/02-security-foundation`
- `phase/03-data-foundation`
- `phase/04-clinical-workspace`
- Continue with one branch per phase; never stack unaccepted phase work into `main`.

**First implementation work packet to prepare after plan approval:**
`docs/execution/phases/PHASE-01-repository-baseline.md`

It must start from the exact approved main commit and include the complete file inventory, audit recheck, baseline commands, Current→Target→Migration map and CI setup. Phase 2 begins only after Phase 1 acceptance.

---

## 11. Explicit unresolved decisions and release blockers

The following are not to be guessed during implementation:

| Decision | Why it matters | Must be resolved by |
|---|---|---|
| ADR-001 — first release / initial user journey | Defines what is actually enabled first while preserving full vision | Phase 0 |
| ADR-002 — exact instruments | Rights, language, scoring and intended-use validation | Before Phase 5 instrument activation |
| ADR-004 — speech/audio intake and retention | Modality, consent, provider and retention | Before any audio feature |
| ADR-005 — AI providers and clinical data processing | Privacy, contracts, region, retention and training use | Before Phase 6 sends sensitive data |
| ADR-007 — minors | Age, consent/assent, safeguarding and escalation | Before any minor-facing service |
| ADR-008 — safety/emergency operations | Human responder, local coverage and tested escalation | Before any safety-enabled public/clinical release |
| ADR-009 — roles, credentials and tenancy | Access model and isolation | Phase 0–2 |
| ADR-010 — retention, deletion, correction and consent withdrawal | Data lifecycle and legal rights | Phase 0–3 |
| ADR-013 — technology/hosting architecture | Deployment, data residency, operational support and migration | Phase 0–3 |
| ADR-014 — legal meaning of clinician sign-off | Avoids overstating electronic signature validity | Before claiming legally binding e-signature |
| ADR-015 — Fitrah research scope | Keeps future research distinct from validated constructs | Before Fitrah implementation |
| ADR-016 — authoritative source and evidence | Exact commit, logs, runtime and test provenance | Phase 1 |

An unresolved item may be deferred only if its dependent functionality is explicitly disabled and the deferral is recorded in D07, D08, this plan and the relevant phase packet.

---

## 12. Plan maintenance and version history

This document is versioned. Every accepted change must include:
- new version number and date;
- Change ID(s);
- changed phases, activities and files;
- updated requirements/decisions;
- impact on accepted phases;
- whether revalidation or re-approval is required.

| Version | Status | Change |
|---|---|---|
| 1.0-draft | Proposed for owner approval | Initial complete phase roadmap and file-level activity register |

**Final governance principle:** The plan is a living controlled baseline, not a static checklist. The application is built by completing, evidencing and accepting each phase in sequence. A later discovery can change the plan, but it cannot bypass traceability, review or approval.
