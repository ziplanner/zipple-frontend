import { LargeBtn } from "@/app/components/button/largeBtn";
import { DateInput } from "@/app/components/input/dateInput";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";
import { MultiSelectBox } from "@/app/components/selectBox/multiSelectBox";
import { useExpertSignup } from "@/app/context/expertSignupProvider";

const Step1 = () => {
  const {
    currentStep,
    setCurrentStep,
    searchValue,
    setSearchValue,
    checkedValues,
    setCheckedValues,
    customSelect,
    setCustomSelect,
    businessNumber,
    setBusinessNumber,
    openingDate,
    setOpeningDate,
  } = useExpertSignup();

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
  };

  const handleBusinessNumberChange = (value: string) => {
    setBusinessNumber(value);
  };

  const handleOpeningDateChange = (date: string) => {
    setOpeningDate(date);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-[30px] md:p-10 border border-border w-full md:w-[600px] rounded-[20px]">
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          사업자 상호 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          type="search"
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearchClick={handleSearch}
          placeholder="사업자 상호명을 검색해주세요."
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          전문분야 <span className="text-error">*</span>
        </h3>
        <CustomSelectBox
          options={["선택 1", "선택 2", "선택 3"]}
          value={customSelect}
          onChange={setCustomSelect}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          상세분야 <span className="text-error">*</span>
        </h3>
        <MultiSelectBox
          options={[
            {
              label: "가정 이사 (20평 이상)",
              value: "가정 이사",
              disabled: true,
            },
            { label: "원룸/소형 이사", value: "원룸/소형 이사" },
            { label: "사무실 이사", value: "사무실 이사" },
            { label: "해외 이사", value: "해외 이사", disabled: true },
          ]}
          value={checkedValues}
          onChange={setCheckedValues}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          개업일자 <span className="text-error">*</span>
        </h3>
        <DateInput onChange={handleOpeningDateChange} />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          사업자등록번호 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          type="text"
          onBtnClick={() => {}}
          placeholder="사업자등록번호를 입력해주세요. (‘-’ 제외)"
          label="인증"
          searchValue={businessNumber}
          onSearchChange={handleBusinessNumberChange}
        />
      </div>
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
