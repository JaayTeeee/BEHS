import Image from "next/image";
import Link from "next/link";
import HealthCare from "../../src/app/icons/icons-healthcare.png";

const HomePageButton = ({}) => {
  return (
    <Link href="/welcome">
      <Image
        src={HealthCare}
        alt="Button Icon"
        style={{ marginBottom: "20px", height: "75px", width: "75px" }}
      />
    </Link>
  );
};

export default HomePageButton;
