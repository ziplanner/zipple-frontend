import { useState, useEffect } from "react";

interface PhoneInputProps {
  value?: string; // "01012345678"
  onChange?: (fullPhone: string) => void;
  disabled?: boolean;
}

export const PhoneInput = ({
  value = "",
  onChange,
  disabled,
}: PhoneInputProps) => {
  const [first, setFirst] = useState<string>("010");
  const [middle, setMiddle] = useState<string>("");
  const [last, setLast] = useState<string>("");

  // ✅ 최초 마운트 또는 외부 값이 바뀔 때만 내부 상태 초기화
  useEffect(() => {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 10 && digits.length <= 11) {
      const firstPart = digits.slice(0, 3);
      const middlePart = digits.slice(3, 7);
      const lastPart = digits.slice(7, 11);

      setFirst(firstPart);
      setMiddle(middlePart);
      setLast(lastPart);
    }
    // else: 입력 중에는 상태를 유지 (리셋 방지)
  }, [value]);

  const handleChange = (type: "first" | "middle" | "last", input: string) => {
    const onlyNumber = input.replace(/\D/g, "");

    let nextFirst = first;
    let nextMiddle = middle;
    let nextLast = last;

    if (type === "first") {
      setFirst(onlyNumber);
      nextFirst = onlyNumber;
    }
    if (type === "middle") {
      setMiddle(onlyNumber);
      nextMiddle = onlyNumber;
    }
    if (type === "last") {
      setLast(onlyNumber);
      nextLast = onlyNumber;
    }

    const fullPhone = `${nextFirst}${nextMiddle}${nextLast}`;
    onChange?.(fullPhone);
  };

  return (
    <div className="flex items-center gap-2.5 w-full text-text-secondary">
      {/* 앞 번호 선택 */}
      <select
        className={`flex-1 w-full h-[60px] border border-background-light rounded-[10px] px-2 md:px-4
          focus:outline-none focus:border-main ${
            disabled ? "bg-background-soft" : ""
          }
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
        inputMode="numeric"
        className={`flex-1 w-full h-[60px] border rounded-[10px] px-2 md:px-4 
          focus:outline-none focus:border-main ${
            disabled ? "bg-background-soft" : ""
          }
        `}
        value={middle}
        maxLength={4}
        onChange={(e) => handleChange("middle", e.target.value)}
        disabled={disabled}
      />

      <span>-</span>

      {/* 끝 번호 입력 */}
      <input
        type="text"
        inputMode="numeric"
        className={`flex-1 w-full h-[60px] border rounded-[10px] px-2 md:px-4 
          focus:outline-none focus:border-main ${
            disabled ? "bg-background-soft" : ""
          }
        `}
        value={last}
        maxLength={4}
        onChange={(e) => handleChange("last", e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};
