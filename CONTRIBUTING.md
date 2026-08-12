# Contributing to IraqCode

Thank you for improving IraqCode. Contributions should preserve its Arabic-first bilingual experience, project-oriented learning design, and learner privacy.

## Before you begin

Create an issue or start a discussion for substantial curriculum, product, or visual changes. Keep pull requests focused, explain the learner outcome, and avoid combining unrelated refactors with content changes.

## Quality requirements

Run the following commands before submitting a pull request:

```bash
pnpm test
pnpm lint
pnpm build
```

New lessons must include clear Arabic and English copy, executable-looking code that is technically coherent, four purposeful answer choices, a valid answer index, and a short explanation for feedback. Do not present a learner activity, certificate, skill, employer relationship, or achievement as verified unless the platform can substantiate it.

## Accessibility and language

Use semantic HTML, visible focus states, responsive layouts, and language that works in both RTL and LTR contexts. Keep code identifiers and API names in their canonical technical form; translate the explanation around them, not the code itself.

## Respectful collaboration

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). Report security concerns privately as described in [SECURITY.md](SECURITY.md).
