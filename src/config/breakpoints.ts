/**
 * The four viewport categories, for the JS side of the design system.
 *
 * Custom properties cannot be used inside `@media`, so CSS cannot import
 * these — the values are restated in the Breakpoints block of
 * `src/styles/tokens.css`. Change both together.
 *
 * Prefer not to reach for these at all. A grid that stacks with `auto-fit`,
 * or a row that wraps with `flex-wrap`, responds to the space it actually has
 * and keeps working inside a container nobody has thought of yet. Branching
 * on viewport width in JS additionally costs a resize listener and a render,
 * and is wrong until the first one fires.
 *
 * The map is module-private and only the helpers a caller needs are exported,
 * so this file never accumulates API nothing calls. Add `below()` the day
 * something wants it.
 */
const BREAKPOINTS = {
  /** Oversized desktops — scale type and rhythm up. */
  wide: 2000,
  /** Laptops and below. */
  desktop: 1024,
  /** Tablets and below; the main layout switch. */
  tablet: 768,
  /** Phones. */
  mobile: 480,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * `(min-width: N+1px)` — matches strictly wider than the named category, so
 * it is the exact complement of a `(max-width: N)` rule with no overlap.
 */
export const above = (bp: Breakpoint) => `(min-width: ${BREAKPOINTS[bp] + 1}px)`;
