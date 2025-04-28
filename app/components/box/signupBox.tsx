import { useRouter } from "next/navigation";
import { BlackBtn } from "../button/blackBtn";
import Image from "next/image";
import general from "@/app/images/icon/signup/general.svg";
import general_white from "@/app/images/icon/signup/general_white.svg";
import agent from "@/app/images/icon/signup/agent.svg";
import agent_white from "@/app/images/icon/signup/agent_white.svg";
import expert from "@/app/images/icon/signup/expert.svg";
import expert_white from "@/app/images/icon/signup/expert_white.svg";
import { WhiteBtn } from "../button/whiteBtn";

interface SignupBoxProps {
  type: "일반" | "공인중개사" | "생활전문가";
  isSelected: boolean;
  onSelect: (type: "일반" | "공인중개사" | "생활전문가") => void;
}

const SignupBox = ({ type, isSelected, onSelect }: SignupBoxProps) => {
  const router = useRouter();

  const typeToRoute = {
    일반: "/signup/general",
    공인중개사: "/signup/agent",
    생활전문가: "/signup/expert",
  };

  const typeToDesc = {
    일반: "서비스를 이용하고 싶다면",
    공인중개사: "부동산 서비스를 제공하고 싶다면",
    생활전문가: "생활 서비스를 제공하고 싶다면",
  };

  const typeToImg = {
    일반: isSelected ? general_white : general,
    공인중개사: isSelected ? agent_white : agent,
    생활전문가: isSelected ? expert_white : expert,
  };

  const handleCardClick = () => {
    onSelect(type);
    const route = typeToRoute[type] || "/signup";
    router.push(route);
  };

  return (
    <div
      className={`flex flex-col items-center group border rounded-[20px] transition-all duration-300 ease-in-out
        w-[380px] h-[460px] cursor-pointer justify-center
        ${
          isSelected
            ? "bg-main border-none scale-105"
            : "border-background-light"
        }
        hover:scale-105 hover:bg-main hover:border-none hover:shadow-lg`}
      onClick={handleCardClick}
    >
      <Image
        src={typeToImg[type]}
        alt={type}
        width={80}
        height={80}
        className="transition-all duration-300 group-hover:brightness-0 group-hover:invert mb-5"
      />
      <p
        className={`text-text-primary text-18r transition-all duration-300 group-hover:text-white my-5`}
      >
        {typeToDesc[type]}
      </p>
      <div className="flex w-full justify-center">
        {isSelected ? (
          <WhiteBtn
            onClick={handleCardClick}
            text={`${type} 회원 인증`}
            className="group-hover:bg-white group-hover:text-main"
          />
        ) : (
          <BlackBtn
            onClick={handleCardClick}
            text={`${type} 회원 인증`}
            className="group-hover:bg-white group-hover:text-main"
          />
        )}
      </div>
    </div>
  );
};

export default SignupBox;
