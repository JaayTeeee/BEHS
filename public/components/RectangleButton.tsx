import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      type="button"
      style={{
        color: "white",
        background: "#339f6b",
        width: "225px",
        height: "75px",
        margin: "10px",
        zIndex: 999,
        border: "none",
        borderRadius: "8px",
      }}
      onClick={onClick}
    >
      <span style={{ fontSize: "32px" }}>{text}</span>
    </button>
  );
};

export default Button;
