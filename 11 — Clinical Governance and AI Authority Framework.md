# PsychoContext V8 — Clinical Governance and AI Authority Framework

**Version:** 2.0-proposed | **Status:** Owner-approved clinician authority principle; operational framework for specialist review

## 1. Foundational rule

**AI is advisory. The qualified clinician is authoritative for all clinical diagnostic and therapeutic decisions.** This owner-approved rule is architectural, not disclaimer-only. Enforce in system architecture, roles, data models, API contracts, UI, workflows, AI orchestration, audit and acceptance testing. CBDNA is a core engine but not a clinical decision-maker.

## 2. AI permitted and prohibited actions

AI may produce preliminary hypotheses, retrieve/summarize evidence, suggest assessments, identify candidate patterns/discrepancies, provide contextual insights and explain possible options with limitations. AI must never make final diagnosis/treatment, override clinician, present hypothesis as approved conclusion, modify validated scoring, autonomously initiate/change treatment or independently determine safety disposition/referral. A model confidence value is not authority.

## 3. Clinical states and attribution

Separate patient report, observed behavior, measure results, clinician interpretation, AI hypothesis, CBDNA-derived candidate, and approved clinician conclusion. Store source/model/prompt/version/retrieval evidence, author, timestamps, review state and amendment lineage. Clinician can accept/edit/reject/defer with reason; original AI content stays distinguishable. Only authenticated, appropriately credentialed clinician may create final clinical decisions. Signature semantics require local legal review.

## 4. Workflow responsibilities

Registration/consent → intake → source-grounded extraction → clinician verification → clinician-selected measures (AI suggestions optional) → authorized administration/scoring → clinician review → clinician formulation/diagnosis → optional AI comparison → clinician-owned treatment plan → follow-up/outcomes. Each transition enforces roles and audit. CBDNA may organize longitudinal evidence at approved maturity but does not convert observations into clinical facts or alter measures.

## 5. Safety and escalation

Named human clinical-safety owner, responder coverage, location-specific verified resources, escalation path for unavailable responder, privacy notice, documentation, audit, incident review and tabletop validation are prerequisites for live safety workflows. AI/CBDNA/RAG cannot independently raise/lower/close risk or trigger treatment/referral. Safety protocol remains operational during AI/CBDNA outage; no invented contacts, unstaffed monitoring claim, or model-only fallback risk determination. See RTM-14/28 and 13.

## 6. CBDNA-specific safeguards

Before any clinician view: label CBDNA as a developing representation; show source type, context, time, uncertainty, reviewer, version and lineage. No universal “DNA” score, identity badge, rank, prognosis or pathology inference. Do not infer persistent traits from one observation. Incompatible measures/timeframes must be separated or visibly marked non-comparable. Patient correction/disagreement is preserved. A CBDNA feature does not enter an approved formulation without clinician review.

## 7. Governance roles

Before clinical deployment appoint clinical lead, credentialing authority, instrument reviewer, safety lead, clinical content reviewer, incident lead, privacy/security owner and operational service owner. Define delegation, access review, break-glass, complaint handling and scope-of-practice controls. Researchers do not receive care access by default; admins do not acquire clinical authority.

## 8. AI system controls and evaluation

Central AI gateway: provider/model/prompt version, purpose and consent check, data minimization, structured output validation, citation/source attribution, uncertainty/abstention, human review, audit and safe failure. Evaluate automation bias, prompt injection, contradiction, missingness, Arabic/dialect quality, subgroup impact, unsupported claims, error handling and provider outage. Monitor changes before deployment. Agreement with clinician is not ground truth or efficacy.

## 9. Incident and quality system

Define severity, containment, investigation, notification, root cause, corrective action, model/knowledge suspension and record impact. Review near misses and complaints. Any suspected unsafe AI or CBDNA output triggers human review and potential feature suspension. Preserve audit evidence under approved retention policy.

## 10. Release gates

No clinical live use until named clinician/operator, credentialing, workflow, consent, approved measures, legal/privacy review, safety staffing, verified local resources, tested escalation, audit/access controls, backup/restore, AI provider governance and acceptance tests are documented. Relevant ADRs: 005, 010–014, 017. See 07, 13, 14, 18 and 19.

## Proposed clinical workflow/report/safety refinement (pending approval)

Keep screening, assessment/measurement and diagnosis distinct in authorization, data models, UI and workflow. Safety operations have three separate stages: (1) identification of possible indicators; (2) qualified human assessment; (3) operational escalation/referral using an approved, location-appropriate protocol and accountable service owner. No score or automated indicator is a final safety decision. Local operating resources and coverage must be verified; general external guidance alone does not define Egypt-specific operations.

A clinician report should preserve, as distinct attributable sections: original complaint; AI-extracted candidate information; clinician-verified facts; measures suggested and reasons; measures actually selected by clinician; original results per exact version; context; AI hypotheses and their evidence; clinician’s independent opinion; disagreements; final decision, author and date. Corrections and amendments are traceable. The qualified clinician remains authoritative.
