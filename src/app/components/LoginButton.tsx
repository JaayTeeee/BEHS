import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
const LoginButton = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const router = useRouter();
  if (publicKey != null && connected == true) {
    console.log(publicKey.toBase58());
    router.push("/welcome");
  }

  return (
    <div>
      <WalletMultiButton />
    </div>
  );
};

export default LoginButton;
