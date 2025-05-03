import Image from "next/image";
import InfoCard from "@/app/components/card/infoCard";
import vector from "@/app/images/icon/round_vector.svg";

const PortfolioSection = () => {
  return (
    <div>
      <h1 className="text-36s text-text-primary mb-10 ">
        안녕하세요. 홍길동 중개사입니다.
      </h1>
      <div className="flex w-full gap-5 justify-evenly">
        <InfoCard type={"link"} text={"www.zipple.co.kr"} />
        <InfoCard type={"office"} text={"아파트"} />
        <InfoCard type={"ping"} text={"강남구, 강동구, 성동구, 연수구"} />
      </div>
      <div>
        <div className="flex justify-between w-full">
          <h2 className="text-text-primary text-24s mb-10">부동산 등록정보</h2>
          <Image src={vector} alt={"vector"} width={30} height={30} />
        </div>

        <div className="flex flex-col gap-[30px] lg:gap-10 lg:flex-row justify-between">
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
              <div className="flex flex-col gap-2.5">
                <h3 className="text-text-primary text-14m lg:text-16m">
                  상호명
                </h3>
                <p className="text-text-light text-16r lg:text-18r">집중이사</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-text-primary text-14m lg:text-16m">주소</h3>
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
      </div>
      <div className="border-b border-border w-full mt-5 mb-[30px] md:mt-[60px] md:mb-10" />
      <h2 className="text-text-primary text-24s mb-10">상세소개</h2>
      <div className="border-b border-border w-full mt-5 mb-[30px] md:mt-[60px] md:mb-10" />
    </div>
  );
};

export default PortfolioSection;
