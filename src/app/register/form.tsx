"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Button from "../../../public/components/RectangleButton";

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

const Step1: React.FC<{
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}> = ({ userData, setUserData, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setUserData((prevState) => ({
      ...prevState,
      dateBirth: date.toISOString().slice(0, 10),
    }));
  };

  const handleNext = () => {
    onNext();
  };

  return (
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
              style={{
                backgroundColor: "#dfdfdf",
                outline: "none",
                border: "none",
                height: "45px",
                width: "100%",
                caretColor: "transparent",
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
              style={{
                backgroundColor: "#dfdfdf",
                outline: "none",
                border: "none",
                height: "45px",
                width: "100%",
                caretColor: "transparent",
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <text style={{ fontSize: "28px" }}>Gender</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <select
              name="gender"
              value={userData.gender}
              onChange={(e) => handleChange(e.target.value)}
              style={{
                backgroundColor: "#dfdfdf",
                outline: "none",
                border: "none",
                height: "45px",
                width: "100%",
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
            marginLeft: "200px",
          }}
        >
          <text style={{ fontSize: "28px" }}>Date of Birth</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <DatePicker
              selected={
                userData.dateBirth ? new Date(userData.dateBirth) : null
              }
              onChange={(date) => handleDateChange(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
              style={{
                backgroundColor: "#dfdfdf",
                outline: "none",
                border: "none",
                height: "45px",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Add more input fields for other personal information */}
      </div>

      <Button
        text={"Next"}
        onClick={handleNext}
        style={{
          background: "#69BF96",
          width: "185px",
          height: "60px",
          borderRadius: "14px",
          position: "fixed",
          bottom: "20px",
          right: "50px",
        }}
      />
    </div>
  );
};

const Step2: React.FC<{
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onPrevious: () => void;
  onSubmit: () => void;
}> = ({ userData, setUserData, onPrevious, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div>
      <h2>Step 2: Contact Information</h2>
      <input
        type="text"
        name="phoneNumber"
        value={userData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        type="text"
        name="address"
        value={userData.address}
        onChange={handleChange}
        placeholder="Address"
      />
      {/* Add more input fields for other contact information */}
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const InputForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(userData);
  };

  return (
    <div>
      {currentStep === 1 && (
        <div>
          <div
            style={{
              backgroundColor: "#D9D9D9",
              height: "80px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                backgroundColor: "#69BF96",
                height: "80px",
                width: "50%",
                borderTopRightRadius: "25px",
                borderBottomRightRadius: "25px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ marginLeft: "220px" }}>
                <div
                  className="small-circle"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#69BF96", fontSize: "24px" }}>
                    <strong>1</strong>
                  </span>
                </div>
                <span
                  style={{
                    color: "white",
                    fontSize: "32px",
                    marginLeft: "90px",
                  }}
                >
                  <strong>Your Profile</strong>
                </span>
              </div>
            </div>

            <div
              style={{
                height: "80px",
                display: "flex",
                alignItems: "center",
                marginRight: "230px",
              }}
            >
              <div>
                <div
                  className="small-circle"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    background: "#B8B8B8",
                  }}
                >
                  <span style={{ color: "white", fontSize: "24px" }}>
                    <strong>2</strong>
                  </span>
                </div>
                <span
                  style={{
                    color: "#B8B8B8",
                    fontSize: "32px",
                    marginLeft: "90px",
                  }}
                >
                  <strong>Your Information</strong>
                </span>
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <span style={{ color: "#69BF96", fontSize: "48px" }}>
                <strong>Your Profile</strong>
              </span>
              <span style={{ color: "black", fontSize: "24px" }}>
                Enter the information for your profile.
              </span>
            </div>

            <Step1
              userData={userData}
              setUserData={setUserData}
              onNext={handleNext}
            />
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <Step2
          userData={userData}
          setUserData={setUserData}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default InputForm;
