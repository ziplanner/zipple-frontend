import Image from "next/image";
import footerLogo from "@/app/images/main_logo_gray.svg";
import service from "@/app/images/icon/footer/service_center.svg";
import bar from "@/app/images/icon/footer/bar.svg";

const infoItems = [
  "진앤테크(주)",
  "대표: 오주영",
  "서울특별시 광진구 자양로9길 12",
  "개인정보책임관리자: 오주영",
  "사업자번호: 792-29-01583",
  "통신판매업 신고번호: 제-2024-서울광진-1167호",
  "비즈니스 문의: zipple@kakao.com ",
];

const Footer = () => {
  return (
    <footer className="bg-[#43464C] text-white/70 px-6 md:px-20">
      <div
        className="max-w-screen-xl2 mx-auto py-[60px] flex flex-col md:flex-row
      justify-between gap-12 h-full"
      >
        {/* Left Section */}
        <div className="flex-1">
          <Image
            src={footerLogo}
            alt="ZIPPLE Logo"
            width={100}
            height={22}
            className="md:w-[184px] md:h-10"
          />
          <p className="mt-2.5 text-14m md:text-16m text-text-extralight">
            바쁜 현대인들을 위한, 원스톱 케어 솔루션 ‘집플’
          </p>

          <div className="flex gap-2.5 md:gap-0 items-center mt-5 text-14m md:text-16m">
            <a href="/terms" className="hover:underline">
              이용약관
            </a>
            <Image
              src={bar}
              alt="bar"
              width={1}
              height={10}
              className="mx-2.5 md:block hidden"
            />
            <a
              href="/privacy"
              className="text-skyblue hover:underline text-14s md:text-16s"
            >
              개인정보처리방침
            </a>
          </div>

          <div className="mt-4 space-y-1 text-14r md:text-16r leading-relaxed text-text-extralight">
            <div className="flex flex-wrap items-center mt-4">
              {infoItems.map((item, idx) => (
                <span key={idx} className="flex items-center gap-2.5 md:gap-0">
                  {item}
                  {idx !== infoItems.length - 1 && (
                    <Image
                      src={bar}
                      alt="bar"
                      width={1}
                      height={10}
                      className="mx-2.5"
                    />
                  )}
                </span>
              ))}
            </div>

            <p className="pt-2 text-text-extralight text-14r md:text-16r">
              COPYRIGHT (C) zipple. All Rights Reserved
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start border-t md:border-t-0 md:border-l border-[#5A5A5A] md:pl-6">
          <div className="flex items-center space-x-2 mb-2 text-16s mt-[30px] md:mt-0">
            <span className="flex gap-2 items-center justify-center">
              <Image
                src={service}
                alt="고객센터"
                width={30}
                height={30}
                className="w-[30px] h-[30px]"
              />
              고객센터
            </span>
          </div>
          <p className="text-24b text-sub">02)6925-3400</p>
          <p className="text-14r md:text-16r text-white mt-2 leading-relaxed">
            평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)
            <br />※ 주말/공휴일 일부 서비스 문의 및 상담 가능
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
