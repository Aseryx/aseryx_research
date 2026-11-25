# Held-out set 10: v12 against v11, scored once

**v12 matches v11's accuracy from the data alone, with a simpler, faster proof.** Set 10 is 82 files (42 known good, 40 known dirty) registered before any download, plus 9 dirty twins. v11 and v12 each scored them once. v12 is not better than v11 on any mark and is not worse on any mark with an interval that excludes zero: the paired difference in good above dirty is -0.1 points [-2.6, +2.4] on all files; every other mark is identical. This is the registered claim rule 2; the same rule holds on the 50 database-style files alone, where good above dirty is -1.8 points [-6.1, +0.0] (its upper end is exactly zero, so it does not exclude zero).

| File | What it holds |
|---|---|
| [registration.md](registration.md) | The registration as accepted, with one passage withheld and marked; stamped with OpenTimestamps before any download |
| [sources-2026-11-24.md](sources-2026-11-24.md) | The address, allowed hosts and archive member of each file, stamped before any download |
| [generators-2026-11-24.md](generators-2026-11-24.md) | The generated files as they were made, stamped before any scoring |
| [files.csv](files.csv) | Every registered file and every planned twin: publisher, licence, page, label, whether it was kept and why not, how it was downloaded, SHA-256 of the download and of the scored copy, and its score under each version |
| [intervals.csv](intervals.csv) | Each mark of each version with its 95% interval, for all files and for the database-style files |
| [differences.csv](differences.csv) | The paired difference of v12 from v11 on every mark, with its 95% interval and whether it excludes zero |

## The marks

Shares in percent of the files a version can read, with 95% percentile intervals from 10,000 resamples (seed 10) of the datasets behind the files; a twin is resampled with its original. The last column is the difference on the same resamples. Good under 50 is better when lower. All files: 42 good, 40 dirty, 9 twins.

| Mark | v11 | v12 | v12 minus v11 (paired) |
|---|---|---|---|
| Good above dirty | 58.3 [45.8, 70.4] | 58.3 [45.5, 70.3] | -0.1 [-2.6, +2.4] |
| Dirty files under 70 | 85.0 [73.3, 95.1] | 85.0 [73.3, 95.1] | +0.0 [+0.0, +0.0] |
| Good files at 90 or more | 23.8 [11.4, 37.5] | 23.8 [11.4, 37.5] | +0.0 [+0.0, +0.0] |
| Good files under 50 | 59.5 [44.4, 74.4] | 59.5 [44.4, 74.4] | +0.0 [+0.0, +0.0] |
| Original at least its twin | 100.0 [100.0, 100.0] | 100.0 [100.0, 100.0] | +0.0 [+0.0, +0.0] |

Database-style files (one row per entity or event, a key, typed columns): 23 good, 27 dirty, 9 twins.

| Mark | v11 | v12 | v12 minus v11 (paired) |
|---|---|---|---|
| Good above dirty | 52.7 [36.5, 68.8] | 50.9 [34.8, 67.1] | -1.8 [-6.1, +0.0] |
| Dirty files under 70 | 81.5 [65.5, 95.7] | 81.5 [65.5, 95.7] | +0.0 [+0.0, +0.0] |
| Good files at 90 or more | 13.0 [0.0, 28.6] | 13.0 [0.0, 28.6] | +0.0 [+0.0, +0.0] |
| Good files under 50 | 73.9 [54.5, 91.3] | 73.9 [54.5, 91.3] | +0.0 [+0.0, +0.0] |
| Original at least its twin | 100.0 [100.0, 100.0] | 100.0 [100.0, 100.0] | +0.0 [+0.0, +0.0] |

v11's data-alone score equals its headline score on every mark here, so the comparison is the same whichever v11 score is used.

## What the good files score

Both versions score the good files low: 10 of 42 reach 90, and 25 score under 50. The share of blank cells is the cause. Of the 32 good files under 90, 30 have a cells factor below 1, and 14 good files score 0 under both versions, each with a cells factor of 0. The two versions agree file by file on this. Nothing was tuned on this set.

## The 5 files whose score differs between v11 and v12

Of 91 kept files (twins included), 5 score differently under v12; the rest score the same.

