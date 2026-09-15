# template-defect-evidence-2026-09-15.csv — how one broken template reaches fifty states

## What this file is

200 rows. Each row is a CSS selector that an accessibility checker found
broken, together with the number of distinct US states and distinct city
websites where that exact selector failed in that exact way.

| column | meaning |
|---|---|
| `rule` | the accessibility rule that failed (axe-core rule id) |
| `css_selector` | the selector of the first failing node, as reported by axe |
| `states` | how many distinct states have this selector failing |
| `cities` | how many distinct municipal websites have it |
| `state_list` | the states themselves, two-letter codes |

## Why it matters

A municipality does not write `#secondaryMenusecondaryNav` by accident.
When the same specific node fails on 1,586 city websites across all 50
states, those cities did not each make the same mistake. They bought the
same template, and the defect came with it.

That is the whole claim, and this file is the whole evidence for it. It
needs no comparison with other vendors, and it makes none.

## What we deliberately did NOT do

**We excluded generic selectors.** The first run of this analysis put `html`
at the top — 3,143 cities in 50 states — along with `h3`, `h4` and
`.active`. Every website on earth has those. A claim built on them collapses
at the first question from an engineer, so they are filtered out. What
remains are selectors that carry an author's own naming.

**We make no claim about which vendor is better.** Our vendor-comparison
data is too thin to support one: 206 measured pages for CivicPlus, but only
2 for Granicus and 1 for Revize. We publish that table as
`platform-vendors.csv.gz` with the measurement counts visible, precisely so
that nobody — including us — draws a conclusion it cannot carry.

## How to reproduce

The source is `us-government-axe-audit.jsonl.gz`, published in this same
folder. The code that produces this file from it is
`доказательство_шаблонности_дефекта.py`; the variable names are in Russian
because the project is written in Russian, and the logic is forty lines:
group by (rule, selector), count distinct domains and states, drop generic
selectors, sort.

Licence: CC BY 4.0 · contact@codeofdigitaleternity.com · 2026-09-15
