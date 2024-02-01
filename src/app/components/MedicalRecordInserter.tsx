"use client";

import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckUserData from "../functions/getUserData";
import {
  createTransaction,
  signTransaction,
} from "../functions/transactionSigner";
import Button from "./RectangleButton";

interface CheckData {
  firstName: string;
  lastName: string;
  gender: string;
  dateBirth: string;
  idNumber: string;
}

const MedicalRecordInserter: React.FC<{
  address: string;
  hospitalAddress: string;
  resetData: () => void;
}> = ({ address, hospitalAddress, resetData }) => {
  const [checkData, setCheckData] = useState<CheckData | null>(null);
  const router = useRouter();
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("WalletAddress");
    setWalletAddress(addressFromQuery);
  }, [fetchWalletAddress]);

  function handleCheckDataReceived(checkData: CheckData | null) {
    setCheckData(checkData);
  }

  const onSuccess = () => {
    resetData();
  };

  const handleSubmit = async () => {
    const senderPublicKey = new PublicKey(hospitalAddress);
    const recipientPublicKey = new PublicKey(address);
    const amount = 1000;

    console.log(senderPublicKey);
    console.log(recipientPublicKey);
    const transaction = createTransaction(
      senderPublicKey,
      recipientPublicKey,
      amount
    );
    const signedTransaction = await signTransaction(
      transaction,
      senderPublicKey
    );

    if (signedTransaction) {
      try {
        const diagnosisInput = document.getElementsByName(
          "diagnosis"
        )[0] as HTMLInputElement;
        const attachmentInput = document.querySelector(
          'input[name="attachment"]'
        ) as HTMLInputElement;
        const file = attachmentInput.files ? attachmentInput.files[0] : null;

        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const fileData = reader.result;
            console.log(checkData);
            const insertUserData = {
              userAddress: address,
              firstName: checkData?.records?.[0]?.firstName,
              lastName: checkData?.records?.[0]?.lastName,
              gender: checkData?.records?.[0]?.gender,
              dateBirth: checkData?.records?.[0]?.dateBirth,
              idNumber: checkData?.records?.[0]?.idNumber,
              diagnosis: diagnosisInput.value,
              attachment: fileData,
              hospitalAddress: fetchWalletAddress,
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

            fetch(request)
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`Failed to fetch: ${res.statusText}`);
                }
                return res.json();
              })
              .then((response) => {
                if (response.success && address !== null) {
                  onSuccess();
                } else {
                  console.error(
                    "Address is null or response is not successful."
                  );
                }
              })
              .catch((error) => {
                console.error("Failed to fetch:", error);
              });
          };

          reader.readAsDataURL(file);
        } else {
          console.log("No file selected");
        }
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    } else {
      console.log("Error!");
    }
  };

  return (
    <div>
      <CheckUserData
        query={address}
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
          {checkData &&
            checkData.records &&
            checkData.records.map((record, index) => (
              <div key={index}>
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
                        value={record.firstName}
                        readOnly={true}
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
                        value={record.lastName}
                        readOnly={true}
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
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                  }}
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
                        value={record.gender}
                        readOnly={true}
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
                        value={record.dateBirth}
                        readOnly={true}
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
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <text style={{ fontSize: "26px", marginRight: "160px" }}>
                      Identification Number
                    </text>
                    <div
                      style={{
                        backgroundColor: "#dfdfdf",
                        width: "410px",
                        height: "45px",
                      }}
                    >
                      <input
                        name="idNumber"
                        value={record.idNumber}
                        readOnly={true}
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
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <text style={{ fontSize: "28px", marginRight: "300px" }}>
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
                      marginLeft: "220px",
                    }}
                  >
                    <text style={{ fontSize: "28px", marginRight: "120px" }}>
                      Additional Documents
                    </text>
                    <div
                      style={{
                        backgroundColor: "#dfdfdf",
                        width: "400px",
                        height: "45px",
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
                <Button
                  text={"Insert"}
                  style={{ marginTop: "80px", marginRight: "60px" }}
                  onClick={handleSubmit}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordInserter;
