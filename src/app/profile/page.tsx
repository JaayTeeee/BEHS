"use client";
import { DatePicker } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "../components/RectangleButton";
import HomePageButton from "../components/HomePageButton";
import sessionStorage from 'sessionstorage';

interface UserData {
    firstName: string;
    lastName: string;
    gender: string;
    dateBirth: string;
    idNumber: string;
    phoneNumber: string;
    address: string;
    city: string;
    postcode: number;
    state: string;
  }

  const EditProfile: React.FC<{
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    onSubmit: () => void;
}> = ({ userData, setUserData, onSubmit }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };
    
    const [checkData, setCheckData] = useState<{ success: boolean; firstName?: string; lastName: string } | null>(null);
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

    const initialUserData: UserData = {
        firstName: '',
        lastName: '',
        gender: '',
        dateBirth: '',
        idNumber: '',
        phoneNumber: '',
        address: '',
        city: '',
        postcode: 0,
        state: '',
      };

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        gender: value,
      }));
    };

    const handleDateChange = (date: moment.Moment | null, dateString: string) => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        dateBirth: dateString,
      }));
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        state: value,
      }));
    };

    const disableNumberPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key >= "0" && event.key <= "9") {
        event.preventDefault();
      }
    };

    const disableABCPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
        event.preventDefault();
      }
    };

    const handleSubmit = async () => {
        onSubmit();
    }

    return (
        <main>
        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
            marginTop: "20px",
          }}
        >
          <HomePageButton />
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "-40px",
          marginRight: "750px",
          marginBottom: "80px",
        }}
      >
        <div style={{ flexDirection: "column" }}>
          <div className="BEHS" style={{ fontSize: "78px" }}>
            <strong>Edit Profile</strong>
          </div>
        </div>
      <div
        style={{
          marginTop: "50px",
          marginLeft: "250px",
          marginRight: "200px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <text style={{ fontSize: "28px" }}>First Name</text>
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
                value={initialUserData.firstName}
                onChange={handleChange}
                onKeyDown={disableNumberPress}
                style={{
                  backgroundColor: "#dfdfdf",
                  outline: "none",
                  border: "none",
                  height: "45px",
                  width: "100%",
                  caretColor: "transparent",
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
              marginLeft: "200px",
            }}
          >
            <text style={{ fontSize: "28px" }}>Last Name</text>
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
                value={initialUserData.lastName}
                onChange={handleChange}
                onKeyDown={disableNumberPress}
                style={{
                  backgroundColor: "#dfdfdf",
                  outline: "none",
                  border: "none",
                  height: "45px",
                  width: "100%",
                  caretColor: "transparent",
                  marginLeft: "10px",
                }}
                required
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <text style={{ fontSize: "28px" }}>Gender</text>
            <div
              style={{
                backgroundColor: "#dfdfdf",
                width: "410px",
                height: "45px",
              }}
            >
              <select
                name="gender"
                value={initialUserData.gender}
                onChange={handleGenderChange}
                style={{
                  backgroundColor: "#dfdfdf",
                  outline: "none",
                  border: "none",
                  height: "45px",
                  width: "400px",
                  marginLeft: "10px",
                }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "190px",
            }}
          >
            <text style={{ fontSize: "28px" }}>Date of Birth</text>
            <div
              style={{
                backgroundColor: "#dfdfdf",
                width: "410px",
                height: "45px",
              }}
            >
              <DatePicker
                onChange={handleDateChange}
                style={{
                  position: "absolute",
                  marginTop: "5px",
                  backgroundColor: "#dfdfdf",
                  marginLeft: "-200px",
                  width: "400px",
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}>
  <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
    <div style={{ marginBottom: "20px" }}>
      <text style={{ fontSize: "28px" }}>Phone Number</text>
      <div style={{ backgroundColor: "#dfdfdf", width: "400px", height: "45px" }}>
        <input
          type="text"
          name="phoneNumber"
          value={initialUserData.phoneNumber}
          onChange={handleChange}
          onKeyDown={disableABCPress}
          style={{ backgroundColor: "#dfdfdf", outline: "none", border: "none", height: "45px", width: "100%", caretColor: "transparent", marginLeft: "10px" }}
          required
        />
      </div>
    </div>
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "-5px"
        }}
        >
      <text style={{ fontSize: "28px" }}>City</text>
      <div style={{ backgroundColor: "#dfdfdf", width: "400px", height: "45px" }}>
        <input
          type="text"
          name="city"
          value={initialUserData.city}
          onChange={handleChange}
          style={{ backgroundColor: "#dfdfdf", outline: "none", border: "none", height: "45px", width: "100%", caretColor: "transparent", marginLeft: "10px" }}
          required
        />
      </div>
    </div>
  </div>
  <div style={{ display: "flex", flexDirection: "column" }}>
  <div
        style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "180px",
            marginBottom: "15px"
        }}
        >
      <text style={{ fontSize: "28px" }}>Address</text>
      <div style={{ backgroundColor: "#dfdfdf", width: "400px", height: "45px" }}>
        <input
          type="text"
          name="address"
          value={initialUserData.address}
          onChange={handleChange}
          style={{ backgroundColor: "#dfdfdf", outline: "none", border: "none", height: "45px", width: "100%", caretColor: "transparent", marginLeft: "10px" }}
          required
        />
      </div>
    </div>
    <div>
      <text style={{ fontSize: "28px", marginLeft: "180px" }}>Postcode</text>
      <div
        style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "180px",
        }}
        >
      <div style={{ backgroundColor: "#dfdfdf", width: "400px", height: "45px" }}>
        <input
          type="number"
          name="postcode"
          value={initialUserData.postcode}
          onChange={handleChange}
          style={{ backgroundColor: "#dfdfdf", outline: "none", border: "none", height: "45px", width: "100%", caretColor: "transparent", marginLeft: "10px" }}
          required
        />
      </div>
    </div>
    </div>
  </div>
</div>
<div style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}>
  <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
    <text style={{ fontSize: "28px" }}>State / Federal Territories</text>
    <div style={{ backgroundColor: "#dfdfdf", width: "410px", height: "45px" }}>
      <select
        name="state"
        value={initialUserData.state}
        onChange={handleStateChange}
        style={{ backgroundColor: "#dfdfdf", outline: "none", border: "none", height: "45px", width: "400px", marginLeft: "10px" }}
      >
        <option value="">Select State or Federal Territories</option>
        <option value="Johor">Johor</option>
        <option value="Kedah">Kedah</option>
        <option value="KualaLumpur">Kuala Lumpur</option>
        <option value="Labuan">Labuan</option>
        <option value="Melaka">Melaka</option>
        <option value="Perak">Perak</option>
        <option value="Pahang">Pahang</option>
        <option value="Penang">Penang</option>
        <option value="Sabah">Sabah</option>
        <option value="Sarawak">Sarawak</option>
        <option value="Seremban">Seremban</option>
        <option value="Selangor">Selangor</option>
        <option value="Terrenganu">Terrenganu</option>
      </select>
    </div>
  </div>
</div>

        <Button
        text={'Submit'}
        onClick={handleSubmit}
        style={{
          background: '#69BF96',
          width: '185px',
          height: '60px',
          borderRadius: '14px',
          position: 'fixed',
          bottom: '20px',
          right: '50px',
        }}
      />
      </div>
      </div>
    </main>
    );
};

export default EditProfile;
