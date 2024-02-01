import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { useState } from "react";
import RejectImage from "../../../public/icons/icons-wrong.png";
import rejectPermission from "../functions/rejectPermission";
import {
  createTransaction,
  signTransaction,
} from "../functions/transactionSigner";

const RejectButton = ({
  requiredAddress,
  requestedAddress,
  permissionID,
  onFailure,
}: {
  requiredAddress: string;
  requestedAddress: string;
  permissionID: BigInteger;
  onFailure: () => void;
}) => {
  // State to manage requiredAddress and permissionID
  const [address, setAddress] = useState(requiredAddress);
  const [id, setID] = useState(permissionID);
  const [clicked, setClicked] = useState(false);

  // Handler for button click
  const handleRejectPermission = async () => {
    const senderPublicKey = new PublicKey(requiredAddress);
    const recipientPublicKey = new PublicKey(requestedAddress);
    const amount = 1000;

    console.log(senderPublicKey);
    console.log(recipientPublicKey);
    const transaction = createTransaction(
      senderPublicKey,
      recipientPublicKey,
      amount
    );
    const signedTransaction = await signTransaction(
      transaction,
      senderPublicKey
    );

    if (signedTransaction) {
      rejectPermission(address, id, onFailure);
      setClicked(true);
    }

    // Reload the page after 3 seconds
    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
        disabled={clicked} // Disable the button after it's clicked to prevent multiple clicks
      >
        <Image src={RejectImage} alt="Button Icon" />
      </button>
    </div>
  );
};

export default RejectButton;
