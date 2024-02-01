import { useState } from "react";
import Button from "./RectangleButton";

const DetailBox = ({ recordData }) => {
    const [attachmentData, setAttachmentData] = useState(null);
  
    console.log('Record Data in popup:', recordData);
  
    const handleDownloadAttachment = async () => {
        if (!recordData || !recordData.record || !recordData.record.attachment) {
            console.error('Attachment data not available.');
            return;
        }
    
        try {
            // Fetch attachment data from the server
            const response = await fetch("http://localhost:3001/api/attachments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ recordId: recordData.record.recordID }),
            });
    
            if (response.ok) {
                const data = await response.json();
                if (!data.success) {
                    console.error("Error fetching attachment:", data.error);
                    return;
                }
    
                if (data.record.attachment.startsWith('data:text/plain;base64')) {
                    // Text file
                    const textData = data.record.attachment.split(",")[1];
                    const decodedText = atob(textData);
                    const blob = new Blob([decodedText], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
    
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'text_file.txt'; // Specify the filename here
                    document.body.appendChild(link);
                    link.click();
    
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                } else if (data.record.attachment.startsWith('data:image/')) {
                    // Image file
                    const imageData = data.record.attachment.split(",")[1];
                    const blob = b64toBlob(imageData);
                    const url = window.URL.createObjectURL(blob);
    
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'image.jpg'; // Specify the filename here
                    document.body.appendChild(link);
                    link.click();
    
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                } else if (data.record.attachment.startsWith('data:application/pdf;base64')) {
                    // PDF file
                    const pdfData = data.record.attachment.split(",")[1];
                    const blob = b64toBlob(pdfData, 'application/pdf');
                    const url = window.URL.createObjectURL(blob);
    
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'document.pdf'; // Specify the filename here
                    document.body.appendChild(link);
                    link.click();
    
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                } else {
                    console.error("Unsupported file format");
                }
            } else {
                throw new Error("Failed to fetch attachment data");
            }
        } catch (error) {
            console.error("Error fetching attachment:", error);
        }
    };    

    // Function to convert base64 data to Blob
    function b64toBlob(b64Data: string, contentType = '', sliceSize = 512): Blob {
        const byteCharacters = atob(b64Data);
        const byteArrays: Uint8Array[] = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
    
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
        }
    
        return new Blob(byteArrays, { type: contentType });
    }

  return (
    <div>
      <div
        style={{
          width: "500px",
          height: "640px",
          backgroundColor: "#F3FFEF",
          borderRadius: "15px",
          border: "5px solid #69BF96",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "120px",
            backgroundColor: "#339F6B",
          }}
        >
          <h1 style={{ fontSize: "32px", textAlign: "center", color: "white" }}>
            <strong>Record's Details</strong>
          </h1>
        </div>
        <div
          className="scroll-bar"
          style={{
            marginLeft: "50px",
            marginRight: "40px",
            marginTop: "40px",
            overflowY: "scroll",
            height: "360px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <h2 style={{ fontSize: "22px" }}>
            <strong>Record ID: </strong> {recordData.record.recordID}
          </h2>
          <h2 style={{ fontSize: "22px" }}>
            <strong>Record Date: </strong> {recordData.record.recordDate}
          </h2>
          <h2 style={{ fontSize: "22px" }}>
            <strong>First Name: </strong> {recordData.record.mdFirstName}
          </h2>
          <h2 style={{ fontSize: "22px" }}>
            <strong>Last Name: </strong> {recordData.record.mdLastName}
          </h2>
          <h2 style={{ fontSize: "22px" }}>
            <strong>Gender: </strong> {recordData.record.gender}
          </h2>
          <h2 style={{ fontSize: "22px" }}>
            <strong>Date of Birth: </strong> {recordData.record.dateBirth}
          </h2>
          <h2 style={{ fontSize: "22px" }}>
            <strong>ID Number: </strong> {recordData.record.idNumber}
          </h2>
          <h2 style={{ fontSize: "22px" }}>
            <strong>Diagnosis: </strong> {recordData.record.diagnosis}
          </h2>
          <h2 style={{ fontSize: "22px" }}>
            <strong>Attachment: </strong> 
            <button 
                onClick={handleDownloadAttachment} 
                style={{
                    border: "none",
                    background: "none",
                    textDecoration: "underline",
                    color: "#339F6B",
                    cursor: "pointer",
                    fontSize: "inherit",
                    padding: "0",
                    margin: "0",
                }}
                onMouseEnter={(e) => e.target.style.color = 'red'}
                onMouseLeave={(e) => e.target.style.color = '#339F6B'}
            >
                Download Attachment
            </button>

            
          </h2><br/>

          <h2 style={{ fontSize: "22px" }}>
            <strong>Recorded by: </strong> {recordData.record.firstName} {recordData.record.lastName}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Button
            text="Close"
            onClick={""}
            style={{
              background: "#339F6B",
              borderRadius: "4px",
              width: "130px",
              height: "60px",
              fontWeight: "bold"
            }}
            textStyle={{ color: "white", fontSize: "28px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailBox;
