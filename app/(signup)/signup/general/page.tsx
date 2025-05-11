"use client";

import React, { useState } from "react";
import { LargeBtn } from "@/app/components/button/largeBtn";
import { EmailInput } from "@/app/components/input/emailInput";
import Input from "@/app/components/input/input";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { PhoneInput } from "@/app/components/input/phoneInput";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";
import checkOn from "@/app/images/icon/check_on.svg";
import checkOff from "@/app/images/icon/check_off.svg";
import Image from "next/image";
import { registerGeneralUser } from "@/app/api/signup/api";
import { useDaumPostcode } from "@/app/hook/useDaumPostcode";
import AlertMessage from "@/app/components/alert/alertMessage";
import { sendVerificationMessage, verifyPhoneCode } from "@/app/api/verify/api";
import { CATEGORY } from "@/app/data/category";
import { useRouter } from "next/navigation";
import { refreshUserInfo } from "@/app/utils/initUser";
import ErrorAlertMessage from "@/app/components/alert/errorAlertMessage";

const GeneralSignupPage = () => {
  const isDaumLoaded = useDaumPostcode();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
  const [verificationSent, setVerificationSent] = useState<boolean>(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [verificationSuccess, setVerificationSuccess] = useState<string | null>(
    null
  );

  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [housingType, setHousingType] = useState<string>("");
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string | null>(null);
  const [alertErrorText, setAlertErrorText] = useState<string | null>(null);

  const isValid =
    !name.trim() ||
    !phoneNumber.trim() ||
    !searchValue.trim() ||
    !housingType ||
    !isPhoneVerified;

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleAddressSearch = () => {
    if (!isDaumLoaded) {
      setAlertText(
        "주소 검색 API가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setSearchValue(data.address);
      },
    }).open();
  };

  const handleMarketingConsentChange = () => {
    setMarketingConsent(!marketingConsent);
  };

  const handleSendVerification = async () => {
    try {
      await sendVerificationMessage(phoneNumber);
      setVerificationSent(true);
      setAlertText("인증번호가 전송되었습니다.");
    } catch (error: any) {
      setAlertErrorText(error.message);
    }
  };

  const handleVerifyCode = async () => {
    const result = await verifyPhoneCode(phoneNumber, verificationCode);
    if (result.success) {
      setIsPhoneVerified(true);
      setVerificationError(null);
      setVerificationSuccess("인증 되었습니다.");
    } else {
      setIsPhoneVerified(false);
      setVerificationError(result.message || "인증번호가 올바르지 않습니다.");
      setVerificationSuccess(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-20 mt-10 md:mt-20 mb-[60px] md:mb-[120px]">
      <h1 className="text-text-primary text-22s md:text-36s">일반 회원 인증</h1>
      <div className="flex flex-col gap-5 px-5 py-[30px] md:p-10 border border-border md:w-[600px] rounded-[20px]">
        <h2 className="text-text-primary text-18s md:text-24s mb-5">
          회원정보
        </h2>

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
            전화번호 <span className="text-error">*</span>
          </h3>
          <PhoneInput value={phoneNumber} onChange={handlePhoneChange} />
          <LargeBtn onClick={handleSendVerification} text="인증받기" color="" />
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
              <LargeBtn onClick={handleVerifyCode} text="인증하기" color="" />
            </>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-text-primary text-14m md:text-16m">
            주소 <span className="text-error">*</span>
          </h3>
          <InputWithBtn
            type="search"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearchClick={handleAddressSearch}
            disabled={true}
          />
          <Input
            value={detailedAddress}
            onChange={(e) => setDetailedAddress(e.target.value)}
            placeholder="상세주소를 입력해주세요."
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-text-primary text-14m md:text-16m">
            주거형태 <span className="text-error">*</span>
          </h3>
          <CustomSelectBox
            options={CATEGORY}
            value={housingType}
            onChange={setHousingType}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-text-primary text-14m md:text-16m">이메일</h3>
          <EmailInput value={email} onChange={handleEmailChange} />
        </div>

        <div className="border-b border-background-light border-dotted w-full my-[30px] md:my-10" />

        <div className="flex gap-2 items-center">
          <Image
            src={marketingConsent ? checkOn : checkOff}
            alt="checkbox"
            width={16}
            height={16}
            className="w-[16px] h-[16px] cursor-pointer"
            onClick={handleMarketingConsentChange}
          />
          <p className="text-text-secondary text-16r">
            (선택) 마케팅 알림 수신에 동의합니다.
          </p>
        </div>

        <LargeBtn
          onClick={async () => {
            if (isValid) {
              return;
            }
            try {
              await registerGeneralUser({
                name,
                phoneNumber,
                address: `${searchValue} ${detailedAddress}`,
                housingType,
                mainEmail: email || undefined,
                requiredConsent: true,
                marketing: marketingConsent,
              });
              setAlertText("회원 등록이 완료되었습니다.");
              refreshUserInfo();
              setTimeout(() => {
                router.push("/");
              }, 2000);
            } catch (error) {
              console.error("회원가입 실패", error);
              setAlertErrorText("회원 등록 중 오류가 발생했습니다.");
            }
          }}
          text="완료"
          color="blue"
          className="mt-[60px]"
          disabled={isValid}
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

export default GeneralSignupPage;
