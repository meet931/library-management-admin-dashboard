import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  labelName?: string;
  labelClassName?: string;
  htmlFor?: string;
  startIcon?: string;
  endIcon?: string;
  errorMessage?: string;
}

const Input: FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  disabled,
  labelName,
  labelClassName,
  htmlFor,
  startIcon,
  endIcon,
  errorMessage,
  ...props
}) => {
  return (
    <div>
      {/* LABEL */}
      {labelName && (
        <label htmlFor={htmlFor}
          className={`block text-md mb-2 font-medium text-gray-900 ${labelClassName}`}          
        >{labelName}</label>
      )}

      <div>
      {/* START ICON */}
      {startIcon && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">{startIcon}</span>
          </div>
        )}
      {/* INPUT */}
      <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`block w-full px-3 py-2 border border-gray-300 rounded-md ${className}`}
          disabled={disabled}
          {...props}
        />
      {/* End Icon */}
      {endIcon && (
          <span className="absolute right-0 pr-2  z-10">{endIcon}</span>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;
