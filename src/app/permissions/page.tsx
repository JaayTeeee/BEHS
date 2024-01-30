import HomePageButton from "../components/HomePageButton";
import PermissionComponent from "../components/PermissionComponent";
import HistoryTable from "../components/historyPermissionTable";

export default function Permissions() {
  return (
    <main
  style={{
    overflowY: "scroll",
    height: "100vh", // Set the height to 100% of the viewport height
    padding: "20px", // Add padding for better appearance
  }}
>
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
  <div style={{ textAlign: "center", marginBottom: "100px" }}>
    <div className="BEHS" style={{ fontSize: "70px", marginRight: "700px" }}>
      <strong>Permissions</strong>
    </div>
    <PermissionComponent />
    <br />
    <div className="BEHS" style={{ fontSize: "70px", marginRight: "870px" }}>
      <strong>History</strong>
    </div>
    <HistoryTable />
  </div>
</main>
  );
}
