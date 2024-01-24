import Image from "next/image";
import Link from "next/link";
import ApproveImage from "../../public/icons/icons-correct.png";

const ApproveButton = () => {
  return (
    <div
      style={{
        marginTop: "5px",
        marginLeft: "400px",
        marginRight: "20px",
        height: "72px",
        width: "72px",
      }}
    >
      <Link
        href="/profile"
        style={{
          display: "inline-block",
        }}
      >
        <Image src={ApproveImage} alt="Button Icon" />
      </Link>
    </div>
  );
};

export default ApproveButton;
