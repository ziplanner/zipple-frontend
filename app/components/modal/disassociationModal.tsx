import Image from "next/image";
import close from "@/app/images/icon/close.svg";
import { LargeBtn } from "../button/largeBtn";
import { PhoneInput } from "../input/phoneInput";
import { useState } from "react";
import Textarea from "../textarea/textarea";

interface ComnModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const DisassociationModal = ({ onClose, onSubmit }: ComnModalProps) => {
  const [phone, setPhone] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleDisassociation = () => {
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        className="relative bg-white rounded-[20px] p-5 w-[330px] md:w-[480px]
  flex flex-col items-center shadow-lg"
      >
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1">
          <Image src={close} alt="close" width={20} height={20} />
        </button>
        {/* Header */}
        <div className="flex flex-col w-full py-2 md:p-5">
          <h1 className="text-text-primary text-18s md:text-20s mb-10">
            소속 해제
          </h1>
          <div className="flex flex-col gap-2.5 mb-10">
            <h3 className="text-text-primary text-14m md:text-16m">
              전화번호 <span className="text-error">*</span>
            </h3>
            <PhoneInput value={phone} onChange={handlePhoneChange} />
            <LargeBtn onClick={() => {}} text="인증받기" color="" />
          </div>
          <div className="flex flex-col gap-2.5 mb-10">
            <h3 className="text-text-primary text-14m md:text-16m">
              해제사유 <span className="text-error">*</span>
            </h3>
            <Textarea
              value={reason}
              onChange={handleReasonChange}
              maxLength={0}
            />
          </div>
          <LargeBtn
            onClick={handleDisassociation}
            text={"해제하기"}
            color="blue"
          />
        </div>
      </div>
    </div>
  );
};

export default DisassociationModal;
