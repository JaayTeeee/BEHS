"use client";

import { useEffect, useState } from "react";
import RectangleButton from "../components/RectangleButton";
import TermsBox from "../components/TermsBox";

interface ResearchData {
  researchDate: string;
  projectName: string;
  slotsAvailable: number;
  lastParticipateDate: string;
  details: string;
}

export default function AvailableResearch() {
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);
  const [participatedRecord, setParticipatedRecord] = useState<
    ResearchData[] | null
  >(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [selectedResearch, setSelectedResearch] = useState<ResearchData | null>(
    null
  );

  const handleDetailsClick = (research: ResearchData) => {
    setSelectedResearch(research);
    setIsDetailsOpen(true);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("WalletAddress");
    setWalletAddress(addressFromQuery);
    if (addressFromQuery) {
      searchResearch(addressFromQuery);
    }
  }, [fetchWalletAddress]);

  const searchResearch = async (addressFromQuery: string) => {
    try {
      const checkRequest = await fetch(
        "http://localhost:3001/api/checkAvailableResearch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ addressFromQuery }),
        }
      );

      if (checkRequest.ok) {
        const checkData = await checkRequest.json();
        if (checkData.success) {
          console.log("Received data:", checkData);

          const records = checkData.records.map((record: ResearchData) => ({
            researchDate: record.researchDate,
            projectName: record.projectName,
            slotsAvailable: record.slotsAvailable,
            lastParticipateDate: record.lastParticipateDate,
          }));

          const latestRecords = records.slice(-5);

          setParticipatedRecord(latestRecords);
          console.log("updatedTableData:", latestRecords);
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
    <div>
      <div
        className="green-bar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {participatedRecord && (
          <div>
            {participatedRecord.map((record, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div className="greenbar-title">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ marginTop: "40px", flexDirection: "column" }}>
                      <strong style={{ marginRight: "60px" }}>Date</strong>

                      <div style={{ marginRight: "60px" }}>
                        {record.researchDate}
                      </div>
                    </div>

                    <div style={{ marginTop: "40px", flexDirection: "column" }}>
                      <strong style={{ marginRight: "60px" }}>
                        Project Name
                      </strong>

                      <div style={{ marginRight: "60px", fontSize: "22px" }}>
                        {record.projectName.substring(0, 39)}...
                      </div>
                    </div>

                    <div style={{ marginTop: "40px", flexDirection: "column" }}>
                      <strong style={{ marginRight: "60px" }}>Vacancy</strong>

                      <div style={{ marginRight: "60px", fontSize: "22px" }}>
                        {record.slotsAvailable}
                      </div>
                    </div>

                    <div style={{ marginTop: "40px", flexDirection: "column" }}>
                      <strong style={{ marginRight: "60px" }}>Deadline</strong>

                      <div style={{ marginRight: "60px", fontSize: "22px" }}>
                        {record.lastParticipateDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <RectangleButton
          text="JOIN"
          textStyle={{ fontSize: "30px", fontWeight: "bold" }}
          onClick={handleDetailsClick}
        />
        {isDetailsOpen && (
          <div className="popup-container">
            <div
              className="popup-overlay"
              onClick={() => setIsDetailsOpen(false)}
            ></div>
            <div className="popup-content">
              <TermsBox />
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
}
