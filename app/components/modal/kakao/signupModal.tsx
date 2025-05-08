import Image from "next/image";
import logo from "@/app/images/main_logo.svg";
import close from "@/app/images/icon/close.svg";
import kakao from "@/app/images/kakao/complete/ko/kakao_login_medium_wide.png";

interface SignupModalProps {
  onClose: () => void;
}

const SignupModal = ({ onClose }: SignupModalProps) => {
  const handleLoginClick = () => {
    const location = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;
    const clientId = process.env.NEXT_PUBLIC_KAKAO_AUTH_API_KEY;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;
    // const redirectUri = process.env.NEXT_PUBLIC_CLIENT_BASE_URL;
    const respoinseType = "code";

    const requestUrl =
      location +
      "?" +
      "client_id=" +
      clientId +
      "&redirect_uri=" +
      redirectUri +
      "&response_type=" +
      respoinseType;
    window.location.href = requestUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      {/* 모달 본체 */}
      <div
        className="relative bg-white rounded-[20px] p-5 w-[480px]
      flex flex-col items-center shadow-lg"
      >
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1">
          <Image src={close} alt="close" width={20} height={20} />
        </button>

        {/* 로고 */}
        <Image
          src={logo}
          alt="ZIPPLE"
          width={164}
          height={36}
          className="cursor-pointer mt-10"
        />

        {/* 설명 텍스트 */}
        <p className="text-text-primary text-center text-24l leading-relaxed my-10">
          복잡하고 어려운 집을 찾는 과정 <br />
          <span className="text-24s">집플</span>과 함께 하세요!
        </p>

        {/* 카카오 로그인 버튼 */}
        <Image
          src={kakao}
          alt="KAKAO"
          width={400}
          height={60}
          className="cursor-pointer w-full p-5"
          onClick={handleLoginClick}
        />
      </div>
    </div>
  );
};

export default SignupModal;
