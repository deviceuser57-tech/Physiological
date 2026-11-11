# PsychoContext V8 — Product Scope and Capability Maturity

**Version:** 2.0-proposed | **Status:** Reflects owner-approved full-vision principle; first live release slice remains open

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
|---|---|---|---|---|
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

ADR-009 remains open: choose the concrete first live journey (or synthetic prototype) without deleting other domains from the target architecture. The previous recommendation for a synthetic prototype is an option, not owner approval. Any first release must meet its maturity-specific scientific/clinical/legal/privacy/security gates.

## 5. User/service journeys

Design role-specific journeys for individual, student, adolescent, patient, employee, family, clinician, researcher, institution/program administrator and platform administrator as applicable. No user role inherently grants access to another service’s records. Separate applicant program (13) from clinical care and institutional services. Define service ownership, eligibility, consent, referrals, outcomes and support capacity for each.

## 6. Release acceptance

Maintain a capability inventory with owner, level, status, dependencies, evidence, risks and RTM IDs. UI may expose future domain roadmap, but must clearly mark unavailable/under research. No marketing wording implies an advanced or research-grade feature is validated merely because a foundational version exists. See 05/06/07/19.

## Proposed capability entry — Psychometric Governance & Adaptive Assessment (pending approval)

Track the instrument registry, version-specific approval workflow and explainable assessment recommendation service as a platform capability. Foundational maturity may catalogue measures and display approval scope; enhanced maturity may provide clinician-reviewed recommendations with overlap/burden explanations; advanced/research-grade methods require independent evaluation. No maturity level itself grants rights or scientific validity.
