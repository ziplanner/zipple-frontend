import Image from "next/image";
import { useState, useEffect } from "react";
import checkOn from "@/app/images/icon/check_on.svg";
import checkOff from "@/app/images/icon/check_off.svg";

interface TermsBoxProps {
  terms: {
    marketing: boolean; // 부모에서 관리하는 마케팅 동의 상태
  };
  onChange: (key: "marketing", value: boolean) => void; // 마케팅 동의 상태만 부모에게 전달
}

const TermsBox = ({ terms, onChange }: TermsBoxProps) => {
  // 내부적으로 모든 체크박스 상태를 관리
  const [internalTerms, setInternalTerms] = useState({
    all: false,
    service: false,
    privacy: false,
    policy: false,
    age: false,
    marketing: terms.marketing, // 부모로부터 받은 마케팅 동의 상태로 초기화
  });

  // 부모로부터 받은 마케팅 상태가 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setInternalTerms((prev) => ({
      ...prev,
      marketing: terms.marketing,
    }));
  }, [terms.marketing]);

  // 전체 동의 클릭 시
  const handleAllChange = () => {
    const newValue = !internalTerms.all;
    const updatedTerms = {
      all: newValue,
      service: newValue,
      privacy: newValue,
      policy: newValue,
      age: newValue,
      marketing: newValue,
    };

    setInternalTerms(updatedTerms);

    // 마케팅 동의 상태만 부모에게 전달
    if (updatedTerms.marketing !== terms.marketing) {
      onChange("marketing", updatedTerms.marketing);
    }
  };

  // 개별 동의 클릭 시
  const handleSingleChange = (key: keyof typeof internalTerms) => {
    const newValue = !internalTerms[key];

    // 새로운 상태 객체 생성
    const updatedTerms = { ...internalTerms, [key]: newValue };

    // 모든 항목이 선택되었는지 확인하여 'all' 상태 업데이트
    updatedTerms.all =
      updatedTerms.service &&
      updatedTerms.privacy &&
      updatedTerms.policy &&
      updatedTerms.age &&
      updatedTerms.marketing;

    setInternalTerms(updatedTerms);

    // 마케팅 동의가 변경된 경우만 부모에게 전달
    if (key === "marketing" && newValue !== terms.marketing) {
      onChange("marketing", newValue);
    }
  };

  return (
    <div className="flex flex-col gap-[15px]">
      {/* 전체 동의 */}
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
          className={`${
            internalTerms.all ? "text-main" : "text-text-light"
          } text-16s md:text-18s`}
        >
          전체 약관에 동의합니다.
        </p>
      </div>

      {/* 개별 동의 */}
      <div className="flex flex-col gap-4 ml-4">
        {[
          { key: "service", label: "(필수) 이용약관에 동의합니다." },
          { key: "privacy", label: "(필수) 개인정보 처리방침에 동의합니다." },
          {
            key: "policy",
            label: "(필수) 집플 서비스 운영 정책에 동의합니다.",
          },
          { key: "age", label: "(필수) 만 14세 이상입니다." },
          { key: "marketing", label: "(선택) 마케팅 알림 수신에 동의합니다." },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={
                  internalTerms[key as keyof typeof internalTerms]
                    ? checkOn
                    : checkOff
                }
                alt="checkbox"
                width={16}
                height={16}
                className="w-[16px] h-[16px] cursor-pointer"
                onClick={() =>
                  handleSingleChange(key as keyof typeof internalTerms)
                }
              />
              <p
                className={`text-14r md:text-16r ${
                  key === "marketing"
                    ? "text-text-light"
                    : "text-text-secondary"
                }`}
              >
                {label}
              </p>
            </div>
            {/* 필수 항목 중 '보기' 링크가 필요한 경우 */}
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
