import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import defaultProfile from "@/app/images/icon/default_profile.svg";
import change from "@/app/images/icon/mypage/change.svg";
import edit from "@/app/images/icon/mypage/edit.svg";
import vector from "@/app/images/icon/mypage/vector.svg";
import RoleToken from "@/app/components/token/roleToken";
import MobileUserMenu from "@/app/components/menu/mobileUserMenu";
import vector_black from "@/app/images/icon/vector.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";
import { Role } from "@/app/types/role";
import { useRoleStore } from "@/app/store/roleStore";

const MobileProfileSection = () => {
  const router = useRouter();

  const { user } = useUserStore();
  const role = user?.lastLoginType;
  const { currentRole, availableRoles, setCurrentRole } = useRoleStore();

  const [name, setName] = useState<string>("");
  const [avatarSrc, setAvatarSrc] = useState<string | StaticImageData>(
    defaultProfile
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

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
    <div className="w-full pt-5 relative">
      <button onClick={handleOpen} className="absolute top-8 right-0">
        <Image
          src={vector_black}
          alt="vector"
          width={10}
          height={10}
          className={`w-2.5 h-2.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen ? (
        <div className="flex flex-col w-full items-center">
          {/* 아바타 + 변경 버튼 */}
          <div className="relative w-20 h-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={String(avatarSrc)} // avatarSrc 변하면 다시 렌더
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 rounded-full overflow-hidden"
              >
                <Image
                  src={avatarSrc}
                  alt="User"
                  width={80}
                  height={80}
                  className="rounded-full w-20 h-20 object-cover"
                />
              </motion.div>
            </AnimatePresence>

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
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </label>
          </div>

          {/* 이름 */}
          <AnimatePresence mode="wait">
            <motion.p
              key={role + "-name"}
              className="text-text-primary text-18m mb-1 mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.p>
          </AnimatePresence>

          {/* RoleToken */}
          <AnimatePresence mode="wait">
            <motion.div
              key={role + "-role"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RoleToken role={currentRole || "GENERAL"} />
            </motion.div>
          </AnimatePresence>

          {/* 전환 버튼 */}
          <button
            className="flex flex-row items-center justify-center px-10 py-2.5 gap-1.5 rounded-md bg-main mt-[30px]"
            onClick={handleRoleChange}
          >
            <Image
              src={change}
              alt={"change"}
              width={20}
              height={20}
              className="md:w-5 md:h-5"
            />
            <p className="text-white text-16s">{renderRoleText()}</p>
          </button>

          {role !== "GENERAL" && (
            <button className="flex gap-[6px] mt-5 items-center text-main text-16s">
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
        </div>
      ) : (
        <div className="flex flex-row w-full items-center justify-center gap-[6px]">
          <Image
            src={avatarSrc}
            alt="User"
            width={40}
            height={40}
            className="rounded-full w-10 h-10 object-cover"
          />
          <p className="text-text-primary text-18m ml-1">{name}</p>
          <RoleToken role={currentRole || "GENERAL"} />
        </div>
      )}

      {/* 사용자 role에 따라 변하는 좌측 menu */}
      <div className="flex w-full mt-10">
        <MobileUserMenu />
      </div>
    </div>
  );
};

export default MobileProfileSection;
