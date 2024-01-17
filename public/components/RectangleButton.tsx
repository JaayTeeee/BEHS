import React from 'react';

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
        width: "100px",
        height: "50px",
        margin: "10px",
        zIndex: 999,
        border: 'none', 
        borderRadius: '10px', 
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
