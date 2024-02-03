import HomePageButton from "../components/HomePageButton";
import AvailableResearch from "../functions/checkAvailableResearch";
import ParticipatedResearch from "../functions/checkParticipatedResearch";

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
        <div className="BEHS" style={{ fontSize: "78px", marginLeft: "20px" }}>
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
            style={{ fontSize: "35px", marginRight: "520px" }}
          >
            <strong>Available Researches:</strong>
          </div>

          <AvailableResearch />

          <div
            className="BEHS"
            style={{ fontSize: "35px", marginRight: "460px" }}
          >
            <strong>Participated Researches:</strong>
          </div>
          <ParticipatedResearch />
        </div>
      </div>
    </main>
  );
}
