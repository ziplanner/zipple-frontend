import React from "react";
import { BasicBtn } from "@/app/components/button/basicBtn";
import { LargeBtn } from "@/app/components/button/largeBtn";
import { Chips } from "@/app/components/chips/chips";
import { EmailInput } from "@/app/components/input/emailInput";
import Input from "@/app/components/input/input";
import { PhoneInput } from "@/app/components/input/phoneInput";
import Image from "next/image";
import { useExpertSignup } from "@/app/context/expertSignupProvider";
import { DateInput } from "@/app/components/input/dateInput";
import { useAgentSignup } from "@/app/context/agentSignupProvider";

const Step2 = () => {
  const {
    currentStep,
    setCurrentStep,
    name,
    setName,
    birth,
    setBirth,
    email,
    setEmail,
    phone,
    setPhone,
    nationality,
    setNationality,
    profileImage,
    setProfileImage,
  } = useAgentSignup();

  // 전화번호 입력 값 업데이트
  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  // 생년월일 입력 값 업데이트
  const handleBirthChange = (date: string) => {
    setBirth(date);
  };

  // 이메일 입력 값 업데이트
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  // 내외국인 선택 업데이트
  const handleNationalityChange = (value: string) => {
    setNationality(value);
  };

  // 프로필 사진 파일 선택 핸들러
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleNext = () => {
    if (currentStep < 3) {
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
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          프로필 사진 <span className="text-error">*</span>
        </h3>
        <div className="flex flex-col items-center">
          <Image
            src={profileImage}
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
              onChange={handleProfileImageUpload}
            />
          </label>
        </div>

        <div
          className="flex flex-col p-5 bg-background-extraSoft text-text-secondary
        rounded-[10px] text-14r gap-2 md:gap-1"
        >
          <p>
            ※ 프로필 사진은 정면 얼굴이 잘 보이는 1:1 비율 이미지로 등록해
            주세요.
          </p>
          <p>
            ※ 프로필 사진으로 적합하지 않을 시(바르지 않은 자세, 한쪽으로 치우친
            사진 등) 미승인 처리될 수 있습니다.
          </p>
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
        <h3 className="text-text-primary text-14m md:t ext-16m">
          내외국인 <span className="text-error">*</span>
        </h3>
        <Chips
          options={[
            { label: "내국인", value: "내국인" },
            { label: "외국인", value: "외국인" },
          ]}
          value={nationality}
          onChange={handleNationalityChange}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          전화번호 <span className="text-error">*</span>
        </h3>
        <PhoneInput value={phone} onChange={handlePhoneChange} />
        <LargeBtn onClick={() => {}} text="인증받기" color="" />
      </div>

      <div className="mt-[60px]">
        <LargeBtn onClick={handleNext} text="다음" color="black" />
        <LargeBtn
          onClick={handlePrev}
          text="이전"
          color="white"
          className="mt-2.5"
        />
      </div>
    </div>
  );
};

export default Step2;
