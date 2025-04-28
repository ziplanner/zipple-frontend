import TermsBox from "@/app/components/box/termsBox";
import { LargeBtn } from "@/app/components/button/largeBtn";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";
import { useAgentSignup } from "@/app/context/agentSignupProvider";

const Step3 = () => {
  const {
    currentStep,
    setCurrentStep,
    terms,
    setTerms,
    businessRegistrationFile,
    setBusinessRegistrationFile,
    brokerageLicenseFile,
    setBrokerageLicenseFile,
    selectedSpecialty,
    setSelectedSpecialty,
    businessRegistrationFileName,
    setBusinessRegistrationFileName,
    brokerageLicenseFileName,
    setBrokerageLicenseFileName,
  } = useAgentSignup();

  const handleTermsChange = (key: keyof typeof terms, value: boolean) => {
    setTerms((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBusinessFileSelect = (file: File | null) => {
    if (file) {
      setBusinessRegistrationFile(file);
      setBusinessRegistrationFileName(file.name);
    }
  };

  const handleLicenseFileSelect = (file: File | null) => {
    if (file) {
      setBrokerageLicenseFile(file);
      setBrokerageLicenseFileName(file.name);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (!businessRegistrationFile || !brokerageLicenseFile) {
      alert("사업자등록증과 중개등록증을 모두 업로드해주세요.");
      return;
    }

    if (!terms.service || !terms.privacy || !terms.policy || !terms.age) {
      alert("필수 약관에 모두 동의해주세요.");
      return;
    }

    if (!selectedSpecialty) {
      alert("전문분야를 선택해주세요.");
      return;
    }

    console.log("제출할 사업자등록증:", businessRegistrationFile);
    console.log("제출할 중개등록증:", brokerageLicenseFile);
    console.log("제출할 약관 데이터:", terms);
    console.log("제출할 전문분야:", selectedSpecialty);
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-[30px] w-full md:p-10 border border-border md:w-[600px] rounded-[20px]">
      <h2 className="text-text-primary text-18s md:text-24s mb-5">서류 제출</h2>

      {/* 사업자등록증 업로드 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          사업자등록증 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          type="file"
          placeholder="사업자등록증.pdf"
          searchValue={businessRegistrationFileName}
          onSearchChange={() => {}}
          accept=".pdf"
          onFileSelect={handleBusinessFileSelect}
        />
      </div>

      {/* 중개등록증 업로드 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          중개등록증 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          type="file"
          placeholder="중개등록증.pdf"
          searchValue={brokerageLicenseFileName}
          onSearchChange={() => {}}
          accept=".pdf"
          onFileSelect={handleLicenseFileSelect}
        />
      </div>

      <div className="border-b border-background-light border-dotted w-full my-[30px] md:my-5" />

      {/* 전문분야 선택 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          전문분야 <span className="text-error">*</span>
        </h3>
        <CustomSelectBox
          options={["주거", "상업", "토지", "기타"]}
          value={selectedSpecialty}
          onChange={setSelectedSpecialty}
        />
      </div>

      <div className="border-b border-background-light border-dotted w-full my-[30px] md:my-5" />

      {/* 약관동의 */}
      <TermsBox terms={terms} onChange={handleTermsChange} />

      {/* 버튼 */}
      <div className="mt-[60px] flex flex-col gap-3">
        <LargeBtn onClick={handleComplete} text="완료" color="blue" />
        <LargeBtn onClick={handlePrev} text="이전" color="white" />
      </div>
    </div>
  );
};

export default Step3;
