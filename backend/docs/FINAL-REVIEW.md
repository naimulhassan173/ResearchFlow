# Before submission and defense

All planned backend module areas now have implementations: accounts/profiles, groups/projects, recruitment, mutual selection and named consent, private proposal/milestone bundles, reviews/progress/activity, coordinator support, role dashboards and private in-app alerts. Frontend work remains in the final term. The Phase 9 update must still be installed and tested on the development database before final sign-off.

## Finish the local demonstration

- Run the installer and eleventh migration, then verify all three dashboard scopes and notification privacy/read controls in the Phase 9 collection.
- Run `pnpm.cmd run build` on the actual development copy after installation. Keep one server process on port 5001.
- Verify the current demo still has an active pairing, approved latest proposal, two milestones with one completed, 50% progress and a resolved support case.
- Perform both selection directions and named coordinator grant/revoke demonstrations if not yet done. These optional paths change pairing/permission state: preserve the IDs and restore the intended final pairing afterwards.
- Test an actual PDF preview/download and inspect saved version history. Uploads and database data are local and must be backed up together.
- Review all proposal requirements against routes. Clearly state implementation choices and limitations, rather than promising every possible production feature.

## GitHub handoff

Review the existing repository before staging changes. Exclude `.env`, actual passwords/tokens, node_modules, dist, logs, backup folders and private uploads. Generated Postman collections contain fake defaults and blank tokens; avoid replacing them with unsanitized exports containing real coordinator passwords. Commit source, migrations, lockfile, safe sample files, documentation and clean collections. An external push has not yet been performed by this session.

## Team explanation and honest contributions

The roster is in TEAM-CONTRIBUTIONS.md. All implementation in this chat was prepared with assistant support. Each member must review their assigned area, run its tests, explain one request, demonstrate a permission failure and make a small independent change. Record actual review, fixes and demonstrations with names and commits. Sample account names or filenames do not establish authorship.

Agree who will present accounts/groups, recruitment/selection, files/reviews, and milestones/support/dashboard integration. The proposal originally assigned Naimul accounts, profiles, membership and access, while other responsibility names were blank. Confirm the final distribution with the group before claiming individual implementation credit.

## Explain the rules

1. A controller receives the request; guards check identity/role; DTO pipes validate; services check ownership and transitions; TypeORM transactions and database constraints protect related changes.
2. An offer does not reserve student places or grant files. Leader confirmation checks the whole group and explicitly grants the named supervisor permission.
3. A coordinator receives administrative summaries by default. A separate grant is needed to inspect private files.
4. Uploads have generated private names; metadata and hashes are stored separately. Every download rechecks the current project permission.
5. Versions preserve earlier evidence and feedback. A review belongs to one version. Supervision agreement and proposal approval are different decisions.
6. Progress is approved milestones divided by the current planned total; awaiting review is separate from overdue work. With no plan, progress is not yet planned.
7. A support suggestion is advice. Accepting it does not bypass pairing, capacity or document consent.
8. Dashboards and alerts are role/user scoped and do not grant access to the objects they mention.

## Practical limits to state clearly

This is a local academic backend demonstration. It has no frontend yet, email reminders, automated recommendations, academic-system integration, malware scanner or crash-time orphan-file cleanup. File checks validate supported formats structurally. The leader uploads evidence on behalf of assigned members. Active supervision locks membership changes until the pairing ends and fresh confirmation rechecks capacity/consent. Deadline reminders run while the backend is running and catch up on the next refresh. Existing generic notification history does not override current file permissions.
