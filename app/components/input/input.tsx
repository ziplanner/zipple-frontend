import React from "react";
import clsx from "clsx";

type InputBoxProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
  successMessage?: string;
  disabled?: boolean;
  className?: string;
};

const Input: React.FC<InputBoxProps> = ({
  value,
  onChange,
  placeholder = "내용을 입력해주세요.",
  error = false,
  errorMessage,
  success = false,
  successMessage,
  disabled = false,
  className,
}) => {
  return (
    <div className={`flex flex-col space-y-1 text-18r ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "w-full h-[60px] px-2 md:px-4 text-text-secondary rounded-[10px] outline-none transition border border-background-light",
          {
            "bg-background-soft text-text-light": disabled,
            " focus:border-main": !disabled && !error,
            "border-error text-error": error,
            "border-secondary text-secondary": success,
          }
        )}
      />
      {error && errorMessage && <p className="text-error">{errorMessage}</p>}
      {success && successMessage && (
        <p className="text-secondary">{successMessage}</p>
      )}
    </div>
  );
};

export default Input;
