import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { FirstSolana } from "../target/types/first_solana";
import {Keypair, PublicKey} from "@solana/web3.js"

describe("first-solana", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.FirstSolana as Program<FirstSolana>;

  // const counterAccount= new Keypair()
  const [counterPDA] = PublicKey.findProgramAddressSync([Buffer.from("counter")], program.programId)


  it("Is initialized!", async () => {
    // Add your test here.
    const transactionSignature = await program.methods.initialize().rpc()
    const accountData = await program.account.counter.fetch(
      counterPDA
    )
    
    console.log(`Transaction signature is: ${transactionSignature} `)
    console.log(`Count: ${accountData.count}`)

  })
  it("increments", async()=>{
    const transactionSignature = await program.methods.increment().rpc()
    const accountData = await program.account.counter.fetch(counterPDA)    
    console.log(`Transaction signature is: ${transactionSignature} `)
    console.log(`Count: ${accountData.count}`)

  })
});
