import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import avatar from "@/app/images/icon/header/avatar.svg";
import change from "@/app/images/icon/mypage/change.svg";
import edit from "@/app/images/icon/mypage/edit.svg";
import vector from "@/app/images/icon/mypage/vector.svg";
import RoleToken from "@/app/components/token/roleToken";
import UserMenu from "@/app/components/menu/userMenu";
import { useRole } from "@/app/context/roleContextProvider";

interface RoleTokenProps {
  role: "GENERAL" | "REPRESENTATION" | "ASSOCIATE" | "EXPERT" | "NONE";
}

const ProfileSection = () => {
  const { role, setRole } = useRole();

  const [name, setName] = useState<string>("권수연");
  const [avatarSrc, setAvatarSrc] = useState<string | StaticImageData>(avatar);

  const roleDesc: Record<RoleTokenProps["role"], string> = {
    GENERAL: "생활 전문가로 전환",
    REPRESENTATION: "일반 회원으로 전환",
    ASSOCIATE: "일반 회원으로 전환",
    EXPERT: "일반 회원으로 전환",
    NONE: "",
  };

  const handleRoleChange = () => {
    const nextRole: Record<
      RoleTokenProps["role"],
      "GENERAL" | "REPRESENTATION" | "ASSOCIATE" | "EXPERT" | "NONE"
    > = {
      GENERAL: "REPRESENTATION",
      REPRESENTATION: "ASSOCIATE",
      ASSOCIATE: "EXPERT",
      EXPERT: "GENERAL",
      NONE: "GENERAL",
    };

    setRole(nextRole[role]);
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
        <div className="relative md:w-[180px] md:h-[180px] lx:w-[220px] lx:h-[220px]">
          <Image
            src={avatarSrc}
            alt="User"
            width={180}
            height={180}
            className="rounded-full md:w-[180px] md:h-[180px] lx:w-[220px] lx:h-[220px]"
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
        <RoleToken role={role} />
        {/* 전환 버튼 */}
        <button
          className="flex w-full flex-row items-center justify-center py-2.5 gap-1.5 rounded-md bg-main mt-[60px]"
          onClick={handleRoleChange}
        >
          <Image
            src={change}
            alt={"change"}
            width={20}
            height={20}
            className="md:w-5 md:h-5"
          />
          <p className="text-white text-18s">{roleDesc[role]}</p>
        </button>
        <div className="bg-border h-[1px] mt-[60px] md:w-[220px] lx:w-[260px] mb-[42px]" />
        {role !== "GENERAL" && (
          <button
            className="flex w-full justify-between mb-11
      items-center text-main text-18s"
          >
            프로필 미리보기
            <Image
              src={vector}
              alt={"vector"}
              width={10}
              height={10}
              className="w-2.5 h-2.5"
            />
          </button>
        )}
        {/* 사용자 role에 따라 변하는 좌측 menu */}
        <UserMenu />
      </div>
    </div>
  );
};

export default ProfileSection;
