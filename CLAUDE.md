# AI-leerpad Arcadia Scholen — Claude Code context

This is an Astro site hosting a digital AI learning path for the students of
the four Arcadia Scholen schools. Students work through it at home, on a
laptop, on **Tuesday 10 November 2026**, and after that it grows into a
continuing AI curriculum. Students pick one module (± 70 minutes) built from
short, slide-like steps with questions at the centre; submission goes
through a single Smartschool form, not through this site.

## Before doing anything, read

- `docs/BRIEFING.md` — the specification: goals, the student's route,
  modules and their metadata, the step format, AI use and the AI-barometer,
  tech stack, performance budget, styling, planning and open decisions.
- `docs/DESIGN.md` — for anything visible: the design-system tokens and
  what each is for, the visual rules, fonts and logo.

## Sources and precedence

The working group's documents live in Teams, not in this repo. Where they
disagree, **the minutes of the meeting of 23 October 2026 win** over the
preparatory note and the conceptnota of 6 October. Decisions recorded in
`docs/BRIEFING.md` after that win in turn. When a choice isn't covered,
ask; don't fall back on the conceptnota.

## This repo is public

No meeting minutes, no names of colleagues or students, no internal
arrangements (sanctions, follow-up of individual students). Decisions go in
`docs/BRIEFING.md` in neutral wording. The site processes **no personal
data**: no backend, no login, no analytics, no cookies. Progress and answers
stay in the student's browser (`localStorage`).

## Skills available

Project-specific skills live in `.claude/skills/`:

- **`create-issues`** — the way work is *filed* here. Turns an observation,
  a wish or a list of proposals into GitHub issues that `work-issues` can
  work without the conversation history. One checkpoint (the list), fixed
  body blocks, placeholders for forward references. Invoke as
  `/create-issues`.
- **`work-issues`** — the way work starts here. Works GitHub issues one at
  a time: issue → branch → work with checkpoints → build gate → PR → merge →
  live site. Invoke as `/work-issues` with issue numbers, a `--label`
  filter, or empty.

## Werkstroom

- All substantive work goes through a GitHub issue and a pull request.
  New work starts with `/create-issues`, and is worked with
  `/work-issues <nummers>`.
- **`/work-batch` in this project means `/work-issues`.**
- Labels pick the working method and the branch name
  (`<label>/issue-<N>-<slug>`): `site`, `module`, `component`, `design`,
  `redactie`. The status label `wacht` marks issues waiting on content or a
  decision from outside the repo; `work-issues` skips them.
- Gates: `npx astro check`, `npm run build`, and a render check in
  `npm run dev` at a **1366 × 768** viewport. There is no test suite.
- A merge to `main` deploys to GitHub Pages. **Freeze: no merges to `main`
  from 9 November 2026 18:00 until the end of 10 November.**

## Key conventions

- **Language:** Dutch for content, URLs, docs and user-facing strings;
  English for code identifiers, variable names and code comments.
- **Laptop first.** Every step fits on 1366 × 768 without scrolling. Not
  designed for phones.
- **No CSS framework.** Pure CSS. Never hardcode hex values or font strings
  in components; always use the design-system tokens in
  `src/styles/tokens.css` (`var(--ink)`, `var(--surface)`, `var(--space-4)`,
  …). See `docs/DESIGN.md`.
- **Modules** are one MDX file each in `src/content/modules/`, with steps as
  `<Stap>` blocks. Schema in `src/content.config.ts`, strict (`.strict()`),
  so a typo in frontmatter is an error, not a silently dropped field.
- **Colleagues' content** arrives in any form and is integrated here. Keep
  the author's didactic intent; never silently drop a question or exercise
  they provided.
- **AI-barometer colours** (red, orange, yellow, green) are reserved for the
  barometer's meaning. No barometer level per assignment; each module states
  at its start whether the student uses AI (`aiGebruik`).
- **No video files in the repo.** Embed from YouTube or Stream. Keep a full
  module under ~3 MB transfer.
- **TypeScript strict mode** across all `.astro` and `.ts` files.

## Scope

Default working scope is `src/`, `docs/`, `public/`, `.github/`,
`.claude/skills/` and root-level config files. Do not read or scan
`node_modules/`, `dist/`, `.astro/` or `.git/` unless asked.

Related project with the same conventions:
`C:\Users\yvan\Github\cursus-esthetica` (Astro, tokens, workflows,
React-island pattern). Borrow from it rather than reinventing.

## Style of work

The project owner is a teacher and a software developer. Be technically
precise, explicit about trade-offs, and willing to push back when an
approach has flaws. Don't pad explanations with basics. The deadline is
hard: prefer a working first version that is published early and improved
step by step over a complete design that arrives late.
