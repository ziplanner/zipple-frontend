import { useState } from "react";
import Image from "next/image";
import close from "@/app/images/icon/close.svg";
import { LargeBtn } from "../button/largeBtn";
import { PhoneInput } from "../input/phoneInput";
import { InputWithBtn } from "../input/inputWithBtn";

interface ReapplicationModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const ReapplicationModal = ({ onClose, onSubmit }: ReapplicationModalProps) => {
  const [phone, setPhone] = useState<string>("");
  const [adress, setAdress] = useState<string>("");

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleAdressChange = (value: string) => {
    setAdress(value);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        className="relative bg-white rounded-[20px] p-5 max-w-[480px] mx-5
    flex flex-col items-center shadow-lg"
      >
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1">
          <Image src={close} alt="close" width={20} height={20} />
        </button>

        {/* Content */}
        <div className="flex flex-col w-full py-2 md:p-5">
          <h1 className="text-text-primary text-18s md:text-20s mb-2.5">
            소속 재신청
          </h1>
          <p className="text-text-secondary text-14r md:text-16r mb-10">
            소속 공인중개사 소속 재신청은 해당 중개사무소의 대표 중개사 가입
            완료 후 가능합니다.
          </p>
          {/* 중개사무소 입력 */}
          <div className="flex flex-col gap-2.5 mb-10">
            <h3 className="text-text-primary text-14m md:text-16m">
              중개사무소 <span className="text-error">*</span>
            </h3>
            <InputWithBtn
              type={"search"}
              searchValue={adress}
              onSearchChange={handleAdressChange}
              direction="col"
            />
          </div>
          {/* 전화번호 입력 */}
          <div className="flex flex-col gap-2.5 mb-[60px]">
            <h3 className="text-text-primary text-14m md:text-16m">
              대표 전화번호 <span className="text-error">*</span>
            </h3>
            <PhoneInput value={phone} onChange={handlePhoneChange} />
            <LargeBtn onClick={() => {}} text="인증받기" color="" />
          </div>

          {/* 해제 버튼 */}
          <LargeBtn
            onClick={handleSubmit}
            text={"소속 재신청하기"}
            color="blue"
            // disabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
};

export default ReapplicationModal;
