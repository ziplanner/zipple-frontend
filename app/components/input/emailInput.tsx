import { useState, useEffect } from "react";

interface EmailInputProps {
  value?: string;
  onChange?: (fullEmail: string) => void;
  disabled?: boolean;
}

export const EmailInput = ({ value, onChange, disabled }: EmailInputProps) => {
  const [emailId, setEmailId] = useState<string>("");
  const [domain, setDomain] = useState<string>("naver.com");

  // 부모 컴포넌트에서 전달된 email 값을 반영
  useEffect(() => {
    if (value) {
      const [emailIdPart, domainPart] = value.split("@");
      setEmailId(emailIdPart || "");
      setDomain(domainPart || "naver.com");
    }
  }, [value]);

  const handleChange = (type: "emailId" | "domain", value: string) => {
    const nextEmailId = type === "emailId" ? value : emailId;
    const nextDomain = type === "domain" ? value : domain;

    if (type === "emailId") setEmailId(value);
    if (type === "domain") setDomain(value);

    const fullEmail = `${nextEmailId}@${nextDomain}`;
    onChange?.(fullEmail);
  };

  return (
    <div className="flex items-center gap-2.5 text-text-light text-18r">
      {/* 이메일 아이디 입력 */}
      <input
        type="text"
        className={`w-full h-[60px] border rounded-[10px] px-2 md:px-4
                focus:outline-none focus:border-main ${
                  disabled ? "bg-background-soft" : ""
                }`}
        value={emailId}
        onChange={(e) => handleChange("emailId", e.target.value)}
        disabled={disabled}
      />

      <span>@</span>

      {/* 이메일 도메인 선택 */}
      <select
        className={`w-full h-[60px] border border-background-light rounded-[10px] px-2 md:px-4
                focus:outline-none focus:border-main ${
                  disabled ? " bg-background-soft" : ""
                }`}
        value={domain}
        onChange={(e) => handleChange("domain", e.target.value)}
        disabled={disabled}
      >
        <option value="naver.com">naver.com</option>
        <option value="gmail.com">gmail.com</option>
        <option value="daum.net">daum.net</option>
        <option value="hanmail.net">hanmail.net</option>
        <option value="hotmail.com">hotmail.com</option>
      </select>
    </div>
  );
};
