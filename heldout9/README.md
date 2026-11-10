# Held-out set 9: six versions of the score on files none had seen

**No version passed.** Set 9 is 160 files registered before any download. 144 were kept and each version scored them once. On 66 known-good and 37 known-dirty real exports, every version ranked the good file above the dirty one in 54.4% to 65.2% of pairs, against 90% needed, and no version is clearly ahead of v6 on that mark.

| File | What it holds |
|---|---|
| [registration.md](registration.md) | The registration as accepted, with two passages withheld and marked |
| [files.csv](files.csv) | Every registered file: publisher, licence, link, label, whether it was kept and why not, SHA-256 of the download and of the scored copy, and its score under each version |
| [intervals.csv](intervals.csv) | Each mark of each version with its 95% interval |
| [differences.csv](differences.csv) | Every pair of versions on every mark: the difference, its 95% interval and whether it excludes zero |

v10 is the last set of rules shipped under that name, which the registration calls v10.2. v11 is v11.0.

## The marks

The pass marks were fixed in the registration. A file a version cannot read meets no mark for that version.

| Mark | Needed | v6 | v7 | v8 | v9 | v10 | v11 |
|---|---|---|---|---|---|---|---|
| Good files scoring 90 or more | 53 of 66 | 0 | 32 | 24 | 29 | 29 | 26 |
| Dirty files scoring under 70 | 30 of 37 | 33, met | 24 | 28 | 23 | 27 | 31, met |
| Good above dirty (2,442 pairs, a tie counts half) | 90% | 61.8% | 57.8% | 59.5% | 54.4% | 65.2% | 64.8% |
| Original at least its twin | 25 of 27 | 25, met | 23 | 21 | 22 | 26, met | 26, met |
| Check cases found as written | 10 of 10 | 0 | 0 | 0 | 0 | 0 | 10, met |

Only v11 has automatic checks, so only it can meet the last mark. The first four marks can be recomputed from files.csv.

## How sure each figure is

95% intervals from 10,000 resamples (seed 9) of the 117 datasets behind the 144 files. A twin is resampled with its original. Shares in percent.

| Version | good files at 90 or more | dirty files under 70 | good above dirty | original at least its twin |
|---|---|---|---|---|
| v6 | 0.0 [0.0, 0.0] | 89.2 [78.0, 97.6] | 61.8 [50.0, 73.3] | 92.6 [81.2, 100.0] |
| v7 | 48.5 [36.5, 60.3] | 64.9 [48.6, 80.0] | 57.8 [46.0, 69.4] | 85.2 [70.8, 96.8] |
| v8 | 36.4 [25.0, 47.9] | 75.7 [61.3, 88.9] | 59.5 [47.7, 71.1] | 77.8 [60.7, 92.6] |
| v9 | 43.9 [32.2, 55.9] | 62.2 [46.2, 77.8] | 54.4 [42.5, 66.6] | 81.5 [65.4, 95.7] |
| v10 | 43.9 [32.1, 56.1] | 73.0 [58.1, 86.7] | 65.2 [54.6, 75.4] | 96.3 [87.5, 100.0] |
| v11 | 39.4 [27.6, 51.4] | 83.8 [71.1, 94.7] | 64.8 [54.2, 75.1] | 96.3 [87.5, 100.0] |

Differences between two versions (later less earlier, in points) whose 95% interval excludes zero. Every other pair and mark includes zero; all 60 comparisons are in differences.csv.

