"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import searchIcon from "../../../public/icons/icons-search-black.png";
import HomePageButton from "../components/HomePageButton";
import RectangleButton from "../components/RectangleButton";
import { SearchComponent } from "../components/SearchComponent";
import SearchButton from "../components/searchButton";
import SearchMedicalRecord from "../functions/searchQueryRecord";

interface CheckData {
  recordID: string;
  recordDate: string;
  userAddress: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateBirth: string;
  idNumber: string;
  diagnosis: string;
  attachment: string;
  hospitalAddress: string;
}

export default function RetrieveRecord() {
  const [checkData, setCheckData] = useState<CheckData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRequest = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleSearch = async (query: string) => {
    console.log('Query:', query);
    if (typeof query === 'string') {
      try {
        const data = await searchRecord(query);
        setCheckData(data);
      } catch (error) {
        console.error("Error fetching medical records:", error);
        setCheckData(null);
      }
    } else {
      console.error('Invalid query type:', query);
    }
  }; 

  const searchRecord = async (query: string): Promise<CheckData | null> => {
    try {
      const checkRequest = await fetch(
        "http://localhost:3001/api/checkItem",
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
    } 
  };

  
  return (
    <main>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", marginLeft: "20px", marginTop: "20px" }}>
          <HomePageButton />
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "-20px", marginRight: "400px", marginBottom: "100px" }}>
        <div style={{ flexDirection: "column", marginLeft: "45px" }}>
          <div className="BEHS" style={{ fontSize: "78px" }}>
            <strong>Retrieve Medical Record</strong>
          </div>
        </div>
        {checkData && (
          <div>
            <div style={{ marginBottom: "50px" }}>
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
                  style={{ backgroundColor: "#dfdfdf", outline: "none", border: "none", marginLeft: "10px" }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchButton onClick={() => handleSearch(searchQuery)} />
              </div>
            </div>
            <br/><br/><br/>
            <div className="green-bar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
              <div className="greenbar-title">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flexDirection: "column", marginTop: "40px" }}>
                    <strong style={{ marginRight: "50px" }}>Record ID</strong>
                    <div style={{ marginRight: "60px" }}>{checkData?.recordID}</div>
                  </div>
                  <div style={{ marginTop: "40px", flexDirection: "column" }}>
                    <strong style={{ marginRight: "50px" }}>Date</strong>
                    <div style={{ marginRight: "50px" }}>{checkData?.recordDate}</div>
                  </div>
                  <div style={{ marginTop: "40px", flexDirection: "column" }}>
                    <strong style={{ marginRight: "60px" }}>Patient ID</strong>
                    <div style={{ marginRight: "50px" }}>
                      {checkData && checkData.userAddress && (
                        <>
                          {checkData.userAddress.substring(0, 7)}...
                          {checkData.userAddress.substring(checkData.userAddress.length - 7)}
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: "40px", flexDirection: "column" }}>
                    <div style={{ marginLeft: "30px" }}>
                      {checkData && checkData.hospitalAddress && (
                        <>
                          {checkData.hospitalAddress.substring(0, 7)}...
                          {checkData.hospitalAddress.substring(checkData.hospitalAddress.length - 7)}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <RectangleButton text="Request" textStyle={{ fontSize: "30px", fontWeight: "bold" }} onClick={handleRequest} />
            </div>
          </div>
        )}
        {!checkData && (
          <div>
            <div style={{ marginBottom: "50px" }}>
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
                  placeholder="Search..."
                  style={{ backgroundColor: "#dfdfdf", outline: "none", border: "none", marginLeft: "10px" }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchButton onClick={() => handleSearch(searchQuery)} />
              </div>
            </div>
            <div className="BEHS" style={{ display: "flex", justifyContent: "center", fontSize: "24px", marginLeft: "320px", marginTop: "40px" }}>
              <strong>User not found!</strong>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
