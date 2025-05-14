import { useExpertSignup } from "@/app/context/expertSignupProvider";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Image from "next/image";
import step1 from "@/app/images/icon/step1.svg";
import step2 from "@/app/images/icon/step2.svg";
import step3 from "@/app/images/icon/step3.svg";

const steps = [
  { component: <Step1 />, image: step1, alt: "step1" },
  { component: <Step2 />, image: step2, alt: "step2" },
  { component: <Step3 />, image: step3, alt: "step3" },
];

const ExpertSignupMainContent = () => {
  const { currentStep } = useExpertSignup();

  const current = steps[currentStep - 1];

  return (
    <div className="flex flex-col items-center mt-10 md:mt-20 mb-[60px] md:mb-[120px]">
      <h1 className="text-text-primary text-22s md:text-36s px-[15px] md:px-0">
        생활전문가 회원 인증
      </h1>

      <Image
        src={current.image}
        alt={current.alt}
        width={285}
        height={46}
        className="md:w-[351px] md:h-[50px] mt-10 mb-5 md:mt-[60px] md:mb-10"
      />

      {current.component}
    </div>
  );
};

export default ExpertSignupMainContent;
