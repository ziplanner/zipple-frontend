"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/app/components/input/input";
import { EmailInput } from "@/app/components/input/emailInput";
import { PhoneInput } from "@/app/components/input/phoneInput";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";
import bar from "@/app/images/icon/footer/bar.svg";
import Textarea from "@/app/components/textarea/textarea";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";
import { MultiSelectBox } from "@/app/components/selectBox/multiSelectBox";
import FilterInput from "@/app/components/input/filterInput";
import RegionModal from "@/app/components/modal/regionSelectModal";

const AgentSection = () => {
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDetailSpecialty, setSelectedDetailSpecialty] = useState<
    string[]
  >([]);
  const [primaryRegion, setPrimaryRegion] = useState<string>("");
  const [additionalRegion, setAdditionalRegion] = useState<string>("");

  const [isOpenPrimary, setIsOpenPrimary] = useState<boolean>(false);
  const [isOpenAdditional, setIsOpenAdditional] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isSpecialtyEditMode, setIsSpecialtyEditMode] =
    useState<boolean>(false);

  const handlePhoneChange = (fullPhone: string) => {
    setPhone(fullPhone);
  };

  const handleEmailChange = (fullEmail: string) => {
    setEmail(fullEmail);
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSpecialtyEditMode = () => {
    setIsSpecialtyEditMode(!isSpecialtyEditMode);
  };

  const handlePrimaryRegionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrimaryRegion(e.target.value);
  };

  const handleAdditionalRegionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdditionalRegion(e.target.value);
  };

  return (
    <div className="flex w-full flex-col md:p-[60px]">
      <h1 className="text-text-primary text-22s md:text-30s">나의 정보</h1>
      <div className="border-b border-text-primary w-full mt-5 mb-[30px] md:mt-[30px] md:mb-10" />
      <div className="flex w-full flex-col gap-[30px] items-center md:items-start lg:flex-row lg:items-start lg:justify-between lg:gap-[130px]">
        <div className="flex flex-col gap-[30px] md:gap-10 flex-1">
          <div className="flex flex-col gap-2.5 w-1/2 pr-5">
            <h3 className="text-text-primary text-14m md:text-16m">전화번호</h3>
            <PhoneInput
              value={phone}
              onChange={handlePhoneChange}
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col gap-2.5 w-1/2 pr-5">
            <h3 className="text-text-primary text-14m md:text-16m">이메일</h3>
            <EmailInput
              value={email}
              onChange={handleEmailChange}
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">
              본인소개 URL
            </h3>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder=""
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-row gap-[30px] md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-10">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                대표 활동지역
              </h3>
              <FilterInput
                value={primaryRegion}
                onChange={handlePrimaryRegionChange}
                disabled={!isEditMode}
                onClick={() => setIsOpenPrimary(true)}
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                추가 활동지역
              </h3>
              <FilterInput
                value={additionalRegion}
                onChange={handleAdditionalRegionChange}
                disabled={!isEditMode}
                onClick={() => setIsOpenAdditional(true)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">
              자기소개 제목
            </h3>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="[공인중개사무소명]의 000 중개사 입니다."
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">
              자기소개 상세
            </h3>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`안녕하세요. 
집플 공인중개사의 홍길동 중개사입니다.`}
              maxLength={1500}
              disabled={!isEditMode}
            />
          </div>
        </div>
        <PrimaryBtn
          onClick={handleEditMode}
          text={`${isEditMode ? "저장" : "수정"}`}
        />
      </div>
      <div className="border-b border-background-light w-full my-10" />
      {/* 분야 영역 */}
      <div className="flex w-full flex-col gap-[30px] items-center md:items-baseline lg:flex-row md:gap-[130px]">
        <div className="flex w-full flex-col gap-[30px] md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-10">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">전문분야</h3>
            <CustomSelectBox
              options={["주거", "상업", "토지", "기타"]}
              value={selectedSpecialty}
              onChange={setSelectedSpecialty}
              disabled={!isSpecialtyEditMode}
            />
            <p className="text-text-secondary text-14r mt-1">
              ※ 전문 분야는 최초 설정 또는 변경 후, 7일이 지나야 바꿀 수 있어요.
              (최근 변경일: 2024.05.05)
            </p>
          </div>
        </div>
        <PrimaryBtn
          onClick={handleSpecialtyEditMode}
          text={`${isSpecialtyEditMode ? "저장" : "수정"}`}
        />
      </div>

      <div className="border-b border-background-light w-full mt-10" />
      <div className="flex gap-3 self-end mt-10 mb-[138px] items-center">
        <p
          className="flex text-error text-16m md:text-18m cursor-pointer
      underline"
        >
          중개사만 탈퇴
        </p>
        <Image src={bar} alt="bar" width={1} height={10} className="mx-4 " />
        <p
          className="flex text-text-light text-16m md:text-18m cursor-pointer
      underline"
        >
          회원탈퇴
        </p>
      </div>
      {isOpenPrimary && (
        <RegionModal
          onClose={() => {
            setIsOpenPrimary(false);
          }}
        />
      )}
      {isOpenAdditional && (
        <RegionModal
          onClose={() => {
            setIsOpenAdditional(false);
          }}
        />
      )}
    </div>
  );
};

export default AgentSection;
