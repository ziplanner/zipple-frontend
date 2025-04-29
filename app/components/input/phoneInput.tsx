import { useState, useEffect } from "react";

interface PhoneInputProps {
  value?: string;
  onChange?: (fullPhone: string) => void;
  disabled?: boolean;
}

export const PhoneInput = ({ value, onChange, disabled }: PhoneInputProps) => {
  const [first, setFirst] = useState("010");
  const [middle, setMiddle] = useState("");
  const [last, setLast] = useState("");

  useEffect(() => {
    if (value) {
      const [firstPart, middlePart, lastPart] = value.split("-");
      setFirst(firstPart);
      setMiddle(middlePart);
      setLast(lastPart);
    }
  }, [value]);

  const handleChange = (type: "first" | "middle" | "last", value: string) => {
    if (type === "first") setFirst(value);
    if (type === "middle") setMiddle(value);
    if (type === "last") setLast(value);

    const fullPhone = `${first}-${middle}-${last}`;
    onChange?.(fullPhone.replace(/-/g, "")); // 하이픈 없이 보내기
  };

  return (
    <div className="flex items-center gap-2.5 w-full text-text-secondary">
      {/* 앞 번호 선택 */}
      <select
        className={`flex-1 w-full h-[60px] border border-background-light rounded-[10px] px-4
        focus:outline-none focus:border-main
        ${disabled ? "bg-background-soft" : ""}
      `}
        value={first}
        onChange={(e) => handleChange("first", e.target.value)}
        disabled={disabled}
      >
        <option value="010">010</option>
        <option value="011">011</option>
        <option value="016">016</option>
        <option value="017">017</option>
        <option value="018">018</option>
        <option value="019">019</option>
      </select>

      <span>-</span>

      {/* 중간 번호 입력 */}
      <input
        type="text"
        className={`flex-1 w-full h-[60px] border rounded-[10px] px-4 
            focus:outline-none focus:border-main ${
              disabled ? "bg-background-soft" : ""
            }`}
        value={middle}
        maxLength={4}
        onChange={(e) =>
          handleChange("middle", e.target.value.replace(/\D/g, ""))
        }
        disabled={disabled}
      />

      <span>-</span>

      {/* 끝 번호 입력 */}
      <input
        type="text"
        className={`flex-1 w-full h-[60px] border rounded-[10px] px-4
                focus:outline-none focus:border-main ${
                  disabled ? "bg-background-soft" : ""
                }`}
        value={last}
        maxLength={4}
        onChange={(e) =>
          handleChange("last", e.target.value.replace(/\D/g, ""))
        }
        disabled={disabled}
      />
    </div>
  );
};
