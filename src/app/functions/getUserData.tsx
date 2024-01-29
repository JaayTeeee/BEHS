import { useEffect, useState } from "react";

interface CheckUserDataProps {
  query: string;
  onCheckDataReceived: (checkData: CheckData | null) => void;
}

interface CheckData {
  firstName: string;
  lastName: string;
  gender: string;
  dateBirth: string;
  idNumber: string;
}

export default function CheckUserData({
  query,
  onCheckDataReceived,
}: CheckUserDataProps) {
  const [checkData, setCheckData] = useState<CheckData | null>(null);

  function fetchData() {
    const checkRequest = new Request(
      "http://localhost:3001/api/checkUserData",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        mode: "cors",
        body: JSON.stringify({ query }),
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
          setCheckData(checkData);
          console.log(checkData);
        } else {
          console.error("Failed to check ID:", checkData);
        }
        onCheckDataReceived(checkData);
      })
      .catch((error) => {
        console.error("Fetch error during check:", error);
      });
  }

 useEffect(() => {
  fetchData();
}, [query]);


  return null;
}
