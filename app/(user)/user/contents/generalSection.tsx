"use client";

import { useState } from "react";
import { EmailInput } from "@/app/components/input/emailInput";
import Input from "@/app/components/input/input";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { PhoneInput } from "@/app/components/input/phoneInput";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";

const GeneralSection = () => {
  const [nickname, setNickname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [addressSearch, setAddressSearch] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [residenceType, setResidenceType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handlePhoneChange = (fullPhone: string) => {
    setPhone(fullPhone);
  };

  const handleEmailChange = (fullEmail: string) => {
    setEmail(fullEmail);
  };

  const handleAddressSearchChange = (value: string) => {
    setAddressSearch(value);
  };

  const handleSearch = () => {
    console.log("검색 클릭:", addressSearch);
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="flex w-full flex-col p-[60px]">
      <h1 className="text-text-primary text-30s">나의 정보</h1>
      <div className="border-b border-text-primary w-full mt-[30px] mb-10" />
      <div className="flex gap-[130px]">
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">닉네임</h3>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">전화번호</h3>
            <PhoneInput
              value={phone}
              onChange={handlePhoneChange}
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">
              주소 <span className="text-error">*</span>
            </h3>
            {isEditMode ? (
              <InputWithBtn
                type="search"
                searchValue={addressSearch}
                onSearchChange={handleAddressSearchChange}
                onSearchClick={handleSearch}
              />
            ) : (
              <Input
                value={addressSearch}
                onChange={(e) => setAddressSearch(e.target.value)}
                disabled={!isEditMode}
              />
            )}
            <Input
              value={detailedAddress}
              onChange={(e) => setDetailedAddress(e.target.value)}
              placeholder="상세주소를 입력해주세요."
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">
              주거형태 <span className="text-error">*</span>
            </h3>
            <CustomSelectBox
              options={["선택 1", "선택 2", "선택 3"]}
              value={residenceType}
              onChange={(value) => setResidenceType(value)}
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">이메일</h3>
            <EmailInput
              value={email}
              onChange={handleEmailChange}
              disabled={!isEditMode}
            />
          </div>
        </div>
        <PrimaryBtn onClick={handleEditMode} text={"수정"} />
      </div>
      <div className="border-b border-background-light w-full mt-10" />
      <p
        className="flex text-text-light text-16m md:text-18m cursor-pointer
      underline mt-10 mb-[138px] self-end"
      >
        회원탈퇴
      </p>
    </div>
  );
};

export default GeneralSection;
