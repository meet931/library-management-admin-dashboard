import React, { FC } from "react";

interface ButtonProps {
    buttonName: string;
    onClick: () => void;
    className: string;
}

const Button: FC<ButtonProps> = ({ buttonName, onClick, className }) => {
  return (
    <div>
      <button
        className={`px-4 py-2 rounded-md ${className}`}
        onClick={onClick}
      >
        {buttonName}
      </button>
    </div>
  );
}

export default Button;
