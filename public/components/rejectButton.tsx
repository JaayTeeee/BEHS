import Image from "next/image";
import Link from "next/link";
import RejectImage from "../../public/icons/icons-wrong.png";

const ApproveButton = ({}) => {
  return (
    <Link href="/profile">
      <Image
        src={RejectImage}
        alt="Button Icon"
        style={{ marginBottom: "5px", height: "70px", width: "70px", marginRight: "40px" }}
      />
    </Link>
  );
};

export default ApproveButton;
