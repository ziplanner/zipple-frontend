import { useState } from "react";

interface DateInputProps {
  onChange?: (fullDate: string) => void;
}

export const DateInput = ({ onChange }: DateInputProps) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const handleChange = (type: "year" | "month" | "day", value: string) => {
    if (type === "year") setYear(value);
    if (type === "month") setMonth(value);
    if (type === "day") setDay(value);

    const fullDate = `${type === "year" ? value : year}-${
      type === "month" ? value : month
    }-${type === "day" ? value : day}`;
    onChange?.(fullDate);
  };

  return (
    <div className="flex items-center gap-2.5 text-text-light text-18r">
      {/* 년도 입력 */}
      <input
        type="text"
        placeholder="YYYY"
        className="flex-1 w-full h-[60px] border rounded-[10px] px-4
                focus:outline-none focus:border-main text-center"
        value={year}
        maxLength={4}
        onChange={(e) =>
          handleChange("year", e.target.value.replace(/\D/g, ""))
        }
      />

      {/* 월 입력 */}
      <input
        type="text"
        placeholder="MM"
        className="flex-1 w-full h-[60px] border rounded-[10px] px-4
                focus:outline-none focus:border-main text-center"
        value={month}
        maxLength={2}
        onChange={(e) =>
          handleChange("month", e.target.value.replace(/\D/g, ""))
        }
      />

      {/* 일 입력 */}
      <input
        type="text"
        placeholder="DD"
        className="flex-1 w-full h-[60px] border rounded-[10px] px-4
                focus:outline-none focus:border-main text-center"
        value={day}
        maxLength={2}
        onChange={(e) => handleChange("day", e.target.value.replace(/\D/g, ""))}
      />
    </div>
  );
};
