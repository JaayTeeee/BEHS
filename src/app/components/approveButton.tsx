import Image from "next/image";
import ApproveImage from "../../../public/icons/icons-correct.png";
import grantPermission from "../functions/grantPermission";

const ApproveButton = (requiredAddress: string) => {
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
      <button
        onClick={() => grantPermission(requiredAddress)}
        style={{
          display: "inline-block",
        }}
      >
        <Image src={ApproveImage} alt="Button Icon" />
      </button>
    </div>
  );
};

export default ApproveButton;
