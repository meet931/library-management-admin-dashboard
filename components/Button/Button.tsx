import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
  onClick?: () => void;
  className?: string;  
}

const Button: FC<ButtonProps> = ({
  buttonName,
  onClick,
  className,
  type = "button",
  ...props
}) => {
  return (
    <div>
      <button
      type={type}
        className={`px-4 py-2 rounded-md ${className}`}
        onClick={onClick}
        {...props}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default Button;
