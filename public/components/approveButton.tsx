import Image from "next/image";
import Link from "next/link";
import ApproveImage from "../../public/icons/icons-correct.png";

const ApproveButton = ({}) => {
  return (
    <Link href="/profile">
      <Image
        src={ApproveImage}
        alt="Button Icon"
        style={{ marginBottom: "5px", height: "75px", width: "75px", marginLeft: "40s0px" }}
      />
    </Link>
  );
};

export default ApproveButton;
