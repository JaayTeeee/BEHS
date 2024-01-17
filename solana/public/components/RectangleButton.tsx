interface ButtonProps {
  text: string;
  onClick: any;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      style={{
        color: "#339f6b",
        width: "100px",
        height: "50px",
        margin: "10px",
      }}
      onClick={onClick}
    >
      <div style={{ color: "white" }}> {text}</div>
    </button>
  );
};

export default Button;
