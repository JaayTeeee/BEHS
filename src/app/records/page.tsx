"use client";
import Image from "next/image";
import searchIcon from "../../../public/icons/icons-search-black.png";
import HomePageButton from "../components/HomePageButton";
import RectangleButton from "../components/RectangleButton";
import SearchButton from "../components/searchButton";
import FetchMedicalRecord from "../functions/getMedicalRecord";
import { useEffect, useState } from "react";

export default function Records() {
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);
  const [lastUpdateDate, setLastUpdateDate] = useState<string | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<any>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get('WalletAddress');
    setWalletAddress(addressFromQuery);
  }, [fetchWalletAddress]);

  // Callback function to handle received data from FetchMedicalRecord
  function handleDataReceived(medicalRecordData: any) {
    if (medicalRecordData && medicalRecordData.lastUpdate) {
      setLastUpdateDate(medicalRecordData.lastUpdate);
      setMedicalRecord(medicalRecordData); // Save the entire medical record data
    }
  }

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
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "-20px",
          marginRight: "650px",
          marginBottom: "100px",
        }}
      >
        <div style={{ flexDirection: "column", marginLeft: "45px" }}>
          <div className="BEHS" style={{ fontSize: "78px" }}>
            <strong>Medical Record</strong>
          </div>
          <div style={{ marginRight: "450px" }}>
          <strong>Last Update: {medicalRecord && medicalRecord.recordDate}</strong>
          <FetchMedicalRecord userAddress={fetchWalletAddress} onMedicalRecordDataReceived={handleDataReceived} />
          </div>
        </div>
      </div>
      <div className="search-box" style={{ marginLeft: "1050px", marginTop: "-100px" }}>
            <Image
              src={searchIcon}
              className="icon"
              alt="search-icon"
              style={{
                height: "25px",
                width: "25px",
                marginLeft: "10px",
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              style={{
                backgroundColor: "#dfdfdf",
                outline: "none",
                border: "none",
                marginLeft: "5px",
              }}
            />
            <SearchButton text="Search" onClick={""} />
          </div>
      <div
            className="green-bar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="greenbar-title">
              <strong style={{ marginLeft: "50px", marginRight: "150px" }}>Record ID</strong>
              <strong style={{ marginRight: "150px" }}>Date</strong>
              <strong>Recorded by</strong>
            </div>
            {medicalRecord && (
              <div>
                  <strong style={{ fontSize: "50px", marginLeft: "505px", }}>{medicalRecord.recordID}</strong>
                  <strong>{medicalRecord.recordDate}</strong>
                  <strong>{medicalRecord.hospitalAddress}</strong>
                </div>
            )}
            <br/>
            <RectangleButton
              text="DETAILS"
              textStyle={{ fontSize: "30px", fontWeight: "bold" }}
              onClick={""}
            />
          </div>
    </main>
  );
}
