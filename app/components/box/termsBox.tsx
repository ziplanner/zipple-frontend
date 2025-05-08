import Image from "next/image";
import { useState, useEffect } from "react";
import checkOn from "@/app/images/icon/check_on.svg";
import checkOff from "@/app/images/icon/check_off.svg";

interface Terms {
  service: boolean;
  privacy: boolean;
  policy: boolean;
  age: boolean;
  marketing: boolean;
}

interface TermsBoxProps {
  terms: Terms;
  onChange: (key: keyof Terms, value: boolean) => void;
}

const TermsBox = ({ terms, onChange }: TermsBoxProps) => {
  const [internalTerms, setInternalTerms] = useState({
    all: false,
    service: terms.service,
    privacy: terms.privacy,
    policy: terms.policy,
    age: terms.age,
    marketing: terms.marketing,
  });

  useEffect(() => {
    setInternalTerms((prev) => ({
      ...prev,
      service: terms.service,
      privacy: terms.privacy,
      policy: terms.policy,
      age: terms.age,
      marketing: terms.marketing,
      all:
        terms.service &&
        terms.privacy &&
        terms.policy &&
        terms.age &&
        terms.marketing,
    }));
  }, [terms]);

  const handleAllChange = () => {
    const newValue = !internalTerms.all;
    const updated = {
      all: newValue,
      service: newValue,
      privacy: newValue,
      policy: newValue,
      age: newValue,
      marketing: newValue,
    };
    setInternalTerms(updated);
    Object.entries(updated).forEach(([key, value]) => {
      if (key !== "all") onChange(key as keyof Terms, value);
    });
  };

  const handleSingleChange = (key: keyof Terms) => {
    const newValue = !internalTerms[key];
    const updated = { ...internalTerms, [key]: newValue };
    updated.all =
      updated.service &&
      updated.privacy &&
      updated.policy &&
      updated.age &&
      updated.marketing;
    setInternalTerms(updated);
    onChange(key, newValue);
  };

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex items-center gap-2 border border-main rounded-[10px] p-4 shadow-md mb-1.5">
        <Image
          src={internalTerms.all ? checkOn : checkOff}
          alt="checkbox"
          width={16}
          height={16}
          className="cursor-pointer"
          onClick={handleAllChange}
        />
        <p
          className={`$${
            internalTerms.all ? "text-main" : "text-text-light"
          } text-16s md:text-18s`}
        >
          전체 약관에 동의합니다.
        </p>
      </div>

      <div className="flex flex-col gap-4 ml-4">
        {["service", "privacy", "policy", "age", "marketing"].map((key) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={internalTerms[key as keyof Terms] ? checkOn : checkOff}
                alt="checkbox"
                width={16}
                height={16}
                className="w-[16px] h-[16px] cursor-pointer"
                onClick={() => handleSingleChange(key as keyof Terms)}
              />
              <p
                className={`text-14r md:text-16r $${
                  key === "marketing"
                    ? "text-text-light"
                    : "text-text-secondary"
                }`}
              >
                {(() => {
                  switch (key) {
                    case "service":
                      return "(필수) 이용약관에 동의합니다.";
                    case "privacy":
                      return "(필수) 개인정보 처리방침에 동의합니다.";
                    case "policy":
                      return "(필수) 집플 서비스 운영 정책에 동의합니다.";
                    case "age":
                      return "(필수) 만 14세 이상입니다.";
                    case "marketing":
                      return "(선택) 마케팅 알림 수신에 동의합니다.";
                    default:
                      return "";
                  }
                })()}
              </p>
            </div>
            {key !== "marketing" && key !== "age" && (
              <p className="text-text-light text-14m md:text-16m cursor-pointer underline">
                보기
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsBox;
