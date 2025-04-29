import Image from "next/image";
import time from "@/app/images/icon/mypage/time.svg";
import check from "@/app/images/icon/mypage/check.svg";
import retrial from "@/app/images/icon/mypage/resubmission.svg";

interface NoticeBarProps {
  type: "wait" | "request" | "retrial" | "complete";
}

const typeToDesc = {
  wait: {
    highlight: "승인 대기 중",
    rest: "입니다. 평균 1~2일 이내 심사가 완료됩니다.",
  },
  request: {
    highlight: "소속 재신청을 통한 승인 요청",
    rest: "이 필요합니다. 신청 후에는 평균 1~2일 이내 심사가 완료됩니다.",
  },
  retrial: {
    highlight: "보완 필요 상태",
    rest: "입니다. 다시 제출해주세요.",
  },
  complete: {
    highlight: "승인이 완료",
    rest: "되었습니다. 프로필을 관리하고, 고객과 만나보세요.",
  },
};

const NoticeBar = ({ type }: NoticeBarProps) => {
  const imageSrc =
    type === "wait" || type === "request"
      ? time
      : type === "retrial"
      ? retrial
      : check;

  return (
    <div
      className={`flex rounded-[10px] w-full border py-6 px-5 gap-2.5 items-center justify-start ${
        type === "wait" || type === "request"
          ? "border-sub bg-sub_bg"
          : type === "retrial"
          ? "border-error bg-error_bg"
          : "border-main bg-main_bg"
      }`}
    >
      <div className="flex w-full flex-row justify-between">
        <div className="flex gap-2">
          <Image src={imageSrc} alt={type} width={24} height={24} />
          <p
            className={`text-18r ${
              type === "wait" || type === "request"
                ? "text-sub_text"
                : type === "retrial"
                ? "text-error"
                : "text-main"
            }`}
          >
            <span className="text-18s">{typeToDesc[type].highlight}</span>
            {typeToDesc[type].rest}
          </p>
        </div>
        {type === "retrial" && (
          <button className="underline text-18r text-error" onClick={() => {}}>
            다시 제출하기
          </button>
        )}
      </div>
    </div>
  );
};

export default NoticeBar;
