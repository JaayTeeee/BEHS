import React from "react";

interface ButtonProps {
  text: string;
  onClick: any;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, style, textStyle }) => {
  const defaultStyles: React.CSSProperties = {
    color: "white",
    background: "#339f6b",
    width: "225px",
    height: "75px",
    margin: "10px",
    zIndex: 999,
    border: "none",
    borderRadius: "8px",
  };

  const defaultTextStyles: React.CSSProperties = {
    fontSize: "32px",
  };

  const buttonStyles: React.CSSProperties = {
    ...defaultStyles,
    ...style,
  };

  const buttonTextStyles: React.CSSProperties = {
    ...defaultTextStyles,
    ...textStyle,
  };

  return (
    <button type="button" style={buttonStyles} onClick={onClick}>
      <span style={buttonTextStyles}>{text}</span>
    </button>
  );
};

export default Button;
