# ResearchFlow

ResearchFlow is an academic research supervision platform. The backend implements the updated proposal's accounts, profiles, groups, projects, recruitment, mutual supervision selection, private submissions, reviews, milestones, coordinator support, role dashboards and in-app alerts. The frontend is planned for the final term.

## Current status

The backend modules are implemented and covered by automated checks. The Phase 9 update still needs local installation and Postman verification before final sign-off. See [the final review checklist](backend/docs/FINAL-REVIEW.md).

Supervisor capacity limits active student places during confirmation. Named document-consent rules protect file uploads, reading, previews and downloads. A supervision agreement is separate from version-specific proposal approval.

## Start here

1. Open the `backend` folder in VS Code.
2. Follow [the backend setup guide](backend/README.md).
3. Import [the Postman collection](postman/ResearchFlow-Phase1.postman_collection.json).
4. For groups, follow [the group walkthrough](backend/docs/GROUPS.md) and import [the Phase 2 collection](postman/ResearchFlow-Phase2-Groups.postman_collection.json).
5. For projects, follow [the project walkthrough](backend/docs/PROJECTS.md) and import [the Phase 3 collection](postman/ResearchFlow-Phase3-Projects.postman_collection.json).
6. For recruitment posts, follow [the opportunity walkthrough](backend/docs/OPPORTUNITIES.md) and import [the Phase 4 collection](postman/ResearchFlow-Phase4-Opportunities.postman_collection.json).
7. For mutual selection and permission, follow [the selection walkthrough](backend/docs/SELECTION.md) and import [the Phase 5 collection](postman/ResearchFlow-Phase5-Selection.postman_collection.json).
8. For protected files, follow [the submission walkthrough](backend/docs/SUBMISSIONS.md) and import [the Phase 6 collection](postman/ResearchFlow-Phase6-Submissions.postman_collection.json). Sample demonstration files are included in `postman/samples`.
9. For milestones, follow [the milestone walkthrough](backend/docs/MILESTONES.md) and import [Phase 7](postman/ResearchFlow-Phase7-Milestones.postman_collection.json).
10. For coordinator support, follow [the support walkthrough](backend/docs/SUPPORT.md) and import [Phase 8](postman/ResearchFlow-Phase8-Support.postman_collection.json). Set the existing coordinator password privately in collection Variables.

11. For role dashboards and private alerts, follow [the dashboard guide](backend/docs/DASHBOARDS.md) and import [Phase 9](postman/ResearchFlow-Phase9-Dashboards.postman_collection.json).

Use a dedicated PostgreSQL database named `researchflow`. Tables are created by migrations; `synchronize` is disabled.

## For the supplied local starter

The installer copies this phase into the requested `AWT-Project` folder, backs up changed files, and preserves the existing `.env` and `node_modules`:

```powershell
node tools/install-local.cjs --dry-run
node tools/install-local.cjs
```

The default destination is `E:\AIUB\Fall 26-27 (sem 10)\Adv Webtech\AWT-Project`. Run the installer from your own terminal. Review the backend setup guide before starting the server.

## Verification

`pnpm.cmd test` runs 38 HTTP and validation tests with in-memory repositories. They cover authentication, password hashing, ownership, validation and roles. They do not prove PostgreSQL migrations or queries work.

A separate PostgreSQL integration suite passed all 113 tests on a disposable local database: 10 foundation/migration tests, 25 group tests, 14 project tests, 12 opportunity tests, 18 selection/access tests and 34 file/review/milestone/support/dashboard/alert tests. Together with the default suite, 151 tests passed. Checks include all eleven migrations and rollback, real queries, consent, concurrency, private files, milestone progress, support responses and coordinator boundaries. Its setup and test-database guard are documented in [the backend guide](backend/README.md). Test data and files were isolated from development data.

The original groupmate ZIP and local database credentials are not part of this repository.
