import Image from "next/image";
import { useRouter } from "next/navigation";

const MainCategoryCard = ({
  label,
  image,
  value,
  url,
  isExpert,
}: {
  label: string;
  image: string;
  value: string;
  url: string;
  isExpert?: boolean;
}) => {
  const router = useRouter();

  const baseColor = isExpert ? "hover:text-sub_text" : "hover:text-main";
  const hoverBg = isExpert ? "hover:bg-sub_bg" : "hover:bg-main_bg";
  const hoverBorder = isExpert ? "hover:border-sub_text" : "hover:border-main";

  return (
    <div
      className={`flex flex-col justify-between items-start border rounded-[10px] h-[120px] 
        text-16r md:text-18r hover:text-16s hover:md:text-18s text-text-primary
        transition-transform transform duration-300 ease-in-out hover:scale-[1.02]
        border-background-light p-4 md:p-5 cursor-pointer
        ${hoverBg} ${hoverBorder} ${baseColor}`}
      onClick={() => {
        router.push(`${url}?type=${value}`);
      }}
    >
      <span>{label}</span>
      <Image
        src={image}
        alt={label}
        width={36}
        height={36}
        className="md:h-12 md:w-12 self-end"
      />
    </div>
  );
};

export default MainCategoryCard;
