const { PublicKey } = require("@coral-xyz/anchor").web3;

const programId = new PublicKey(process.argv[2]);
const seed = process.argv[3] ?? "vault";

const [pda, bump] = PublicKey.findProgramAddressSync(
  [Buffer.from(seed)],
  programId
);

console.log(`Program ID: ${programId.toBase58()}`);
console.log(`Seed: ${seed}`);
console.log(`PDA: ${pda.toBase58()}`);
console.log(`Bump: ${bump}`);