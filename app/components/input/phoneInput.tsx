import { useState, useEffect } from "react";

interface PhoneInputProps {
  value?: string; // "0212345678" 또는 "01012345678"
  onChange?: (fullPhone: string) => void;
  disabled?: boolean;
  isLandline?: boolean; // 유선 전화 여부
}

export const PhoneInput = ({
  value = "",
  onChange,
  disabled,
  isLandline = false, // 기본값 false
}: PhoneInputProps) => {
  const [first, setFirst] = useState<string>(isLandline ? "02" : "010");
  const [middle, setMiddle] = useState<string>("");
  const [last, setLast] = useState<string>("");

  useEffect(() => {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 9 && digits.length <= 11) {
      let firstPart = "";
      let middlePart = "";
      let lastPart = "";

      // 유선: 지역번호 길이 다양함 (02는 2자리, 그 외는 3자리)
      if (isLandline) {
        if (digits.startsWith("02")) {
          firstPart = "02";
          middlePart = digits.slice(2, digits.length - 4);
          lastPart = digits.slice(-4);
        } else {
          firstPart = digits.slice(0, 3);
          middlePart = digits.slice(3, digits.length - 4);
          lastPart = digits.slice(-4);
        }
      } else {
        firstPart = digits.slice(0, 3);
        middlePart = digits.slice(3, 7);
        lastPart = digits.slice(7, 11);
      }

      setFirst(firstPart);
      setMiddle(middlePart);
      setLast(lastPart);
    }
  }, [value, isLandline]);

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

  const phonePrefixOptions = isLandline
    ? [
        "02", // 서울
        "031",
        "032",
        "033", // 경기, 인천, 강원
        "041",
        "042",
        "043", // 충청
        "051",
        "052",
        "053",
        "054",
        "055", // 영남
        "061",
        "062",
        "063",
        "064", // 호남, 제주
      ]
    : ["010", "011", "016", "017", "018", "019"];

  return (
    <div className="flex items-center gap-2.5 w-full text-text-secondary">
      {/* 앞 번호 */}
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
        {phonePrefixOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
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
