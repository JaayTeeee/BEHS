"use client";
import React, { useEffect, useState } from "react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import MedRecordImage from "../../../public/icons/icons-medical-record.png";
import PermissionImage from "../../../public/icons/icons-permission.png";
import ResearchImage from "../../../public/icons/icons-research.png";
import ButtonWithImage from "../components/ButtonWithImage";
import HomePageButton from "../components/HomePageButton";
import LogoutButton from "../components/LogoutButton";
import UserProfileButton from "../components/UserProfileButton";
import CheckUsername from "../functions/getUsername";

export default function Home() {
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get('WalletAddress');
    setWalletAddress(addressFromQuery);
  }, [fetchWalletAddress]);

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
        <main>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              <HomePageButton />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "30px",
                marginTop: "15px",
              }}
            >
              <UserProfileButton />
              <LogoutButton />
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "100px",
            }}
          >
            <div className="BEHS" style={{ fontSize: "65px" }}>
              <strong>
                WELCOME, <CheckUsername />
              </strong>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-20px",
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <ButtonWithImage
                text="Research Opportunities"
                imageSrc={ResearchImage}
                link={`/research?WalletAddress=${fetchWalletAddress}`}
              />
            </div>
            <div style={{ marginRight: "20px" }}>
              <ButtonWithImage
                text="Permissions"
                imageSrc={PermissionImage}
                link={`/permissions?WalletAddress=${fetchWalletAddress}`}
              />
            </div>
            <div>
              <ButtonWithImage
                text="Medical Records"
                imageSrc={MedRecordImage}
                link={`/records?WalletAddress=${fetchWalletAddress}`}
              />
            </div>
          </div>
        </main>
      </WalletProvider>
    </ConnectionProvider>
  );
}
