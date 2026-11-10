// Checks the published v11 proofs of held-out set 9.
//
//   npm install
//   node heldout9/verify.mjs             every proof against verification_key.json
//   node heldout9/verify.mjs --onchain   and against the public verifier contract on Avalanche Fuji
//
// For each proof it checks that the proof is valid, that the score it proves is the v11 score in
// files.csv, that it names the SHA-256 of the scored copy in files.csv, and that every proof carries
// the same rules hash. It exits with 1 if any check fails.
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as snarkjs from 'snarkjs';

const here = dirname(fileURLToPath(import.meta.url));
const VERIFIER = '0xd24eddd2be5506916aeda76c4beb4159c439990c';
const FUJI_RPC = 'https://api.avax-test.network/ext/bc/C/rpc';
// Where each public value sits in a proof's public signals
const SCORE = 0;
const FILE_HASH = 10;
const RULES_HASH = 13;

/** Rows of a CSV file as objects keyed by the header; quoted cells may hold commas, quotes and line breaks. */
function readCsv(path) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const text = readFileSync(path, 'utf8');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else cell += c;
  }
  const [header, ...lines] = rows;
  return lines.map((line) => Object.fromEntries(header.map((name, i) => [name, line[i]])));
}

/** A SHA-256 as a proof carries it: its first 62 hex digits as a decimal number. */
const fieldHash = (sha256) => BigInt(`0x${sha256.slice(0, 62)}`).toString();

const onchain = process.argv.includes('--onchain');
const key = JSON.parse(readFileSync(join(here, 'verification_key.json'), 'utf8'));
const files = Object.fromEntries(readCsv(join(here, 'files.csv')).map((row) => [row.stem, row]));
const stems = readdirSync(join(here, 'proofs')).filter((name) => name.endsWith('.json')).map((name) => name.slice(0, -5)).sort();

let contract = null;
if (onchain) {
  const { ethers } = await import('ethers');
  contract = new ethers.Contract(
    VERIFIER,
    ['function verifyProof(uint256[2] a, uint256[2][2] b, uint256[2] c, uint256[15] signals) view returns (bool)'],
    new ethers.JsonRpcProvider(FUJI_RPC)
  );
}

const problems = [];
const rulesHashes = new Set();
for (const stem of stems) {
  const { proof, publicSignals } = JSON.parse(readFileSync(join(here, 'proofs', `${stem}.json`), 'utf8'));
  const file = files[stem];
  if (!file) {
    problems.push(`${stem}: has a proof but is not in files.csv`);
    continue;
  }
  if (!(await snarkjs.groth16.verify(key, publicSignals, proof))) problems.push(`${stem}: the proof is not valid`);
  if (publicSignals[SCORE] !== file.v11) problems.push(`${stem}: the proof gives ${publicSignals[SCORE]}, files.csv gives ${file.v11}`);
  if (publicSignals[FILE_HASH] !== fieldHash(file.scored_sha256)) problems.push(`${stem}: the proof names another file than files.csv`);
  rulesHashes.add(publicSignals[RULES_HASH]);
  if (contract) {
    const b = [[proof.pi_b[0][1], proof.pi_b[0][0]], [proof.pi_b[1][1], proof.pi_b[1][0]]];
    if (!(await contract.verifyProof(proof.pi_a.slice(0, 2), b, proof.pi_c.slice(0, 2), publicSignals))) problems.push(`${stem}: the contract rejects the proof`);
  }
}
if (rulesHashes.size > 1) problems.push(`the proofs carry ${rulesHashes.size} different rules hashes`);
const unproven = Object.values(files).filter((file) => /^\d+$/.test(file.v11) && !stems.includes(file.stem));
for (const file of unproven) problems.push(`${file.stem}: has a v11 score but no proof`);

for (const problem of problems) console.error(problem);
console.log(`${stems.length} proofs checked${onchain ? `, each also by the contract at ${VERIFIER}` : ''}; ${problems.length} problems`);
console.log(`Rules hash carried by every proof: ${[...rulesHashes].join(', ')}`);
// snarkjs keeps worker threads alive, so the exit is explicit
process.exit(problems.length ? 1 : 0);
