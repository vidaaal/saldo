# saldo. Interface System

## Product intent
Personal finance workspace. The main action is selecting one area to record or review money, not browsing a giant dashboard. Dark, tactile, friendly, and precise; expressive motion only where it helps navigation.

## Domain
Cash flow, incoming pay, expenses, card invoices, meal allowance groceries, savings goals, portable JSON backups.

## Signature
A compact two-number financial snapshot followed by a six-destination launcher. A small pixel companion is an optional interactive accent, not a substitute for financial information.

## Palette
Canvas #171819; sidebar #1c1d1e; card #222425; border #353739; text #f2f3f0; muted #9b9fa0. Semantic money colors: income #b7ff9e; obligations #ffcb86; deficit #ff988e. Launcher tones identify modules.

## Layout and type
232px persistent sidebar on desktop; mobile horizontal module navigation. Main content max 1160px. Spacing increments based on 4/8px, larger tap areas, tabular numeric alignment. Focus snapshot first, launcher second, contextual detail inside each module.

## Motion
Tap 120ms, hover 220–280ms, entrance 440–480ms. Sprite animation uses discrete steps, with idle/wave/hop states. All nonessential motion disabled under prefers-reduced-motion. No auto-advancing dashboards.

## Data integrity
Do not invent balances, projections, or chart series. Finance data remains local to each browser with JSON backups. No password or database in this version.

## Rejected defaults
No oversized hero headline, no six KPI tiles on the overview, no generic glowing AI chat interface, no decorative fake charts.
