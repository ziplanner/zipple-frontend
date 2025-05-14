"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import vector from "@/app/images/icon/round_vector.svg";

const CarouselSection = () => {
  const [current, setCurrent] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(780); // 초기값은 최대 사이즈

  const cards = [0, 1, 2, 3, 4];
  const GAP = 16;

  useEffect(() => {
    const updateSizes = () => {
      if (wrapperRef.current) setWrapperWidth(wrapperRef.current.clientWidth);
      if (cardRef.current) setCardWidth(cardRef.current.clientWidth);
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  // offset: 현재 카드가 중앙에 오게 이동
  const offset = (cardWidth + GAP) * current - (wrapperWidth - cardWidth) / 2;

  return (
    <div
      className="w-full py-20 md:py-[120px] relative overflow-hidden"
      ref={wrapperRef}
    >
      {/* 왼쪽 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -translate-y-1/2 z-10"
        style={{
          left: `${(wrapperWidth - cardWidth) / 2 - GAP / 2}px`,
        }}
      >
        <Image
          src={vector}
          alt="prev"
          width={40}
          height={40}
          className="rotate-[270deg]"
        />
      </button>

      {/* 오른쪽 버튼 */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 -translate-y-1/2 z-10"
        style={{
          right: `${(wrapperWidth - cardWidth) / 2 - GAP / 2}px`,
        }}
      >
        <Image
          src={vector}
          alt="next"
          width={40}
          height={40}
          className="rotate-90"
        />
      </button>

      {/* 슬라이더 */}
      <div className="overflow-hidden w-full">
        <div
          className="flex w-fit transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${offset}px)`,
          }}
        >
          {cards.map((item, index) => (
            <div
              key={item}
              ref={index === 0 ? cardRef : null} // 첫 번째 카드 기준으로 width 측정
              className="
                w-[240px] h-[360px]
                md:w-[780px] md:h-[320px]
                bg-main_bg rounded-xl flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;
