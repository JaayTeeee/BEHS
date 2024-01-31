"use client";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import searchIcon from "../../../public/icons/icons-search-black.png";
import HomePageButton from "../components/HomePageButton";
import RectangleButton from "../components/RectangleButton";
import SearchButton from "../components/searchButton";

export default function Records() {
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allRecords, setAllRecords] = useState<any[]>([]); // Store all records
  const [checkData, setCheckData] = useState<any[]>([]); // Store filtered/searched records
  const [checkFirstData, setCheckFirstData] = useState<boolean>(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("WalletAddress");
    setWalletAddress(addressFromQuery);
  }, [fetchWalletAddress]);

  useEffect(() => {
    if (fetchWalletAddress) {
      // Fetch all records when fetchWalletAddress is available
      fetchAllRecords(fetchWalletAddress);
    }
  }, [fetchWalletAddress]);
  
 
  const handleSearch = async (query: string) => {
    console.log("Query:", query);
    if (query.trim() !== "") {
      try {
        const data = await searchRecord(query);
        setCheckData(data);
        setCheckFirstData(true);
      } catch (error) {
        console.error("Error fetching medical records:", error);
      }
    } else {
      console.error("Empty query.");
    }
  };

  const fetchAllRecords = async (query: string) => {
    try {
      // Fetch all records from the server
      const response = await fetch("http://localhost:3001/api/getRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query: fetchWalletAddress }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAllRecords(data.records || []);
          setCheckData(data.records || []); // Initially show all records
          setCheckFirstData(true); // Update to indicate data is loaded
        } else {
          console.error("Failed to fetch records:", data.error);
        }
      } else {
        throw new Error("Failed to fetch records");
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const searchRecord = async (query: string): Promise<any[]> => {
    try {
      const checkRequest = await fetch("http://localhost:3001/api/searchRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query: query, userAddress: fetchWalletAddress }),
      });

      if (checkRequest.ok) {
        const checkData = await checkRequest.json();
        if (checkData.success) {
          console.log("Received data:", checkData.records);
          return checkData.records || [];
        } else {
          console.error("Failed to check ID:", checkData);
          return [];
        }
      } else {
        throw new Error("Failed to check ID");
      }
    } catch (error) {
      console.error("Fetch error during check:", error);
      return [];
    }
  };

  const handleDataReceived = (recordID: string) => {
    console.log("View details of record with ID:", recordID);
  };

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
        </div>
      </div>
      <div style={{ marginBottom: "50px", marginTop: "-100px" }}>
          <div className="search-box" style={{ marginLeft: "1050px" }}>
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
        {checkFirstData && checkData.length > 0 ? (
          checkData.map((record, index) => (
            <div key={index} style={{ marginBottom: "30px" }}>
              <div className="green-bar">
                <div className="greenbar-title">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ marginTop: "40px", flexDirection: "column" }}>
                      <strong style={{ marginRight: "50px" }}>Record ID</strong>
                      <div style={{ marginLeft: "40px", marginRight: "50px" }}>{record.recordID}</div>
                    </div>
                    <div style={{ marginTop: "40px", flexDirection: "column" }}>
                      <strong style={{ marginRight: "50px" }}>Record Date</strong>
                      <div style={{ marginLeft: "5px", marginRight: "50px" }}>{record.recordDate}</div>
                    </div>
                    <div style={{ marginTop: "40px", flexDirection: "column", marginLeft: "100px" }}>
                      <strong>Recorded By</strong>
                      <div>{record.firstName} {record.lastName}</div>
                    </div>
                    <div style={{ marginTop: "32px", flexDirection: "column", marginLeft: "430px" }}>
                      <RectangleButton
                        text="DETAILS"
                        textStyle={{ fontSize: "30px", fontWeight: "bold" }}
                        onClick={() => handleRecordDetails(record.recordID)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : checkFirstData && checkData.length === 0 ? (
          <div
            className="BEHS"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "32px",
              marginTop: "40px",
            }}
          >
            <strong>No records found.</strong>
          </div>
        ) : (
          <div
            className="BEHS"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "24px",
              marginLeft: "320px",
              marginTop: "40px",
            }}
          >
            Fetching records...
          </div>
        )}
    </main>
  );
}
