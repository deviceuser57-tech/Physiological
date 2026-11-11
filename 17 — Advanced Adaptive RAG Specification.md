# PsychoContext V8 — Advanced Adaptive RAG Specification

**Version:** 1.0-proposed | **Working name owner-approved; “RAG 5” is not claimed as an official standardized version**

## 1. Purpose and design rule

PsychoContext Advanced Adaptive RAG Architecture retrieves authorized evidence for bounded tasks. It is not a clinical authority and does not create validated knowledge by retrieval. Select methods only when measured benefit justifies added privacy, cost, latency and maintenance. Clinical evidence retrieval and patient-specific memory search are separated; cross-patient retrieval is prohibited by default.

## 2. Sources and authority

Admit curated, rights-reviewed, versioned sources with source owner, jurisdiction, language, evidence authority, population, publication/effective dates, permitted use, approval, sensitivity and expiry/review date. Uploaded content is not trusted merely because it is uploaded or hosted on Google Drive. Retain original document hashes, source links and parsing lineage. Restricted instrument items are excluded unless specifically authorized.

## 3. Ingestion pipeline

`Source registration → rights/access check → malware/file validation → parsing/OCR (if permitted) → structure and metadata extraction → human quality review → chunking preserving headings/tables/citations → sensitivity/access labels → sparse index → dense embedding (model/version recorded) → optional entity/knowledge graph links → evaluation → staged publication`.

Parsing confidence, document version, page/section location, language/dialect, citation markers and errors are stored. Human review gates clinical sources. Indexing and deletion propagate to derived chunks, embeddings, caches and replicas.

## 4. Retrieval pipeline

1. Authenticate user and purpose; enforce tenant/service/record permissions before retrieval.
2. Classify query intent (clinical evidence, instrument metadata, program content, patient-specific record) without silently broadening purpose.
3. Apply metadata filters for language, population, jurisdiction, effective version, authority, rights and sensitivity.
4. Optional query rewriting/expansion; retain original query and log transformed query safely.
5. Sparse lexical retrieval; optional dense semantic retrieval; combine with evaluated hybrid method.
6. Deduplicate and rerank with version and authority signals.
7. Apply coverage/quality thresholds and risk-sensitive abstention.
8. Assemble bounded context preserving source spans, dates, limitations and contradictions.
9. Generate structured answer with source IDs/locations; validate citations and unsupported claims.
10. Apply policy/safety checks; label uncertainty and human-review state; audit retrieval trace.

No answer should present a source summary as diagnosis. Patient memory route is a distinct authorized workflow and cannot retrieve another patient’s data.

## 5. Evaluate candidate techniques selectively

| Technique | Benefit hypothesis | Evaluation and adoption condition |
|---|---|---|
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
