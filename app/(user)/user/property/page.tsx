"use client";

import React from "react";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";
import { TABLE } from "@/app/data/table";
import Table from "@/app/components/table/table";
import useResponsive from "@/app/hook/useResponsive";
import TableCard from "@/app/components/card/tableCard";

const UserPropertyPage = () => {
  const isLg = useResponsive("lg");

  return (
    <div className="flex w-full flex-col md:px-8 md:py-10 lg:p-[60px]">
      <h1 className="text-text-primary text-22s md:text-30s">부동산 정보</h1>
      <div className="border-b border-text-primary w-full mt-5 mb-[30px] md:mt-[30px] md:mb-10" />
      <div className="flex flex-col gap-[30px] lg:gap-10 lg:flex-row justify-between">
        <div className="flex flex-col gap-[30px]">
          <h3 className="md:text-18s lg:text-20s text-secondary">
            내 부동산 정보
          </h3>
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m lg:text-16m">
                상호/대표명
              </h3>
              <p className="text-text-light text-16r lg:text-18r">
                집중공인중개사무소 (오주영)
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m lg:text-16m">주소</h3>
              <p className="text-text-light text-16r lg:text-18r">
                서울특별시 서초구 남부순환로335길 35, 3층[303호](서초동)
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m lg:text-16m">
                중개등록번호
              </h3>
              <p className="text-text-light text-16r lg:text-18r">
                44133-2021-05361
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-14m lg:text-16m">
                전화번호
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
      <div className="flex flex-col gap-[30px]">
        <h3 className="md:text-18s lg:text-20s text-secondary">
          공인중개사 관리
        </h3>
        {/* <div className="w-full bg-background-extraSoft rounded-[10px] border border-line-light mb-3 px-6 py-2.5">
            <div className="flex w-full text-18r text-text-primary justify-between">
              <p className="px-6 py-2.5 ml-9">이름</p>
              <p className="px-6 py-2.5 ml-[100px]">생년월일</p>
              <p className="px-6 py-2.5 ml-[170px]">번호</p>
              <p className="px-6 py-2.5 ml-[142px]">승인 상태</p>
              <p className="px-6 py-2.5 ml-[92px]">소속</p>
            </div>
          </div> */}

        {isLg ? <Table data={TABLE} /> : <TableCard data={TABLE} />}
      </div>

      <div className="border-b border-border w-full mt-5 mb-[30px] md:my-10" />
    </div>
  );
};

export default UserPropertyPage;
