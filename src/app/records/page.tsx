import HomePageButton from "../components/HomePageButton";
import TermsBox from "../components/TermsBox";

export default function Records() {
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
          marginRight: "650px",
          marginBottom: "100px",
        }}
      >
        <div className="BEHS" style={{ fontSize: "70px" }}>
          <strong>Medical Records</strong>
        </div>
      </div>
      <div
        style={{
          marginLeft: "450px",
        }}
      >
        <TermsBox />
      </div>
    </main>
  );
}
