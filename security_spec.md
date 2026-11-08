# Security Specification: RBAC Implementation

## 1. Data Invariants
- `Users`: A user record must have `uid` and `role`. Only users with `role: 'doctor'` can write to the `users` collection for role management.
- `Patients`: Access restricted to the doctor.
- `Visits`: Access restricted to the doctor (and possibly managers, depending on the requirement, but requested: "واجهات محددة لمدير العيادة (مثل التقارير المالية والإحصائيات) وواجهات حصرية للطبيب (كافة صلاحيات التطبيق بالكامل)").

## 2. Dirty Dozen Payloads
1. User A tries to change their own role to 'doctor'.
2. Clinic Manager tries to update another user's role.
3. Anonymous user tries to list all users.
4. User tries to set their UID to someone else's.
5. User injects 2MB string into `displayName`.
6. Manager tries to read PII from `patients` collection.
7. Doctor tries to assign invalid role 'admin'.
8. User tries to create a new user with an already existing UID.
9. User tries to delete a user document.
10. Anonymous user tries to read a visit.
11. Manager tries to read all visits.
12. Doctor tries to update a `createdAt` timestamp.
