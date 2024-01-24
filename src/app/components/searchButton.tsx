import React from "react";

interface searchButtonProps {
  text: string;
  onClick: () => void;
}

const searchButton: React.FC<searchButtonProps> = ({ text, onClick }) => {
  return (
    <button
      type="button"
      style={{
        color: "white",
        background: "#339f6b",
        width: "100px",
        height: "40px",
        margin: "10px",
        border: "none",
        borderRadius: "8px",
        marginRight: "-1685px",
        zIndex: 999,
      }}
      onClick={onClick}
    >
      <span style={{ fontSize: "15px" }}>
        <b>{text}</b>
      </span>
    </button>
  );
};

export default searchButton;
