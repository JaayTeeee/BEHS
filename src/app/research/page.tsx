import Image from "next/image";
import searchIcon from "../../../public/icons/icons-search-black.png";
import HomePageButton from "../components/HomePageButton";
import RectangleButton from "../components/RectangleButton";
import SearchButton from "../components/searchButton";

export default function Research() {
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
          marginTop: "-20px",
          marginRight: "400px",
          marginBottom: "100px",
        }}
      >
        <div className="BEHS" style={{ fontSize: "78px" }}>
          <strong>Research Opportunities</strong>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "50px",
          }}
        >
          <div
            className="BEHS"
            style={{ fontSize: "35px", marginRight: "550px" }}
          >
            <strong>Available Researches:</strong>
          </div>
          <div className="search-box" style={{ marginLeft: "1050px" }}>
            <Image
              src={searchIcon}
              className="icon"
              alt="search-icon"
              style={{
                height: "25px",
                width: "25px",
                marginLeft: "10px",
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              style={{
                backgroundColor: "#dfdfdf",
                outline: "none",
                border: "none",
                marginLeft: "5px",
              }}
            />
            <SearchButton text="Search" onClick={""} />
          </div>
          <div
            className="green-bar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="greenbar-title">
              <strong style={{ marginRight: "40px" }}>Research ID</strong>
              <strong style={{ marginRight: "40px" }}>Date</strong>
              <strong style={{ marginRight: "150px" }}>Project Name</strong>
              <strong style={{ marginRight: "30px" }}>Members Joined</strong>
              <strong>Deadline</strong>
            </div>
            <RectangleButton
              text="DETAILS"
              textStyle={{ fontSize: "30px", fontWeight: "bold" }}
              onClick={""}
            />
          </div>
          <br />
          <div
            className="BEHS"
            style={{ fontSize: "35px", marginRight: "500px" }}
          >
            <strong>Participated Researches:</strong>
          </div>
          <div
            className="green-bar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="greenbar-title">
              <strong style={{ marginRight: "70px" }}>Research ID</strong>
              <strong style={{ marginRight: "60px" }}>Date</strong>
              <strong style={{ marginRight: "200px" }}>Project Name</strong>
            </div>
            <RectangleButton
              text="DETAILS"
              textStyle={{ fontSize: "30px", fontWeight: "bold" }}
              onClick={""}
            />
          </div>
          {/* Placeholder for participated researches */}
        </div>
      </div>
    </main>
  );
}
