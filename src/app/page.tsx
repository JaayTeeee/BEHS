import Image from "next/image";
import RectangleButton from "../../public/components/RectangleButton";
import HealthCare from "./icons/icons-healthcare.png";
import MedicalImage from "./icons/medical.jpg";

export default function Home() {
  return (
    <main>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "160px",
            left: "130px",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", letterSpacing: "3px"  }}>
            <Image src={HealthCare} className="icon" alt="healthcare" />
            <div className="BEHS ml-7 mt-5">BEHS</div>
          </div>
          <div
            className="BEHS"
            style={{ fontSize: "24px", marginTop: "-30px"}}
          >
            <strong>Blockchain-based Electronic Health System</strong>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            <RectangleButton text="LOGIN" onClick={""} />
          </div>
        </div>

        <div className="circle" />
        <Image
          className="circle"
          src={MedicalImage}
          alt="medical-image"
          objectFit="cover"
          style={{ right: "-60px", top: "-200px" }}
          />
      </div>
    </main>
  );
}