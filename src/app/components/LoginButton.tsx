import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const LoginButton = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const router = useRouter();
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  if (publicKey != null && connected) {
    const walletAddress = publicKey.toBase58();
    sessionStorage.setItem('walletAddress', walletAddress);
    const checkRequest = new Request("http://localhost:3001/api/checkID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ walletAddress }),
    });

    fetch(checkRequest)
      .then((checkResponse) => {
        if (checkResponse.ok) {
          return checkResponse.json();
        } else {
          console.error(
            "Failed to check address. Response details:",
            checkResponse
          );
          throw new Error("Failed to check address");
        }
      })
      .then((checkData) => {
        if (checkData && checkData.success === true) {
          const userType = checkData.userType;
          if (userType === "user") {
            const encodedAddress = encodeURIComponent(walletAddress);
            router.push(`/welcome?WalletAddress=${encodedAddress}`);
          } else if (userType === "hospital") {
            const encodedAddress = encodeURIComponent(walletAddress);
            router.push(`/medicalwelcome?WalletAddress=${encodedAddress}`);
          } else {
            console.error("Unknown user type:", userType);
          }
        } else {
          const encodedAddress = encodeURIComponent(walletAddress);
          router.push(`/register?WalletAddress=${encodedAddress}`);
        }
      })
      .catch((error) => {
        console.error("Fetch error during check:", error);
        throw error;
      });
  } else {
    console.log("FAILED");
  }

  return (
    <div>
      <WalletMultiButtonDynamic />
    </div>
  );
};

export default LoginButton;
