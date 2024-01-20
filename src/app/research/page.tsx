import Image from "next/image";
import HomePageButton from "../../../public/components/HomePageButton";
import SearchButton from "../../../public/components/searchButton";
import searchIcon from "../icons/icons-search-black.png";

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
            style={{ fontSize: "32px", marginRight: "550px" }}
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
          {/* Placeholder for available researches */}
          <div
            className="BEHS"
            style={{ fontSize: "32px", marginRight: "500px" }}
          >
            <strong>Participated Researches:</strong>
          </div>
          {/* Placeholder for participated researches */}
        </div>
      </div>
    </main>
  );
}
