# PsychoContext V8 — CBDNA Data Dictionary and Entity Model

**Version:** 1.0-proposed | **Status:** Conceptual entity model; not final database schema or validated construct definition

## 1. Design principles

CBDNA is an independent engine, not a diagnosis or universal score. The model stores source-separated observations, relationships and derivations over time. It supports multi-axial many-to-many relations without implying equivalence. Every computed feature is reproducible and provenance-linked. Clinical and research use are purpose/access separated. Data structure does not certify scientific validity.

## 2. Core entities

| Entity | Required fields / meaning | Relationships and constraints |
|---|---|---|
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
