import HomePageButton from "../../../public/components/HomePageButton";
import ApproveButton from "../../../public/components/approveButton";
import RejectButton from "../../../public/components/rejectButton";
import HistoryTable from "../../../public/components/historyPermissionTable";

export default function Permissions() {
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
      marginRight: "850px",
      marginBottom: "100px",
    }}
  >
    <div className="BEHS" style={{ fontSize: "70px" }}>
      <strong>Permissions</strong>
    </div>
      <div className="green-bar"
          style={{
            display: "flex",
            color: "#339f6b",
            fontSize: "25px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ margin: "0 30px" }}>[Hospital] wants to access your medical record</p>
          <ApproveButton />
          <RejectButton />
        </div>
      <br/>
      <div
        className="BEHS"
        style={{ fontSize: "70px", marginRight: "150px" }}
        >
        <strong>History</strong>
      </div>
      <HistoryTable />
  </div>
  </main>
  );
}