| Pair | Mark | Difference |
|---|---|---|
| v6 to v7 | good files at 90 or more | +48.5 [36.5, 60.3] |
| v6 to v7 | dirty files under 70 | -24.3 [-39.0, -11.1] |
| v6 to v8 | good files at 90 or more | +36.4 [25.0, 47.9] |
| v6 to v8 | dirty files under 70 | -13.5 [-25.6, -3.0] |
| v6 to v8 | original at least its twin | -14.8 [-30.0, -3.4] |
| v6 to v9 | good files at 90 or more | +43.9 [32.2, 55.9] |
| v6 to v9 | dirty files under 70 | -27.0 [-41.9, -13.2] |
| v6 to v10 | good files at 90 or more | +43.9 [32.1, 56.1] |
| v6 to v10 | dirty files under 70 | -16.2 [-31.0, -2.6] |
| v6 to v11 | good files at 90 or more | +39.4 [27.6, 51.4] |
| v7 to v8 | good files at 90 or more | -12.1 [-21.5, -3.2] |
| v7 to v11 | dirty files under 70 | +18.9 [4.8, 34.1] |
| v8 to v9 | dirty files under 70 | -13.5 [-25.6, -3.1] |
| v8 to v10 | original at least its twin | +18.5 [4.5, 34.8] |
| v8 to v11 | original at least its twin | +18.5 [4.5, 34.8] |
| v9 to v10 | good above dirty | +10.8 [0.7, 21.3] |
| v9 to v10 | original at least its twin | +14.8 [3.3, 29.6] |
| v9 to v11 | dirty files under 70 | +21.6 [6.2, 37.1] |
| v9 to v11 | good above dirty | +10.4 [0.2, 20.9] |
| v9 to v11 | original at least its twin | +14.8 [3.3, 29.6] |
| v10 to v11 | dirty files under 70 | +10.8 [2.4, 21.6] |

## What it shows

- **Ranking good above dirty on unseen real exports has not improved since v6.** No later version separates from v6 on this mark. The gains on our tuning corpus for the same mark (55.9% for v6 to 96.5% for v11) are fit to that corpus.
- **Recognising good data has not improved since v7.** v7 places 32 of 66 good files at 90 or more and v11 places 26.
- **v6 places no good file at 90.** Every later version does.
- **v11 holds the most dirty files under 70 among v7 to v11** (31 of 37), clearly ahead of v7, v9 and v10. v6 holds 33 because it scores almost every file low.
- **v10 and v11 keep a clean original at or above its twin most often** (26 of 27), clearly ahead of v8 and v9.
- **v10 and v11 cannot be told apart** on good files at 90 or on ranking.

## Secondary views

Each view is reported beside the primary result and never in its place. Cells read good at 90 / dirty under 70 / good above dirty / twins.

| View | v6 | v7 | v8 | v9 | v10 | v11 |
|---|---|---|---|---|---|---|
| Primary | 0 / 33 / 61.8% / 25 | 32 / 24 / 57.8% / 23 | 24 / 28 / 59.5% / 21 | 29 / 23 / 54.4% / 22 | 29 / 27 / 65.2% / 26 | 26 / 31 / 64.8% / 26 |
| Six files with clean-ups applied (decided before scoring, outside the registration) | 0 / 36 / 65.0% / 25 | 32 / 26 / 62.8% / 23 | 25 / 30 / 63.3% / 22 | 30 / 26 / 61.4% / 23 | 30 / 29 / 69.7% / 27 | 27 / 33 / 69.3% / 27 |
| Files the older reader cannot open, written as plain CSV (registered, v6 to v9 only) | 0 / 34 / 69.2% / 27 | 34 / 26 / 66.7% / 27 | 30 / 27 / 69.2% / 24 | 30 / 25 / 63.5% / 25 | not run | not run |

Dirty files by the evidence behind their label (registered). Cells read dirty under 70 / good above dirty.

| Dirty files | v6 | v7 | v8 | v9 | v10 | v11 |
|---|---|---|---|---|---|---|
| With a rate stated by the publisher | 18 of 19 / 63.3% | 14 of 19 / 61.1% | 15 of 19 / 59.2% | 13 of 19 / 56.5% | 16 of 19 / 69.8% | 19 of 19 / 70.1% |
| Missing values | 19 of 23 / 61.0% | 13 of 23 / 53.4% | 17 of 23 / 59.0% | 13 of 23 / 50.6% | 17 of 23 / 64.4% | 18 of 23 / 62.8% |
| Suppressed cells | 11 of 11 / 58.2% | 8 of 11 / 62.5% | 8 of 11 / 57.2% | 7 of 11 / 56.8% | 8 of 11 / 64.6% | 11 of 11 / 67.2% |
| Errors | 3 of 3 / 80.6% | 3 of 3 / 75.3% | 3 of 3 / 71.7% | 3 of 3 / 75.3% | 2 of 3 / 73.7% | 2 of 3 / 71.2% |

