"use client";

import DatabaseImage from "../../../public/icons/icons8-database-view-100.png";
import InsertTableImage from "../../../public/icons/icons8-insert-table-100.png";
import ButtonWithImage from "../components/ButtonWithImage";
import HomePageButton from "../components/HomePageButton";
import LogoutButton from "../components/LogoutButton";
import UserProfileButton from "../components/UserProfileButton";
import CheckUsername from "../components/getUsername";

export default function Home() {
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
          <strong>WELCOME, <CheckUsername /></strong>
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
            link="/research"
          />
        </div>
        <div>
          <ButtonWithImage
            text="Insert Medical Records"
            imageSrc={InsertTableImage}
            link="/records"
          />
        </div>
      </div>
    </main>
  );
}
