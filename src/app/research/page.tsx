import Image from "next/image";
import React from 'react';
import searchIcon from "../icons/icons-search-black.png";
import HomePageButton from "../../../public/components/HomePageButton";
import SearchButton from "../../../public/components/searchButton";

export default function Research() {
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
      <div className="BEHS" style={{ fontSize: "70px" }}>
        <strong>Research Opportunities</strong>
      </div>
      <div className="search-box" style={{ marginLeft: "1050px", }} >
      <Image src={searchIcon} className="icon" alt="search-icon" 
      style={{ height: "25px", width: "25px", marginTop: "5px", marginLeft: "10px", }} />
      </div>
      <SearchButton text="Search" onClick={""} />
    </div>
  </main>
  );
}
