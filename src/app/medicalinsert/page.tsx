import HomePageButton from "../components/HomePageButton";
import MedicalRecordInserter from "../components/MedicalRecordInserter";

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
          marginTop: "-60px",
          marginRight: "400px",
          marginBottom: "100px",
        }}
      >
        <div style={{ flexDirection: "column", marginLeft: "45px" }}>
          <div className="BEHS" style={{ fontSize: "78px" }}>
            <strong>Insert Medical Record</strong>
          </div>

          <div style={{ display: "flex" }}>
            <MedicalRecordInserter />
          </div>
        </div>
      </div>
    </main>
  );
}
