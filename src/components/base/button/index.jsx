import React from "react";
import "./button.css";

export default function Button({
  vaniant = "primary",
  children = "Click me",
  size = "md",
  disabled = false,
  onClick,
}) {
  const colorButton = {
    primary: "primary",
    secondary: "secondary",
    danger: "danger",
  };

  const sizeButton = {
    sm: "sm",
    md: "md",
    lg: "lg",
  };

  console.log(colorButton[vaniant]);

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`base-button btn-${colorButton[vaniant]} btn-${sizeButton[size]}`}
      >
        {children}
      </button>
    </>
  );
}
