"use client";
import Image from "next/image";
import { useState } from "react";
import searchIcon from "../../../public/icons/icons-search-black.png";
import HomePageButton from "../components/HomePageButton";
import RectangleButton from "../components/RectangleButton";
import { SearchComponent } from "../components/SearchComponent";
import SearchButton from "../components/searchButton";
import CheckMedicalRecord from "../functions/getMedicalRecord";

interface CheckData {
  recordID: string;
  recordDate: string;
  userAddress: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateBirth: string;
  diagnosis: string;
  attachment: string;
  hospitalAddress: string;
}

export default function Research() {
  const [checkData, setCheckData] = useState<CheckData | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resetSearch, setResetSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchPerformed(true);
  };

  const handleRequest = (query: string) => {
    setSearchQuery(query);
    setSearchPerformed(true);
  };

  const handleClickSearch = (query: string) => {
    setSearchQuery(query);
    setSearchPerformed(true);
  };

  const handleCheckDataReceived = (data: CheckData | null) => {
    if (data !== null && Object.keys(data).length > 2) {
      setCheckData(data);
    } else {
      setCheckData(null);
    }
  };

  const handleResetSearch = () => {
    setCheckData(null);
    setSearchQuery("");
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
          marginRight: "400px",
          marginBottom: "100px",
        }}
      >
        <div style={{ flexDirection: "column", marginLeft: "45px" }}>
          <div className="BEHS" style={{ fontSize: "78px" }}>
            <strong>Retrieve Medical Record</strong>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "50px",
          }}
        >
          {!searchPerformed ? (
            <>
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
                <strong>
                  Search for patient by using the search bar below:
                </strong>
              </div>
              <SearchComponent handleSearch={handleSearch} />
            </>
          ) : (
            <>
              <CheckMedicalRecord
                address={searchQuery}
                onCheckDataReceived={handleCheckDataReceived}
              />

              {checkData !== null ? (
                <div>
                  <div style={{ marginBottom: "50px" }}>
                    <div
                      className="search-box"
                      style={{ marginLeft: "1050px" }}
                    >
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
                        value={searchQuery}
                        placeholder="Search..."
                        style={{
                          backgroundColor: "#dfdfdf",
                          outline: "none",
                          border: "none",
                          marginLeft: "10px",
                        }}
                      />
                      <SearchButton text="Search" onClick={handleSearch} />
                    </div>
                  </div>
                  <div
                    className="green-bar"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <div className="greenbar-title">
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div
                          style={{
                            flexDirection: "column",
                            marginTop: "40px",
                          }}
                        >
                          <strong style={{ marginRight: "50px" }}>
                            Record ID
                          </strong>
                          <div style={{ marginRight: "60px" }}>
                            {checkData?.recordID}
                          </div>
                        </div>
                        <div
                          style={{ marginTop: "40px", flexDirection: "column" }}
                        >
                          <strong style={{ marginRight: "50px" }}>Date</strong>
                          <div style={{ marginRight: "50px" }}>
                            {checkData?.recordDate}
                          </div>
                        </div>
                        <div
                          style={{ marginTop: "40px", flexDirection: "column" }}
                        >
                          <strong style={{ marginRight: "60px" }}>
                            Patient ID
                          </strong>
                          <div style={{ marginRight: "50px" }}>
                            {checkData.userAddress.substring(0, 7)}...
                            {checkData.userAddress.substring(
                              checkData.userAddress.length - 7
                            )}
                          </div>
                        </div>
                        <div
                          style={{ marginTop: "40px", flexDirection: "column" }}
                        >
                          <strong style={{ marginLeft: "30px" }}>
                            Recorded By:
                          </strong>
                          <div style={{ marginLeft: "30px" }}>
                            {checkData.hospitalAddress.substring(0, 7)}...
                            {checkData.hospitalAddress.substring(
                              checkData.hospitalAddress.length - 7
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <RectangleButton
                      text="Request"
                      textStyle={{ fontSize: "30px", fontWeight: "bold" }}
                      onClick={handleRequest}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
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
                      <strong>User not found!</strong>
                    </div>
                    <SearchComponent handleSearch={handleClickSearch} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
