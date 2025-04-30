"use client";

import React from "react";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";

const UserPropertyPage = () => {
  return (
    <div className="flex w-full flex-col md:p-[60px]">
      <h1 className="text-text-primary text-22s md:text-30s">부동산 정보</h1>
      <div className="border-b border-text-primary w-full mt-5 mb-[30px] md:mt-[30px] md:mb-10" />
      <div className="flex justify-between">
        <div className="flex flex-col gap-[30px]">
          <h3 className="text-20s text-secondary">내 부동산 정보</h3>
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-16m">상호/대표명</h3>
              <p className="text-text-light text-18r">
                집중공인중개사무소 (오주영)
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-16m">주소</h3>
              <p className="text-text-light text-18r">
                서울특별시 서초구 남부순환로335길 35, 3층[303호](서초동)
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-16m">중개등록번호</h3>
              <p className="text-text-light text-18r">44133-2021-05361</p>
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-16m">전화번호</h3>
              <p className="text-text-light text-18r">041-418-3114</p>
            </div>
          </div>
        </div>
        <PrimaryBtn onClick={() => {}} text={`수정 요청`} />
      </div>
      <div className="border-b border-border w-full mt-5 mb-[30px] md:my-10" />
      <div className="flex flex-col gap-[30px]">
        <h3 className="text-20s text-secondary">공인중개사 관리</h3>
        {/* <div className="w-full bg-background-extraSoft rounded-[10px] border border-line-light mb-3 px-6 py-2.5">
            <div className="flex w-full text-18r text-text-primary justify-between">
              <p className="px-6 py-2.5 ml-9">이름</p>
              <p className="px-6 py-2.5 ml-[100px]">생년월일</p>
              <p className="px-6 py-2.5 ml-[170px]">번호</p>
              <p className="px-6 py-2.5 ml-[142px]">승인 상태</p>
              <p className="px-6 py-2.5 ml-[92px]">소속</p>
            </div>
          </div> */}
        <div className="overflow-x-auto custom-scrollbar rounded-[10px] border border-line-light">
          <table className="min-w-full text-center table-fixed">
            <thead className="bg-background-extraSoft text-text-primary text-18r">
              <tr>
                <th className="px-6 py-2.5 w-[20%]">이름</th>
                <th className="px-6 py-2.5 w-[20%]">생년월일</th>
                <th className="px-6 py-2.5 w-[20%]">번호</th>
                <th className="px-6 py-2.5 w-[20%]">승인 상태</th>
                <th className="px-6 py-2.5 w-[20%]">소속</th>
              </tr>
            </thead>
          </table>

          {/* tbody 분리 + 스크롤 */}
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            <table className="min-w-full text-center table-fixed">
              <tbody className="text-18r text-text-secondary">
                {[
                  {
                    name: "홍길동",
                    birth: "1990.01.01",
                    phone: "010-1234-5678",
                    status: "승인",
                    statusColor: "text-main",
                    affiliation: "소속 해제",
                  },
                  {
                    name: "홍길동",
                    birth: "1990.01.01",
                    phone: "010-1234-5678",
                    status: "미승인",
                    statusColor: "text-text-secondary",
                    affiliation: "소속 해제",
                  },
                  {
                    name: "홍길동",
                    birth: "1990.01.01",
                    phone: "010-1234-5678",
                    status: "보류",
                    statusColor: "text-error",
                    affiliation: "소속 해제",
                  },
                  {
                    name: "홍길동",
                    birth: "1990.01.01",
                    phone: "010-1234-5678",
                    status: "승인대기",
                    statusColor: "text-text-primary",
                    affiliation: "소속 해제",
                  },
                  {
                    name: "홍길동",
                    birth: "1990.01.01",
                    phone: "010-1234-5678",
                    status: "승인",
                    statusColor: "text-main",
                    affiliation: "소속 해제",
                  },
                  {
                    name: "홍길동",
                    birth: "1990.01.01",
                    phone: "010-1234-5678",
                    status: "미승인",
                    statusColor: "text-text-secondary",
                    affiliation: "소속 해제",
                  },
                  {
                    name: "홍길동",
                    birth: "1990.01.01",
                    phone: "010-1234-5678",
                    status: "보류",
                    statusColor: "text-error",
                    affiliation: "소속 해제",
                  },
                  {
                    name: "홍길동",
                    birth: "1990.01.01",
                    phone: "010-1234-5678",
                    status: "승인대기",
                    statusColor: "text-text-primary",
                    affiliation: "소속 해제",
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="">
                    <td className="px-6 py-4 w-[20%]">{row.name}</td>
                    <td className="px-6 py-4 w-[20%]">{row.birth}</td>
                    <td className="px-6 py-4 w-[20%]">{row.phone}</td>
                    <td className={`px-6 py-4 w-[20%] ${row.statusColor}`}>
                      {row.status}
                    </td>
                    <td
                      className="px-6 py-4 w-[20%] underline cursor-pointer"
                      onClick={() => {
                        alert("소속 해제");
                      }}
                    >
                      {row.affiliation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="border-b border-border w-full mt-5 mb-[30px] md:my-10" />
    </div>
  );
};

export default UserPropertyPage;
