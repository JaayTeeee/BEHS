import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import Image from "next/image";
import React from "react";
import Button from "../../public/components/RectangleButton";
import HealthCare from "../../public/icons/icons-healthcare.png";
import MedicalImage from "../../public/icons/medical.jpg";

function Home() {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

  const wallets = React.useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );

  return (
    <main>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "160px",
            left: "130px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              letterSpacing: "3px",
            }}
          >
            <Image src={HealthCare} className="icon" alt="healthcare" />
            <div className="BEHS ml-7 mt-2">BEHS</div>
          </div>
          <div
            className="BEHS"
            style={{ fontSize: "24px", marginTop: "-30px" }}
          >
            <strong>Blockchain-based Electronic Health System</strong>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            <Button text="LOGIN" onClick={""} />
          </div>
        </div>

        <div className="circle" />
        <Image
          className="circle"
          src={MedicalImage}
          alt="medical-image"
          objectFit="cover"
          style={{ right: "-60px", top: "-200px" }}
        />
      </div>
    </main>
  );
}
