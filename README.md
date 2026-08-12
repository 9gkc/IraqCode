# IraqCode

> **Build. Ship. Prove.**

[![Live platform](https://img.shields.io/badge/Live%20platform-GitHub%20Pages-0b5fff?logo=github)](https://9gkc.github.io/IraqCode/)
[![License: MIT](https://img.shields.io/badge/License-MIT-e9b63d.svg)](LICENSE)

**IraqCode** is an Arabic-first, bilingual programming learning platform for Iraqi learners. It connects focused concepts to checked practice, project-oriented engineering missions, and a learning record stored in the learner's browser. The platform is inspired by the momentum of modern microlearning, while maintaining an original product identity and interface.

## Live platform

Open the public platform at **[9gkc.github.io/IraqCode](https://9gkc.github.io/IraqCode/)**.

## Product principles

| Principle | How IraqCode applies it |
|---|---|
| **Arabic-first, English-native** | Arabic is the default experience with a complete English mode, RTL/LTR layout switching, and English technical terminology kept visible in context. |
| **Project-first learning** | Every path combines short lessons, code walkthroughs, conceptual checkpoints, and an outcome-oriented project mission. |
| **Evidence over empty badges** | The Skill Passport derives progress only from activities completed in the platform. It is a learning record, not a certificate or an unverified claim. |
| **Accessible by design** | Semantic controls, visible focus states, reduced-motion support, responsive layouts, and high-contrast interface states are included from the first release. |
| **Privacy-aware by default** | Progress is stored locally in the learner's browser. IraqCode v1 does not create accounts or transmit learner records. |

## Learning paths

| Path | Outcome |
|---|---|
| **Python** | Fundamentals, functions, files, object-oriented design, data formats, testing, packages, logging, and a tested study-tracker capstone. |
| **HTML & CSS** | Semantic HTML, forms, responsive layouts, accessibility, CSS architecture, performance, and a published portfolio capstone. |
| **JavaScript** | Language fundamentals, DOM, state, browser storage, async code, modules, tests, performance, and a learning-dashboard capstone. |
| **Git & GitHub** | Local workflow, branches, pull requests, conflict resolution, reviews, releases, GitHub Actions, security hygiene, and a review-ready repository capstone. |
| **SQL & Databases** | Queries, joins, constraints, schema design, indexes, transactions, least privilege, migrations, and a progress-database capstone. |

Each learning path now contains **20 sequenced lessons** across four visible stages: Foundations, Core Skills, Applied Practice, and Professional Practice. The complete curriculum contains **100 bilingual lessons**, with learning objectives, code walkthroughs, four-option knowledge checks, safe practice directions, and a capstone brief per path. Project Studio extends the curriculum with bounded engineering missions designed to encourage a public, reviewable portfolio without fabricating outcomes.

## Interface areas

| Area | Learner experience |
|---|---|
| **Learning Dashboard** | Overall progress, XP, daily streak, active path, and a direct route to the next lesson. |
| **Learning Paths** | Path tabs, sequential lessons, code walkthroughs, concept cards, feedback-driven questions, and local completion recording. |
| **Project Studio** | Focused missions that model planning, building, testing, and publishing a small project. |
| **Skill Passport** | A transparent learning record showing only skills derived from completed activities. |

## Technology

IraqCode is a static React and TypeScript application built with Vite. GitHub Pages hosts the public experience, while Vitest verifies progress calculations and curriculum integrity.

```text
React 19 + TypeScript + Vite + Vitest + GitHub Pages
```

## Local development

```bash
pnpm install
pnpm dev
```

Run quality checks before a contribution:

```bash
pnpm test
pnpm lint
pnpm build
```

Vite is configured with the `/IraqCode/` base path so the production build works correctly on this project’s GitHub Pages URL.

## Repository governance

Please read [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and [SECURITY.md](SECURITY.md) before opening an issue or contributing. This project is released under the [MIT License](LICENSE).

## Status and roadmap

The current public release focuses on a complete, inspectable static learning experience. Future iterations may add opt-in accounts, persistence across devices, code execution services designed with strict resource limits, educator workflows, and richer contributor curriculum packs. Those capabilities are intentionally not represented as already available in the present version.
