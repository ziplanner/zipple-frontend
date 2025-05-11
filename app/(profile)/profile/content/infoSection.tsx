import { useEffect, useState } from "react";
import Image from "next/image";
import InfoCard from "@/app/components/card/infoCard";
import vector from "@/app/images/icon/round_vector.svg";
import { BasicBtn } from "@/app/components/button/basicBtn";
import { PortfolioCard } from "@/app/components/card/portfolioCard";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { BrokerDetailResponse } from "@/app/types/api";
import { fetchBrokerDetail } from "@/app/api/matching/api";

const InfoSection = () => {
  const router = useRouter();
  const params = useSearchParams();
  const brokerId = Number(params.get("id"));

  const [data, setData] = useState<BrokerDetailResponse | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!brokerId) return;

    const load = async () => {
      try {
        const res = await fetchBrokerDetail(brokerId);
        setData(res);
      } catch (e) {
        console.error("중개사 상세 조회 실패", e);
      }
    };

    load();
  }, [brokerId]);

  return (
    <div className="flex w-full flex-col md:px-8 md:py-10 lg:px-[60px] lg:py-20">
      <h1 className="text-24s md:text-36s text-text-primary mb-[30px] md:mb-10">
        안녕하세요. {data?.representativeName ?? "중개사"} 중개사입니다.
      </h1>
      <div className="flex flex-col lg:flex-row w-full gap-2.5 lg:gap-5 justify-evenly mb-10 md:mb-[60px]">
        <InfoCard type="link" text={data?.introduceUrl || "링크 없음"} />
        <InfoCard type="office" text={data?.specializedType || "미지정"} />
        <InfoCard
          type="ping"
          text={
            [
              ...(data?.representativeArea ?? []),
              ...(data?.additionalArea ?? []),
            ].join(", ") || "지역 정보 없음"
          }
        />
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
                        {data?.businessName ?? "집중이사"}
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
      <p className="text-18r text-text-secondary whitespace-pre-line">
        {data?.introduceContent || "소개 내용이 없습니다."}
      </p>
      <div className="border-b border-border w-full mt-5 mb-[30px] md:mt-[60px] md:mb-10" />
      <div className="flex justify-between w-full mb-10">
        <h2 className="text-text-primary text-18s md:text-24s">포트폴리오</h2>
        <BasicBtn
          onClick={() => {
            router.push("/profile/portfolio");
          }}
          text={"전체보기"}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
        {data?.portfolios.length ? (
          data.portfolios.map((item, index) => (
            <PortfolioCard
              key={index}
              title={item.title || `포트폴리오 ${index + 1}`}
              date={item.date || "날짜 없음"}
              portfolioId={item.portfolioId || 0}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))
        ) : (
          <p className="text-text-secondary col-span-2 lg:col-span-3">
            등록된 포트폴리오가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoSection;
