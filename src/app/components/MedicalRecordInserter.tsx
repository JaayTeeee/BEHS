"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckUserData from "../functions/getUserData";
import Button from "./RectangleButton";

interface CheckData {
  firstName: string;
  lastName: string;
  gender: string;
  dateBirth: string;
}

const MedicalRecordInserter: React.FC<{ userAddress: string }> = ({
  userAddress,
}) => {
  const [checkData, setCheckData] = useState<CheckData | null>(null);
  const router = useRouter();
  function handleCheckDataReceived(checkData: CheckData | null) {
    setCheckData(checkData);
  }

  const handleSubmit = async () => {
    try {
      const diagnosisInput = document.getElementsByName(
        "diagnosis"
      )[0] as HTMLInputElement;
      const attachmentInput = document.querySelector(
        'input[name="attachment"]'
      ) as HTMLInputElement;
      const file = attachmentInput.files ? attachmentInput.files[0] : null; // Retrieve the first selected file

      if (file) {
        const reader = new FileReader();

        reader.onload = async function (event) {
          if (event.target) {
            const fileData = event.target.result;

            const fileBuffer = Buffer.from(fileData as ArrayBuffer);
            const base64Attachment = fileBuffer.toString("base64");

            const insertUserData = {
              userAddress: userAddress,
              firstName: checkData?.firstName,
              lastName: checkData?.lastName,
              gender: checkData?.gender,
              dateBirth: checkData?.dateBirth,
              diagnosis: diagnosisInput.value,
              attachment: base64Attachment,
            };

            const request = new Request(
              "http://localhost:3001/api/insertMedicalRecord",
              {
                method: "POST",
                headers: new Headers({
                  "Content-Type": "application/json",
                  Accept: "application/json",
                }),
                mode: "cors", // Set CORS mode to 'cors'
                body: JSON.stringify(insertUserData),
              }
            );

            const res = await fetch(request);
            if (!res.ok) {
              throw new Error(`Failed to fetch: ${res.statusText}`);
            }

            const response = await res.json();

            if (response.success && userAddress !== null) {
              const encodedWalletAddress = encodeURIComponent(userAddress);
              console.log("Encoded Address:", encodedWalletAddress);
              router.push(`/medicalwelcome`);
            } else {
              console.error("Address is null or response is not successful.");
              // Handle the case when address is null or response is not successful
            }
          }
        };

        reader.readAsArrayBuffer(file);
      } else {
        console.log("No file selected");
      }
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  return (
    <div>
      <CheckUserData
        address={userAddress}
        onCheckDataReceived={handleCheckDataReceived}
      />

      <div
        style={{
          width: "1200px",
          height: "500px",
          backgroundColor: "#F3FFEF",
          borderRadius: "15px",
          border: "5px solid #69BF96",
          overflow: "visible",
          marginLeft: "100px",
        }}
      >
        <div style={{ marginTop: "50px", marginLeft: "80px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ fontSize: "28px", marginRight: "300px" }}>
                First Name
              </text>
              <div
                style={{
                  backgroundColor: "#dfdfdf",
                  width: "400px",
                  height: "45px",
                }}
              >
                <input
                  type="text"
                  name="firstName"
                  value={checkData?.firstName}
                  style={{
                    backgroundColor: "#dfdfdf",
                    outline: "none",
                    border: "none",
                    height: "45px",
                    width: "100%",
                    caretColor: "transparent",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "200px",
              }}
            >
              <text style={{ fontSize: "28px", marginRight: "300px" }}>
                Last Name
              </text>
              <div
                style={{
                  backgroundColor: "#dfdfdf",
                  width: "400px",
                  height: "45px",
                }}
              >
                <input
                  type="text"
                  name="lastName"
                  value={checkData?.lastName}
                  style={{
                    backgroundColor: "#dfdfdf",
                    outline: "none",
                    border: "none",
                    height: "45px",
                    width: "100%",
                    caretColor: "transparent",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ fontSize: "28px", marginRight: "320px" }}>
                Gender
              </text>
              <div
                style={{
                  backgroundColor: "#dfdfdf",
                  width: "410px",
                  height: "45px",
                }}
              >
                <input
                  name="gender"
                  value={checkData?.gender}
                  style={{
                    backgroundColor: "#dfdfdf",
                    outline: "none",
                    border: "none",
                    height: "45px",
                    width: "400px",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "220px",
              }}
            >
              <text style={{ fontSize: "28px", marginRight: "300px" }}>
                Date of Birth
              </text>
              <div
                style={{
                  backgroundColor: "#dfdfdf",
                  width: "400px",
                  height: "45px",
                }}
              >
                <input
                  type="text"
                  name="dateBirth"
                  value={checkData?.dateBirth}
                  style={{
                    backgroundColor: "#dfdfdf",
                    outline: "none",
                    border: "none",
                    height: "45px",
                    width: "100%",
                    caretColor: "transparent",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ fontSize: "28px", marginRight: "320px" }}>
                Diagnosis
              </text>
              <div
                style={{
                  backgroundColor: "#dfdfdf",
                  width: "410px",
                  height: "45px",
                }}
              >
                <input
                  type="text"
                  name="diagnosis"
                  style={{
                    backgroundColor: "#dfdfdf",
                    outline: "none",
                    border: "none",
                    height: "45px",
                    width: "400px",
                    marginLeft: "10px",
                  }}
                  required
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "190px",
              }}
            >
              <text style={{ fontSize: "26px", marginRight: "160px" }}>
                Additional Documents
              </text>
              <div
                style={{
                  backgroundColor: "#dfdfdf",
                  width: "400px",
                  height: "45px",
                  display: "flex",
                }}
              >
                <input
                  type="file"
                  name="attachment"
                  style={{
                    outline: "none",
                    border: "none",
                    marginTop: "8px",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            text={"Insert"}
            style={{ marginTop: "40px" }}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordInserter;
