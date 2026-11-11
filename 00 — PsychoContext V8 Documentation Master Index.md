# PsychoContext V8 — Documentation Master Index

**Package status:** Reconciled proposal set for controlled implementation review; not implementation authorization | **Version:** 2.0-proposed | **Date:** 9 November 2026

## Authority and source policy

This folder is a separately generated proposal package. The earlier seven-file baseline in `PsychoContext_V8_Blueprint` remains unchanged. Revised 01–07 documents here are proposed replacements for review, not silent edits to that baseline. Decisions 1–8 in the owner-supplied prompt (attachment `pasted_content_3.txt`, §§4.1–4.8) are treated as **OWNER-APPROVED DECISIONS AS PROVIDED IN THAT PROMPT**. Recommendations beyond those eight remain proposals/open. Historical build statements remain claims unless exact code paths and runtime tests are inspected; no application feature is verified by this documentation run.

| ID | Document | Authority and purpose | Dependencies / related docs | Status |
|---|---|---|---|---|
| 01 | [Master Architecture](01%20%E2%80%94%20Master%20Architecture.md) | Product identity, complete vision, capability maturity and system-wide clinical/AI authority | 08, 11, 13, 15 | Proposed reconciled version |
| 02 | [Knowledge Architecture](02%20%E2%80%94%20Knowledge%20Architecture.md) | Multi-axial taxonomy, registries, evidence and separate knowledge/memory domains | 08, 09, 12, 16, 17 | Proposed reconciled version |
| 03 | [Technical Implementation Blueprint](03%20%E2%80%94%20Technical%20Implementation%20Blueprint.md) | Python/TS/PostgreSQL responsibilities, APIs, security, operations, testing, migration | 11, 14, 16, 17 | Proposed reconciled version |
| 04 | [Conversation Audit & Gap Analysis](04%20%E2%80%94%20Conversation%20Audit%20%26%20Gap%20Analysis.md) | Chronology, source classification, historical claims and limitations | 18, evidence inventory | Proposed reconciled version; transcript incomplete |
| 05 | [Enhancement Roadmap](05%20%E2%80%94%20Enhancement%20Roadmap.md) | Workstreams, progressive capability maturity, gates and acceptance outcomes | 06, 07, 18, 19 | Proposed; preserves full scope |
| 06 | [Decision Register](06%20%E2%80%94%20Decision%20Register.md) | Eight owner decisions plus remaining genuinely open decisions | 07, 18, 19 | Eight classified as owner-approved per supplied prompt; others open/proposed |
| 07 | [Requirement Traceability Matrix](07%20%E2%80%94%20Requirement%20Traceability%20Matrix.md) | Stable requirements linked to architecture, data, UI/API, test, ADR and status | All documents | Proposal; acceptance criteria require review |
| 08 | [CBDNA Research & Technical Specification](08%20%E2%80%94%20CBDNA%20Research%20and%20Technical%20Specification.md) | Core engine purpose, candidate mathematical approaches, limits and validation | 11, 16, 07 | Research/design specification; not validated clinical model |
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
2. Owner decisions 1–8 are recorded as approved **because the owner-provided prompt explicitly states they are authoritative**; exact operational details still require the specified scientific/legal/clinical reviews.
3. No raw psychometric score is context-adjusted without exact-purpose validation and approval.
4. AI remains advisory; qualified clinician is authoritative for clinical diagnosis and treatment.
5. CBDNA is a core architectural engine but not a diagnosis or autonomous decision-maker; clinical deployment of any derived construct remains gated.
6. The military applicant program is a free, civilian psychological wellbeing/readiness service; not physical preparation, rehabilitation, official assessment, or admission preparation authority.
7. No “Built” claim becomes verified without repository/runtime evidence.

## Update note — psychometric proposal integration (11 November 2026)

The latest proposal supplied as `pasted_content_5.txt` is integrated as **PROPOSED / PENDING OWNER APPROVAL**, not as a new owner decision. Documents 01–12 and 17 received relevant proposed sections; documents 13–16 received only limited, source-supported cross-links where assessment use intersects their scope; documents 18–19 record source limits, change map and remaining validation work. The eight prior owner-approved decisions OD-001–OD-008 remain unchanged. New decision proposals use PDA-001–005; proposed acceptance criteria use RTM-39–52; existing ADR/RTM identifiers are preserved. No implementation was verified.
