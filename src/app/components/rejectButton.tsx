import Image from "next/image";
import RejectImage from "../../../public/icons/icons-wrong.png";
import rejectPermission from "../functions/rejectPermission";
import { useState } from "react";

const RejectButton = ({ requiredAddress, permissionID }: { requiredAddress: string, permissionID: BigInteger }) => {
  // State to manage requiredAddress and permissionID
  const [address, setAddress] = useState(requiredAddress);
  const [id, setID] = useState(permissionID);

  // Handler for button click
  const handleRejectPermission = () => {
    rejectPermission(address, id);
  };

  return (
    <div
      style={{
        marginTop: "5px",
        marginLeft: "15px",
        marginRight: "5px",
        height: "72px",
        width: "72px",
      }}
    >
      <button
        onClick={handleRejectPermission}
        style={{
          display: "inline-block",
        }}
      >
        <Image src={RejectImage} alt="Button Icon" />
      </button>
    </div>
  );
};

export default RejectButton;
