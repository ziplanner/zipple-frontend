import React from "react";
import clsx from "clsx";

type InputBoxProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

const Input: React.FC<InputBoxProps> = ({
  value,
  onChange,
  placeholder = "내용을 입력해주세요.",
  error = false,
  errorMessage,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "w-full px-4 py-3 text-text-secondary rounded-md text-sm outline-none transition border border-background-light",
          {
            "bg-background-soft text-text-light": disabled,
            " hover:border-black focus:border-main": !disabled && !error,
            "border-error text-error": error,
          }
        )}
      />
      {error && errorMessage && (
        <p className="text-xs text-error">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
