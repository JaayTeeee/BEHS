import Image from "next/image";
import Link from "next/link";
import UserProfileImage from "../../src/app/icons/icons-user-profile.png";

const UserProfileButton = ({}) => {
  return (
    <Link href="/profile">
      <Image
        src={UserProfileImage}
        alt="Button Icon"
        style={{ marginBottom: "20px", height: "75px", width: "75px" }}
      />
    </Link>
  );
};

export default UserProfileButton;
