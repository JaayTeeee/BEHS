"use client";
import Image from "next/image";
import { useState } from "react";
import searchIcon from "../../../public/icons/icons-search-black.png";
import HomePageButton from "../components/HomePageButton";
import MedicalRecordInserter from "../components/MedicalRecordInserter";
import SearchButton from "../components/searchButton";

interface CheckData {
  walletAddress: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateBirth: string;
  idNumber: string;
}

export default function MedicalInsert() {
  const [checkData, setCheckData] = useState<CheckData | null>(null);
  const [checkFirstData, setCheckFirstData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query: string) => {
    console.log("Query:", query);
    if (typeof query === "string") {
      try {
        const data = await searchRecord({ query }); // Pass the query as an object
        if (checkFirstData !== false) {
          setCheckFirstData(true);
        }
        setCheckData(data);
      } catch (error) {
        console.error("Error fetching medical records:", error);
        if (checkFirstData !== false) {
          setCheckFirstData(true);
        }
        setCheckData(null);
      }
    } else {
      console.error("Invalid query type:", query);
    }
  };

  const searchRecord = async ({
    query,
  }: {
    query: string;
  }): Promise<CheckData | null> => {
    try {
      const checkRequest = await fetch(
        "http://localhost:3001/api/checkUserData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      if (checkRequest.ok) {
        const checkData = await checkRequest.json();
        if (checkData.success) {
          console.log("Received data:", checkData);
          return checkData as CheckData;
        } else {
          console.error("Failed to check ID:", checkData);
          return null;
        }
      } else {
        throw new Error("Failed to check ID");
      }
    } catch (error) {
      console.error("Fetch error during check:", error);
      return null;
    } finally {
      setCheckFirstData(true);
    }
  };

  return (
    <main style={{ height: "100vh", overflow: "auto" }}>
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
            marginBottom: "20px",
          }}
        >
          <HomePageButton />
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "-60px",
          marginRight: "400px",
          marginBottom: "50px",
        }}
      >
        <div style={{ flexDirection: "column", marginLeft: "45px" }}>
          <div className="BEHS" style={{ fontSize: "78px" }}>
            <strong>Insert Medical Record</strong>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <div
              className="search-box"
              style={{
                marginLeft: "1050px",
                alignItems: "center",
              }}
            >
              <Image
                src={searchIcon}
                className="icon"
                alt="search-icon"
                style={{ height: "25px", width: "25px", marginLeft: "10px" }}
              />
              <input
                type="text"
                value={searchQuery}
                placeholder="Search for wallet address and ID No..."
                style={{
                  backgroundColor: "#dfdfdf",
                  outline: "none",
                  border: "none",
                  marginLeft: "10px",
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchButton onClick={() => handleSearch(searchQuery)} />
            </div>
          </div>
          <div
            className="BEHS"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "24px",
              marginLeft: "320px",
            }}
          >
            {checkData === null && (
              <>
                {checkFirstData === false ? (
                  <strong>
                    Please input user&apos;s demographic information by
                    searching for their address or ID Number:
                  </strong>
                ) : (
                  <strong>User not found!</strong>
                )}
              </>
            )}
          </div>
          <div style={{ display: "flex" }}>
            {checkData &&
              checkData.records &&
              checkData.records.map((record, index) => (
                <div key={index}>
                  <MedicalRecordInserter address={record.walletAddress} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