| Id | Dataset | Label | v11 | v12 |
|---|---|---|---|---|
| G1 | NYPD Arrest Data (Year to Date) | good | 82 | 83 |
| G47 | Cumulative emergency data file | good | 6 | 30 |
| R22 | patients.csv from one seeded run (Synthea) | good | 24 | 27 |
| D55 | Safe Schools Drug and Alcohol Use 2012 - Current School Year County Ed | dirty | 7 | 13 |
| D69 | Estimated Accidental and Undetermined Drug Overdose Deaths with Demogr | dirty | 0 | 30 |

## Symmetry

Each database-style good file was scored by v12 in three forms: the CSV, a JSONL copy written from the CSV, and the JSONL that the Aseryx Runtime reads back from the file loaded into a local PostgreSQL. **20 of 23 files score alike in every form.** The rest have a missing form, not a different score: two files (G3, 2,155,641 rows, and R24, 1,625,134 rows) are over the Runtime's export limit of 1,000,000 rows, so the read-back has no form for them, and one (R41) is kept in a non-CSV form and has no JSONL copy and no read-back. Columns were typed on load by a rule fixed before any download: per column, over its non-empty values, all integers that fit 64 bits give bigint; else all decimals give numeric; else all true or false (any case) give boolean; else all ISO 8601 dates give date; else all ISO 8601 timestamps give timestamp; else text. Empty strings load as NULL and column names are the header's.

## What was left out, and what we changed

The registration drew 60 good and 53 dirty files. 31 were excluded after download for the reasons in files.csv (14 under 100 data rows, 8 over 500 MB, 3 HTTP errors, and the others a dataset with no direct HTTPS data file, a page that is not data, a redirect to an unrelated host, or an archive without the named member). Excluded files are not replaced. 82 files were scored (5 generated).

The twins: the registration plans up to 20, from the first 20 listed originals with 1,000 to 500,000 rows after download. 11 qualified, so 11 were planned and 9 built; twin 6 (original R41) could not be built because the builder reads UTF-8 and R41 has stray bytes, and twin 8 (original G44) could not be built because its recipe needs a numeric column and G44 has none.

**One deviation from the registration.** The first download pass ran as registered and excluded 46 files; 21 of them were excluded for technical reasons, not because of what the files hold. Before any file was scored we relaxed the registered download rules for exactly those 21 files and fetched them once more, with the same tool, keeping the first pass's record beside the second (files.csv, download_pass and download_rule). The rules changed in three ways. Storage operated by the publisher or its portal is followed on a redirect, each host recorded as observed (15 files). For an archive that holds the named data file beside documentation, only the named member is extracted and read, and every member's name and size is recorded (5 files). For one archive whose source named no member, the data member was named from the archive directory (R41). We decided to record this here and in files.csv, not in a separate dated file with its own stamp. The refetch kept 15 files and 6 stayed excluded.

Three more facts. The Foundation Foods archive (R4, R5) served different bytes between the two passes from the same address (4,209,875 bytes at 22:56:38 UTC, then 1,127,612 bytes at 23:39:36 UTC, with no `food_nutrient.csv` or `food_portion.csv`), so R4 and R5 are excluded. G39 is not valid UTF-8 but every byte above 0x7f is valid Windows-1252, so it was converted from Windows-1252 to UTF-8; R41 mixes valid UTF-8 with stray bytes, so no single encoding converts it and its extracted member is scored as downloaded. Before scoring, the download tool read only each response, its size and SHA-256, the first bytes of each file or archive member to test that it is plain text, and the row count of files that passed; no column or value was examined.

## When things happened

The registration was published and stamped on 2026-11-24 before any download; its stamp is anchored in Bitcoin block 977420, and the sources and generators files in block 977425. Download times are in files.csv (`retrieved_utc`). Check a stamp with `ots verify heldout10/registration.md.ots`. `SHA256SUMS` and its stamp date from before any download and list the registration and the README as they were then; this README replaces that one, and `SHA256SUMS-results-2026-11-24` lists every file of the folder as published with the results.

## What is not here

The scoring rules and the engines are not published, and the registration names the exact engine build of each version only in a withheld passage. No zero-knowledge proofs are published with this folder yet; they are a later addition. Set 10 counts as seen from now on and is never used as unseen data again.
