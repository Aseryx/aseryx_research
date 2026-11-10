# Aseryx research

The test record behind the Aseryx readiness score: how each test was set up, what was scored, and what came out, including the results that went against us.

The readiness score rates one table from 0 to 100 on how clean and well-formed it is. A summary with charts is at [aseryx.xyz/benchmarks](https://aseryx.xyz/benchmarks). This repository holds the files behind it.

## What is here

| Folder | What it holds |
|---|---|
| [heldout9/](heldout9/README.md) | Held-out set 9: 160 files registered before download, scored once by every version of the score from v6 to v11. No version passed. |

Each test folder has the registration as it was accepted, every file with its publisher, licence and link, what was left out and why, each file's score under each version, and the intervals on every comparison.

## What is published and what is not

Published: the test design, the labels and the evidence for them, the pass marks, every exclusion and deviation, per-file scores, intervals, the SHA-256 of every file we scored, and a proof of every v11 score.

Not published: the scoring rules and the engines that run them, the cases written to break the score, and the cases that test its automatic checks. Where a registration contains any of these, the passage is withheld and marked.

So this record can be checked, but the score cannot be run from it. You can read each label against the publisher's own documentation, recompute the marks from the per-file scores, and confirm a file against its SHA-256.

For v11, the version live in the product, every published score also comes with a zero-knowledge proof. Anyone can verify the proofs, offline or against a public contract, without seeing the rules. Each test folder says what its proofs show and what they do not.

## How the files are made

Every table and registration under a test folder is generated from our working record by a script, and the proofs are written by the same harness that tests the product's circuit. The script recomputes each mark from the scores it is about to publish and stops if one differs from the recorded mark. Nothing is copied by hand.

A published registration is never edited. A correction is a new dated change.

## Licence

The text and tables in this repository are licensed under [CC BY 4.0](LICENSE.md). The datasets named here belong to their publishers and stay under the licences listed beside each file.

## Contact

Aseryx, [aseryx.xyz](https://aseryx.xyz).
