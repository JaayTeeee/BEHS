import { useEffect, useState } from "react";

interface CheckUserDataProps {
  address: string;
  onCheckDataReceived: (checkData: CheckData | null) => void;
}

interface CheckData {
  recordID: BigInteger;
  firstName: string;
  lastName: string;
  gender: string;
  dateBirth: string;
  recordDate: string;
  diagnosis: string;
  attachment: string;
  hospitalAddress: string;
}

export default function CheckUserData({
  address,
  onCheckDataReceived,
}: CheckUserDataProps) {
  const [checkData, setCheckData] = useState<CheckData | null>(null);

  function fetchData() {
    const checkRequest = new Request(
      "http://localhost:3001/api/checkMedicalRecord",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        mode: "cors",
        body: JSON.stringify({ walletAddress: address }),
      }
    );

    fetch(checkRequest)
      .then((checkResponse) => {
        if (checkResponse.ok) {
          return checkResponse.json();
        } else {
          throw new Error("Failed to check ID");
        }
      })
      .then((checkData) => {
        if (checkData.success) {
          setCheckData(checkData.medicalRecord); // Assuming medical record data is returned under 'medicalRecord' key
          console.log(checkData);
        } else {
          console.error("Failed to check ID:", checkData);
        }
        onCheckDataReceived(checkData.medicalRecord); // Passing the medical record data to the parent component
      })
      .catch((error) => {
        console.error("Fetch error during check:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, [address]);

  return null;
}
