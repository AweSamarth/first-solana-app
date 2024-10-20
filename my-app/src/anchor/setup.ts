'use client'
import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { IDL, FirstSolana } from "./idl";

const programId = new PublicKey("9mywEXW8LWee1d9E46xQxqo4HtaLseZb7EHQJTDC3QUJ");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
export const program = new Program<FirstSolana>(IDL, programId, {
  connection,
});

export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("counter")],
  program.programId
);

// This is just a TypeScript type for the Counter data structure based on the IDL
export type FirstSolanaData = IdlAccounts<FirstSolana>["counter"];