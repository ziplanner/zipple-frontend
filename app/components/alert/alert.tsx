interface AlertProps {
  text: string;
  subText?: string;
  leftBtnText?: string;
  rightBtnText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Alert = ({
  text,
  subText,
  leftBtnText = "취소",
  rightBtnText = "확인",
  onClose,
  onConfirm,
}: AlertProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="flex flex-col p-5 rounded-[20px] shadow-md bg-white">
        <div className="mt-5 mb-10 flex flex-col text-center justify-center text-text-primary md:text-18r text-16r">
          <h1>{text}</h1>
          {subText && <h1>{subText}</h1>}
        </div>
        <div className="flex flex-row gap-2.5 justify-center items-center md:text-18r text-16r">
          <button
            className="text-text-secondary text-center bg-background-soft rounded-[10px] md:w-[160px] md:py-4 w-[140px] py-3.5"
            onClick={onClose}
          >
            {leftBtnText}
          </button>
          <button
            className="text-white text-center bg-main rounded-[10px] md:w-[160px] md:py-4 w-[140px] py-3.5"
            onClick={onConfirm}
          >
            {rightBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
