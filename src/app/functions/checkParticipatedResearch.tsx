"use client";

import { useEffect, useState } from "react";
import RectangleButton from "../components/RectangleButton";

interface ResearchData {
  researchDate: string;
  projectName: string;
  usersJoined: string;
  slotsAvailable: number;
  lastParticipated: string;
  details: string;
}

export default function ParticipatedResearch() {
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);
  const [participatedRecord, setParticipatedRecord] = useState<
    ResearchData[] | null
  >(null);

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
        "http://localhost:3001/api/checkResearch",
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
            usersJoined: record.usersJoined,
            slotsAvailable: record.slotsAvailable,
            lastParticipated: record.lastParticipated,
            details: record.details,
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
                        {record.projectName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <RectangleButton
          text="DETAILS"
          textStyle={{ fontSize: "30px", fontWeight: "bold" }}
          onClick={""}
        />
      </div>
    </div>
  );
}
