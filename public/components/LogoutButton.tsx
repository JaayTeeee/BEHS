import Image from "next/image";
import Link from "next/link";
import LogoutImage from "../../public/icons/icons-logout.png";

const LogoutButton = ({}) => {
  return (
    <Link href="/profile">
      <Image
        src={LogoutImage}
        alt="Button Icon"
        style={{ marginLeft: "30px", marginBottom: "20px", height: "70px", width: "70px" }}
      />
    </Link>
  );
};

export default LogoutButton;
