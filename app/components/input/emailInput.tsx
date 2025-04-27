import { useState } from "react";

interface EmailInputProps {
  onChange?: (fullEmail: string) => void;
}

export const EmailInput = ({ onChange }: EmailInputProps) => {
  const [emailId, setEmailId] = useState("");
  const [domain, setDomain] = useState("naver.com");

  const handleChange = (type: "emailId" | "domain", value: string) => {
    if (type === "emailId") setEmailId(value);
    if (type === "domain") setDomain(value);

    const fullEmail = `${type === "emailId" ? value : emailId}@${
      type === "domain" ? value : domain
    }`;
    onChange?.(fullEmail);
  };

  return (
    <div className="flex items-center gap-2.5 text-text-light text-18r">
      {/* 이메일 아이디 입력 */}
      <input
        type="text"
        className="w-[226px] h-[60px] border rounded-[10px] px-4
                focus:outline-none focus:border-main"
        value={emailId}
        onChange={(e) => handleChange("emailId", e.target.value)}
      />

      <span>@</span>

      {/* 이메일 도메인 선택 */}
      <select
        className="w-[226px] h-[60px] border rounded-[10px] px-4
                focus:outline-none focus:border-main"
        value={domain}
        onChange={(e) => handleChange("domain", e.target.value)}
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
