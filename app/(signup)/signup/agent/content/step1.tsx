"use client";

import { Chips } from "@/app/components/chips/chips";
import { DateInput } from "@/app/components/input/dateInput";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { LargeBtn } from "@/app/components/button/largeBtn";
import { useAgentSignup } from "@/app/context/agentSignupProvider";

const Step1 = () => {
  const {
    currentStep,
    setCurrentStep,
    type,
    setType,
    openingDate,
    setOpeningDate,
    businessNumber,
    setBusinessNumber,
    searchValue,
    setSearchValue,
  } = useAgentSignup();

  const handleSearch = () => {
    console.log("검색 클릭:", searchValue);
    // 검색 로직 추가
  };

  const handleOpeningDateChange = (date: string) => {
    setOpeningDate(date);
    console.log("개업일자 선택:", date);
  };

  const handleBusinessNumberChange = (value: string) => {
    setBusinessNumber(value);
  };

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-[30px] md:p-10 border border-border w-full md:w-[600px] rounded-[20px]">
      {/* 유형 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          유형 <span className="text-error">*</span>
        </h3>
        <Chips
          options={[
            { label: "대표 공인중개사", value: "REPRESENTATION" },
            { label: "소속 공인중개사", value: "ASSOCIATE" },
          ]}
          value={type}
          onChange={setType}
        />
      </div>

      {/* 중개사무소 검색 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          중개사무소 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          type="search"
          searchValue={searchValue}
          onSearchChange={handleSearchValueChange}
          onSearchClick={handleSearch}
          placeholder="중개사무소 또는 주소를 검색해주세요."
        />
      </div>

      {/* 개업일자 선택 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          개업일자 <span className="text-error">*</span>
        </h3>
        <DateInput onChange={handleOpeningDateChange} />
      </div>

      {/* 사업자등록번호 입력 */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          사업자등록번호 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          type="text"
          searchValue={businessNumber}
          onSearchChange={handleBusinessNumberChange}
          onBtnClick={() => {
            console.log("사업자등록번호 인증 클릭");
          }}
          placeholder="사업자등록번호를 입력해주세요. (‘-’ 제외)"
          label="인증"
        />
      </div>

      {/* 다음 버튼 */}
      <LargeBtn
        onClick={handleNext}
        text={"다음"}
        color="black"
        className="mt-[60px]"
      />
    </div>
  );
};

export default Step1;
