import Image from "next/image";
import loginIcon from "@/app/images/main_logo.svg";

const LoginLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-5">
        <Image
          src={loginIcon}
          alt="login"
          width={128}
          height={28}
          className="md:w-[256px] md:h-14"
        />
        <div className="flex items-center justify-center gap-2 md:gap-3 mt-10">
          <p className="rounded-full bg-skyblue w-3 h-3 md:w-5 md:h-5 animate-bounce-delay-0"></p>
          <p className="rounded-full bg-[#7ea0eb] w-3 h-3 md:w-5 md:h-5 animate-bounce-delay-1"></p>
          <p className="rounded-full bg-[#4f80f1] w-3 h-3 md:w-5 md:h-5 animate-bounce-delay-2"></p>
          <p className="rounded-full bg-main w-3 h-3 md:w-5 md:h-5 animate-bounce-delay-3"></p>
        </div>
      </div>
    </div>
  );
};

export default LoginLoading;
