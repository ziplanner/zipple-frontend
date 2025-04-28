import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import avatar from "@/app/images/icon/header/avatar.svg";
import change from "@/app/images/icon/mypage/change.svg";
import edit from "@/app/images/icon/mypage/edit.svg";
import vector from "@/app/images/icon/mypage/vector.svg";
import RoleToken from "@/app/components/token/roleToken";
import UserMenu from "@/app/components/menu/userMenu";

interface RoleTokenProps {
  role: "GENERAL" | "REPRESENTATION" | "ASSOCIATE" | "EXPERT" | "NONE";
}

const ProfileSection = () => {
  const [name, setName] = useState<string>("권수연");
  const [role, setRole] = useState<
    "GENERAL" | "REPRESENTATION" | "ASSOCIATE" | "EXPERT" | "NONE"
  >("GENERAL");
  const [avatarSrc, setAvatarSrc] = useState<string | StaticImageData>(avatar); // 기본 이미지로 avatar를 설정

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
        setAvatarSrc(reader.result as string); // 이미지 경로를 state로 설정
      };

      reader.readAsDataURL(file); // 파일을 data URL로 읽어오기
    }
  };

  return (
    <div className="w-[260px] pt-20 px-20 border-r border-r-border box-content">
      <div className="flex flex-col w-full items-center">
        <div className="relative w-[220px] h-[220px]">
          <Image
            src={avatarSrc}
            alt="User"
            width={220}
            height={220}
            className="rounded-full w-[220px] h-[220px]"
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
              width={60}
              height={60}
              className="cursor-pointer"
            />
          </label>
        </div>
        <p className="text-text-primary text-24m mb-[6px] mt-5">{name}</p>
        <RoleToken role={role} />
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
        <div className="bg-border h-[1px] mt-[60px] w-[260px] mb-[42px]" />
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
        <UserMenu />
      </div>
    </div>
  );
};

export default ProfileSection;
