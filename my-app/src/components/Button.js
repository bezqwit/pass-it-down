// Button component
import React from "react";

const Button = ({
  label,
  onClick,
  leftIcon,
  rightIcon,
  className,
  disabled,
  type = "button"
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className || "btn btn-primary"}
    >
      {leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      {label}
      {rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

export default Button;