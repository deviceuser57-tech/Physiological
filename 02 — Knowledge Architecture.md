# PsychoContext V8 — Knowledge Architecture

**Version:** 2.0-proposed | **Status:** Reconciled target; instruments and scientific claims remain individually gated

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
