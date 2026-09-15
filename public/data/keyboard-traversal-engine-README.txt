KEYBOARD TRAVERSAL ENGINE — the code that produced the published numbers
========================================================================

WHAT THIS IS
------------
This is the measurement program behind the dataset published at
https://aifa.works/research/data — 95 524 measurements across 11 902 US
municipal websites (snapshot of 2026-09-01), plus the ongoing traversal of
US organisations.

It opens eight typical pages of a website in a real browser and tries to
reach the goal using the Tab key ONLY, the way a person who cannot use a
mouse has to. It counts the steps, checks whether the focus ring is
visible, whether form fields have labels, whether the text is large enough,
and saves a screenshot as evidence.

WHY NOT AN AUTOMATED RULE CHECKER
---------------------------------
Rule checkers (axe and similar) answer "are the rules violated?". This code
answers a different question: "will a living person get to the payment
page?". A site can violate no rule at all and still not let a person
through.

HOW TO RUN IT
-------------
    npm i puppeteer-core
    set CHROME_PATH=C:\path\to\chrome.exe        (Windows)
    export CHROME_PATH=/path/to/chrome           (Linux/macOS)
    node keyboard-traversal-engine.mjs

The program expects a registry of organisations as JSONL next to it; the
format is described in traversal-log-SCHEMA.md. The output is one JSON
object per measurement, appended to a JSONL file — the same shape as the
published traversal-log-2026-09-01.jsonl.gz.

POLITENESS TO OTHER PEOPLE'S SERVERS
------------------------------------
A mandatory 2-second pause between sites (MANDATORY_PAUSE_MS), each site is
visited once, and a file lock prevents a second pass. We did not take
anyone down.

WHY THE VARIABLES ARE IN RUSSIAN
--------------------------------
The project is written in Russian; the author reads the code in Russian and
finds errors in it faster that way. The field names in the published data
are the same identifiers, so the code and the dataset read as one whole.
traversal-log-SCHEMA.md gives an English gloss for every field.

WHAT THIS CODE DOES NOT DO
--------------------------
It does not judge a whole website. One measurement describes one page at
one moment: a timeout, a temporary 403 or a site redesign between two runs
will change the verdict. Reproducibility measured on a repeat pass:
96 % by verdict, 89,9 % by number of issues. That is a property of
measuring living third-party websites, not a defect to be fixed — and it is
stated on the research pages as well.

LICENCE
-------
The DATA is published under CC BY 4.0 (see LICENSE.txt).
This CODE is published so that anyone can verify and reproduce the
published numbers. For reuse beyond verification, please ask the author.

Authors: Maksim Halatsin and AIfa — project CODE (Code of Digital Eternity)
Contact: contact@codeofdigitaleternity.com
Published: 2026-09-14
