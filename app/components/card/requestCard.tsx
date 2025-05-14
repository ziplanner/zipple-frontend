import { LargeBtn } from "../button/largeBtn";
import Image from "next/image";
import defaultProfile from "@/app/images/icon/default_profile.svg";

type RequestCardStatus = "waiting" | "overdue" | "userCanceled";

interface RequestCardProps {
  status: RequestCardStatus;
  expertName: string;
  date: string;
  serviceType: string;
  estimateAmount?: number;
  onCancel?: () => void;
  onWriteEstimate?: () => void;
  profileUrl?: string;
}

const statusConfig: Record<
  RequestCardStatus,
  {
    label: string;
    labelColor: string;
    barColor: string;
    statusText?: string;
    labelTag?: React.ReactNode;
  }
> = {
  waiting: {
    label: "견적완료",
    labelColor: "border border-main bg-white text-main",
    barColor: "bg-main",
  },
  overdue: {
    label: "요청",
    labelColor: "bg-main text-white",
    barColor: "bg-main",
    labelTag: (
      <span className="text-xs text-error font-medium ml-1">
        ⏰ 응답 24시간 남음
      </span>
    ),
  },
  userCanceled: {
    label: "취소",
    labelColor: "bg-text-light text-white",
    barColor: "bg-main",
    statusText: "고객에 의해 요청이 취소되었습니다.",
  },
};

const RequestCard = ({
  status,
  expertName,
  date,
  serviceType,
  estimateAmount,
  onCancel,
  onWriteEstimate,
  profileUrl,
}: RequestCardProps) => {
  const config = statusConfig[status];

  return (
    <div className="border rounded-xl p-5 md:p-[30px] min-w-[330px] w-full md:max-w-[560px] flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <span
            className={`px-[18px] py-[6px] text-12s md:text-14s rounded-full ${config.labelColor}`}
          >
            {config.label}
          </span>
          {/* ⏰ 라벨 표시 */}
          <span className="text-error">{config.labelTag}</span>
        </div>
        <span className="text-text-secondary text-14r md:text-16r">{date}</span>
      </div>

      <div className="flex flex-row gap-2.5 items-center mt-5 md:mt-[30px]">
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
          <Image
            src={profileUrl || defaultProfile}
            alt="User"
            width={60}
            height={60}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-text-primary text-16s md:text-18s">
          {expertName}
        </div>
      </div>
      <p className="text-14r md:text-16r text-text-secondary mt-[18px] mb-5">
        안녕하세요. {expertName} 중개사입니다.
      </p>
      <div className="border border-border mb-5 md:mb-[30px]" />

      <div className="flex w-full mb-10">
        <div className="text-text-secondary text-12r md:text-14r">
          {serviceType}
        </div>
      </div>

      {/* Progress Bar + Label */}
      <div className="w-full mt-2">
        {/* Progress Bar */}
        <div className="w-full bg-background-light h-2 rounded-full">
          <div className={`${config.barColor} h-2 w-1/2 rounded-full`} />
        </div>

        {/* Label & Date */}
        <div className="flex justify-between mt-2 text-14s md:text-16s px-0.5">
          <div className="flex flex-col items-center text-main">
            <span className="font-semibold">요청</span>
            <span className="text-text-light mt-0.5 text-12r md:text-14r">
              2025.01.01
            </span>
          </div>
          <div className="text-text-secondary">견적완료</div>
        </div>
      </div>

      {/* 견적 금액 */}
      <div
        className={`flex w-full items-center h-[56px] mb-10 mt-5 md:my-10 
        ${config.statusText ? "justify-center" : "justify-between"}`}
      >
        {!config.statusText && (
          <div className="text-text-primary text-16s md:text-18s">
            견적 금액
          </div>
        )}
        {config.statusText ? (
          <div className="text-14r md:text-16r content-center text-error">
            {config.statusText}
          </div>
        ) : status === "userCanceled" ? (
          <div className="flex flex-col">
            <p className="text-end text-text-secondary text-12m md:text-14m">
              예상금액
            </p>
            <div className="text-24b md:text-30b text-text-primary self-end">
              <span className="text-main">
                {estimateAmount?.toLocaleString()}
              </span>
              원
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="text-end text-text-secondary text-12m md:text-14m">
              예상금액
            </p>
            <div className="text-30s text-text-light self-end">-원</div>
          </div>
        )}
      </div>
      {/* 하단 버튼 영역 */}
      {status === "waiting" ? (
        <LargeBtn
          onClick={() => {
            alert("작성한 견적서 보기");
          }}
          text={"작성한 견적서 보기"}
          color="borderBlue"
        />
      ) : (
        <div className="flex flex-row gap-2.5 ">
          <LargeBtn
            text="요청 취소"
            color="gray"
            onClick={onCancel ?? (() => {})}
            disabled={status === "userCanceled"}
          />
          <LargeBtn
            text="견적 작성하기"
            color="blue"
            onClick={onWriteEstimate ?? (() => {})}
            disabled={status === "userCanceled"}
          />
        </div>
      )}
    </div>
  );
};

export default RequestCard;
