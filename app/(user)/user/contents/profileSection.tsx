import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import defaultProfile from "@/app/images/icon/default_profile.svg";
import change from "@/app/images/icon/mypage/change.svg";
import edit from "@/app/images/icon/mypage/edit.svg";
import vector from "@/app/images/icon/mypage/vector.svg";
import RoleToken from "@/app/components/token/roleToken";
import UserMenu from "@/app/components/menu/userMenu";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";
import { useRoleStore } from "@/app/store/roleStore";
import { uploadProfileImage } from "@/app/api/user/api";
import AlertMessage from "@/app/components/alert/alertMessage";
import ErrorAlertMessage from "@/app/components/alert/errorAlertMessage";

const ProfileSection = () => {
  const router = useRouter();

  const { user } = useUserStore();
  // const role = user?.lastLoginType;
  const role = user?.roleName[0];
  const { currentRole, availableRoles, setCurrentRole } = useRoleStore();

  const [alertText, setAlertText] = useState<string | null>(null);
  const [alertErrorText, setAlertErrorText] = useState<string | null>(null);

  const [name, setName] = useState<string>(user?.nickname || "");
  const [avatarSrc, setAvatarSrc] = useState<string | StaticImageData>(
    user?.profileUrl || defaultProfile
  );

  const switchTextMap: Partial<Record<string, string>> = {
    REPRESENTATIVE: "대표 중개사로 전환",
    ASSOCIATE: "소속 중개사로 전환",
    EXPERT: "생활 전문가로 전환",
    GENERAL: "일반 회원으로 전환",
  };

  const renderRoleText = () => {
    if (!currentRole) return "";

    if (availableRoles.length === 2) {
      const target = availableRoles.find((r) => r !== currentRole);
      return switchTextMap[target || ""] || "";
    }

    if (availableRoles.length === 1) {
      return currentRole === "GENERAL"
        ? switchTextMap["EXPERT"] // 기본 추천
        : switchTextMap["GENERAL"];
    }

    return "";
  };

  const handleRoleChange = () => {
    if (availableRoles.length === 2) {
      const next = availableRoles.find((r) => r !== currentRole);
      if (next) setCurrentRole(next);
    } else {
      router.push("/signup");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 1. 이미지 미리보기 반영
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 2. 실제 업로드 호출
      try {
        await uploadProfileImage(file);
        setAlertText("프로필 이미지를 변경했습니다!");
      } catch (error) {
        console.error("프로필 이미지 업로드 실패", error);
        setAlertErrorText("이미지 업로드에 실패했습니다.");
      }
    }
  };

  return (
    <div className="md:w-[220px] lx:w-[260px] md:pt-10 md:px-10 lx:pt-20 lx:px-20 border-r border-r-border box-content">
      <div className="flex flex-col w-full items-center">
        <div className="relative md:w-[180px] md:h-[180px] lx:w-[220px] lx:h-[220px]">
          {/* 이미지 라운드 처리 + overflow-hidden은 이 div에만 적용 */}
          <div className="rounded-full overflow-hidden w-full h-full">
            <Image
              src={avatarSrc}
              alt="User"
              width={180}
              height={180}
              className="object-cover w-full h-full md:w-[180px] md:h-[180px] lx:w-[220px] lx:h-[220px]"
            />
          </div>
          {/* edit 아이콘은 절대 위치로 띄우기 */}
          {role === "GENERAL" && (
            <label className="absolute bottom-0 right-0 z-10 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Image
                src={edit}
                alt="edit"
                width={40}
                height={40}
                className="cursor-pointer md:w-[40px] md:h-[40px] lx:w-[60px] lx:h-[60px]"
              />
            </label>
          )}
        </div>

        <p className="text-text-primary text-24m mb-[6px] mt-5">{name}</p>
        <RoleToken role={currentRole || "GENERAL"} />

        <button
          className="flex w-full flex-row items-center justify-center py-2.5 gap-1.5 rounded-md bg-main mt-[60px]"
          onClick={handleRoleChange}
        >
          <Image
            src={change}
            alt="change"
            width={20}
            height={20}
            className="md:w-5 md:h-5"
          />
          <p className="text-white text-18s">{renderRoleText()}</p>
        </button>
        <div className="bg-border h-[1px] mt-[60px] md:w-[220px] lx:w-[260px] mb-[42px]" />
        {role !== "GENERAL" && (
          <button className="flex w-full justify-between mb-11 items-center text-main text-18s">
            프로필 미리보기
            <Image
              src={vector}
              alt="vector"
              width={10}
              height={10}
              className="w-2.5 h-2.5"
            />
          </button>
        )}
        <UserMenu />
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

export default ProfileSection;
