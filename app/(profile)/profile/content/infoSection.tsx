import { useState } from "react";
import Image from "next/image";
import InfoCard from "@/app/components/card/infoCard";
import vector from "@/app/images/icon/round_vector.svg";
import { BasicBtn } from "@/app/components/button/basicBtn";
import { PortfolioCard } from "@/app/components/card/portfolioCard";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const DUMMY_DATA = Array(6)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    title: `(포트폴리오 ${
      i + 1
    }) 100평대 사무실 임대 최대 한줄까지만 들어가겠습니다! `,
    date: "2025.05.05",
  }));

const InfoSection = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex w-full flex-col md:px-8 md:py-10 lg:px-[60px] lg:py-20">
      <h1 className="text-24s md:text-36s text-text-primary mb-[30px] md:mb-10">
        안녕하세요. 홍길동 중개사입니다.
      </h1>
      <div className="flex flex-col lg:flex-row w-full gap-2.5 lg:gap-5 justify-evenly mb-10 md:mb-[60px]">
        <InfoCard type={"link"} text={"www.zipple.co.kr"} />
        <InfoCard type={"office"} text={"아파트"} />
        <InfoCard type={"ping"} text={"강남구, 강동구, 성동구, 연수구"} />
      </div>
      <div>
        <div className="flex justify-between w-full items-center mb-5 md:mb-10">
          <h2 className="text-text-primary text-18s md:text-24s">
            부동산 등록정보
          </h2>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Image
              src={vector}
              alt={"vector"}
              width={30}
              height={30}
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-[30px] lg:gap-10 lg:flex-row justify-between">
                <div className="flex flex-col gap-[30px]">
                  <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
                    <div className="flex flex-col gap-2.5">
                      <h3 className="text-text-primary text-14m lg:text-16m">
                        상호명
                      </h3>
                      <p className="text-text-light text-16r lg:text-18r">
                        집중이사
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <h3 className="text-text-primary text-14m lg:text-16m">
                        주소
                      </h3>
                      <p className="text-text-light text-16r lg:text-18r">
                        서울특별시 서초구 남부순환로335길 35, 3층[303호](서초동)
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <h3 className="text-text-primary text-14m lg:text-16m">
                        사업자등록번호
                      </h3>
                      <p className="text-text-light text-16r lg:text-18r">
                        44133-2021-05361
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <h3 className="text-text-primary text-14m lg:text-16m">
                        법인등록번호
                      </h3>
                      <p className="text-text-light text-16r lg:text-18r">
                        041-418-3114
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        className={`border-b border-border w-full mt-5 mb-[30px] ${
          isOpen ? "md:mt-[60px]" : ""
        } md:mb-10`}
      />
      <h2 className="text-text-primary text-18s md:text-24s mb-10">상세소개</h2>
      <p className="text-18r text-text-secondary">
        안녕하세요 송파구/강동구 중심으로 활동하는 공인중개사 김승연입니다.
        <br /> 1인 가구, 신혼부부, 반려동물과 함께하는 분들까지 각 상황에 맞는
        실거주형 매물을 정성껏 안내해드리고 있어요.
        <br /> 전세/월세 계약 시 주의사항, 건물 컨디션과 주변 인프라 정보, 실제
        주민들의 후기나 체감 정보까지 꼼꼼히 공유해드립니다.
        <br /> 상담하실 때 불필요한 부담 없도록 정확하고 투명한 정보만 드리는
        상담을 지향합니다. <br />집 구하는 일이 두렵거나 막막하셨다면, 저와 함께
        편안하고 든든하게 준비해보세요 궁금하신 건 언제든지 문의주세요!
      </p>
      <div className="border-b border-border w-full mt-5 mb-[30px] md:mt-[60px] md:mb-10" />
      <div className="flex justify-between w-full mb-10">
        <h2 className="text-text-primary text-18s md:text-24s">포토폴리오</h2>
        <BasicBtn
          onClick={() => {
            router.push("/profile/portfolio");
          }}
          text={"전체보기"}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
        {DUMMY_DATA.map((item) => (
          <PortfolioCard
            key={item.id}
            title={item.title}
            date={item.date}
            portfolioId={0}
            onEdit={function (id: number): void {
              throw new Error("Function not implemented.");
            }}
            onDelete={function (id: number): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
