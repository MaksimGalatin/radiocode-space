# Dataset history — every release, and what changed

This file exists because we tell journalists that the dataset has a dated
version history, and a claim like that must be checkable. Every entry below
corresponds to a commit in the repository that publishes this directory;
the dates are the dates those files went live.

Entries marked **against ourselves** are corrections that made our own
numbers weaker or our claims narrower. They are listed first in each day
because they are the ones worth checking.

---

## 2026-09-15

* **Against ourselves.** The public README and the schema described the
  numerator of the 53.8 % figure as "records where the goal was not
  reached". That is wrong. On those 13,972 pages the goal WAS reached — the
  engine assigns that verdict in its `goalReached == true` branch — but the
  focus ring was removed or the fields had no labels. The number is
  unchanged; the sentence describing it was misleading and is now corrected
  in both files.
* **Against ourselves.** `research-records-2026-09-01.csv.gz` shipped with
  the `verdict` column EMPTY in all 95,524 rows, and `focus_visible` empty
  as well. The builder read a field name that does not exist in the log.
  The table has been rebuilt: `verdict` is now populated for every row, and
  `focus_visible` is filled only where the traversal actually observed the
  focus ring — 31.4 % of rows — and left blank elsewhere rather than
  guessed.
* The summary JSON was recomputed **from the published table** rather than
  from internal state, and its keys were translated from Russian to English.
  Seventy values were compared against the previous summary: all matched.
  The per-state breakdown used to under-count — its site totals summed to
  11,654 of 11,902 and its page totals to 93,491 of 95,524. It now sums to
  the whole.
* Added `research-records-SCHEMA.md` — a column reference for the CSV,
  including why `focus_visible` is blank on most rows and why both 11,902
  and 11,923 are correct site counts.
* Added `template-defect-evidence-2026-09-15.csv` — 200 CSS selectors that
  fail on the same node across many states, with the number of states and
  cities for each. This is the evidence for the claim that the defect is in
  a vendor template rather than in individual cities.
* Added `keyboard-traversal-engine.mjs` — the measurement program itself,
  so the numbers can be reproduced rather than trusted.
* Schema: the limit of the `server_silent` verdict is now stated plainly.

## 2026-09-15

* **Against ourselves, and this one changes a headline number.** Our
  traversal engine counted the page goal as reached when the focused element
  matched a keyword either in its text or in its href. The skip link that
  good sites put first - "Skip to main content" - contains the word *main*
  and usually points at `#main` or `#content`, so on pages whose keywords
  include *main* or *navigation* it was accepted as the goal at Tab #1.

  A skip link is a genuine accessibility feature and a keyboard user really
  does use it. But it does not take you to the contact details, the payment
  page or the opening hours - which is what the verdict
  `reachable_by_a_person` claims.

  Measured on the published municipal log (95,524 records): **6,184 records
  (6.5 %) had the goal credited to a skip link** - 5,064 of them carried the
  verdict "reachable by a person", 1,120 "partial focus or labelling
  barrier".

  Recomputed with skip links **not** counted as reaching the goal:

      reachable by a person        11,994  ->   6,930
      formally accessible, barrier 21,305  ->  27,489
      partial focus/label barrier  13,972  ->  12,852

      barrier among measurable      74.6 %  ->  85.3 %
                                   (35,277 of 47,271 -> 40,341 of 47,271)

  The correction moves **against the sites we measured**, not in their
  favour: our published figure was too kind. Both numbers are stated here so
  that anyone can reproduce either one - the raw log carries the text of the
  focused element in the field `где_оборвалось`, so no re-traversal is needed
  to verify this.

  The same check on the ongoing (unpublished) survey of US commercial and
  service organisations shows a much larger share - 30.5 % of goals credited
  to a skip link - because that engine also matched on the href. That survey
  is not published, and will not be until the definition of "goal reached"
  is settled.

## 2026-09-12

* Attribution and dataset licences stated per file.

## 2026-09-10

* **Against ourselves.** The OSM-derived organisation registry was
  republished under ODbL 1.0 after we found it had been offered under
  CC BY 4.0, which is incompatible with its source. It had briefly been
  withdrawn; withdrawing it was the wrong fix, and relicensing it was the
  right one.

## 2026-09-09

* Two further datasets published: the US organisation registry and the
  government-site axe audit.

## 2026-09-07

* Four re-verification slices published, 99,811 records in total.

## 2026-09-03

* The evidence base was re-stamped into Bitcoin: 110,094 files.

## 2026-09-01

* The raw traversal log and its schema were published.
* The evidence base (screenshot hashes) was stamped into Bitcoin and the
  anchor confirmed in block 965040.
* The mechanism behind the headline figure was identified: in 81.8 % of the
  disagreement cases the visible focus outline had been removed.
* **Against ourselves.** Three claims were softened after review, and the
  verdict taxonomy was repaired.
* **Against ourselves.** The dead-domain count was corrected from 1,650 to
  1,498: 152 domains we had listed as dead answered on re-check. This made
  our own headline worse, not better.
* A plain answer was added to the question "what if a screenshot is
  retaken" — the honest limit of screenshot evidence.

## 2026-08-31

* The dead-domain README was updated; the previous slice was named rather
  than silently replaced.

## 2026-08-30

* The first raw file was published alongside the research page: 1,208 dead
  domains.

---

## What is still being corrected, right now

A re-traversal of 1,266 pages that carry a verdict but no screenshot is in
progress. On the first 186 of them, 25 verdicts moved in the sites' favour
(23 went from "barrier" to "reachable by a person") and 13 moved the other
way.

**Which dataset this affects, stated precisely.** That re-traversal belongs
to our ONGOING survey of US commercial and service organisations — pharmacy
chains, dental practices and the like — not to the municipal snapshot
published here. We checked: none of its 472 corrections match a row of
`research-records-2026-09-01.csv.gz`, because the two studies cover
different organisations entirely. The municipal figures in this directory
are therefore unchanged by it, and we are not promising a recomputation
that would not touch them.

What the re-traversal does tell you is how this kind of measurement behaves
under repetition: roughly two corrections in the measured site's favour for
every one against. That ratio is the reason the reproducibility limits
stated in the schema are worth reading before quoting any single verdict.

We would rather publish that we were slightly too harsh than leave a number
standing because it reads better.

Licence: CC BY 4.0 · contact@codeofdigitaleternity.com
