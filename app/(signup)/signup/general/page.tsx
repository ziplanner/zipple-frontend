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

const GeneralSignupPage = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [residence, setResidence] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [customSelect, setCustomSelect] = useState<string>("");
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);

  // 전화번호 입력 값 업데이트
  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  // 이메일 입력 값 업데이트
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  // 주소 검색 값 업데이트
  const handleSearch = () => {
    console.log("주소 검색", searchValue);
  };

  // 마케팅 수신 동의 핸들러
  const handleMarketingConsentChange = () => {
    setMarketingConsent(!marketingConsent);
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
          <PhoneInput value={phone} onChange={handlePhoneChange} />
          <LargeBtn onClick={() => {}} text={"인증받기"} color="" />
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-text-primary text-14m md:text-16m">
            주소 <span className="text-error">*</span>
          </h3>
          <InputWithBtn
            type="search"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearchClick={handleSearch}
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
            options={["선택 1", "선택 2", "선택 3"]}
            value={customSelect}
            onChange={setCustomSelect}
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
          onClick={() => {}}
          text={"완료"}
          color="blue"
          className="mt-[60px]"
        />
      </div>
    </div>
  );
};

export default GeneralSignupPage;
