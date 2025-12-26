import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import { VotingDapp } from "../target/types/votingdapp";
import { BankrunProvider } from "anchor-bankrun";
import { startAnchor } from "solana-bankrun";

const IDL = require("../target/idl/voting_dapp.json");

const votingAddress = new PublicKey("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H");

describe('VotingDapp', () => {
  it('Initialze Poll', async () => {
    const context = await startAnchor("", [{ name: "votingdapp", programId: votingAddress }], []);
    const provider = new BankrunProvider(context);

    const votingProgram = new Program<VotingDapp>(IDL, provider);

    await votingProgram.methods.initializePoll(
      new anchor.BN(1),
      "What is your favorite color?",
      new anchor.BN(0),
      new anchor.BN(1851529044),
    ).rpc();
  });
});