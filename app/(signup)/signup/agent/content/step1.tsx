"use client";

import { useState, useRef, useEffect } from "react";
import { Chips } from "@/app/components/chips/chips";
import { DateInput } from "@/app/components/input/dateInput";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { LargeBtn } from "@/app/components/button/largeBtn";
import { useAgentSignup } from "@/app/context/agentSignupProvider";
import AlertMessage from "@/app/components/alert/alertMessage";
import axios from "axios";
import { verifyBusinessLicense } from "@/app/api/verify/api";

export interface RealtorSearchResult {
  ldCode: string; // 시군구코드
  ldCodeNm: string; // 시군구명
  jurirno: string; // 등록번호
  bsnmCmpnm: string; // 사업자상호
  brkrNm: string; // 중개업자명
  crqfcNo: string; // 자격증번호
  crqfcAcqdt: string; // 자격증취득일
  ofcpsSeCode: string; // 직위구분코드
  ofcpsSeCodeNm: string; // 직위구분명
  lastUpdtDt: string; // 데이터기준일자
  telNo?: string; // 전화번호
}

const Step1 = () => {
  const {
    currentStep,
    setCurrentStep,
    type,
    setType,
    openingDate,
    setOpeningDate,
    businessLicenseNumber,
    setBusinessLicenseNumber,
    searchValue,
    setSearchValue,
  } = useAgentSignup();
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);

  const [alertText, setAlertText] = useState<string | null>(null);
  const [searchType, setSearchType] = useState("bsnmCmpnm");
  const [realtors, setRealtors] = useState<RealtorSearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [selectedRealtor, setSelectedRealtor] =
    useState<RealtorSearchResult | null>(null);

  const isValid = !!(
    type &&
    searchValue &&
    openingDate &&
    businessLicenseNumber &&
    isVerified
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (pageNumber = 1, isNewSearch = false) => {
    if (loading || (!isNewSearch && !hasMore)) return;
    setLoading(true);
    try {
      const response = await axios.get("/api/broker", {
        params: {
          key: process.env.NEXT_PUBLIC_VWORLD_API_KEY,
          // domain: "https://www.zipple.co.kr/",
          domain: "https://www.zipple.co.kr/",
          pageNo: pageNumber,
          numOfRows: 10,
          ...(searchType === "brkrNm" && { brkrNm: searchValue }),
          ...(searchType === "bsnmCmpnm" && { bsnmCmpnm: searchValue }),
        },
      });

      console.log(response);

      const data = response.data?.EDBrokers;
      const items = data?.field || [];

      if (isNewSearch) {
        setRealtors(items);
      } else {
        setRealtors((prev) => [...prev, ...items]);
      }

      setHasMore(items.length === 10);
      setPage(pageNumber + 1);
    } catch (error) {
      console.error("검색 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          handleSearch(page);
        }
      },
      { threshold: 1 }
    );

    const target = dropdownRef.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [page, hasMore, loading]);

  const handleVerify = async () => {
    if (!selectedRealtor) {
      setAlertText("중개사무소를 선택해주세요.");
      return;
    }
    if (
      !openingDate ||
      openingDate === "Invalid Date" ||
      openingDate === "" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(openingDate)
    ) {
      setAlertText("개업일자를 입력해주세요.");
      return;
    }
    if (!businessLicenseNumber) {
      setAlertText("사업자 등록번호를 입력해주세요.");
      return;
    }

    try {
      const result = await verifyBusinessLicense({
        businessNumber: businessLicenseNumber,
        startDate: openingDate.replace(/-/g, ""),
        ownerName: selectedRealtor.brkrNm,
      });

      if (result.isReal) {
        setAlertText("인증되었습니다!");
        setIsVerified(true);
      } else {
        setAlertText("유효하지 않은 사업자 등록번호입니다.");
        setIsVerified(false);
      }
    } catch (err) {
      setAlertText("인증 요청 실패: " + (err as any)?.message || "");
      setIsVerified(false);
    }
  };

  const handleNext = () => {
    if (!isValid) {
      // setAlertText("모든 필수 항목을 입력해주세요.");
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(event.target as Node)
      ) {
        setRealtors([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-5 px-5 py-[30px] md:p-10 border border-border w-full md:w-[600px] rounded-[20px]">
      {/* 유형 선택 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          유형 <span className="text-error">*</span>
        </h3>
        <Chips
          options={[
            { label: "대표 공인중개사", value: "REPRESENTATIVE" },
            { label: "소속 공인중개사", value: "ASSOCIATE" },
          ]}
          value={type}
          onChange={setType}
        />
      </div>

      {/* 검색 및 드롭다운 */}
      <div className="flex flex-col gap-2.5 relative" ref={dropdownWrapperRef}>
        <h3 className="text-text-primary text-14m md:text-16m">
          중개사무소 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          type="search"
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearchClick={() => {
            setPage(1);
            setHasMore(true);
            setRealtors([]);
            handleSearch(1, true);
          }}
          placeholder="중개사무소 또는 주소를 검색해주세요."
        />
        {/* 검색 드롭다운 */}
        {realtors.length > 0 && (
          <div
            className="absolute w-full top-full mt-2 max-h-[358px] custom-scrollbar overflow-y-auto
          border border-background-light rounded-[10px] shadow bg-white z-10"
          >
            {realtors.map((item, idx) => (
              <div
                key={idx}
                className="group p-3.5 md:p-4 gap-1 hover:bg-main_bg2 cursor-pointer border-b last:border-none"
                onClick={() => {
                  setSearchValue(item.bsnmCmpnm);
                  setRealtors([]); // 드롭다운 닫기
                  setSelectedRealtor(item);
                  // setBusinessLicenseNumber(item.jurirno.replace(/-/g, ""));
                }}
              >
                <p className="text-text-primary text-16m md:text-18m group-hover:text-main">
                  {item.bsnmCmpnm} ({item.brkrNm})
                </p>
                <p className="text-text-secondary text-14r md:text-16r">
                  {item.ldCodeNm}
                </p>
                {/* <p className="text-text-light text-12r">
                  {item.ldCodeNm} {item.jurirno}
                </p> */}
                <p className="text-text-light text-14m md:text-16m">
                  ☎ {item?.telNo || "전화번호 없음"}
                </p>
              </div>
            ))}
            <div
              ref={dropdownRef}
              className="py-2.5 text-center text-sm text-gray-400"
            >
              {loading
                ? "불러오는 중..."
                : hasMore
                ? "스크롤하여 더 보기"
                : "마지막 결과"}
            </div>
          </div>
        )}
      </div>
      {/* 선택한 중개사무소 정보 */}
      {selectedRealtor && (
        <div
          className="bg-background-extraSoft rounded-[10px] p-5 text-14s md:text-16s
        flex flex-col gap-1.5 text-text-secondary"
        >
          <p className="text-text-primary text-16s md:text-18s mb-1.5">
            {selectedRealtor.bsnmCmpnm}
          </p>
          <p>
            중개사등록번호:
            <span className="text-14r md:text-16r">
              &nbsp; {selectedRealtor.jurirno}
            </span>
          </p>
          <p>
            주소:
            <span className="text-14r md:text-16r">
              &nbsp; {selectedRealtor.ldCodeNm}
            </span>
          </p>
          <p>
            전화번호:
            <span className="text-14r md:text-16r">
              &nbsp; {selectedRealtor.telNo || "전화번호 없음"}
            </span>
          </p>
          <p>
            대표자:
            <span className="text-14r md:text-16r">
              &nbsp;{selectedRealtor.brkrNm}
            </span>
          </p>
        </div>
      )}
      {/* 개업일자 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          개업일자 <span className="text-error">*</span>
        </h3>
        <DateInput onChange={setOpeningDate} />
      </div>

      {/* 사업자등록번호 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          사업자등록번호 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          type="text"
          searchValue={businessLicenseNumber}
          onSearchChange={setBusinessLicenseNumber}
          onBtnClick={handleVerify}
          placeholder="사업자등록번호를 입력해주세요. (‘-’ 제외)"
          label="인증"
        />
      </div>

      <LargeBtn
        onClick={handleNext}
        text={"다음"}
        color="black"
        className="mt-[60px]"
        disabled={!isValid}
      />

      {alertText && (
        <AlertMessage text={alertText} onClose={() => setAlertText(null)} />
      )}
    </div>
  );
};

export default Step1;
