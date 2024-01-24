const MedicalRecordViewer = () => {
  return (
    <div>
      <div
        style={{
          width: "900px",
          height: "640px",
          backgroundColor: "#F3FFEF",
          borderRadius: "15px",
          border: "5px solid #69BF96",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "120px",
            backgroundColor: "#339F6B",
          }}
        >
          <h1 style={{ fontSize: "32px", textAlign: "center", color: "white" }}>
            <strong>Medical Record</strong>
          </h1>
        </div>
        <div
          className="scroll-bar"
          style={{
            marginLeft: "50px",
            marginRight: "40px",
            marginTop: "40px",
            overflowY: "visible",
            height: "360px",
            maxHeight: "120%",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            fontWeight: "600",
            fontSize: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "15px",
            }}
          >
            <h2>First Name: </h2>
            <p>[Patient&apos;s First Name]</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "15px",
            }}
          >
            <h2>Last Name: </h2>
            <p>[Patient&apos;s Last Name]</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
            }}
          >
            <h2>Gender: </h2>
            <p>[Patient&apos;s Gender]</p>
          </div>
          <div style={{ borderTop: "2px solid #69BF96" }} />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <h2>Diagnosed by: </h2>
            <p>[Patient&apos;s hospital]</p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
            }}
          >
            <h2>Diagnosis: </h2>
            <p>[Patient&apos;s Diagnosis]</p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
            }}
          >
            <h2>Additional Document: </h2>
            <p>[Patient&apos;s Document]</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              color: "rgba(105,191,150,0.5)",
            }}
          >
            <h2>Signature by Hospital: </h2>
            <p>[Hospital&apos;s Signature]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordViewer;
