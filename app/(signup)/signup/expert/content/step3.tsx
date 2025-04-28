import { useState } from "react";
import TermsBox from "@/app/components/box/termsBox";
import { LargeBtn } from "@/app/components/button/largeBtn";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { useExpertSignup } from "@/app/context/expertSignupProvider";

const Step3 = () => {
  const {
    currentStep,
    setCurrentStep,
    terms,
    setTerms,
    businessFile,
    setBusinessFile,
    searchValue,
    setSearchValue,
  } = useExpertSignup();

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTermsChange = (key: "marketing", value: boolean) => {
    setTerms((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setBusinessFile(file);
      setSearchValue(file.name);
    }
  };

  const handleComplete = () => {
    if (!businessFile) {
      alert("사업자등록증을 업로드해주세요.");
      return;
    }

    if (!terms.service || !terms.privacy || !terms.policy || !terms.age) {
      alert("필수 약관에 모두 동의해주세요.");
      return;
    }

    console.log("제출할 파일:", businessFile);
    console.log("제출할 데이터:", terms);
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-[30px] md:p-10 border border-border md:w-[600px] rounded-[20px]">
      <h2 className="text-text-primary text-18s md:text-24s mb-5">서류제출</h2>

      {/* 사업자등록증 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          사업자등록증 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          type="file"
          placeholder="사업자등록증.pdf"
          searchValue={searchValue}
          onSearchChange={() => {}}
          accept=".pdf"
          onFileSelect={handleFileSelect}
        />
      </div>

      <div className="border-b border-background-light border-dotted w-full my-[30px] md:my-5" />

      {/* 약관동의 */}
      <TermsBox terms={terms} onChange={handleTermsChange} />

      {/* 버튼 */}
      <div className="mt-[60px] flex flex-col gap-3">
        <LargeBtn onClick={handleComplete} text={"완료"} color="blue" />
        <LargeBtn onClick={handlePrev} text={"이전"} color="white" />
      </div>
    </div>
  );
};

export default Step3;
