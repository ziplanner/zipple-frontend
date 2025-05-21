import { useEffect, useState } from "react";
import Image from "next/image";
import Input from "@/app/components/input/input";
import { EmailInput } from "@/app/components/input/emailInput";
import { PhoneInput } from "@/app/components/input/phoneInput";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";
import bar from "@/app/images/icon/footer/bar.svg";
import Textarea from "@/app/components/textarea/textarea";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";
import FilterInput from "@/app/components/input/filterInput";
import RegionModal from "@/app/components/modal/regionSelectModal";
import AlertMessage from "@/app/components/alert/alertMessage";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/alert/alert";
import { withdrawAll, withdrawPartial } from "@/app/api/login/api";
import { useAuthStore } from "@/app/store/authStore";
import { useUserStore } from "@/app/store/userStore";
import { refreshUserInfo } from "@/app/utils/initUser";
import { CATEGORY } from "@/app/data/category";
import { getRepUserRole, updateRepUserRole } from "@/app/api/user/api";
import ErrorAlertMessage from "@/app/components/alert/errorAlertMessage";
import {
  getRegionDisplayLabel,
  regionArrayToCodes,
  regionToCode,
} from "@/app/utils/getCategoryLabel";

interface Region {
  city: string;
  district: string;
}

const RepresentationSection = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertErrorText, setAlertErrorText] = useState<string | null>(null);
  const [showWithdrawAlert, setShowWithdrawAlert] = useState<boolean>(false);
  const [showPartialWithdrawAlert, setShowPartialWithdrawAlert] =
    useState<boolean>(false);

  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [primaryRegions, setPrimaryRegions] = useState<Region[]>([]);
  const [additionalRegions, setAdditionalRegions] = useState<Region[]>([]);

  const [isOpenPrimary, setIsOpenPrimary] = useState<boolean>(false);
  const [isOpenAdditional, setIsOpenAdditional] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isSpecialtyEditMode, setIsSpecialtyEditMode] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchRepInfo = async () => {
      try {
        const data = await getRepUserRole();
        setPhone(data.phoneNumber || "");
        setEmail(data.mainEmail || "");
        setUrl(data.introduceUrl || "");
        setTitle(data.introduceTitle || "");
        setDescription(data.introduceContent || "");
        setSelectedSpecialty(data.specializedType || "");
        setPrimaryRegions(data.representativeArea || []);
        setAdditionalRegions(data.additionalArea || []);
      } catch (error) {
        console.error("대표 중개사 정보 조회 실패", error);
      }
    };
    fetchRepInfo();
  }, []);

  const formatRegions = (regions: Region[]) =>
    regions.map(regionToCode).map(getRegionDisplayLabel).join(", ");

  const handleEditMode = async () => {
    if (isEditMode) {
      try {
        await updateRepUserRole({
          phoneNumber: phone,
          mainEmail: email,
          introduceUrl: url,
          representativeArea: regionArrayToCodes(primaryRegions),
          additionalArea: regionArrayToCodes(additionalRegions),
          introduceTitle: title,
          introduceContent: description,
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

  const handleSpecialtyEditMode = () => {
    if (isSpecialtyEditMode) {
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
      setAlertErrorText("회원 탈퇴에 실패했습니다.");
      console.error(error);
    }
  };

  const handleWithdrawPartial = async () => {
    try {
      await withdrawPartial("REPRESENTATIVE");
      refreshUserInfo();
      router.push("/");
    } catch (error) {
      setAlertErrorText("부분 탈퇴에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col md:px-8 md:py-10 lg:p-[60px]">
      <h1 className="text-text-primary text-22s md:text-30s">나의 정보</h1>
      <div className="border-b border-text-primary w-full mt-5 mb-[30px] md:mt-[30px] md:mb-10" />
      <div className="flex w-full flex-col gap-[30px] items-center md:items-start lg:flex-row lg:items-start lg:justify-between lg:gap-[130px]">
        <div className="flex flex-col gap-[30px] md:gap-10 flex-1">
          <div className="flex flex-col gap-2.5 lx:w-1/2 lx:pr-5">
            <h3 className="text-text-primary text-14m md:text-16m">전화번호</h3>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-col gap-2.5 lx:w-1/2 lx:pr-5">
            <h3 className="text-text-primary text-14m md:text-16m">이메일</h3>
            <EmailInput
              value={email}
              onChange={setEmail}
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
              disabled={!isEditMode}
            />
          </div>
          <div className="flex flex-row gap-[30px] md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-10">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                대표 활동지역
              </h3>
              <FilterInput
                value={formatRegions(primaryRegions)}
                onChange={() => {}}
                disabled={!isEditMode}
                onClick={() => setIsOpenPrimary(true)}
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m md:text-16m">
                추가 활동지역
              </h3>
              <FilterInput
                value={formatRegions(additionalRegions)}
                onChange={() => {}}
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
              maxLength={1500}
              disabled={!isEditMode}
            />
          </div>
        </div>
        <PrimaryBtn
          onClick={handleEditMode}
          text={isEditMode ? "저장" : "수정"}
        />
      </div>

      <div className="border-b border-background-light w-full my-10" />

      <div className="flex w-full flex-col gap-[30px] items-center md:items-start lg:flex-row lg:items-start lg:justify-between lg:gap-[130px]">
        <div className="flex flex-col gap-[30px] md:gap-10 flex-1">
          <div className="flex flex-col gap-2.5 lx:w-1/2 lx:pr-5">
            <h3 className="text-text-primary text-14m md:text-16m">전문분야</h3>
            <CustomSelectBox
              options={CATEGORY}
              value={selectedSpecialty}
              onChange={setSelectedSpecialty}
              disabled={!isSpecialtyEditMode}
            />
            <p className="text-text-secondary text-14r mt-1 whitespace-nowrap">
              ※ 전문 분야는 최초 설정 또는 변경 후, 7일이 지나야 바꿀 수 있어요.
            </p>
          </div>
        </div>
        <PrimaryBtn
          onClick={handleSpecialtyEditMode}
          text={isSpecialtyEditMode ? "저장" : "수정"}
        />
      </div>

      <div className="border-b border-background-light w-full mt-10" />
      <div className="flex gap-3 self-end mt-10 mb-[138px] items-center">
        <p
          className="flex text-error text-16m md:text-18m cursor-pointer underline"
          onClick={() => setShowPartialWithdrawAlert(true)}
        >
          중개사만 탈퇴
        </p>
        <Image src={bar} alt="bar" width={1} height={10} className="mx-4 " />
        <p
          className="flex text-text-light text-16m md:text-18m cursor-pointer underline"
          onClick={() => setShowWithdrawAlert(true)}
        >
          회원탈퇴
        </p>
      </div>
      {isOpenPrimary && (
        <RegionModal
          modalTitle="대표 활동지역"
          onClose={() => setIsOpenPrimary(false)}
          onSave={(regions: Region[]) => {
            setPrimaryRegions(regions);
            setIsOpenPrimary(false);
          }}
          initialRegions={primaryRegions}
          maxSelectable={3}
        />
      )}
      {isOpenAdditional && (
        <RegionModal
          modalTitle="추가 활동지역"
          onClose={() => setIsOpenAdditional(false)}
          onSave={(regions: Region[]) => {
            setAdditionalRegions(regions);
            setIsOpenAdditional(false);
          }}
          initialRegions={additionalRegions}
          disabledRegions={primaryRegions}
          maxSelectable={5}
        />
      )}

      {isOpenAdditional && (
        <RegionModal
          modalTitle="추가 활동지역"
          onClose={() => setIsOpenAdditional(false)}
          onSave={(regions) => {
            setAdditionalRegions(regions);
            setIsOpenAdditional(false);
          }}
          initialRegions={additionalRegions}
          disabledRegions={primaryRegions}
          maxSelectable={5}
        />
      )}
      {showAlert && (
        <AlertMessage
          text="저장되었습니다!"
          onClose={() => setShowAlert(false)}
        />
      )}
      {showPartialWithdrawAlert && (
        <Alert
          text="정말 중개사만 탈퇴하시겠습니까?"
          subText="중개사 정보가 삭제되며, 일반회원 정보는 유지됩니다."
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
      {alertErrorText && (
        <ErrorAlertMessage
          text={alertErrorText}
          onClose={() => setAlertErrorText(null)}
        />
      )}
    </div>
  );
};

export default RepresentationSection;
