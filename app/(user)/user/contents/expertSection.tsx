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
import AlertMessage from "@/app/components/alert/alertMessage";
import Alert from "@/app/components/alert/alert";
import { initUserInfo } from "@/app/utils/initUser";
import { withdrawAll, withdrawPartial } from "@/app/api/login/api";
import { useAuthStore } from "@/app/store/authStore";
import { useUserStore } from "@/app/store/userStore";
import { useRouter } from "next/navigation";
import { CATEGORY } from "@/app/data/category";

const ExpertSection = () => {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showWithdrawAlert, setShowWithdrawAlert] = useState<boolean>(false);
  const [showPartialWithdrawAlert, setShowPartialWithdrawAlert] =
    useState<boolean>(false);

  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDetailSpecialty, setSelectedDetailSpecialty] = useState<
    string[]
  >([]); // 상세분야 체크된 값들

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
    if (isEditMode) {
      // 저장 시 알림 표시
      setShowAlert(true);
    }
    setIsEditMode(!isEditMode);
  };

  const handleSpecialtyEditMode = () => {
    if (isSpecialtyEditMode) {
      // 저장 시 알림 표시
      setShowAlert(true);
    }
    setIsSpecialtyEditMode(!isSpecialtyEditMode);
  };

  const handleWithdrawAll = async () => {
    try {
      await withdrawAll();
      useAuthStore.getState().logout();
      useUserStore.getState().clearUser();
      router.push("/");
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
      console.error(error);
    }
  };

  const handleWithdrawPartial = async () => {
    try {
      await withdrawPartial();
      initUserInfo();
      router.push("/user");
    } catch (error) {
      alert("부분 탈퇴에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col md:px-8 md:py-10 lg:p-[60px]">
      <h1 className="text-text-primary text-22s md:text-30s">나의 정보</h1>
      <div className="border-b border-text-primary w-full mt-5 mb-[30px] md:mt-[30px] md:mb-10" />
      <div
        className="flex w-full flex-col gap-[30px] items-center md:items-start
      lg:flex-row lg:items-start lg:justify-between lg:gap-[130px]"
      >
        <div className="flex flex-col gap-[30px] md:gap-10">
          <div className="flex flex-col gap-[30px] md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-10">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                전화번호
              </h3>
              <PhoneInput
                value={phone}
                onChange={handlePhoneChange}
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
          <div className="flex flex-col gap-[30px] md:gap-10">
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
              options={CATEGORY}
              value={selectedSpecialty}
              onChange={setSelectedSpecialty}
              disabled={!isSpecialtyEditMode}
            />
            <p className="text-text-secondary text-14r mt-1 whitespace-nowrap">
              ※ 전문분야 및 상세분야는 최초 설정 또는 변경 후, 7일이 지나야 바꿀
              수 있어요. (최근 변경일: 2024.05.05)
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">
              상세분야
              <span className="text-16m text-text-secondary">
                (최대 2개 복수선택 가능)
              </span>
            </h3>
            <MultiSelectBox
              options={[
                {
                  label: "가정 이사 (20평 이상)",
                  value: "가정 이사",
                  disabled: true,
                },
                { label: "원룸/소형 이사", value: "원룸/소형 이사" },
                { label: "사무실 이사", value: "사무실 이사" },
                { label: "해외 이사", value: "해외 이사", disabled: true },
              ]}
              value={selectedDetailSpecialty}
              onChange={setSelectedDetailSpecialty}
              disabled={!isSpecialtyEditMode}
            />
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
          onClick={() => setShowPartialWithdrawAlert(true)}
        >
          생활전문가만 탈퇴
        </p>
        <Image src={bar} alt="bar" width={1} height={10} className="mx-4 " />
        <p
          className="flex text-text-light text-16m md:text-18m cursor-pointer
      underline"
          onClick={() => setShowWithdrawAlert(true)}
        >
          회원탈퇴
        </p>
      </div>
      {showAlert && (
        <AlertMessage
          text="저장되었습니다!"
          onClose={() => {
            setShowAlert(false);
          }}
        />
      )}

      {showPartialWithdrawAlert && (
        <Alert
          text="정말 생활전문가만 탈퇴하시겠습니까?"
          subText="생활전문가 정보가 삭제되며, 일반회원 정보는 유지됩니다."
          leftBtnText="취소"
          rightBtnText="확인"
          onClose={() => setShowPartialWithdrawAlert(false)}
          onConfirm={() => {
            setShowPartialWithdrawAlert(false);
            handleWithdrawPartial();
          }}
        />
      )}

      {showWithdrawAlert && (
        <Alert
          text="정말 회원을 탈퇴하시겠습니까?"
          subText="탈퇴 시 모든 정보가 삭제됩니다."
          leftBtnText="취소"
          rightBtnText="확인"
          onClose={() => setShowWithdrawAlert(false)}
          onConfirm={handleWithdrawAll}
        />
      )}
    </div>
  );
};

export default ExpertSection;
