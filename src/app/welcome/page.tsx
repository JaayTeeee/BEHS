import ButtonWithImage from "../../../public/components/ButtonWithImage";
import HomePageButton from "../../../public/components/HomePageButton";
import UserProfileButton from "../../../public/components/UserProfileButton";
import MedRecordImage from "../icons/icons-medical-record.png";
import PermissionImage from "../icons/icons-permission.png";
import ResearchImage from "../icons/icons-research.png";

export default function Home() {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "30px",
            marginTop: "15px",
          }}
        >
          <UserProfileButton />
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "100px",
        }}
      >
        <div className="BEHS" style={{ fontSize: "65px" }}>
          <strong>WELCOME, [XXX]</strong>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-20px",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <ButtonWithImage
            text="Research Opportunities"
            imageSrc={ResearchImage}
            link="/research"
          />
        </div>
        <div style={{ marginRight: "20px" }}>
          <ButtonWithImage
            text="Permissions"
            imageSrc={PermissionImage}
            link="/permissions"
          />
        </div>
        <div>
          <ButtonWithImage
            text="Medical Records"
            imageSrc={MedRecordImage}
            link="/records"
          />
        </div>
      </div>
    </main>
  );
}
