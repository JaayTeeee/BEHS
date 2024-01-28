import React from "react";

interface searchButtonProps {
  onClick: () => void;
}

const searchButton: React.FC<searchButtonProps> = ({ onClick }) => {
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
        <b>Search</b>
      </span>
    </button>
  );
};

export default searchButton;
