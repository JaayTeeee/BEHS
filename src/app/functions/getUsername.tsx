import React, { useEffect, useState } from "react";

export default function CheckUsername() {
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);
  const [checkData, setCheckData] = useState<{ success: boolean; firstName?: string; lastName: string } | null>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get('WalletAddress');
    setWalletAddress(addressFromQuery);
  }, []);

  function fetchData() {
    const checkRequest = new Request('http://localhost:3001/api/checkID', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      mode: 'cors',
      body: JSON.stringify({ walletAddress: fetchWalletAddress }),
    });

    fetch(checkRequest)
      .then((checkResponse) => {
        if (checkResponse.ok) {
          // Continue with parsing JSON when the response is OK
          return checkResponse.json();
        } else {
          // Log additional details about the response when it's not OK
          console.error("Failed to check ID:", checkResponse);
          // You can return a failed promise here or throw an error if needed
          throw new Error("Failed to check ID");
        }
      })
      .then((checkData) => {
        if (checkData.success) {
          console.log(checkData);
          setCheckData(checkData);
        } else {
          console.error('Failed to check ID:', checkData);
        }
      })
      .catch((error) => {
        // Log additional details about the fetch error during check
        console.error("Fetch error during check:", error);
        // Handle fetch errors during check
      });
  }

  useEffect(() => {
    if (fetchWalletAddress) {
      fetchData();
    }
  }, [fetchWalletAddress]);

  return (
    <>
      {checkData?.firstName && checkData?.lastName && (
        <strong>{`${checkData.lastName.toUpperCase()} ${checkData.firstName.toUpperCase()}`}</strong>
        )}
    </>
  );
}
