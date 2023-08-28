import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ReadWrite } from "../target/types/read_write";
import assert from 'assert'

describe("read-write", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(anchor.AnchorProvider.env());
  const { SystemProgram } = anchor.web3;
  const program = anchor.workspace.ReadWrite as Program<ReadWrite>;
  const myAccount = anchor.web3.Keypair.generate();

  it("Can initialize", async () => {
    await program.methods
      .initialize(new anchor.BN(1234))
      .accounts({
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([myAccount])
      .rpc();

    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    assert.ok(account.data.eq(new anchor.BN(1234)));

  });

  it("Can update", async () => {
    await program.methods
      .update(new anchor.BN(5000))
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .rpc();
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    assert.ok(account.data.eq(new anchor.BN(5000)));

  });
});
