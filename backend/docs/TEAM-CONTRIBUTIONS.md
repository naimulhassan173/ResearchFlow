# ResearchFlow: team contributions and defense preparation

## Agreed scope

The four-member team is completing the full ResearchFlow backend for the midterm in this chat. The frontend will be built in the final term. The accounts, authentication and profiles foundation is the first phase, not the complete backend.

Defense preparation is part of finishing the project. Each member should understand the overall system and be able to explain, demonstrate and make a small change to their own work.

## Team roster

The team confirmed these names and student IDs. Individual responsibilities and actual contributions still need to be recorded as the work progresses.

| Member | Name | Student ID | Agreed responsibilities | Reviewed and demonstrated |
| --- | --- | --- | --- | --- |
| 1 | Naimul Hassan | 23-54173-3 | Awaiting agreement | Pending |
| 2 | Md. Tahmid Abtahee | 23-53060-3 | Awaiting agreement | Pending |
| 3 | Jannatul Ferdoush Mayesha | 23-53088-3 | Awaiting agreement | Pending |
| 4 | Amrin Shahwar | 23-53045-3 | Awaiting agreement | Pending |

## Confirmed starting point

| Work | Known contribution | Evidence and current status |
| --- | --- | --- |
| Supplied backend starter | An unnamed groupmate supplied the ZIP. Confirm her name and which parts she authored or adapted. | Supplied source includes account/profile modules, entities and two migrations. Receiving a ZIP alone does not establish authorship of every file. |
| Phase-one implementation | Built with assistant support using that starter. Individual team implementation, review and testing contributions are not yet recorded. | Authentication, ownership checks, validation, a third migration, setup scripts and Postman collection prepared. 38 HTTP/validation tests passed with repository doubles; TypeScript, lint and Swagger checks passed. |
| Installation into the selected project folder | The team member operating this PC ran the installer. Name awaiting confirmation. | Terminal screenshot shows successful installation and creation of a backup. |
| Development database connection and Phase 1 migrations | The member operating this PC configured PostgreSQL and ran migrations; name awaiting confirmation. | User screenshots confirm all three Phase 1 migrations completed. Postman screenshots confirm registration, login, profile edits, tags, links and directory filtering. User reported the validation and permission demonstrations completed. |
| Coordinator and supervisor setup | The member operating this PC ran bootstrap and Postman role assignment; name awaiting confirmation. | Screenshots confirm coordinator creation/login, supervisor promotion and profile update. A subsequent development build completed successfully. |
| Phase 2 research groups | Prepared with assistant support; individual review ownership pending. The member operating this PC completed the Postman walkthrough. | User screenshots confirm a created group, accepted invitation and two persisted members. User reported completion through request 14, including permission/validation checks. All 25 group integration tests passed in the isolated database. |
| Phase 3 projects and limited summaries | Prepared with assistant support; the PC operator ran the migration and Postman workflow. Individual review ownership remains pending. | User confirmed fifth migration and returned a saved project draft. Reported completing viewing/privacy checks through request 10, then requested the next feature. Manual requests 11–14 have not been separately confirmed. All 14 project PostgreSQL tests passed. Fixtures use groupmate names only, not contribution credit. |
| Phase 4 research opportunities | Prepared with assistant support; PC operator installed and tested the collection. Individual team review remains pending. | User reported all 14 Postman responses matched, including opening/closing, filters and permission validation. All 12 opportunity PostgreSQL tests passed. |
| Phase 5 mutual selection and consent | Prepared with assistant support; PC operator reported the main Postman walkthrough matched expected results. Individual review ownership pending. | Main application/offer/confirmation and permission/capacity requests verified by user report. Optional coordinator and end/invitation folders have not been separately confirmed. All 18 selection PostgreSQL tests passed. |
| Phase 6 private submissions and reviews | Prepared with assistant support; PC operator verified the Postman walkthrough. Individual review ownership pending. | User returned saved two-file v1 and reported all requests matched, including denied downloads, v1 feedback, v2 and approval. Sample filenames use groupmate names for illustration only. |
| Phase 7 milestones and progress | Prepared with assistant support; PC operator reported all Postman responses matched. Individual team review remains pending. | User confirmed the full two-task plan/evidence/approval walkthrough, including 50% progress and rejected completed-task edits. Four milestone integration cases passed. |
| Phase 8 coordinator support | Prepared with assistant support; PC operator reported all Postman responses matched. Individual review ownership pending. | User verified case creation, advice, leader responses, resolution and history after correcting collection IDs and answering pending suggestions. Seven support integration cases passed. |

| Phase 9 dashboards and private alerts | Prepared with assistant support; local installation and team manual verification pending. | Eleventh migration, scoped role summaries, private read controls, generic activity notices and deadline deduplication prepared. Six new PostgreSQL integration cases cover role scope and inbox privacy. |

Record shared implementation, debugging and reviews as shared work. Assigning a module for future work does not change who wrote existing code.

## Contribution log for the rest of the project

Add a row after each completed piece of work. Record actual work as it happens rather than reconstructing it before the defense.

| Module or feature | Implemented or adapted by | Reviewed by | Tested by | Files and commit | Demonstration and result |
| --- | --- | --- | --- | --- | --- |
| Awaiting the team's first confirmed entry | | | | | |

## Learning after each module

1. Explain the feature's purpose in plain language.
2. Trace one request through the controller, guards, DTO validation, service, repository and database. Guards run before controller execution; DTO pipes validate before the handler runs.
3. Point to the files that implement the behavior and the migration that creates the relevant tables or constraints.
4. Demonstrate a successful request, invalid input and an unauthorized action in Postman where applicable.
5. Explain one important decision, such as why a transaction, foreign key or ownership check is needed.
6. Have the responsible member explain it back and make a small change independently.

## Final defense preparation

Before calling the backend finished, prepare and practice:

- A simple explanation of the project problem, three roles and major workflows.
- A database walkthrough covering relationships, constraints and migrations.
- An accurate member-by-member account of implementation, adaptation, review and testing, using the contribution log and commits.
- A repeatable Postman demonstration using sample accounts for the three roles.
- Questions about NestJS modules, controllers, services, DTOs, validation, TypeORM, transactions, authentication and authorization.
- Questions specific to supervision confirmation, per-student capacity, document access grants, submission versions and approved-milestone progress once implemented.
- A mock defense where each member explains their work, answers follow-up questions and diagnoses a small API issue.

Only demonstrate features that have actually been implemented and verified. Keep unfinished work and future frontend work clearly identified.
