import { Role } from "@/store/slices/rolesSlice";
import React, { FC, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  labelName?: string;
  labelClass?: string;
  value?: string;
  contentList?: string[] | Role[];
  option?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  errorMessage?: string;
}

const Select: FC<SelectProps> = ({
  labelName,
  labelClass,
  value,
  contentList = [], // Initialize options with an empty array
  option,
  onChange,
  className,
  errorMessage,
  ...props
}) => {
  return (
    <div>
      {labelName && (
        <label className={`block mb-2 font-medium ${labelClass}`}>
          {labelName}
        </label>
      )}
      <select
        className={`w-full p-2 pr-8 border border-gray-300 rounded-md ${className}`}
        value={value}
        onChange={onChange}
      >
        {option && <option value="">{option}</option>}
        {contentList.map((item, index) => {
          // Check if the item is a Role or a string
          if (typeof item === "string") {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          } else if (item && typeof item === "object") {
            return (
              <option key={item.id} value={item.role}>
                {item.role}
              </option>
            );
          }
          return null; // Return null for any invalid case
        })}
      </select>
      {errorMessage && (
        <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Select;

