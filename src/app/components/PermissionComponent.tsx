"use client";
import { useEffect, useState } from "react";
import ApproveButton from "./approveButton";
import RejectButton from "./rejectButton";

interface HospitalData {
  firstName: string;
  lastName: string;
}

export default function PermissionComponent() {
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);
  const [hospitals, setHospitalData] = useState<HospitalData | null>(null);
  const [existData, setExistData] = useState(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("WalletAddress");
    setWalletAddress(addressFromQuery);

    if (addressFromQuery) {
      SearchPermission(addressFromQuery);
    }
  }, [fetchWalletAddress]);

  const SearchPermission = async (query: string) => {
    try {
      const checkRequest = await fetch(
        "http://localhost:3001/api/checkPermission",
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
          console.log("Received data in permission:", checkData);
          setExistData(true);
          const hospitals = checkData.records.map(record => ({
            firstName: record.firstName,
            lastName: record.lastName,
            permissionID: record.permissionID
          }));
          setHospitalData(hospitals);
          console.log("hospital name:", hospitals);

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
    <>
      {existData ? (
        hospitals.length > 0 ? (
          hospitals.map((hospital, index) => (
            <div
              key={index}
              className="green-bar"
              style={{
                display: "flex",
                color: "#339f6b",
                fontSize: "25px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ margin: "0 30px" }}>
                {`${hospital.firstName} ${hospital.lastName} wants to access your medical record`}
              </p>
              <div style={{ display: "flex", marginRight: "40px" }}>
                <ApproveButton
                  requiredAddress={fetchWalletAddress}
                  permissionID={hospital.permissionID}
                />
                <RejectButton
                  requiredAddress={fetchWalletAddress}
                  permissionID={hospital.permissionID}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="green-bar" style={{ fontSize: "25px" }}>
            Loading...
          </div>
        )
      ) : (
        <div style={{
          color: "#339f6b",
          fontSize: "25px", 
          marginTop: "15px"}}>
          <strong>No permissions are requested.</strong>
      </div>      
      )}
    </>
  );
}