## What was left out

160 files were registered and 16 were not scored: 13 under the registered exclusion rules and 3 twins (two whose originals were excluded, and one our tool could not build). Each reason is in files.csv.

| File | Reason |
|---|---|
| `a01_cbs_landbouw_omzet` | cannot be downloaded or failed a safety check: HTTP 500 for https://opendata.cbs.nl/ODataApi/OData/85159NED/TypedDataSet?$format=json |
| `a11_cbs_gas_elektriciteit_bedrijven` | cannot be downloaded or failed a safety check: HTTP 500 for https://opendata.cbs.nl/ODataApi/OData/84901NED/TypedDataSet?$format=json |
| `a16_uci_tetouan_power` | 52416 records against the documented 52417 |
| `a24_uk_ons_cpih01_v67` | cannot be downloaded or failed a safety check: redirected to another host: https://static.ons.gov.uk/datasets/cpih01-time-series-v67.csv |
| `a34_uci_maternal_health` | 1014 records against the documented 1013 |
| `a55_eu_eurostat_ext_st_eu27_2020sitc` | cannot be downloaded: the API answered with an asynchronous extraction notice (a SOAP envelope), not the SDMX-CSV table |
| `b03_uk_contracts_finder_awards_2023` | cannot be downloaded or failed a safety check: HTTP 429 for https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?publishedFrom=2023-01-01&publishedTo=2023-12-31&stages=award&limit=100&cursor=cHVibGlzaGVkRnJvbT0yMDIzLTAxLTAxfHB1Ymxpc2hlZFRvPTIwMjMtMTItMzF8c3RhZ2VzPWF3YXJkfGxpbWl0PTEwMHxuZXh0Q3Vyc29yPTU5NTUyNQ== |
| `b15_fr_rpls_nouvelle_aquitaine` | cannot be downloaded or failed a safety check: larger than 2 GB |
| `b17_nl_bron_2023` | cannot be downloaded or failed a safety check: member is not plain data or documentation text: 01-01-2023_31-12-2023/Netwerkgegevens/wegvakgeografie.dbf |
| `b30_de_dwd_kl_05906_mannheim` | cannot be downloaded or failed a safety check: member is not plain data or documentation text: Metadaten_Geraete_Luftdruck_Stationshoehe_05906.html |
| `b34_uci_pamap2_subject101` | cannot be downloaded or failed a safety check: member is not plain data or documentation text: PAMAP2_Dataset.zip |
| `b38_uci_el_nino_tao` | cannot be downloaded or failed a safety check: member is not plain data or documentation text: el_nino.data.html |
| `b45_ie_doj_family_reunification_nationality` | 657 records against the documented 660 |
| `t01_cbs_landbouw_omzet` | its original is excluded |
| `t04_eia_seds` | cannot be built: its original's JSONL records differ in keys, which the twin builder cannot write back (a tool limitation, not a registered reason) |
| `t27_uk_ons_cpih01_v67` | its original is excluded |

## Deviations from the registration

Recorded as they happened:

