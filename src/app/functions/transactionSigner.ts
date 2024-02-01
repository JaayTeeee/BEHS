import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const createTransaction = (
  fromPublicKey: PublicKey,
  toPublicKey: PublicKey,
  amount: number
): Transaction => {
  const transaction = new Transaction();

  const instruction = SystemProgram.transfer({
    fromPubkey: fromPublicKey,
    toPubkey: toPublicKey,
    lamports: amount,
  });
  transaction.add(instruction);

  return transaction;
};

const signTransaction = async (transaction: Transaction) => {
  try {
    const provider = window.solana;
    const solana = new Connection(
      "https://white-sleek-arrow.solana-devnet.quiknode.pro/61329ff7a5adf71efc68fb108d880e907f057064/"
    );

    const blockhashObj = await solana.getLatestBlockhash();
    const blockhash = blockhashObj.blockhash;
    transaction.recentBlockhash = blockhash;
    const signedTransaction = await provider.signTransaction(transaction);
    return true; // Transaction signed successfully
  } catch (error) {
    console.error("Error signing transaction:", error);
    return false; // Transaction signing failed
  }
};
export { createTransaction, signTransaction };
