import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoutImage from "../../../public/icons/icons-logout.png";
import sessionStorage from 'sessionstorage';

const LogoutButton = () => {
  const { disconnect, connected } = useWallet();
  const router = useRouter();
  const disconnectWallet = () => {
    disconnect();
    if (!connected) {
      sessionStorage.removeItem('walletAddress');
      router.push("/");
    }
  };

  return (
    <button onClick={disconnectWallet}>
      <Image
        src={LogoutImage}
        alt="Button Icon"
        style={{
          marginLeft: "30px",
          marginBottom: "20px",
          height: "70px",
          width: "70px",
        }}
      />
    </button>
  );
};

export default LogoutButton;
