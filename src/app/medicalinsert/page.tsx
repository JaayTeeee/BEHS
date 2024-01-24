import HomePageButton from "../components/HomePageButton";
import MedicalRecordViewer from "../components/MedicalRecordViewer";

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
        <div style={{ flexDirection: "column", marginLeft: "45px" }}>
          <div className="BEHS" style={{ fontSize: "78px" }}>
            <strong>Retrieve Medical Record</strong>
          </div>
          <div style={{ marginRight: "800px" }}>
            <strong>Last Update:[Date]</strong>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <MedicalRecordViewer />
        </div>
      </div>
    </main>
  );
}
