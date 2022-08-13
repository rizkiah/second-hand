import React from "react";

function InputBox({ className, placeholder, name, type, value, onChange }) {
  return (
    <input required
      type={type}
      name={name}
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      style={{
        padding: "12px 16px",
        height: "48px",
        border: "1px solid #D0D0D0",
        borderRadius: "16px",
        background: "#FFFFFF",
        display: "flex",
      }}
    />
  );
}

export default InputBox;
