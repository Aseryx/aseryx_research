# Working in aseryx_research

The public record of the Aseryx quality score's held-out tests. Everything here is public the moment it is pushed, and each GitHub release is archived on Zenodo with its own DOI.

## Where the content comes from

Nothing under a test folder is written by hand. The files are generated in the private repository `aseryx_benchmarks`:

| Files | Made by |
|---|---|
| `heldout<N>/README.md`, `registration.md`, `files.csv`, `intervals.csv`, `differences.csv` | `node tools/publish-research.mjs` in `aseryx_benchmarks`. It recomputes every mark from the scores it publishes and stops when one differs from the record, when a proof disagrees, or when a private term reaches an output. |
| `heldout<N>/proofs/`, `verification_key.json` | `formula/harness/proofs.js --artifacts <production circuit> --save` in `aseryx_benchmarks`, with the circuit and key the product uses. |
| `heldout<N>/SHA256SUMS` and `.ots` files | `shasum -a 256` over the folder, then `ots stamp` (OpenTimestamps). |

To change a number or a sentence in a test folder, change the record or the generator in `aseryx_benchmarks` and generate again. Edit only the repository-level files here by hand (`README.md`, `REGISTERING.md`, `AGENTS.md`, `CITATION.cff`, `.zenodo.json`, `LICENSE.md`).

## Rules

- Never publish the scoring rules, the engines, prototypes, attack cases or check-case recipes. A registration that contains them is published with the passage withheld and marked.
- A registration is never edited after it is stamped. A correction is a new dated file.
- From set 10 on, follow `REGISTERING.md`: freeze the versions, publish and stamp the registration before any download, and publish the results beside it.
- After regenerating a folder, rewrite its `SHA256SUMS`, stamp it again, and run `node heldout<N>/verify.mjs` (and `--onchain`) before pushing.
- A new DOI comes only from a GitHub release (`gh release create`). Commits alone do not change the Zenodo record. Update `CITATION.cff` (`version`, `date-released`) with each release.
- `CITATION.cff` must match the Zenodo record of the latest release, so its `title` and `abstract` change only with a release. `.zenodo.json` already holds the next release's title, "Aseryx research: held-out tests of the Aseryx quality score" (approved messaging says quality score, not readiness score): copy that title and abstract into `CITATION.cff` in the release commit.
- Merge pull requests with `gh pr merge <n> --rebase --delete-branch`.
- Here, unlike on aseryx.xyz, technical terms stay (zero-knowledge, Groth16, Avalanche Fuji): researchers need them to check the proofs. The website follows the copy rules' word list and links here (Austin, 2026-11-10).

## Memory

This repository has no MentisDB chain of its own. Decisions about how the record is made go on `aseryx-benchmarks`; milestones such as a release or a new DOI go on `aseryx-brain` as one or two lines.
