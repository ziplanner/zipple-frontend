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
import { Role } from "@/app/types/role";

const ProfileSection = () => {
  const router = useRouter();

  const { user } = useUserStore();
  const role = user?.lastLoginType;

  const [roleType, setRoleType] = useState<
    "GENERAL" | "REPRESENTATIVE" | "ASSOCIATE" | "EXPERT"
  >(role ?? "GENERAL");

  const [name, setName] = useState<string>(user?.nickname || "");
  const [avatarSrc, setAvatarSrc] = useState<string | StaticImageData>(
    user?.profileUrl || defaultProfile
  );

  const roleDescMap: Partial<Record<string, string>> = {
    GENERAL: "생활 전문가로 전환",
    REPRESENTATIVE: "일반 회원으로 전환",
    ASSOCIATE: "일반 회원으로 전환",
    EXPERT: "일반 회원으로 전환",
  };

  const switchTextMap: Partial<Record<string, string>> = {
    REPRESENTATIVE: "대표 중개사로 전환",
    ASSOCIATE: "소속 중개사로 전환",
    EXPERT: "생활 전문가로 전환",
    GENERAL: "일반 회원으로 전환",
  };

  const renderRoleText = () => {
    const roles = user?.roleName || [];

    if (!role) return "";

    // 두 개의 role을 가진 경우
    if (roles.length === 2) {
      const target = roles.find((r) => r !== role);
      return switchTextMap[target || ""] || "";
    }

    // 단일 role인 경우
    if (roles.length === 1) {
      // 현재 role이 GENERAL이면 → 전문가 중 하나 추천
      if (role === "GENERAL") {
        const target = ["REPRESENTATIVE", "ASSOCIATE", "EXPERT"].find(
          (r) => !roles.includes(r)
        );
        return switchTextMap[target || ""] || "";
      }

      // 현재 role이 그 외(전문가 계열)면 → GENERAL로 전환
      return switchTextMap["GENERAL"];
    }

    return "";
  };

  const handleRoleChange = () => {
    const roles = user?.roleName || [];

    if (roles.length === 2) {
      const next = roles.find((r) => r !== role);
      if (next) setRoleType(next as Role["role"]);
    } else {
      router.push("/signup");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="md:w-[220px] lx:w-[260px] md:pt-10 md:px-10 lx:pt-20 lx:px-20 border-r border-r-border box-content">
      <div className="flex flex-col w-full items-center">
        <div className="md:w-[180px] md:h-[180px] lx:w-[220px] lx:h-[220px] rounded-full overflow-hidden">
          <Image
            src={avatarSrc}
            alt="User"
            width={180}
            height={180}
            className="object-cover w-full h-full md:w-[180px] md:h-[180px] lx:w-[220px] lx:h-[220px]"
          />
          <label className="absolute bottom-0 right-0 cursor-pointer">
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
        </div>
        <p className="text-text-primary text-24m mb-[6px] mt-5">{name}</p>
        <RoleToken role={roleType} />
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
    </div>
  );
};

export default ProfileSection;
