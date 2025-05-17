import React, { useState } from "react";
import { BasicBtn } from "@/app/components/button/basicBtn";
import { LargeBtn } from "@/app/components/button/largeBtn";
import { Chips } from "@/app/components/chips/chips";
import { EmailInput } from "@/app/components/input/emailInput";
import Input from "@/app/components/input/input";
import { PhoneInput } from "@/app/components/input/phoneInput";
import Image from "next/image";
import { useAgentSignup } from "@/app/context/agentSignupProvider";
import { DateInput } from "@/app/components/input/dateInput";
import AlertMessage from "@/app/components/alert/alertMessage";
import { sendVerificationMessage, verifyPhoneCode } from "@/app/api/verify/api";
import defaultProfile from "@/app/images/icon/default_profile.svg";
import ErrorAlertMessage from "@/app/components/alert/errorAlertMessage";

const Step2 = () => {
  const {
    type,
    currentStep,
    setCurrentStep,
    name,
    setName,
    birthday,
    setBirthday,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    repPhoneNumber,
    setRepPhoneNumber,
    foreigner,
    setForeigner,
    profileImage,
    setProfileImage,
  } = useAgentSignup();

  const [alertText, setAlertText] = useState<string | null>(null);
  const [alertErrorText, setAlertErrorText] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
  const [verificationSent, setVerificationSent] = useState<boolean>(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [verificationSuccess, setVerificationSuccess] = useState<string | null>(
    null
  );

  const [repVerificationCode, setRepVerificationCode] = useState<string>("");
  const [repVerificationSent, setRepVerificationSent] =
    useState<boolean>(false);
  const [repVerificationError, setRepVerificationError] = useState<
    string | null
  >(null);
  const [repVerificationSuccess, setRepVerificationSuccess] = useState<
    string | null
  >(null);
  const [isRepPhoneVerified, setIsRepPhoneVerified] = useState<boolean>(false);

  const isValid = !!(
    name &&
    birthday &&
    phoneNumber &&
    foreigner &&
    profileImage &&
    isPhoneVerified &&
    (type !== "ASSOCIATE" || isRepPhoneVerified) &&
    (type !== "ASSOCIATE" || repPhoneNumber)
  );

  const handlePhoneChange = (value: string) => setPhoneNumber(value);
  const handleBirthChange = (date: string) => setBirthday(date);
  const handleEmailChange = (value: string) => setEmail(value);
  const handleNationalityChange = (value: string) => setForeigner(value);
  const handleRepPhoneChange = (value: string) => setRepPhoneNumber(value);

  const handleSendVerification = async (target: "main" | "rep" = "main") => {
    const number = target === "main" ? phoneNumber : repPhoneNumber;
    try {
      await sendVerificationMessage(number);
      if (target === "main") {
        setVerificationSent(true);
        setAlertText("인증번호가 전송되었습니다.");
      } else {
        setRepVerificationSent(true);
        setAlertText("대표자 인증번호가 전송되었습니다.");
      }
    } catch (error: any) {
      setAlertErrorText(error.message);
    }
  };

  const handleVerifyCode = async (target: "main" | "rep" = "main") => {
    const number = target === "main" ? phoneNumber : repPhoneNumber;
    const code = target === "main" ? verificationCode : repVerificationCode;

    const result = await verifyPhoneCode(number, code);
    if (result.success) {
      if (target === "main") {
        setIsPhoneVerified(true);
        setVerificationError(null);
        setVerificationSuccess("인증 되었습니다.");
      } else {
        setIsRepPhoneVerified(true);
        setRepVerificationError(null);
        setRepVerificationSuccess("인증 되었습니다.");
      }
    } else {
      if (target === "main") {
        setIsPhoneVerified(false);
        setVerificationError(result.message || "인증번호가 올바르지 않습니다.");
        setVerificationSuccess(null);
      } else {
        setIsRepPhoneVerified(false);
        setRepVerificationError(
          result.message || "인증번호가 올바르지 않습니다."
        );
        setRepVerificationSuccess(null);
      }
    }
  };

  const handleNext = () => {
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-[30px] w-full md:p-10 border border-border md:w-[600px] rounded-[20px]">
      <h2 className="text-text-primary text-18s md:text-24s mb-5">회원정보</h2>

      {/* 프로필 이미지 등록 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          프로필 사진 <span className="text-error">*</span>
        </h3>
        <div className="flex flex-col items-center">
          <Image
            src={profileImage || defaultProfile}
            alt="프로필 이미지"
            width={180}
            height={180}
            className="w-[180px] h-[180px] rounded-full object-cover"
          />
          <label htmlFor="profile-upload" className="mt-5 mb-[30px]">
            <BasicBtn
              text="사진 등록"
              onClick={() => {
                document.getElementById("profile-upload")?.click();
              }}
            />
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (reader.result) {
                      setProfileImage(reader.result as string);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>

        <div className="flex flex-col p-5 bg-background-extraSoft text-text-secondary rounded-[10px] text-14r gap-2 md:gap-1">
          <p>
            ※ 프로필 사진은 정면 얼굴이 잘 보이는 1:1 비율 이미지로 등록해
            주세요.
          </p>
          <p>※ 적합하지 않은 사진은 미승인 처리될 수 있습니다.</p>
          <p>
            ※ 권장 사이즈: 400x400px / 파일 크기: 2MB 이하 / 형식: JPG 또는 PNG
          </p>
        </div>
      </div>

      <div className="border-b border-background-light border-dotted w-full my-[30px] md:my-10" />

      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          이름 <span className="text-error">*</span>
        </h3>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요."
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          생년월일 <span className="text-error">*</span>
        </h3>
        <DateInput onChange={handleBirthChange} />
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">이메일</h3>
        <EmailInput value={email} onChange={handleEmailChange} />
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          내외국인 <span className="text-error">*</span>
        </h3>
        <Chips
          options={[
            { label: "내국인", value: "L" },
            { label: "외국인", value: "F" },
          ]}
          value={foreigner}
          onChange={handleNationalityChange}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          전화번호 <span className="text-error">*</span>
        </h3>
        <PhoneInput value={phoneNumber} onChange={handlePhoneChange} />
        <LargeBtn
          onClick={() => handleSendVerification("main")}
          text="인증받기"
          color=""
        />
        {verificationSent && (
          <>
            <Input
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호를 입력해주세요."
              error={!!verificationError}
              errorMessage={verificationError || ""}
              success={!!verificationSuccess}
              successMessage={verificationSuccess || ""}
              className="mt-2.5"
            />
            <LargeBtn
              onClick={() => handleVerifyCode("main")}
              text="인증하기"
              color=""
            />
          </>
        )}
      </div>

      {type === "ASSOCIATE" && (
        <div className="flex flex-col gap-2.5">
          <h3 className="text-text-primary text-14m md:text-16m">
            대표자 전화번호 <span className="text-error">*</span>
          </h3>
          <PhoneInput value={repPhoneNumber} onChange={handleRepPhoneChange} />
          <LargeBtn
            onClick={() => handleSendVerification("rep")}
            text="인증받기"
            color=""
          />
          {repVerificationSent && (
            <>
              <Input
                value={repVerificationCode}
                onChange={(e) => setRepVerificationCode(e.target.value)}
                placeholder="인증번호를 입력해주세요."
                error={!!repVerificationError}
                errorMessage={repVerificationError || ""}
                success={!!repVerificationSuccess}
                successMessage={repVerificationSuccess || ""}
                className="mt-2.5"
              />
              <LargeBtn
                onClick={() => handleVerifyCode("rep")}
                text="인증하기"
                color=""
              />
            </>
          )}
        </div>
      )}

      <div className="mt-[60px]">
        <LargeBtn
          onClick={handleNext}
          text="다음"
          color="black"
          disabled={!isValid}
        />
        <LargeBtn
          onClick={handlePrev}
          text="이전"
          color="white"
          className="mt-2.5"
        />
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

export default Step2;
