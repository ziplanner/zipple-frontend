"use client";

import SignupBox from "@/app/components/box/signupBox";
import { useState } from "react";

const SignupPage = () => {
  const [selectedType, setSelectedType] = useState<
    "일반" | "공인중개사" | "생활전문가" | null
  >(null);

  const handleCardSelect = (type: "일반" | "공인중개사" | "생활전문가") => {
    setSelectedType(type);
  };

  return (
    <div className="flex flex-col items-center mt-20 mb-[124px] gap-[70px]">
      {/* 상단 텍스트 영역 */}
      <div className="flex flex-col gap-5 text-center">
        <h1 className="text-text-primary text-36m">
          <span className="text-main text-36eb">ZIPPLE</span>과 어떤 경험을 함께
          하실 건가요?
        </h1>
        <p className="text-text-secondary text-18r">
          집플회원이 되어 다양한 서비스를 제공 받아보고, <br />
          집플과 함께 성장할 파트너를 모집합니다!
        </p>
      </div>
      {/* 하단 박스 영역 */}
      <div className="flex gap-[30px]">
        <SignupBox
          type="일반"
          isSelected={selectedType === "일반"}
          onSelect={handleCardSelect}
        />
        <SignupBox
          type="공인중개사"
          isSelected={selectedType === "공인중개사"}
          onSelect={handleCardSelect}
        />
        <SignupBox
          type="생활전문가"
          isSelected={selectedType === "생활전문가"}
          onSelect={handleCardSelect}
        />
      </div>
    </div>
  );
};

export default SignupPage;
