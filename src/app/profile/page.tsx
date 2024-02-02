"use client";
import { DatePicker } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Button from "../components/RectangleButton";
import HomePageButton from "../components/HomePageButton";
import moment from 'moment';
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
    onSubmit: () => void;
}> = ({ onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    const [userData, setUserData] = useState<UserData>({
        firstName: "",
        lastName: "",
        gender: "",
        dateBirth: "",
        idNumber: "",
        phoneNumber: "",
        address: "",
        city: "",
        postcode: 0,
        state: "",
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/checkUserData",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ query: sessionStorage.getItem('walletAddress') }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const data = await response.json();
            if (data.success) {
                const user = data.records[0];
                setUserData(user);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            gender: value,
        }));
    };

    const handleDateChange = (date: Moment | null, dateString: string) => {
      if (date) {
        // const formattedDateString = date.format('YYYY-MM-DD'); // Format the date as needed
        setUserData((prevUserData) => ({
            ...prevUserData,
            dateBirth: dateString,
        }));
    }
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
        try {
            const UploadUserData = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                gender: userData.gender,
                dateBirth: userData.dateBirth,
                idNumber: userData.idNumber,
                phoneNumber: userData.phoneNumber,
                address: userData.address,
                city: userData.city,
                postcode: userData.postcode,
                state: userData.state,
                walletAddress: sessionStorage.getItem('walletAddress')
            };

            const request = new Request("http://localhost:3001/api/updateUserData", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }),
                mode: "cors",
                body: JSON.stringify(UploadUserData),
            });

            const res = await fetch(request);
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.statusText}`);
            }

            const response = await res.json();

            if (response.success) {
              const onSuccess = () => {
                toast.success("Update data successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            };
        
            // Call the onSuccess callback function
            onSuccess();
          } else {
                console.error("Address is null or response is not successful.");
                // Handle the case when address is null or response is not successful
            }
        } catch (error) {
            console.error("Failed to save data:", error);
        }
    };

    return (
        <main>
          <ToastContainer />
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
                value={userData.firstName}
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
                value={userData.lastName}
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
                value={userData.gender}
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
                value={userData.dateBirth ? moment(userData.dateBirth) : null}
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
          value={userData.phoneNumber}
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
          value={userData.city}
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
          value={userData.address}
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
          value={userData.postcode}
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
        value={userData.state}
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

