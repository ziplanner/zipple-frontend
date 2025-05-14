import { LargeBtn } from "../button/largeBtn";
import Image from "next/image";
import defaultProfile from "@/app/images/icon/default_profile.svg";
import { BasicBtn } from "../button/basicBtn";

type EstimateCardStatus = "request" | "quoted" | "canceled";

interface EstimateCardProps {
  status: EstimateCardStatus;
  expertName: string;
  businessName: string;
  date: string; // e.g., "2025.01.01 15:00"
  serviceType: string; // e.g., "이사 > 가정이사"
  estimateAmount?: number; // undefined if not quoted
  profileUrl?: string;
  type?: "생활서비스 전문가" | "중개사";
}

type ButtonConfig = {
  text: string;
  color: "blue" | "black" | "white" | "gray" | "";
  disabled?: boolean;
  onClick?: () => void;
};

const statusConfig: Record<
  EstimateCardStatus,
  {
    label: string;
    labelColor: string;
    barColor: string;
    statusText?: string;
    button: ButtonConfig;
  }
> = {
  request: {
    label: "요청",
    labelColor: "border border-main bg-white text-main",
    barColor: "bg-main",
    button: {
      text: "요청 취소",
      color: "",
      onClick: () => alert("요청을 취소하시겠습니까?"),
    },
  },
  quoted: {
    label: "견적완료",
    labelColor: "bg-main text-white",
    barColor: "bg-main",
    button: {
      text: "견적서 보기",
      color: "blue",
      onClick: () => alert("견적서 보기 클릭"),
    },
  },
  canceled: {
    label: "취소",
    labelColor: "bg-text-light text-white",
    barColor: "bg-main",
    statusText: "전문가 기간 내 미응답으로 인해 요청이 취소되었습니다.",
    button: {
      text: "요청 취소",
      color: "",
      disabled: true,
    },
  },
};

const EstimateCard = ({
  status,
  expertName,
  businessName,
  date,
  serviceType,
  estimateAmount,
  profileUrl,
  type = "생활서비스 전문가",
}: EstimateCardProps) => {
  const config = statusConfig[status];

  return (
    <div className="border rounded-xl p-5 md:p-[30px] min-w-[330px] w-full md:max-w-[560px] flex flex-col">
      <div className="flex justify-between items-center">
        <span
          className={`px-[18px] py-[6px] text-12s md:text-14s rounded-full ${config.labelColor}`}
        >
          {config.label}
        </span>
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
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row gap-2.5 items-center justify-center">
            <div className="text-text-primary text-16s md:text-18s">
              {expertName}
            </div>
            <p className="text-text-secondary text-12m md:text-14m">{type}</p>
          </div>
          <div className="text-text-secondary text-12m md:text-14m">
            {businessName}
          </div>
        </div>
      </div>
      <p className="text-14r md:text-16r text-text-secondary mt-[18px] mb-5">
        안녕하세요. {expertName} 중개사입니다.
      </p>
      <div className="border border-border mb-5 md:mb-[30px]" />

      <div className="flex w-full justify-between items-center mb-10">
        <div className="text-text-secondary text-12r md:text-14r">
          {serviceType}
        </div>
        <BasicBtn
          text={"견적 요청사항 조회"}
          color={"white"}
          onClick={() => {}}
        />
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
        className={`flex w-full items-center h-[60px] my-10
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
        ) : status === "quoted" ? (
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

      <LargeBtn
        text={config.button.text}
        color={config.button.color}
        onClick={config.button.onClick ?? (() => {})}
        disabled={config.button.disabled}
        className="mt-2"
      />
    </div>
  );
};

export default EstimateCard;
