"use client";
import { DatePicker } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "../components/RectangleButton";

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

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        dateBirth: dateString,
      };
    });
  };

  const disableNumberPress = (event) => {
    if (event.which >= 48 && event.which <= 57) {
      event.preventDefault();
    }
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
              onChange={handleDateChange}
              style={{
                position: "absolute",
                marginTop: "5px",
                backgroundColor: "#dfdfdf",
                marginLeft: "5px",
                width: "400px",
              }}
            />
          </div>
        </div>
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
  onNext: () => void;
}> = ({ userData, setUserData, onPrevious, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const handleNext = () => {
    onNext();
  };

  const disableABCPress = (event) => {
    const numericRegex = /^[0-9-]+$/;

    if (!numericRegex.test(event.key)) {
      event.preventDefault();
    }
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
          <text style={{ fontSize: "28px" }}>Identification Number</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <input
              type="text"
              name="idNumber"
              value={userData.idNumber}
              onChange={handleChange}
              onKeyDown={disableABCPress}
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
          <text style={{ fontSize: "28px" }}>Phone Number</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              onKeyDown={disableABCPress}
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
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <text style={{ fontSize: "28px" }}>Address</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
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
          <text style={{ fontSize: "28px" }}>City</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleChange}
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
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <text style={{ fontSize: "28px" }}>Postcode</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <input
              type="number"
              name="postcode"
              value={userData.postcode}
              onChange={handleChange}
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
          <text style={{ fontSize: "28px" }}>State / Federal Territories</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "410px",
              height: "45px",
            }}
          >
            <select
              name="state"
              value={userData.state}
              onChange={handleStateChange}
              style={{
                backgroundColor: "#dfdfdf",
                outline: "none",
                border: "none",
                height: "45px",
                width: "400px",
                marginLeft: "10px",
              }}
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

      {/* Add more input fields for other contact information */}
      <Button
        text={"Previous"}
        onClick={handlePrevious}
        style={{
          background: "#69BF96",
          width: "185px",
          height: "60px",
          borderRadius: "14px",
          position: "fixed",
          bottom: "20px",
          left: "50px",
        }}
      />
      <Button
        text={"Submit"}
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

const Confirmation: React.FC<{
  userData: UserData;
  onPrevious: () => void;
  onSubmit: () => void;
}> = ({ userData, onPrevious, onSubmit }) => {
  const router = useRouter();
  const [fetchWalletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("WalletAddress");
    setWalletAddress(addressFromQuery);
  }, [fetchWalletAddress]);
  const handlePrevious = () => {
    onPrevious();
  };

  const handleSubmit = async () => {
    onSubmit();
    try {
      const insertUserData = {
        walletAddress: fetchWalletAddress,
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
      };

      const request = new Request("http://localhost:3001/api/insertUserdata", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        mode: "cors", // Set CORS mode to 'cors'
        body: JSON.stringify(insertUserData),
      });

      const res = await fetch(request);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }

      const response = await res.json();

      if (response.success && fetchWalletAddress !== null) {
        const encodedWalletAddress = encodeURIComponent(fetchWalletAddress);
        console.log("Encoded Address:", encodedWalletAddress);
        router.push(`/welcome?walletAddress=${encodedWalletAddress}`);
      } else {
        console.error("Address is null or response is not successful.");
        // Handle the case when address is null or response is not successful
      }
    } catch (error) {
      console.error("Failed to save data:", error);
    }
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
          <text style={{ fontSize: "25px" }}>First Name</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <text>{userData.firstName}</text>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "200px",
          }}
        >
          <text style={{ fontSize: "25px" }}>Last Name</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <text>{userData.lastName}</text>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <text style={{ fontSize: "25px" }}>Gender</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <text>{userData.gender}</text>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "200px",
          }}
        >
          <text style={{ fontSize: "25px" }}>Date of Birth</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <text>{userData.dateBirth}</text>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <text style={{ fontSize: "25px" }}>Identification Number</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <text>{userData.idNumber}</text>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "200px",
          }}
        >
          <text style={{ fontSize: "25px" }}>Phone Number</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <text>{userData.phoneNumber}</text>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <text style={{ fontSize: "25px" }}>Address</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <text>{userData.address}</text>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "200px",
          }}
        >
          <text style={{ fontSize: "25px" }}>City</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <text>{userData.city}</text>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <text style={{ fontSize: "25px" }}>Postcode</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <text>{userData.postcode}</text>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "200px",
          }}
        >
          <text style={{ fontSize: "25px" }}>State / Federal Territories</text>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              width: "400px",
              height: "45px",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <text>{userData.state}</text>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Button
        text={"Previous"}
        onClick={handlePrevious}
        style={{
          background: "#69BF96",
          width: "185px",
          height: "60px",
          borderRadius: "14px",
          position: "fixed",
          bottom: "20px",
          left: "50px",
        }}
      />
      <Button
        text={"Submit"}
        onClick={handleSubmit}
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

  const handleSubmit = () => {};

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
        <div>
          <div
            style={{
              backgroundColor: "#69BF96",
              height: "80px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                backgroundColor: "#D9D9D9",
                borderTopRightRadius: "25px",
                borderBottomRightRadius: "25px",
                height: "80px",
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ marginLeft: "20px" }}>
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
                    <strong>1</strong>
                  </span>
                </div>
                <span
                  style={{
                    color: "#B8B8B8",
                    fontSize: "32px",
                    marginLeft: "90px",
                    marginRight: "20px",
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
                  }}
                >
                  <span style={{ color: "#69BF96", fontSize: "24px" }}>
                    <strong>2</strong>
                  </span>
                </div>
                <span
                  style={{
                    color: "white",
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
                <strong>Your Information</strong>
              </span>
              <span style={{ color: "black", fontSize: "24px" }}>
                Next, enter the following information to create your account.
              </span>
            </div>

            <Step2
              userData={userData}
              setUserData={setUserData}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            textAlign: "center",
            marginTop: "35px",
          }}
        >
          <span
            style={{
              color: "#69BF96",
              fontSize: "30px",
              marginBottom: "-15px",
            }}
          >
            <strong>
              Please ensure that your information is correct as below:
            </strong>
          </span>
          <Confirmation
            userData={userData}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default InputForm;
