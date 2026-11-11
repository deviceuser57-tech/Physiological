# PsychoContext V8 — Technical Implementation Blueprint

**Version:** 2.0-proposed | **Status:** Target design; not implementation evidence or final hosting selection

## 1. Target direction

Adopt the owner-specified planning direction: Python/FastAPI backend; Pydantic contracts; SQLAlchemy/Alembic persistence; TypeScript/React frontend; PostgreSQL system of record; optional pgvector only after retrieval evaluation; encrypted object storage where needed; modular monolith first. No unnecessary microservices. Hosting, identity vendor, residency, budget and operations remain ADR decisions.

Python owns domain rules, deterministic psychometric scoring, validation, AI orchestration, knowledge processing, CBDNA derivation, retrieval and research processing. TypeScript owns UI, interaction, navigation, accessibility, state presentation and workflow. Share API schemas through generated/validated contracts; never duplicate scoring logic in browser.

## 2. Logical modules

Identity/access; organizations/tenancy; consent; clinical patients/encounters; applicant/program participants; assessment and instrument registry; formulation/diagnosis; treatment; safety; CBDNA engine; knowledge/evidence; advanced adaptive RAG; research governance; programs; audit/operations. Modules share platform services but enforce purpose boundaries. Clinical and applicant records are separately identified and authorized.

## 3. Core data entities

User, Organization, Membership, RoleGrant, Credential, Consent, Patient, ProgramParticipant, Encounter, IntakeArtifact, ExtractedFact, Instrument, InstrumentVersion, LicenseApproval, AssessmentOrder, Session, Response, Score, Interpretation, Formulation, ClinicianDecision, TreatmentPlan, SafetyEvent, CBDNAFeatureDefinition, CBDNAFeatureVersion, FeatureObservation, ContextRecord, TemporalWindow, ContradictoryObservation, DerivationLineage, ClinicalEvidence, KnowledgeDocument, ResearchProtocol, ResearchCandidate, ApprovedFinding, RAGIndexVersion, RetrievalTrace, Program, Enrollment, AuditEvent, ProviderCall, Incident. Detailed CBDNA fields in 16; source authority and knowledge lifecycle in 09.

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

First acquire repository/commit, rules, schemas, provider settings and test environment. Audit every claim before migration. Build an isolated target with synthetic data, map only necessary/authorized fields, dry-run, reconcile counts/checksums, privacy review and rollback. Controlled cutover only after explicit release sign-off. See 18/19. No app code was inspected in this documentation task.

## Proposed enhancement — adaptive assessment recommendation service (pending approval)

Add a recommendation service returning candidate instruments, not an automatically selected battery. Inputs may include age band, language/version availability, stated purpose, context, already available information, prior instruments and burden. Each recommendation must return reason, evidence/source/version, limitations, rights/approval scope, alternatives/overlap, estimated respondent burden and missing-data caveats. API records the clinician’s final selection, acceptance/rejection/replacement and rationale separately from AI suggestions. Proposed endpoints: `POST /v1/assessment-recommendations` (draft candidates); `POST /v1/assessment-orders` (clinician-authorized order only); `POST /v1/instrument-version-changes` (governance workflow). Enforce exact approval scope server-side. Reports preserve original results and each source/version. Test that AI cannot directly order a measure, unapproved versions cannot be ordered, score outputs remain separate, and recommendation/rejection decisions are auditable.