- Six files are scored as published for the primary result (a19, a20, b27, b31, b35, b02); their cleaned copies (comment, preamble, notes or units lines dropped; ARFF written as CSV) are scored once more as an unregistered secondary view (Austin, 2026-11-09).
- t04_eia_seds is excluded because the twin builder cannot write back JSONL records whose keys differ: a tool limitation, not a registered reason.
- t26_noaa_gml_co2_daily was built from the cleaned copy of its original a19.
- a09_scb_examina was downloaded a second time with a full query (valueCodes for every variable), after the first download returned the API's 5-row default selection; the second has the documented 1,335 rows.
- Tool faults found during the download were fixed and their files fetched again: a15 (a cap check counted the cap as used), b11 (a body that broke mid-transfer was not retried), b39, b40, b41 and b42 (archive members were judged by extension, not by their bytes as registered).
- a46 and a54 (INE) were registered as ISO-8859-15 but were published as UTF-8 with a byte-order mark; no encoding fix was applied.
- `b02` is published as ARFF, which no version reads, so it meets no mark for any version.

## Proofs for v11

v11 is the version live in the product, where every score is proven with a Groth16 zero-knowledge proof. We proved each of the 133 set 9 files whose v11 score is published here, with the circuit and proving key the product uses. The proofs are in [proofs/](proofs), the verification key is [verification_key.json](verification_key.json), and [verify.mjs](verify.mjs) checks them all.

What a proof shows, without the rules being published:

- The score, its band and the results of the four checks follow from one committed set of counts, under the circuit the product uses. A v11 score in files.csv cannot have been typed in or changed afterwards.
- The proof names the file it scored, by the SHA-256 in files.csv.
- Every proof carries the same rules hash, the one the live product requires: `396556269880125874106496313466262085983789455464062034929421943227479966039`.
- The circuit was fixed before this set existed. Its verifier contract, `0xd24eddd2be5506916aeda76c4beb4159c439990c` on Avalanche Fuji, was deployed in block 60,597,805 at 2026-11-05 23:28:00 UTC (transaction `0xff51aeef5bec1dab940860f74a37417c2ee66e74f295a2c524d81c1977687a9b`), 4 days before set 9 was registered. The network sets that time, so anyone can confirm it, and the contract accepts these proofs.

What a proof does not show:

- That the counts were read correctly from the file. Counting happens in the engine, outside the circuit, and the engine is not public. So a proof rules out a score changed after the fact and leaves the counting itself to be trusted.
- Anything about v6 to v10. Only v11's scores are proven here.
- An independent setup. Aseryx ran the circuit's setup alone, so the proofs rest on Aseryx having discarded the secret values of that setup. Fuji is a test network.

To check them:

```
npm install
node heldout9/verify.mjs             # every proof against verification_key.json
node heldout9/verify.mjs --onchain   # and against the contract on Fuji
```

A proof's public signals, in order: the score (0), the score from the data alone (1), the band (2), the rows counted (3), the four checks (4 to 7), two counts of declarations (8 and 9), the file's hash (10), the label, schema and rules hashes (11 to 13) and a commitment to the private inputs (14). A hash is the first 62 hex digits of a SHA-256, written as a decimal number.

For a file scored as published, you can download it from its publisher, hash it and match it to its proof. Converted files and twins were written by our tools, so their hashes can only be matched against files.csv.

## When things happened

All times UTC.

| Event | Time |
|---|---|
| Registration committed to our private repository | 2026-11-10 00:04:52 |
| Registration summary last edited on our internal Notion page | 2026-11-10 00:06:02 |
| First download | 2026-11-10 00:12:33 |
| Last download | 2026-11-10 00:50:26 |
| Results report committed | 2026-11-10 01:13:32 |
| First push of the registration to GitHub (private) | 2026-11-10 02:08:14 |

The commit time comes from our own machine, and the Notion page and the repository are private. Nobody outside can check that the registration came before the downloads, so read this order as our statement. The next held-out set will be registered in public, with a timestamp we do not control, before any file is downloaded.

## What you can and cannot check

You can check each label against the publisher's own documentation linked in the registration, recompute the first four marks from files.csv, confirm a file you download against its SHA-256, and verify the proof of every v11 score. Many of these files are live tables, so a download made today may differ from the copy we froze.

You cannot run the score yourself. The engines are not public.
