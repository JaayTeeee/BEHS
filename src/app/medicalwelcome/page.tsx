"use client";

import { useEffect, useState } from "react";
import DatabaseImage from "../../../public/icons/icons8-database-view-100.png";
import InsertTableImage from "../../../public/icons/icons8-insert-table-100.png";
import ButtonWithImage from "../components/ButtonWithImage";
import HomePageButton from "../components/HomePageButton";
import LogoutButton from "../components/LogoutButton";
import CheckUsername from "../functions/getUsername";

export default function Home() {
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("WalletAddress");
    setWalletAddress(addressFromQuery);
  }, [fetchWalletAddress]);

  return (
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
        <div style={{ marginRight: "40px" }}>
          <ButtonWithImage
            text="Retrieve Medical Record"
            imageSrc={DatabaseImage}
            link={`/medicalretrieve?WalletAddress=${fetchWalletAddress}`}
          />
        </div>
        <div>
          <ButtonWithImage
            text="Insert Medical Records"
            imageSrc={InsertTableImage}
            link={`/medicalinsert?WalletAddress=${fetchWalletAddress}`}
          />
        </div>
      </div>
    </main>
  );
}
