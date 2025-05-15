import Image from "next/image";
import more from "@/app/images/icon/more.svg";
import { useRouter } from "next/navigation";
import { agentMockData, expertMockData } from "@/app/data/mock/mockAgent";
import ScrapProfileCard from "@/app/components/card/scrapProfileCard";

const ScrapSection = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col pb-10 md:pb-20 px-[15px] xl:pb-[120px] mt-[60px] md:mt-[100px]">
      <div
        className="flex flex-col gap-5 md:gap-0 md:flex-row
      justify-between items-center mb-5 md:mb-[60px]"
      >
        <h2 className="text-24m md:text-36m text-text-primary text-center">
          내가 찜한 <span className="text-main">중개사/전문가를</span> {""}
          만나보세요!
        </h2>
        <div
          className="flex items-center cursor-pointer place-self-end md:place-self-stretch"
          onClick={() => {
            router.push("/scrap");
          }}
        >
          <p className="text-text-secondary text-14m md:text-16m">더보기</p>
          <Image src={more} alt={"더보기"} width={20} height={20} />
        </div>
      </div>
      <h2 className="text-text-primary text-18s md:text-24s mb-5">
        공인중개사
      </h2>
      <div className="w-full overflow-x-auto no-scrollbar pt-[22px]">
        <div className="flex gap-5 md:gap-10 w-max px-1">
          {agentMockData.map((expert) => (
            <div key={expert.brokerId} className="shrink-0">
              <ScrapProfileCard {...expert} />
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-text-primary text-18s md:text-24s mb-5 mt-12">
        생활 서비스 전문가
      </h2>
      <div className="w-full overflow-x-auto no-scrollbar pt-[22px]">
        <div className="flex gap-5 md:gap-10 w-max px-1">
          {expertMockData.map((expert) => (
            <div key={expert.brokerId} className="shrink-0">
              <ScrapProfileCard {...expert} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrapSection;
