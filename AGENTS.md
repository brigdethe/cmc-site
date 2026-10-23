These rules apply throughout this project.

## Response style

- Use the [i-have-adhd skill](C:/Users/Bright/.codex/skills/i-have-adhd/SKILL.md) when writing agent responses. Apply its response rules on each turn unless the user asks to stop ADHD mode or use normal responses. Also use the [caveman skill](C:\Users\Bright\.gemini\antigravity\skills\caveman\SKILL.md) at all times so your answers are terse. Apply its rules on each turn unless the user asks you to go in detail

## Git

- Never push automatically. Push only when the user explicitly requests it.
- Keep every commit message short and on a single line.
- Do not add author names, co-author attribution, sign-offs, or AI-generated signatures to commit messages. Do not add `Co-authored-by` or `Signed-off-by` trailers.

## Approval before frontend changes

- Before implementing a frontend change, state briefly what you understand the user wants and the change you intend to make.
- Submit that intent statement through an interactive choice prompt (`request_user_input_async` or an equivalent available tool) with **Approve** and **Request changes** options. Do not require the user to type an approval in chat.
- Wait for the user's submitted **Approve** choice before editing frontend files. A preselected option is not approval; an unsolicited explicit approving reply in chat also counts.
- This includes page structure, styling, components, animations, interactions, and user-facing content.
- Read-only inspection may proceed before approval. Non-frontend tasks do not require this frontend approval step.
- Once the user approves the stated scope, implement and verify it without repeatedly requesting approval for the same work.

## The sc exception

- If the user's request ends with the standalone marker `sc` (ignoring trailing whitespace), skip the intent-approval step and proceed with that request.
- `sc` waives only the frontend intent confirmation. It does not authorize a push or waive other project rules.