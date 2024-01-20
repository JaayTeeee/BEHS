import HomePageButton from "../../../public/components/HomePageButton";

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
  </div>
  </main>
  );
}
