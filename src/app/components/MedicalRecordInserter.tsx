"use client";

import Button from "./RectangleButton";

interface UserData {
  firstName: string;
  lastName: string;
  gender: string;
  dateBirth: Date;
  idNumber: string;
  phoneNumber: string;
  address: string;
  city: string;
  postcode: number;
  state: string;
}

const MedicalRecordInserter: React.FC<{
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

  return (
    <div>
      <div
        style={{
          width: "1200px",
          height: "460px",
          backgroundColor: "#F3FFEF",
          borderRadius: "15px",
          border: "5px solid #69BF96",
          overflow: "visible",
          marginLeft: "100px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "50px", marginLeft: "80px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ fontSize: "28px", marginRight: "300px" }}>
                First Name
              </text>
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
                  value={""}
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
              <text style={{ fontSize: "28px", marginRight: "300px" }}>
                Last Name
              </text>
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
                  value={""}
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

          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ fontSize: "28px", marginRight: "320px" }}>
                Gender
              </text>
              <div
                style={{
                  backgroundColor: "#dfdfdf",
                  width: "410px",
                  height: "45px",
                }}
              >
                <input
                  name="gender"
                  value={""}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#dfdfdf",
                    outline: "none",
                    border: "none",
                    height: "45px",
                    width: "400px",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "220px",
              }}
            >
              <text style={{ fontSize: "28px", marginRight: "300px" }}>
                Date of Birth
              </text>
              <div
                style={{
                  backgroundColor: "#dfdfdf",
                  width: "400px",
                  height: "45px",
                }}
              >
                <input
                  type="text"
                  name="dateBirth"
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

          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <text style={{ fontSize: "28px", marginRight: "320px" }}>
                Diagnosis
              </text>
              <div
                style={{
                  backgroundColor: "#dfdfdf",
                  width: "410px",
                  height: "45px",
                }}
              >
                <input
                  name="gender"
                  value={""}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#dfdfdf",
                    outline: "none",
                    border: "none",
                    height: "45px",
                    width: "400px",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "190px",
              }}
            >
              <text style={{ fontSize: "26px", marginRight: "160px" }}>
                Additional Documents
              </text>
              <div
                style={{
                  backgroundColor: "#dfdfdf",
                  width: "400px",
                  height: "45px",
                }}
              >
                <input
                  type="text"
                  name="dateBirth"
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
        </div>
        <Button text={"Insert"} onClick={undefined} />
      </div>
    </div>
  );
};

export default MedicalRecordInserter;
