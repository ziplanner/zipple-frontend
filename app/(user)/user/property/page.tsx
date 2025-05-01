"use client";

import React, { useState } from "react";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";
import { TABLE } from "@/app/data/table";
import Table from "@/app/components/table/table";
import useResponsive from "@/app/hook/useResponsive";
import TableCard from "@/app/components/card/tableCard";
import { useRole } from "@/app/context/roleContextProvider";
import ReapplicationModal from "@/app/components/modal/reapplicatinoModal";
import AlertMessage from "@/app/components/alert/alertMessage";
import NoticeBar from "@/app/components/bar/noticeBar";

// type RoleType = "GENERAL" | "REPRESENTATION" | "ASSOCIATE" | "EXPERT" | "NONE";

const UserPropertyPage = () => {
  const isLg = useResponsive("lg");
  const { role } = useRole();

  const roleType = role === "ASSOCIATE";

  const [approve, setApprove] = useState<Boolean>(false);
  const [open, setOpen] = useState<Boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);

  return (
    <div
      className={`flex w-full flex-col md:px-8 md:py-10 ${
        approve ? "lg:p-[60px]" : "lg:p-10"
      }`}
    >
      {roleType && !approve && (
        <NoticeBar type={`${submit ? "wait" : "request"}`} clssName={"mb-10"} />
      )}
      <h1 className="text-text-primary text-22s md:text-30s">부동산 정보</h1>
      <div className="border-b border-text-primary w-full mt-5 mb-[30px] md:mt-[30px] md:mb-10" />
      <div className="flex flex-col gap-[30px] lg:gap-10 lg:flex-row justify-between">
        <div className="flex flex-col gap-[30px]">
          <h3 className="md:text-18s lg:text-20s text-secondary">
            {roleType ? "소속" : "내"} 부동산 정보
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

      {/* <div className="w-full bg-background-extraSoft rounded-[10px] border border-line-light mb-3 px-6 py-2.5">
            <div className="flex w-full text-18r text-text-primary justify-between">
              <p className="px-6 py-2.5 ml-9">이름</p>
              <p className="px-6 py-2.5 ml-[100px]">생년월일</p>
              <p className="px-6 py-2.5 ml-[170px]">번호</p>
              <p className="px-6 py-2.5 ml-[142px]">승인 상태</p>
              <p className="px-6 py-2.5 ml-[92px]">소속</p>
            </div>
          </div> */}
      <div className="flex flex-col gap-[30px]">
        {roleType ? (
          <div className="flex flex-col gap-[30px] lg:gap-10 lg:flex-row justify-between">
            <div className="flex flex-col gap-[30px]">
              <h3 className="md:text-18s lg:text-20s text-secondary">
                소속 정보 대표
              </h3>
              <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-text-primary text-14m lg:text-16m">
                    대표 공인중개사
                  </h3>

                  <p className="text-text-light text-16r lg:text-18r">
                    {approve ? (
                      <>
                        홍길동 &nbsp; | &nbsp; 1990.01.01 &nbsp; | &nbsp;
                        010-1234-5678 &nbsp; |
                        <span className="text-main">&nbsp; 승인</span>
                      </>
                    ) : (
                      "소속 정보가 없습니다."
                    )}
                  </p>
                </div>
              </div>
            </div>
            <PrimaryBtn
              onClick={() => {
                setOpen(true);
              }}
              text={`수정 요청`}
              className="self-center lg:self-start"
            />
          </div>
        ) : (
          <>
            <h3 className="md:text-18s lg:text-20s text-secondary">
              공인중개사 관리
            </h3>
            {isLg ? <Table data={TABLE} /> : <TableCard data={TABLE} />}
          </>
        )}
      </div>
      <div className="border-b border-border w-full mt-5 mb-[30px] md:my-10" />
      {open && (
        <ReapplicationModal
          onClose={() => {
            setOpen(false);
          }}
          onSubmit={() => {
            setOpen(false);
            setShowAlert(true);
          }}
        />
      )}
      {showAlert && (
        <AlertMessage
          text="재신청 되었습니다!"
          onClose={() => {
            setSubmit(true);
            setShowAlert(false);
          }}
        />
      )}
    </div>
  );
};

export default UserPropertyPage;
