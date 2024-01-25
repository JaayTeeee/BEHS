import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const router = useRouter();

  if (publicKey != null && connected) {
    console.log("Wallet Address: ", publicKey.toBase58());
    const walletAddress = publicKey.toBase58();
    const checkRequest = new Request("http://localhost:3001/api/checkID", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      mode: "cors",
      body: JSON.stringify({ walletAddress }),
    });

    fetch(checkRequest)
  .then((checkResponse) => {
    if (checkResponse.ok) {
      // Continue with parsing JSON when the response is OK
      return checkResponse.json();
    } else {
      // Log additional details about the response when it's not OK
      console.error("Failed to check address. Response details:", checkResponse);
      // You can return a failed promise here or throw an error if needed
      throw new Error("Failed to check address");
    }
  })
  .then((checkData) => {
    if (checkData && checkData.success === true) {
      const encodedAddress = encodeURIComponent(walletAddress);
      router.push(`/welcome?WalletAddress=${encodedAddress}`);
    } else {
      // Handle the case when checkData.success is not true
      // For example, you might want to insert the address or perform some other action
      const insertRequest = new Request("http://localhost:3001/api/insertID", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        mode: "cors",
        body: JSON.stringify({ walletAddress }),
      });

      fetch(insertRequest)
        .then((insertResponse) => {
          if (insertResponse.ok) {
            const encodedAddress = encodeURIComponent(walletAddress);
            router.push(`/register?WalletAddress="${encodedAddress}`);
          } else {
            // Log additional details about the insert response when it's not OK
            console.error("Failed to insert address. Response details:", insertResponse);
            // Handle the case when insert request fails
            throw new Error("Failed to insert address");
          }
        })
        .catch((error) => {
          // Log additional details about the fetch error during insert
          console.error("Fetch error during insert:", error);
          // Handle fetch errors during insert
          throw error;
        });
    }
  })
  .catch((error) => {
    // Log additional details about the fetch error during check
    console.error("Fetch error during check:", error);
    // Handle fetch errors during check
    throw error;
  });


  } else {
    console.log('FAILED');
  }

  return (
    <div>
      <WalletMultiButton />
    </div>
  );
};

export default LoginButton;
