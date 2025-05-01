"use client";

import React from "react";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";

const UserBusinessPage = () => {
  return (
    <div className="flex w-full flex-col md:px-8 md:py-10 lg:p-[60px]">
      <h1 className="text-text-primary text-22s md:text-30s">사업자 정보</h1>
      <div className="border-b border-text-primary w-full mt-5 mb-[30px] md:mt-[30px] md:mb-10" />
      <div className="flex flex-col gap-[30px] lg:gap-10 lg:flex-row justify-between">
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m lg:text-16m">상호명</h3>
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
        <PrimaryBtn
          onClick={() => {}}
          text={`수정 요청`}
          className="self-center lg:self-start"
        />
      </div>
      <div className="border-b border-border w-full mt-5 mb-[30px] md:my-10" />
    </div>
  );
};

export default UserBusinessPage;
