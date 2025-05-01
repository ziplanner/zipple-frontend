import Image from "next/image";
import close from "@/app/images/icon/close.svg";
import { LargeBtn } from "../button/largeBtn";
import { PhoneInput } from "../input/phoneInput";
import { useState } from "react";
import Textarea from "../textarea/textarea";
import checkOn from "@/app/images/icon/check_on.svg";
import checkOff from "@/app/images/icon/check_off.svg";

interface ComnModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const DisassociationModal = ({ onClose, onSubmit }: ComnModalProps) => {
  const [phone, setPhone] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [selected, setSelected] = useState<boolean>(false);

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleDisassociation = () => {
    onSubmit();
  };

  // 모든 조건 만족 시에만 버튼 활성화
  const isValid = phone.length >= 10 && reason.trim() !== "" && selected;

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
          <h1 className="text-text-primary text-18s md:text-20s mb-10">
            소속 해제
          </h1>

          {/* 전화번호 입력 */}
          <div className="flex flex-col gap-2.5 mb-10">
            <h3 className="text-text-primary text-14m md:text-16m">
              전화번호 <span className="text-error">*</span>
            </h3>
            <PhoneInput value={phone} onChange={handlePhoneChange} />
            <LargeBtn onClick={() => {}} text="인증받기" color="" />
          </div>

          {/* 해제사유 */}
          <div className="flex flex-col gap-2.5 mb-10">
            <h3 className="text-text-primary text-14m md:text-16m">
              해제사유 <span className="text-error">*</span>
            </h3>
            <Textarea
              value={reason}
              onChange={handleReasonChange}
              maxLength={0}
              height={150}
            />
          </div>

          {/* 동의 체크박스 */}
          <div
            className="flex items-center gap-2 cursor-pointer mb-[60px]"
            onClick={() => setSelected(!selected)}
          >
            <Image
              src={selected ? checkOn : checkOff}
              alt="check"
              width={16}
              height={16}
            />
            <p className="text-14r md:text-16r text-text-secondary">
              소속 해제에 동의합니다.
            </p>
          </div>

          {/* 해제 버튼 */}
          <LargeBtn
            onClick={handleDisassociation}
            text={"해제하기"}
            color="blue"
            disabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
};

export default DisassociationModal;
