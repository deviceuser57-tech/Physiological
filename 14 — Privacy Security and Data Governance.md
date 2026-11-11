# PsychoContext V8 — Privacy, Security and Data Governance

**Version:** 2.0-proposed | **Status:** Control framework for legal/privacy review; not compliance certification

## 1. Data domains and separation

Classify direct identifiers, clinical records, assessment responses/results, applicant-program records, audio/transcripts, AI prompts/outputs, CBDNA observations/derivations, clinician working drafts, research candidates, approved research findings, evidence sources, institutional aggregates, audit/security logs and public content. Each has purpose, controller/owner, access, retention and export rules. Clinical patient memory must not be generally retrievable by other patients, programs or research users. Applicant-program records are separated from clinical records and admissions bodies; no default individual sharing.

## 2. Data minimization and consent

Collect only data necessary to an approved purpose. National ID, precise location/neighborhood, audio and sensitive context are off by default. Consent is purpose-specific for care, assessment, speech, external AI, applicant program, research reuse and communications. Record consent version/time/scope and processing linkage. Revocation rules distinguish future use from lawful record retention; explain limits transparently. Consent does not itself grant instrument copyright or eliminate legal duties.

## 3. Security controls

Backend authorization on every request; least privilege; tenant/service isolation; credential verification; MFA privileged users; encryption in transit/at rest; key rotation/secrets manager; short-lived signed object access; protected append-only audit; access review; export restrictions; rate limits; secure development and dependency scanning; production/demo separation; synthetic demo data; tested backups/restores; incident response. Never store clinical data in browser localStorage. Minimize sensitive logs.

## 4. CBDNA and research data controls

CBDNA feature records carry pseudonymous IDs, purpose and provenance. Patient-level source remains in authorized clinical store. Candidate pattern extraction does not authorize research reuse. Governed pipeline requires protocol, appropriate legal basis/consent, ethics review where applicable, de-identification and re-identification assessment, access approval, retention and publication policy. Preserve linkage only where legally/ethically permitted and tightly controlled. No automatic model training or generalization from individual case.

## 5. AI/RAG provider governance

Before external transmission assess contract, subprocessor, region/residency, retention, training use, deletion, security, incident response and permitted data classes. Data minimization/redaction and explicit purpose check in AI gateway. Log model/prompt/retrieval version without unnecessarily retaining prompt content. RAG authorization filters before retrieval; separate evidence search from patient-specific memory; test cross-patient leakage and prompt injection. No “RAG 5” standard claim; work under the Advanced Adaptive RAG name.

## 6. Speech/audio

Audio disabled by default in initial release recommendation. Any future use needs separate consent, purpose, processor review, access, retention/deletion, transcript correction and alternative non-audio path. Do not infer acoustic properties from transcript text. Provide recording indicator and failure state.

## 7. Minors, vulnerable populations and legal review

Do not launch minor data processing until applicable jurisdictional rules, guardian consent/assent, confidentiality, safeguarding, referral, retention and emergency responsibilities are reviewed by qualified counsel and clinical specialists. The applicant program’s user age/eligibility must be explicitly governed; do not assume adult status from intended audience.

## 8. Retention, access rights and incidents

Set retention/deletion/correction/export schedules by data class; include backups, derived CBDNA features, AI provider copies and audit events. Define legal hold, user requests, revocation and breach response with jurisdiction counsel. Access and research exports logged. De-identification must assess quasi-identifiers and small-cell disclosures, not only direct names.

## 9. Release gates

Resolve ADR-011–014 and 017; complete threat model, data map, provider review, role tests, incident plan, restore test and legal/privacy assessment. No compliance claim without control-to-evidence review.

## Proposed assessment-record privacy additions (pending approval)

Consent and access controls for assessment responses, scores, source excerpts, recommendation rationale, clinician reports and version/change lineage must be purpose-limited. Retention, deletion, export and correction rules must cover these linked artifacts and must not turn consent for service delivery into permission for unrelated research or cross-institution sharing. Exact operational rules remain subject to jurisdictional review and ADRs.
