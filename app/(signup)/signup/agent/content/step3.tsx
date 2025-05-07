import { useState } from "react";
import TermsBox from "@/app/components/box/termsBox";
import { LargeBtn } from "@/app/components/button/largeBtn";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";
import { useAgentSignup } from "@/app/context/agentSignupProvider";
import AlertMessage from "@/app/components/alert/alertMessage";
import {
  registerAssociateUser,
  registerRepresentativeUser,
} from "@/app/api/signup/api";
import { useRouter } from "next/navigation";
import { CATEGORY } from "@/app/data/category";
import { refreshUserInfo } from "@/app/utils/initUser";

const Step3 = () => {
  const {
    currentStep,
    setCurrentStep,
    type,
    name,
    birthday,
    email,
    foreigner,
    phoneNumber,
    businessLicenseNumber,
    openingDate,
    searchValue,
    terms,
    setTerms,
    businessRegistrationFile,
    setBusinessRegistrationFile,
    brokerageLicenseFile,
    setBrokerageLicenseFile,
    specializedType,
    setSpecializedType,
    businessRegistrationFileName,
    setBusinessRegistrationFileName,
    brokerageLicenseFileName,
    setBrokerageLicenseFileName,
    profileImage,
  } = useAgentSignup();

  const router = useRouter();
  const [alertText, setAlertText] = useState<string | null>(null);

  const isValid =
    businessRegistrationFile &&
    (type === "REPRESENTATION" ? brokerageLicenseFile : true) &&
    specializedType &&
    terms.service &&
    terms.privacy &&
    terms.policy &&
    terms.age;

  console.log(businessRegistrationFile);
  console.log(brokerageLicenseFile);
  console.log(terms.service);
  console.log(terms.privacy);
  console.log(terms.age);
  console.log(terms.policy);

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

  const handleComplete = async () => {
    if (!isValid) {
      // setAlertText("필수 항목을 모두 입력하고 동의해주세요.");
      return;
    }

    try {
      const profileImageFile = base64ToFile(profileImage, "profile.jpg");

      const commonData = {
        name,
        birthday,
        email,
        foreigner,
        phoneNumber,
        businessName: searchValue,
        businessLicenseNumber,
        openingDate,
        specializedType,
        requiredConsent: true,
        marketing: terms.marketing,
      };

      if (type === "ASSOCIATE") {
        await registerAssociateUser(
          commonData,
          brokerageLicenseFile!,
          profileImageFile
        );
      } else {
        await registerRepresentativeUser(
          {
            ...commonData,
            representativePhoneNumber: phoneNumber,
          },
          businessRegistrationFile!,
          brokerageLicenseFile!,
          profileImageFile
        );
      }

      setAlertText("중개사 등록이 완료되었습니다.");
      refreshUserInfo();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error("등록 실패", err);
      setAlertText("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-[30px] w-full md:p-10 border border-border md:w-[600px] rounded-[20px]">
      <h2 className="text-text-primary text-18s md:text-24s mb-5">서류 제출</h2>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          사업자등록증 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          inputId="business"
          type="file"
          placeholder="사업자등록증.pdf"
          searchValue={businessRegistrationFileName}
          onSearchChange={() => {}}
          accept=".pdf"
          onFileSelect={handleBusinessFileSelect}
        />
      </div>

      {type === "REPRESENTATION" && (
        <div className="flex flex-col gap-2.5">
          <h3 className="text-text-primary text-14m md:text-16m">
            중개등록증 <span className="text-error">*</span>
          </h3>
          <InputWithBtn
            inputId="license"
            type="file"
            placeholder="중개등록증.pdf"
            searchValue={brokerageLicenseFileName}
            onSearchChange={() => {}}
            accept=".pdf"
            onFileSelect={handleLicenseFileSelect}
          />
        </div>
      )}

      <div className="border-b border-background-light border-dotted w-full my-[30px] md:my-5" />

      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          전문분야 <span className="text-error">*</span>
        </h3>
        <CustomSelectBox
          options={CATEGORY}
          value={specializedType}
          onChange={setSpecializedType}
        />
      </div>

      <div className="border-b border-background-light border-dotted w-full my-[30px] md:my-5" />

      <TermsBox terms={terms} onChange={handleTermsChange} />

      <div className="mt-[60px] flex flex-col gap-3">
        <LargeBtn
          onClick={handleComplete}
          text="완료"
          color="blue"
          disabled={!isValid}
        />
        <LargeBtn onClick={handlePrev} text="이전" color="white" />
      </div>

      {alertText && (
        <AlertMessage text={alertText} onClose={() => setAlertText(null)} />
      )}
    </div>
  );
};

export default Step3;
