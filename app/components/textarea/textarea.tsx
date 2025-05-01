import React from "react";
import clsx from "clsx";

type TextareaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength: number;
};

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder = "내용을 입력해주세요.",
  disabled = false,
  maxLength,
}) => {
  return (
    <div className="flex flex-col space-y-1 text-18r">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        {...(maxLength > 0 ? { maxLength } : {})}
        className={clsx(
          "w-full h-[240px] px-4 py-3 text-text-secondary rounded-[10px] outline-none transition border border-background-light resize-none",
          {
            "bg-background-soft text-text-light": disabled,
            "focus:border-main": !disabled,
          }
        )}
      />

      {maxLength > 0 && (
        <div className="flex justify-end text-18r text-text-light">
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default Textarea;
