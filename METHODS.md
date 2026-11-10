# Testing a data quality score on files it had never seen

**Methods and results of held-out set 9**

Austin Faulkner-Pearce, Aseryx. November 2026. Part of the record [10.5281/zenodo.24117307](https://doi.org/10.5281/zenodo.24117307).

## Summary

The Aseryx quality score rates one dataset from 0 to 100 on how clean and well-formed it is. Six versions of it, v6 to v11, were tuned in turn on a 439-file corpus. On that corpus, the share of good and dirty pairs ranked with the good file higher rose from 55.9% (v6) to 96.5% (v11). We then tested all six frozen versions on held-out set 9. The set has 160 public files, picked and labelled from their publishers' own documentation and registered before any file was downloaded; 144 were kept, and each version scored them once. No version met all its pass marks. On 66 known-good and 37 known-dirty real exports, every version ranked the good file higher in 54.4% to 65.2% of pairs, against 90% needed, and no later version is clearly ahead of v6 on that mark. The climb on the corpus was fit to the corpus. The later versions did improve in other ways: v7 to v11 place good files at 90 or more where v6 places none, and v11 keeps more dirty files under 70 than v7, v9 or v10. This note sets out how the test was designed and run, what it found, and what it cannot show.

## 1. The score and its versions

The score combines four checks: structure (broken records), cell quality (empty, invalid or placeholder cells), duplicates, and labels (rows whose features match but whose labels disagree). Each check falls to zero at a set share of problems, and the score sits in one of four bands: ready (90 and up), usable (70 to 89), needs cleaning (50 to 69) and serious (under 50). The scoring rules and the engines that run them are not published.

| Version | Status |
|---|---|
| v6 | in the product until 2026-10-23 |
| v7, v8 | development steps, superseded 2026-10-22 |
| v9 | development step, frozen 2026-10-23 |
| v10 | in the product from 2026-10-23 to 2026-10-30 |
| v11 | in the product since 2026-10-30 |

Every version is kept frozen with the engine it ran on, so each can be run again and gives the scores recorded for it. That is how v6 to v9 could be scored on set 9 after the fact.

## 2. Why a held-out set

The versions were developed against a corpus of 439 files: 82 known-good and 65 known-dirty datasets, 15 research pairs of a table before and after cleaning (from the Raha and CleanML benchmarks), 14 corruption sweeps, and smaller samples drawn from larger files. Labels in the corpus come from each dataset's reputation and were written down before scoring. Every version from v7 on was designed against all or part of this corpus, and the corpus includes held-out sets 1 to 6. Its marks show how well a version fits these files. They cannot show how it does on new data.

Held-out sets supply that test. Set 7 (28 files) was too small to tell v7 to v11 apart. Set 8 was the first registered before download; it was scored on v10 and v11 when they were current, and later on v6 to v9 for the files that could be rebuilt. Set 9 is the first set scored on all six frozen versions at once, and the first large enough to give intervals that separate versions where they differ.

## 3. Design of set 9

Everything in this section was fixed in the [registration](heldout9/registration.md), accepted on 2026-11-09 before any file was downloaded. The registration states no prediction for any version.

**Files.** Each file comes from its publisher or the publisher's own portal, never a mirror. Every source had to meet a licence bar: public domain, CC0, CC BY, ODbL, ODC PDDL, the UK Open Government Licence, Licence Ouverte or DL-DE BY. No publisher gives more than three files, apart from the UCI repository, which hosts datasets from different donors and gives at most ten. The 120 real exports span 15 fields and 13 languages, mostly in CSV and JSON.

**Labels.** Each real export was labelled from its publisher's documentation, and each label cites the document it rests on. No label was chosen by looking at the data.

- *Good:* the publisher documents curation or validation, and nothing in the documentation says otherwise. Expected 90 or more.
- *Usable:* the only documented defects are duplicates under 18%, or columns with 1 to 10% of their values missing. Expected 70 to 89, and outside the marks.
- *Dirty:* a documented defect beyond that, such as broken records over 1%, a column over 10% missing where the blanks are documented as not collected or not given, invalid or placeholder values in over 10% of a column, duplicates of 18% or more, or labels that disagree on the same features. Expected below 70.

**Twins and check cases.** Thirty twins are clean originals from the set with errors injected at fixed rates: missing values, swapped values, scaling, noise, broken characters, duplicates, broken records and placeholder tokens. A twin is labelled dirty when an injected rate crosses a dirty threshold and usable otherwise. Ten check cases re-test the automatic checks only v11 has; the cases themselves are withheld, because they describe how the checks count.

**Exclusions.** A file is excluded, and reported with its reason, when its licence falls outside the bar, its record count differs from an exact count the publisher documents, it cannot be downloaded, or it fails a download safety check (a redirect to another host, a size cap, or content other than plain data). A twin is excluded with its original.

**Scoring.** Every file is downloaded once and kept unchanged with its SHA-256, the URL fetched and the retrieval time. Each version scores those frozen copies once, with no declarations, so every version reads every file as published. A run is repeated only if it ends without a result for a technical reason. Nothing is rerun after looking at a score. A file a version cannot read meets no mark for that version.

## 4. Marks and comparisons

Five pass marks, the same shares as set 8:

1. Good files score 90 or more: at least 80% of them.
2. Dirty files score under 70: at least 80% of them.
3. In at least 90% of good and dirty pairs, the good file scores higher (a tie counts half).
4. The clean original scores at least its twin in at least 90% of pairs.
5. All 10 check cases give their written finding.

Every mark of every version has a 95% percentile bootstrap interval from 10,000 resamples (seed 9). The resampling unit is the dataset, so a twin is drawn with its original. For every pair of versions and every mark, the difference is computed on the same resamples with its own interval. A difference is described only as including or excluding zero, and all 60 comparisons are published, none picked.

Secondary views, each fixed or decided before scoring and reported beside the primary result, never in its place: the dirty files whose defect rate the publisher states; the dirty files by kind of defect; the older versions on files their reader cannot open, rewritten as plain CSV; and six files with comment or notes lines removed.

## 5. What happened

160 files were registered. 16 were not scored: 13 under the registered exclusion rules (six downloads that failed or broke a safety check, four archives holding something other than plain data, and three record counts that differed from the publisher's) and 3 twins (two whose originals were excluded, and one our tool could not build). 144 were kept: 66 good, 37 dirty and 4 usable real exports, 27 twins and 10 check cases, from 117 datasets.

Seven deviations from the registration were recorded as they happened, including the twin the tool could not build, one file downloaded a second time after the first download returned only an API's default 5-row selection, and tool faults fixed before files were fetched again. Each is listed in [heldout9/README.md](heldout9/README.md).

All downloads took place on 2026-11-10 between 00:12 and 00:50 UTC, after the registration was committed at 00:04:52. That commit and the internal page holding the registration are private, so for set 9 this order rests on our statement. The files published here were timestamped after scoring, in Bitcoin block 975,331, which dates their publication.

## 6. Results

| Mark | Needed | v6 | v7 | v8 | v9 | v10 | v11 |
|---|---|---|---|---|---|---|---|
| Good files at 90 or more | 53 of 66 | 0 | 32 | 24 | 29 | 29 | 26 |
| Dirty files under 70 | 30 of 37 | **33** | 24 | 28 | 23 | 27 | **31** |
| Good above dirty (2,442 pairs) | 90% | 61.8% | 57.8% | 59.5% | 54.4% | 65.2% | 64.8% |
| Original at least its twin | 25 of 27 | **25** | 23 | 21 | 22 | **26** | **26** |
| Check cases found as written | 10 of 10 | 0 | 0 | 0 | 0 | 0 | **10** |

Bold marks a mark met. No version met all five.

- **Ranking good above dirty has not improved since v6.** The six versions range from 54.4% to 65.2%, each with a 95% interval about 20 points wide, and no later version separates from v6. The one clear difference on this mark is v10 and v11 ahead of v9.
- **Recognising good data has not improved since v7.** v7 places 32 of 66 good files at 90 or more and v11 places 26; v6 places none.
- **v11 holds dirty data down best among v7 to v11.** It keeps 31 of 37 dirty files under 70, clearly more than v7, v9 and v10. v6 keeps 33 because it scores almost every file low.
- **v10 and v11 keep a clean original at or above its twin most often** (26 of 27), clearly ahead of v8 and v9.
- **v10 and v11 cannot be told apart** on good files at 90 or on ranking.

The secondary views move the ranking mark by a few points without changing these conclusions. With the six files' notes lines removed, every version's ranking rises by 3 to 7 points. With their unreadable files rewritten as plain CSV, v6 to v9 reach 63.5% to 69.2%, level with v10 and v11.

Set 8 showed the same under-rating of good files: v11 kept all 23 of its dirty files under 70 but placed only 9 of 32 good files at 90 or more. There, most good files lost points for blanks that are blank by design, such as optional fields and footnote columns, and for letters in ID and code columns.

## 7. Proofs of the v11 scores

v11 is the version live in the product, where every score is proven with a Groth16 zero-knowledge proof. We proved each of the 133 set 9 files whose v11 score is published, with the circuit and proving key the product uses. Anyone can verify the proofs against the published verification key, offline or against the verifier contract on Avalanche Fuji, which was deployed on 2026-11-05, four days before set 9 was registered.

A proof shows that the score, its band and the four check results follow from one committed set of counts under that circuit, for the file named by its SHA-256, so a published v11 score cannot have been changed afterwards. It does not show that the counts were read correctly from the file, since counting happens in the engine outside the circuit. It says nothing about v6 to v10. Aseryx ran the circuit's setup alone, so the proofs also rest on Aseryx having discarded that setup's secret values.

## 8. Limits

- **Sample size.** About a hundred labelled real exports give intervals about 20 points wide on the ranking mark, so only large differences between versions are clear.
- **Labels.** Labels rest on what publishers document. Documentation can be incomplete, and the rule that counts suppressed cells as dirty is a judgement; the by-kind view shows its effect.
- **Registration timing.** For set 9, the order of registration and download rests on our private records.
- **Reproduction.** The engines are not public, so others can check the labels, recompute the first four marks from the per-file scores and verify the v11 proofs, but cannot run the score. Many sources are live tables, so a download made today may differ from our frozen copy.
- **What is not measured.** Which wrong cells each version catches and misses is not measured yet.

## 9. What changes from set 10

From set 10 on, each registration is published in this repository and timestamped with OpenTimestamps before any file is downloaded, so its date rests on a Bitcoin block rather than our statement. The order is in [REGISTERING.md](REGISTERING.md). After scoring, a set counts as seen and is never used as unseen data again.

## Files

| File | What it holds |
|---|---|
| [heldout9/registration.md](heldout9/registration.md) | The registration as accepted, with two passages withheld and marked |
| [heldout9/files.csv](heldout9/files.csv) | Every registered file with its publisher, licence, link, label, outcome, SHA-256 and score per version |
| [heldout9/intervals.csv](heldout9/intervals.csv) | Each mark of each version with its 95% interval |
| [heldout9/differences.csv](heldout9/differences.csv) | All 60 paired differences with intervals |
| [heldout9/proofs/](heldout9/proofs) | The 133 v11 proofs, checked by `node heldout9/verify.mjs` |
| [heldout9/README.md](heldout9/README.md) | Full results, secondary views, exclusions, deviations and timeline |
