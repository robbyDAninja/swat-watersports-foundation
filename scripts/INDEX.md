**Version:** 1.1
**Last updated:** 2026-10-12

# Maintainer tools

Read the repository's CLAUDE.md and HANDOFF.md first. These tools run in the maintainer's environment; they are not served by the website.

| File | Purpose |
|---|---|
| project.mjs | SWAT project/origin/account and exact-domain guards |
| check.mjs | Read-only source, asset, syntax and private-file checks |
| deploy.mjs | Explicit SWAT deployment; requires the private account record locally, or Workers Builds authentication |
| verify-live.mjs | Read-only HTTPS draft/launch checks and optional comparison with the local source |

| Version | Date | Change |
|---|---|---|
| 1.1 | 2026-10-12 | Registered additional portable-config account/single-route refusal coverage. |
| 1.0 | 2026-10-12 | Added dependency-free maintainer checks and a scoped deployment command. |
