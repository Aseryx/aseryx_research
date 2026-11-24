# Held-out set 10: the generated files as they were made

Written on 2026-11-24, before any file of set 10 was downloaded and before anything was scored.

This file corrects the generator rows of `sources-2026-11-24.md` and changes no rule. That file was published before the generator tools were chosen, and described R13 and R15 as runs of TPC's dbgen and dsdgen (R15 with a random-number seed of 10) and R22 to R24 as a run of a `run_synthea` script. The files were made as follows. The generators behind both TPC families have no seed option, so none applies to R13 and R15; the scale factor fixes their output.

- **TPC-H and TPC-DS:** DuckDB 2.0.1, extensions `tpch` v2.0.1 (from core) and `tpcds` v2.0.1 (from core). The extensions embed TPC's dbgen and dsdgen. One connection per family, scale factor 1, each table written to CSV with a header row.
- **Synthea:** release v4.0.0, `synthea-with-dependencies.jar` with SHA-256 `ed43c20ad40ba5c3bc724503a5af032715fe3c491620b766148e7c2361e6ecc1`, run with openjdk version "17.0.21.1" 2026-11-17, seed and population as in the table, CSV exporter on. Synthea dates a run from the clock; this run was made at 2026-11-24T22:04:37Z.

| Id | Step | Call | Table | Rows | SHA-256 |
|---|---|---|---|---|---|
| R13 | tpch | CALL dbgen(sf=1) | customer | 150000 | `5062d5942eac25a7904c5accdc2f8a92429bb0f256daa4da1e9990e3ee4983d2` |
| R15 | tpcds | CALL dsdgen(sf=1) | item | 18000 | `d68236048f9339ee8a889a9f6c8755f903f98476a935d085431628b43778215c` |
| R22 | synthea | java -jar synthea-with-dependencies.jar -s 12345 -p 2000 | patients.csv | 2231 | `29d44ca2fc9096ee21e2dd8e6d6d4fec00a6f38ce94d4eacfba59dfc79b1bf9f` |
| R23 | synthea | java -jar synthea-with-dependencies.jar -s 12345 -p 2000 | encounters.csv | 126094 | `c49722ab688c421ce5cd5bdb14fccc88b12c5258c02176981046105f8ac5b12e` |
| R24 | synthea | java -jar synthea-with-dependencies.jar -s 12345 -p 2000 | observations.csv | 1625134 | `014c6cefc6d3c72e9fce3824f8c2a03e58be0cae2ece06718a83ae0dfe307fef` |

The generated data is not published; these hashes and the scores are. R24 has more than 500,000 rows, so it is outside the twin row rule and is a good file.
