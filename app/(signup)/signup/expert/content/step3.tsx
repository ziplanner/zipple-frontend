import { useState } from "react";
import TermsBox from "@/app/components/box/termsBox";
import { LargeBtn } from "@/app/components/button/largeBtn";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { useExpertSignup } from "@/app/context/expertSignupProvider";
import { registerExpertUser } from "@/app/api/signup/api";
import AlertMessage from "@/app/components/alert/alertMessage";
import ErrorAlertMessage from "@/app/components/alert/errorAlertMessage";
import { useRouter } from "next/navigation";

const Step3 = () => {
  const {
    currentStep,
    setCurrentStep,
    terms,
    setTerms,
    businessLicense,
    setBusinessLicense,
    businessName,
    businessAddress,
    expertType,
    expertDetailType,
    businessLicenseNumber,
    openingDate,
    name,
    birthday,
    email,
    phoneNumber,
    foreigner,
    profileImage,
  } = useExpertSignup();

  const router = useRouter();

  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const [fileName, setFileName] = useState<string>("");
  const [alertText, setAlertText] = useState<string | null>(null);
  const [alertErrorText, setAlertErrorText] = useState<string | null>(null);

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTermsChange = (key: keyof typeof terms, value: boolean) => {
    setTerms((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setBusinessLicense(file);
      setFileName(file.name);
    }
  };

  const handleComplete = async () => {
    if (!businessLicense) {
      setAlertText("사업자등록증을 업로드해주세요.");
      return;
    }

    if (!terms.service || !terms.privacy || !terms.policy || !terms.age) {
      setAlertText("필수 약관에 모두 동의해주세요.");
      return;
    }

    try {
      const profileImageFile = base64ToFile(profileImage, "profile.jpg");

      await registerExpertUser(
        {
          name,
          birthday,
          email,
          foreigner,
          phoneNumber,
          businessName,
          businessAddress,
          businessLicenseNumber,
          openingDate,
          expertType,
          expertDetailType,
          requiredConsent: true,
          marketing: terms.marketing,
        },
        businessLicense,
        profileImageFile
      );

      setAlertText("생활전문가 등록이 완료되었습니다.");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("등록 실패", error);
      setAlertErrorText("회원 등록 중 오류가 발생했습니다.");
    }
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
          searchValue={fileName}
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
        <LargeBtn
          onClick={handleComplete}
          text={"완료"}
          color="blue"
          disabled={
            !businessLicense ||
            !terms.service ||
            !terms.privacy ||
            !terms.policy ||
            !terms.age
          }
        />
        <LargeBtn onClick={handlePrev} text={"이전"} color="white" />
      </div>
      {alertText && (
        <AlertMessage text={alertText} onClose={() => setAlertText(null)} />
      )}
      {alertErrorText && (
        <ErrorAlertMessage
          text={alertErrorText}
          onClose={() => setAlertErrorText(null)}
        />
      )}
    </div>
  );
};

export default Step3;
