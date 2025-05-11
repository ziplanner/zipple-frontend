"use client";

import { useEffect, useState } from "react";
import { EmailInput } from "@/app/components/input/emailInput";
import Input from "@/app/components/input/input";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { PhoneInput } from "@/app/components/input/phoneInput";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";
import AlertMessage from "@/app/components/alert/alertMessage";
import { withdrawAll } from "@/app/api/login/api";
import { useAuthStore } from "@/app/store/authStore";
import { useUserStore } from "@/app/store/userStore";
import Alert from "@/app/components/alert/alert";
import { CATEGORY } from "@/app/data/category";
import { getGeneralUserRole, updateGeneralUserRole } from "@/app/api/user/api";
import ErrorAlertMessage from "@/app/components/alert/errorAlertMessage";

const GeneralSection = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertErrorText, setAlertErrorText] = useState<string | null>(null);
  const [showWithdrawAlert, setShowWithdrawAlert] = useState<boolean>(false);

  const [nickname, setNickname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [addressSearch, setAddressSearch] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [residenceType, setResidenceType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getGeneralUserRole();
        setNickname(data.nickname || "");
        setPhone(data.phoneNumber || "");
        setEmail(data.mainEmail || "");
        setAddressSearch(data.address || "");
        setResidenceType(data.houseType || "");
      } catch (error) {
        console.error("사용자 정보 조회 실패", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handlePhoneChange = (fullPhone: string) => {
    setPhone(fullPhone);
  };

  const handleEmailChange = (fullEmail: string) => {
    setEmail(fullEmail);
  };

  const handleAddressSearchChange = (value: string) => {
    setAddressSearch(value);
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setAddressSearch(data.address);
      },
    }).open();
  };

  const handleEditMode = async () => {
    if (isEditMode) {
      try {
        await updateGeneralUserRole({
          nickname,
          phoneNumber: phone,
          address: addressSearch,
          houseType: residenceType,
          mainEmail: email,
        });
        setShowAlert(true);
      } catch (error) {
        setAlertErrorText("정보 저장 실패");
        console.error(error);
        return;
      }
    }
    setIsEditMode(!isEditMode);
  };

  const handleWithdrawAll = async () => {
    try {
      await withdrawAll();
      useAuthStore.getState().logout();
      useUserStore.getState().clearUser();
      window.location.href = "/";
    } catch (error) {
      setAlertErrorText("회원 탈퇴에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col md:px-8 md:py-10 lg:p-[60px]">
      <h1 className="text-text-primary text-22s md:text-30s">나의 정보</h1>
      <div className="border-b border-text-primary w-full mt-5 mb-[30px] md:mt-[30px] md:mb-10" />
      <div className="flex w-full flex-col gap-[30px] items-center md:items-start lg:flex-row lg:items-start lg:justify-between lg:gap-[130px]">
        <div className="flex flex-col gap-[30px] md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-10">
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
              <>
                <InputWithBtn
                  type="search"
                  searchValue={addressSearch}
                  onSearchChange={setAddressSearch}
                  onSearchClick={handleAddressSearch}
                />
                <Input
                  value={detailedAddress}
                  onChange={(e) => setDetailedAddress(e.target.value)}
                  placeholder="상세주소를 입력해주세요."
                />
              </>
            ) : (
              <Input
                value={addressSearch}
                onChange={(e) => setAddressSearch(e.target.value)}
                disabled
              />
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-text-primary text-14m md:text-16m">
              주거형태 <span className="text-error">*</span>
            </h3>
            <CustomSelectBox
              options={CATEGORY}
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
        <PrimaryBtn
          onClick={handleEditMode}
          text={`${isEditMode ? "저장" : "수정"}`}
        />
      </div>
      <div className="border-b border-background-light w-full mt-10" />
      <p
        className="flex text-text-light text-16m md:text-18m cursor-pointer
      underline mt-10 mb-[138px] self-end"
        onClick={() => setShowWithdrawAlert(true)}
      >
        회원탈퇴
      </p>
      {showAlert && (
        <AlertMessage
          text="저장되었습니다!"
          onClose={() => {
            setShowAlert(false);
          }}
        />
      )}
      {showWithdrawAlert && (
        <Alert
          text="정말 탈퇴하시겠습니까?"
          subText="탈퇴 시 모든 정보가 삭제됩니다."
          leftBtnText="취소"
          rightBtnText="확인"
          onClose={() => setShowWithdrawAlert(false)}
          onConfirm={handleWithdrawAll}
        />
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

export default GeneralSection;
