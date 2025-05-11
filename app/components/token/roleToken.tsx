import { Role } from "@/app/types/role";

const roleNames: Record<Role["role"], string> = {
  GENERAL: "일반",
  REPRESENTATIVE: "대표 공인중개사",
  ASSOCIATE: "소속 공인중개사",
  EXPERT: "생활 전문가",
};

const RoleToken = ({ role }: Role) => {
  return (
    <div
      className="inline-flex justify-center items-center text-12b md:text-14b
    border border-main px-3 py-[1px] text-main rounded-full"
    >
      {roleNames[role]}
    </div>
  );
};

export default RoleToken;
