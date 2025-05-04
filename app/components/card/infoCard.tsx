import office from "@/app/images/icon/office.svg";
import ping from "@/app/images/icon/ping.svg";
import link from "@/app/images/icon/link.svg";
import Image from "next/image";

interface InfoCardProps {
  type: "office" | "ping" | "link";
  text: string;
}

const InfoCard = ({ type, text }: InfoCardProps) => {
  const typeIcon =
    type === "office"
      ? office
      : type === "ping"
      ? ping
      : type === "link"
      ? link
      : "";

  const typeDesc =
    type === "office"
      ? "전문분야"
      : type === "ping"
      ? "활동분야"
      : type === "link"
      ? "링크"
      : "";

  return (
    <div className="flex w-full flex-col bg-background-extraSoft rounded-[10px] gap-2.5 p-5 ">
      <div className="flex gap-0.5 items-center">
        <Image src={typeIcon} alt={type} width={24} height={24} />
        <p className="text-text-primary text-16s">{typeDesc}</p>
      </div>
      <p className="text-text-secondary text-18r">{text}</p>
    </div>
  );
};

export default InfoCard;
