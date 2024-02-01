"use client";
import Image from "next/image";
import Link from "next/link";
import HealthCare from "../../../public/icons/icons-healthcare.png";
import React, { useEffect, useState } from "react";
import sessionStorage from 'sessionstorage';

const HomePageButton = () => {
  const [checkData, setCheckData] = useState<{ success: boolean; userType?: string } | null>(null);

  useEffect(() => {
    const checkRequest = new Request('http://localhost:3001/api/checkID', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      mode: 'cors',
      body: JSON.stringify({ walletAddress: sessionStorage.getItem('walletAddress') }),
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
  }, [sessionStorage.getItem('walletAddress')]);

  return (
    <>
      {checkData && checkData.userType === "user" && (
        <Link href={`/welcome`}>
          <Image
            src={HealthCare}
            alt="Button Icon"
            style={{ marginBottom: "20px", height: "75px", width: "75px" }}
          />
        </Link>
      )}
      {checkData && checkData.userType === "hospital" && (
        <Link href={`/medicalwelcome`}>
          <Image
            src={HealthCare}
            alt="Button Icon"
            style={{ marginBottom: "20px", height: "75px", width: "75px" }}
          />
        </Link>
      )}
    </>
  );
};

export default HomePageButton;
