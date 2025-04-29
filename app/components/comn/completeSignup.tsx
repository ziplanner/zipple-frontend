import Image from "next/image";
import check from "@/app/images/icon/signup/check.svg";
import { BlueBtn } from "../button/blueBtn";
import { useRouter } from "next/navigation";

const CompleteSignup = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center my-[60px] md:my-[120px]">
      <Image src={check} alt="완료" width={88} height={68} />
      <h1 className="text-text-primary text-22s md:text-36m mt-10 mb-2.5 md:mb-5">
        인증이 완료되었습니다!
      </h1>
      <p className="text-text-secondary text-16r md:text-18r mb-[60px] md:mb-20">
        집플과 함께 다양한 서비스를 이용해보세요!
      </p>
      <BlueBtn
        onClick={() => {
          router.push("/");
        }}
        text={"홈으로 가기"}
      />
    </div>
  );
};

export default CompleteSignup;
