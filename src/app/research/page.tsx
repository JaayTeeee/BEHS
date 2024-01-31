import HomePageButton from "../components/HomePageButton";
import RectangleButton from "../components/RectangleButton";
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
