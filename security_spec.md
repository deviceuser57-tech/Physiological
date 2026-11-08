# Security Specification - PsychoContext

## Data Invariants
1. **Ownership**: Every `Patient` and `Visit` document must have an `ownerId` field that strictly matches the `request.auth.uid`.
2. **Relational Integrity**: A `Visit` must point to a `patientId` that exists in the `patients` collection and is owned by the same user.
3. **Immutability**: `createdAt` and `ownerId` must never change after creation.
4. **Validation**: All strings must be bounded in size.

## The Dirty Dozen (Attack Payloads)
1. **ID Spoofing**: `create` a patient with `ownerId: "attacker_uid"`.
2. **Cross-Doctor Leak**: `list` patients without filtering by `ownerId`.
3. **Data Poisoning**: `create` a patient with a 1MB `name` string.
4. **Orphaned Visit**: `create` a visit for a non-existent `patientId`.
5. **Timestamp Manipulation**: `create` a visit with a client-side `timestamp`.
6. **Shadow Field Injection**: `update` a patient with an unlisted field `isVerified: true`.
7. **Identity Theft**: `get` a patient document belonging to another doctor.
8. **Bulk Deletion**: `delete` a patient without being the owner.
9. **Schema Bypass**: `create` a patient missing the `age` field.
10. **Role Escalation**: Attempt to `update` a patient's `ownerId`.
11. **PII Scraping**: Perform a `list` query on all patients across the database.
12. **Visit Hijacking**: `create` a visit for a patient owned by someone else.
