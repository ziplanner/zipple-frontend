import { useState } from "react";

interface PhoneInputProps {
  onChange?: (fullPhone: string) => void;
}

export const PhoneInput = ({ onChange }: PhoneInputProps) => {
  const [first, setFirst] = useState("010");
  const [middle, setMiddle] = useState("");
  const [last, setLast] = useState("");

  const handleChange = (type: "first" | "middle" | "last", value: string) => {
    if (type === "first") setFirst(value);
    if (type === "middle") setMiddle(value);
    if (type === "last") setLast(value);

    const fullPhone = `${type === "first" ? value : first}-${
      type === "middle" ? value : middle
    }-${type === "last" ? value : last}`;
    onChange?.(fullPhone);
  };

  return (
    <div className="flex items-center gap-2.5 text-text-light text-18r">
      {/* 앞 번호 선택 */}
      <select
        className="w-[138px] h-[60px] border rounded-[10px] px-4
                focus:outline-none focus:border-main"
        value={first}
        onChange={(e) => handleChange("first", e.target.value)}
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
        className="w-[138px] h-[60px] border rounded-[10px] px-4 
             focus:outline-none focus:border-main"
        value={middle}
        maxLength={4}
        onChange={(e) =>
          handleChange("middle", e.target.value.replace(/\D/g, ""))
        }
      />

      <span>-</span>

      {/* 끝 번호 입력 */}
      <input
        type="text"
        className="w-[138px] h-[60px] border rounded-[10px] px-4
                focus:outline-none focus:border-main"
        value={last}
        maxLength={4}
        onChange={(e) =>
          handleChange("last", e.target.value.replace(/\D/g, ""))
        }
      />
    </div>
  );
};
