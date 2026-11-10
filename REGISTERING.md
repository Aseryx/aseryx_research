# How a held-out set is registered

A held-out set tests frozen versions of the quality score on files none of them has seen. It counts only if everything that could be bent after seeing the results was fixed before any file was downloaded. This page is the order we follow, from held-out set 10 on.

## Order

1. **Freeze the versions under test.** A registration names its files. A version still being tuned after the files are named could be tuned toward them, so we register only once every version the set will test is frozen.
2. **Write the registration.** It fixes the files and where each comes from, the licence bar, the labelling rules and each file's label with the publisher's own evidence, the pass marks, the exclusion rules, how versions are compared, and that each version scores the set once. It states no prediction.
3. **Publish it here before any download.** The registration is committed to this repository under `heldout<N>/registration.md`, pushed, and stamped with OpenTimestamps. The stamp anchors the file's SHA-256 in a Bitcoin block, a time we do not control.
4. **Download once, then score once.** Every file is downloaded once and kept with its SHA-256. Each version scores those copies once. A file the registered rules exclude is reported with the reason.
5. **Publish the results beside the registration.** The marks, intervals, every comparison, every exclusion and every deviation from the registration, and a proof of every score made by the version live in the product.
6. **Retire the set.** After scoring, the set counts as seen. It is never used as unseen data again.

A registration is never edited after it is stamped. A correction is a new dated file that says what it corrects.

## Checking a registration's date

Each stamped file has a `.ots` file beside it. With the OpenTimestamps client (`pip install opentimestamps-client`):

```
ots verify heldout10/registration.md.ots
```

The client reports the Bitcoin block that confirms the file existed. Compare it with the first download time published with the results.

## Set 9

Set 9 was registered before this order existed, in our private repository and on an internal Notion page. Its registration is published here with the results, so its date rests on our statement. See [heldout9/README.md](heldout9/README.md), "When things happened". Its files in this repository were stamped on 2026-11-10, after scoring: those stamps date the publication, not the registration.
