# Design system (How it works)

Tokens live in `src/styles/tokens.css`. JS breakpoint helpers live in
`src/config/breakpoints.ts`.

## Token add rule

Add a value inside `:root` when it is reused (2+ call sites).

Example (Who We Are):

```css
.sectionBlock { padding-top: 80px; }
.sectionBlock { padding-bottom: 80px; }
```

become:

```css
.sectionBlock { padding-top: var(--block-4); }
.sectionBlock { padding-bottom: var(--block-4); }
```

## How to pick a token

```
component  →  semantic / scale  →  primitive
--card-pad    --space-4            --neutral-800
```

Prefer semantic/scale tokens. Don’t use Legacy or raw hex/px.
Brand primitives (`--brand-*`) are OK for accents;
neutrals only when no semantic fits.

| Need                 | Use              | Do not use                 |
| -------------------- | ---------------- | -------------------------- |
| padding in a card    | `--space-4`      | `16px`, `--neutral-*`      |
| gap between sections | `--block-2`      | `--space-*`                |
| card background      | `--color-surface`| `--neutral-800`, raw hex   |
| text                 | `--color-text`   | `--neutral-0`              |
| corner radius        | `--radius-lg`    | `20px`                     |

## Build constraint — one `:root` block only

The build inlines the first `:root` block in `tokens.css` for first paint.
Put new tokens in that same block. Do not add a second `:root` block.
Do not put `@media` / `@supports` inside it — nested braces break the extract.

## Breakpoint rules

You cannot write `@media (max-width: var(--something))` — browsers need a
real number.

| Name    | Query                |
| ------- | -------------------- |
| Wide    | `min-width: 2000px`  |
| Desktop | `max-width: 1024px`  |
| Tablet  | `max-width: 768px`   |
| Mobile  | `max-width: 480px`   |

JS mirrors live in `src/config/breakpoints.ts`.
