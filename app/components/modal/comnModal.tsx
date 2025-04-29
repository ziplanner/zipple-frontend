import Image from "next/image";
import close from "@/app/images/icon/close.svg";

interface ComnModalProps {
  onClose: () => void;
}

const ComnModal = ({ onClose }: ComnModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        className="relative bg-white rounded-[20px] p-5 w-[480px]
      flex flex-col items-center shadow-lg"
      >
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1">
          <Image src={close} alt="close" width={20} height={20} />
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default ComnModal;
