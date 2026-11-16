# ResearchFlow backend

NestJS 11, TypeORM and PostgreSQL. Phase 1 provides accounts, login, logout and research profiles. Phase 2 adds research groups, leaders and membership invitations. Phase 3 adds group projects, private drafts and published limited summaries. Phase 4 adds supervisor research opportunities, skill criteria and recruitment deadlines.

The four-member team's current-term goal is the complete backend. Frontend development is planned for the final term. Track actual contributions and practice explanations using [the team contribution and defense preparation log](docs/TEAM-CONTRIBUTIONS.md).

## 1. Open the backend

After installing into the requested project folder, open a VS Code terminal:

```powershell
Set-Location -LiteralPath 'E:\AIUB\Fall 26-27 (sem 10)\Adv Webtech\AWT-Project\backend'
```

Use Node.js 22 or later, PostgreSQL and pnpm. The supplied starter already has installed dependencies on this PC. For a fresh checkout:

```powershell
pnpm.cmd install --frozen-lockfile
```

The existing pnpm lockfile is retained. Redis is optional and is disabled by default.

## 2. Set up your local configuration

```powershell
pnpm.cmd run setup:local
```

This creates `.env` when missing and generates a random JWT secret when needed. Existing database settings are preserved. Open `.env` locally and check:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_actual_postgresql_password
DB_DATABASE=researchflow
PORT=5001
HOST=127.0.0.1
JWT_TTL=3600
ENABLE_QUEUE=false
```

Keep the generated `JWT_BEARER_SECRET`. Do not paste passwords or tokens into screenshots or commit `.env`.

## 3. Create the database and run migrations

In pgAdmin, connect using your PostgreSQL password. Right-click **Databases → Create → Database**, enter **researchflow**, and save.

Back in the backend terminal:

```powershell
pnpm.cmd run migration:run
```

Expected on a fresh database: eleven migrations complete. An existing Phase 8 database applies only the new dashboard alerts migration. They create:

- `users`, `profiles`
- `research_interests`, `skills`
- `profile_research_interests`, `profile_skills`
- `work_links`
- `research_groups`, `group_members`, `group_invitations`
- `projects`, `project_research_interests`
- `opportunities`, `opportunity_research_interests`, `opportunity_required_skills`, `opportunity_preferred_skills`
- `selection_requests`, `supervisions`, `access_grants`, `activity_events`
- `submissions`, `reviews`, `files`
- `milestones`, with milestone evidence linked to submissions
- `support_cases`, `suggestions`
- `notifications`, with private recipient indexes and workflow alert triggers

TypeORM also creates its migration tracking table. Refresh **Schemas → public → Tables** in pgAdmin.

Use a dedicated fresh database for this project. Existing inconsistent rows can prevent the new uniqueness or check constraints from being added; the migration never deletes or repairs your existing data automatically. Automatic schema synchronization stays disabled.

## 4. Start and test

```powershell
pnpm.cmd run start:dev
```

Open:

- Health: http://127.0.0.1:5001/health
- Swagger: http://127.0.0.1:5001/api

In Postman, import `../postman/ResearchFlow-Phase1.postman_collection.json`. Open its collection variables and set a new `email`, a strong `password`, and `fullName`. Run requests in order. Register stores `userId`; login stores `accessToken` automatically. Use a new email when registering again, or skip registration and log in to the existing account.

The collection demonstrates:

1. Register → **201**.
2. Login → **200**, store Bearer token.
3. Read your account, edit your profile and save tags/work links.
4. Read the directory and filter by research interest.
5. Invalid required field → **400**.
6. Missing authentication → **401**.
7. Edit another profile or assign your own role → **403**.
8. Logout → **200**, reuse old token → **401**.

Public registration creates students only. Supervisors and coordinators cannot assign themselves those roles through registration.

For Phase 2, import the separate `../postman/ResearchFlow-Phase2-Groups.postman_collection.json` collection and follow [the group walkthrough and defense guide](docs/GROUPS.md). Stop the server and run migrations before starting the updated backend.

For Phase 3, import `../postman/ResearchFlow-Phase3-Projects.postman_collection.json` and follow [the project summary walkthrough](docs/PROJECTS.md). Keep the active Phase 2 group and use its current leader. A project's summary is private until the leader publishes it; publication does not confirm supervision or grant full-document access.

For Phase 4, import `../postman/ResearchFlow-Phase4-Opportunities.postman_collection.json` and follow [the supervisor opportunity walkthrough](docs/OPPORTUNITIES.md). Use the supervisor account already promoted by the coordinator. The post starts as a private draft; opening it publishes recruitment details, without confirming supervision or reserving places.

For Phase 5, import `../postman/ResearchFlow-Phase5-Selection.postman_collection.json` and follow [the selection, capacity and consent guide](docs/SELECTION.md). Keep the published project and open post. A supervisor offer requires leader confirmation with explicit sharing consent. Optional `SELECTION_RESPONSE_HOURS` configures response deadlines (default 168 hours). No `.env` changes are needed to use that default.

For Phase 6, keep the pairing active, import `../postman/ResearchFlow-Phase6-Submissions.postman_collection.json` and follow [the private submissions and review guide](docs/SUBMISSIONS.md). Sample PDFs and CSVs are in `../postman/samples`. Check Postman's file picker on multipart requests. Default limits are five files and five MiB each; the private directory defaults to `uploads/private` and is never publicly served. No `.env` changes or new dependencies are needed.

For Phase 9, import `../postman/ResearchFlow-Phase9-Dashboards.postman_collection.json` and follow [the dashboard and alerts guide](docs/DASHBOARDS.md). Set your existing coordinator password privately in collection Variables. The background deadline interval is enabled by default; optional `ENABLE_DEADLINE_ALERTS=false` disables the interval. Review [the final checklist](docs/FINAL-REVIEW.md) before submission.

## Endpoints

All endpoints below need `Authorization: Bearer <accessToken>` except registration, login, root and health.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | /accounts | Register a student and create a profile |
| POST | /auth/login | Verify password and issue a JWT |
| GET | /auth/me | Read the signed-in account |
| POST | /auth/logout | Revoke all current tokens for this account |
| PATCH | /accounts/:id/role | Coordinator assigns a role; target must log in again |
| GET | /profiles | Paginated student/supervisor directory |
| GET | /profiles/:userId | Read a research profile |
| PATCH | /profiles/:userId | Edit your own bio and role-specific fields |
| POST | /profiles/:userId/tags | Add interests/skills |
| PATCH | /profiles/:userId/tags | Replace supplied interest/skill arrays; [] clears |
| POST | /profiles/:userId/work-links | Add a portfolio or publication link |
| PATCH | /profiles/:userId/work-links/:workLinkId | Edit your work link |
| DELETE | /profiles/:userId/work-links/:workLinkId | Delete your work link |

Directory filters: `role=student|supervisor`, `researchInterest=artificial intelligence`, `skill=python`, `seekingSupervisor=true|false`, `page=1`, `limit=20` (maximum 100). Interests and skills are canonical lowercase names.

Student profile body example:

```json
{"bio":"Interested in artificial intelligence","seekingSupervisor":true}
```

Supervisor profile body example:

```json
{"bio":"NLP researcher","availability":"Open for requests","capacity":5}
```

## First coordinator and supervisor setup

The first coordinator is created from the local command line, not public registration.

1. In your local `.env`, set `COORDINATOR_NAME`, `COORDINATOR_EMAIL` (an unused email) and a strong `COORDINATOR_PASSWORD`.
2. Run `pnpm.cmd run bootstrap:coordinator`.
3. Remove `COORDINATOR_PASSWORD` from `.env` afterwards.
4. Log in through `POST /auth/login` using this coordinator account.
5. Register the intended supervisor as a student. Copy its returned user ID.
6. With the **coordinator token**, send `PATCH /accounts/<supervisor-user-id>/role` and body `{"role":"supervisor"}`.
7. The promoted account logs in again and can update its own availability and capacity.

A coordinator cannot change their own role or edit someone else's profile. Coordinators will not receive automatic full research document access in later phases.

## Checks

```powershell
pnpm.cmd test
pnpm.cmd run build
```

The default suite has 38 tests using real Nest HTTP routing, DTO validation, Argon2, JWT verification and repository doubles. PostgreSQL and Redis are not needed for these tests.

The PostgreSQL integration suite has 113 tests covering migrations, joins, validation, authentication, groups, projects, recruitment, selection, capacity races, consent, private files, proposal/milestone evidence, progress, coordinator support, role dashboards and private alerts. It **rolls back and recreates all domain tables** in the selected test database. The file suite creates and removes its own temporary upload directory. Run it only against a new empty disposable database:

```powershell
# First create an EMPTY database named researchflow_test_local in pgAdmin.
$env:RF_POSTGRES_TEST='1'
$env:DB_HOST='127.0.0.1'
$env:DB_PORT='5432'
$env:DB_USER='postgres'
$env:DB_DATABASE='researchflow_test_local'
# Set DB_PASSWORD privately in this terminal to your local password.
pnpm.cmd run test:postgres
Remove-Item Env:RF_POSTGRES_TEST,Env:DB_HOST,Env:DB_PORT,Env:DB_USER,Env:DB_DATABASE
# Also clear DB_PASSWORD from this terminal afterwards.
```

The runner refuses normal database names and non-local hosts. All 113 PostgreSQL integration tests passed on an isolated disposable local database, including rollback and reapplication of all eleven migrations. To update your development database, use `pnpm.cmd run migration:run` and test the normal API in Postman.

Production build:

```powershell
pnpm.cmd run build
pnpm.cmd run start:prod
```

## Files to understand first

| File | Responsibility |
| --- | --- |
| src/main.ts | Starts Nest, enables validation, CORS and Swagger |
| src/app.module.ts | Registers database, modules and global guards |
| src/modules/accounts | Registration, password hashing and coordinator role changes |
| src/modules/auth | Login, JWT verification and logout |
| src/modules/profiles | Profiles, directory filters, tags and work links |
| src/modules/groups | Research groups, leader permissions and membership invitations |
| src/modules/projects | Group projects, summary visibility and research-tag filters |
| src/modules/opportunities | Supervisor recruitment posts, criteria, filters and deadlines |
| src/modules/selection | Applications, invitations, pairing confirmation, student places, consent and selection activity |
| src/modules/submissions | Private proposal bundles, version history, protected file routes, reviews and feedback files |
| src/modules/milestones | Task planning, ownership, deadlines, evidence and approved progress; see docs/MILESTONES.md and Phase 7 Postman collection |
| src/modules/support | Coordinator cases, alternatives, leader responses and resolution; see docs/SUPPORT.md and Phase 8 Postman collection |
| src/modules/dashboard | Role summaries, private notifications, read controls and deadline refresh |
| src/modules/*/dto | Request validation rules |
| src/modules/*/entities | Database field and relationship definitions |
| src/database/migrations | Versioned database changes |
| src/script/bootstrap-coordinator.ts | Local first-coordinator setup |

## Current limits

The frontend is planned for the final term. Role dashboards and in-app notifications are backend JSON endpoints; email delivery is not implemented. Coordinator alternatives record advice and responses, never force a pairing or document grant. Projects hold a limited summary; private submissions hold proposal/milestone evidence. Leaders upload evidence on behalf of assigned members. No public upload directory exists. Active supervision locks membership changes until fresh confirmation rechecks capacity and consent. File checks are structural validation rather than antivirus scanning. Back up files with the database; crash-time orphan cleanup is not implemented.

JWTs expire after the configured TTL. Logout revokes all tokens for that account, including other devices. Password reset, email verification and account invitation onboarding are not implemented yet. Group membership invitations are implemented.
