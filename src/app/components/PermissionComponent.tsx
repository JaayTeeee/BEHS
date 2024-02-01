"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApproveButton from "./approveButton";
import RejectButton from "./rejectButton";
import sessionStorage from 'sessionstorage';

interface HospitalData {
  firstName: string;
  lastName: string;
  permissionID: string;
  requestAddress: string;
}

export default function PermissionComponent() {
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);
  const [hospitals, setHospitalData] = useState<HospitalData[]>([]);
  const [existData, setExistData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const addressFromQuery = sessionStorage.getItem('walletAddress');
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
          const hospitals = checkData.records.map((record: any) => ({
            firstName: record.firstName,
            lastName: record.lastName,
            permissionID: record.permissionID,
            requestAddress: record.requestAddress,
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
    } finally {
      setLoading(false);
    }
  };

  const onSuccess = (permissionID: string) => {
    toast.success("Permission granted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    // Update the state to remove the granted permission from the list
    setHospitalData((prevHospitals) =>
      prevHospitals.filter((hospital) => hospital.permissionID !== permissionID)
    );

    setExistData(hospitals.length > 1);
  };

  const onFailure = (permissionID: string) => {
    toast.error("Permission rejected!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    // Update the state to remove the rejected permission from the list
    setHospitalData((prevHospitals) =>
      prevHospitals.filter((hospital) => hospital.permissionID !== permissionID)
    );

    setExistData(hospitals.length > 1);
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
                  requestedAddress={hospital.requestAddress}
                  permissionID={hospital.permissionID}
                  onSuccess={() => onSuccess(hospital.permissionID)}
                />
                <RejectButton
                  requiredAddress={fetchWalletAddress}
                  requestedAddress={hospital.requestAddress}
                  permissionID={hospital.permissionID}
                  onFailure={() => onFailure(hospital.permissionID)}
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
        <div
          style={{
            color: "#339f6b",
            fontSize: "25px",
            marginTop: "15px",
          }}
        >
          <strong>No permissions are requested.</strong>
        </div>
      )}
    </>
  );
}
