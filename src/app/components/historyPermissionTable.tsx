"use client";
import React, { useEffect, useState } from "react";

interface HospitalData {
  firstName: string;
  lastName: string;
}

interface CheckData {
  permissionID: string;
  requestDate: string;
  requestAddress: string;
  permissionStatus: string;
}

const getStatusLabel = (status: number): string => {
  switch (status) {
    case 1:
      return "Approved";
    case 0:
      return "Pending";
    case -1:
      return "Rejected";
    default:
      return "Unknown";
  }
};

const PermissionTable: React.FC = () => {
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);
  const [hospitals, setHospitalData] = useState<HospitalData | null>(null);
  const [records, setRecordsData] = useState<CheckData | null>(null);
  const [updatedTableData, setTableData] = useState<any[]>([]);

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
        "http://localhost:3001/api/showPermission",
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

          const hospitals = checkData.records.map((record) => ({
            firstName: record.hospitalName.firstName,
            lastName: record.hospitalName.lastName,
          }));
          // Extract records
          const records = checkData.records.map((record: CheckData) => ({
            permissionID: record.permissionID,
            permissionStatus: record.permissionStatus,
            requestAddress: record.requestAddress,
            requestDate: record.requestDate,
          }));

          const latestRecords = records.slice(-5);

          // Save hospitalName and records separately
          setHospitalData(hospitals);

          const updatedTableData = {
            ...checkData,
            hospitalData: hospitals,
            records: [latestRecords],
          };
          setTableData(updatedTableData);
          console.log("updatedTableData:", updatedTableData);
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      {updatedTableData.records && updatedTableData.records.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerCellStyle}>Permission ID</th>
              <th style={headerCellStyle}>Date</th>
              <th style={headerCellStyle}>Hospital</th>
              <th style={headerCellStyle}>Permission Status</th>
            </tr>
          </thead>
          <tbody>
            {updatedTableData.records.map((recordArray, index) =>
              recordArray.map((record, recordIndex) => (
                <tr key={recordIndex} style={rowStyle}>
                  <td style={cellStyle}>{record.permissionID}</td>
                  <td style={cellStyle}>{record.requestDate}</td>
                  <td
                    style={cellStyle}
                  >{`${updatedTableData.hospitalData[recordIndex].firstName} ${updatedTableData.hospitalData[recordIndex].lastName}`}</td>
                  <td style={cellStyle}>
                    {getStatusLabel(record.permissionStatus)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <div
          style={{
            color: "#339f6b",
            fontSize: "25px",
            marginTop: "15px",
          }}
        >
          <strong>No history.</strong>
        </div>
      )}
    </div>
  );
};

// Style for the entire table
const tableStyle: React.CSSProperties = {
  width: "80%",
  borderCollapse: "collapse",
  marginTop: "20px",
  marginBottom: "50px",
  backgroundColor: "#F3FFEF",
  border: "2px solid #339f6b",
  height: "100px",
  margin: "0",
};

// Style for header cells
const headerCellStyle: React.CSSProperties = {
  backgroundColor: "#339f6b",
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  padding: "10px",
  textAlign: "center",
  borderBottom: "1px solid #339f6b",
};

// Style for regular cells
const cellStyle: React.CSSProperties = {
  padding: "10px",
  textAlign: "center",
  borderBottom: "1px solid #339f6b",
  margin: "0px 0", // Added margin, adjust as needed
  marginRight: "40px",
  marginLeft: "40px",
};

// Style for table rows
const rowStyle: React.CSSProperties = {
  border: "2px solid #339f6b",
  borderRadius: "20px",
  margin: "10px 0",
};

export default PermissionTable;
