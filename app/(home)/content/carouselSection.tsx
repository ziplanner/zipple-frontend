"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import vector from "@/app/images/icon/round_vector.svg";

const CarouselSection = () => {
  const [current, setCurrent] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  const cards = [0, 1, 2, 3, 4];
  const CARD_WIDTH = 780;
  const GAP = 16;

  useEffect(() => {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.clientWidth);
    }

    // 반응형 대응
    const handleResize = () => {
      if (wrapperRef.current) {
        setWrapperWidth(wrapperRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  // 슬라이더 이동 계산
  const offset = (CARD_WIDTH + GAP) * current - (wrapperWidth - CARD_WIDTH) / 2;

  return (
    <div
      className="w-full py-20 md:py-[120px] relative overflow-hidden"
      ref={wrapperRef}
    >
      {/* 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -translate-y-1/2 z-10"
        style={{
          left: `${(wrapperWidth - CARD_WIDTH) / 2 - GAP / 2}px`,
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

      <button
        onClick={handleNext}
        className="absolute top-1/2 -translate-y-1/2 z-10"
        style={{
          right: `${(wrapperWidth - CARD_WIDTH) / 2 - GAP / 2}px`,
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
          {cards.map((item) => (
            <div
              key={item}
              className="w-[780px] h-[320px] bg-main_bg rounded-xl flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;
