# Agent Context Protocol

Updated: 2026-08-09

Shared brain for Codex, Claude Code, Hermes, and Qwenpaw on 行小之英语角.

- Facts live in docs/*.md (this folder). Treat them as the source of truth.
- Pull context via the project-brain MCP:
  list_projects -> get_project_brief / get_doc / search_brain with project=xingxiaozhi-english-corner.
- Keep durable facts here; do not rely on chat history.
- Cheapest-first: get_project_status -> search_brain -> get_doc; reach for the
  full brief / context pack only when you want the whole picture.
- Do not commit heavy assets (models, venvs, build outputs, logs, media, secrets).
- Operator identity/accounts/resources are separate global context. Query
  resolve_operator_need only when the task needs one, and obtain the returned
  policy approval before use. Never copy operator data into this project brain.
