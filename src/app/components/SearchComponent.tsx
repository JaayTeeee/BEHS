"use client";

import Image from "next/image";
import { useState } from "react";
import searchIcon from "../../../public/icons/icons-search-black.png";

interface CheckData {
  recordID: BigInteger;
  recordDate: string;
  userAddress: string;
  firstName: string;
  lastname: string;
  gender: string;
  dateBirth: string;
  diagnosis: string;
  attachment: string;
  hospitalAddress: string;
}

export const SearchComponent = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleClickSearch = () => {
    handleSearch(searchQuery);
    setSearchQuery("");
  };

  return (
    <div>
      <div>
        <div
          className="search-box"
          style={{
            display: "flex",
            marginLeft: "320px",
            marginTop: "20px",
            width: "830px",
            height: "60px",
          }}
        >
          <Image
            src={searchIcon}
            className="icon"
            alt="search-icon"
            style={{
              height: "25px",
              width: "25px",
              marginLeft: "20px",
            }}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: "#dfdfdf",
              outline: "none",
              border: "none",
              marginLeft: "40px",
              height: "40px",
              width: "620px",
            }}
          />
          <div style={{ marginLeft: "70px" }}>
            <button
              type="button"
              style={{
                color: "white",
                background: "#339f6b",
                width: "130px",
                height: "60px",
                border: "none",
                marginLeft: "auto",
                borderRadius: "8px",
                zIndex: 999,
              }}
              onClick={handleClickSearch}
            >
              <span style={{ fontSize: "16px" }}>
                <b>Search</b>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
