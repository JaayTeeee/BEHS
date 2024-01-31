import { useEffect, useState } from "react";

interface CheckUserDataProps {
  address: string;
  onCheckDataReceived: (checkData: CheckData | null) => void;
}

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

export default function CheckMedicalRecord({
  address,
  onCheckDataReceived,
}: CheckUserDataProps) {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const checkRequest = await fetch(
          "http://localhost:3001/api/checkMedicalRecord",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ userAddress: address }),
          }
        );

        if (checkRequest.ok) {
          const checkData = await checkRequest.json();
          if (checkData.success) {
            onCheckDataReceived(checkData);
          } else {
            console.error("Failed to check ID:", checkData);
            onCheckDataReceived(null);
          }
        } else {
          throw new Error("Failed to check ID");
        }
      } catch (error) {
        console.error("Fetch error during check:", error);
        onCheckDataReceived(null); // Passing null in case of an error
      }
    }

    if (!dataFetched) {
      fetchData();
      setDataFetched(true);
    }
  }, [address, dataFetched, onCheckDataReceived]);

  return null;
}
