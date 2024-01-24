"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import Image from "next/image";
import { useMemo } from "react";
import HealthCare from "../../public/icons/icons-healthcare.png";
import MedicalImage from "../../public/icons/medical.jpg";
import LoginButton from "./components/LoginButton";

require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  const solNetwork = WalletAdapterNetwork.Testnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network: solNetwork }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [solNetwork]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <div className="App">
            <div className="App">
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
                    <LoginButton />
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
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
