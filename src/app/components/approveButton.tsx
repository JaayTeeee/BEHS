import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { useState } from "react";
import ApproveImage from "../../../public/icons/icons-correct.png";
import grantPermission from "../functions/grantPermission";
import {
  createTransaction,
  signTransaction,
} from "../functions/transactionSigner";

const ApproveButton = ({
  requiredAddress,
  requestedAddress,
  permissionID,
  onSuccess,
}: {
  requiredAddress: string;
  requestedAddress: string;
  permissionID: BigInteger;
  onSuccess: () => void;
}) => {
  // State to manage requiredAddress and permissionID
  const [address, setAddress] = useState(requiredAddress);
  const [id, setID] = useState(permissionID);
  const [clicked, setClicked] = useState(false);

  // Handler for button click
  const handleGrantPermission = async () => {
    console.log("My address:", requiredAddress);
    console.log("Hospital address:", requestedAddress);
    const senderPublicKey = new PublicKey(requiredAddress);
    const recipientPublicKey = new PublicKey(requestedAddress);
    const amount = 1000;

    const transaction = createTransaction(
      senderPublicKey,
      recipientPublicKey,
      amount
    );
    const signedTransaction = await signTransaction(transaction);

    if (signedTransaction) {
      grantPermission(address, id, onSuccess);
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
        disabled={clicked} // Disable the button after it's clicked to prevent multiple clicks
      >
        <Image src={ApproveImage} alt="Button Icon" />
      </button>
    </div>
  );
};

export default ApproveButton;
