# PsychoContext V8 — Master Architecture

**Version:** 2.0-proposed | **Status:** Reconciled architecture proposal; decisions 1–8 reflect the owner-supplied prompt | **Date:** 9 November 2026

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
