import Image from "next/image";
import ApproveImage from "../../../public/icons/icons-correct.png";
import grantPermission from "../functions/grantPermission";
import { useState } from "react";

const ApproveButton = ({ requiredAddress, permissionID }: { requiredAddress: string, permissionID: BigInteger }) => {
  // State to manage requiredAddress and permissionID
  const [address, setAddress] = useState(requiredAddress);
  const [id, setID] = useState(permissionID);

  // Handler for button click
  const handleGrantPermission = () => {
    grantPermission(address, id);
  };

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
        onClick={handleGrantPermission}
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
