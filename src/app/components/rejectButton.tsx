import Image from "next/image";
import Link from "next/link";
import RejectImage from "../../../public/icons/icons-wrong.png";

const RejectButton = () => {
  return (
    <div style={{ marginTop: "5px" }}>
      <Link href="/profile">
        <Image
          src={RejectImage}
          alt="Button Icon"
          style={{ height: "70px", width: "70px" }}
        />
      </Link>
    </div>
  );
};

export default RejectButton;
