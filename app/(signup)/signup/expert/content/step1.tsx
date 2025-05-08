import { useState, useEffect, useRef } from "react";
import { LargeBtn } from "@/app/components/button/largeBtn";
import { DateInput } from "@/app/components/input/dateInput";
import { InputWithBtn } from "@/app/components/input/inputWithBtn";
import { CustomSelectBox } from "@/app/components/selectBox/customSelectBox";
import { MultiSelectBox } from "@/app/components/selectBox/multiSelectBox";
import { useExpertSignup } from "@/app/context/expertSignupProvider";
import AlertMessage from "@/app/components/alert/alertMessage";
import { EXPERT_CATEGORY, EXPERT_DETAIL_CATEGORY } from "@/app/data/category";
import { verifyBusinessLicense } from "@/app/api/verify/api";

const Step1 = () => {
  const {
    currentStep,
    setCurrentStep,
    businessName,
    setBusinessName,
    expertDetailType,
    setExpertDetailType,
    expertType,
    setExpertType,
    businessLicenseNumber,
    setBusinessLicenseNumber,
    openingDate,
    setOpeningDate,
  } = useExpertSignup();

  const [alertText, setAlertText] = useState<string | null>(null);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const allFieldsFilled =
      businessName.trim() !== "" &&
      expertType.trim() !== "" &&
      expertDetailType.length > 0 &&
      openingDate.trim() !== "" &&
      businessLicenseNumber.trim() !== "" &&
      isVerified;

    setIsNextEnabled(allFieldsFilled);
  }, [
    businessName,
    expertType,
    expertDetailType,
    openingDate,
    businessLicenseNumber,
    isVerified,
  ]);

  const handleSearch = async () => {
    if (!businessName.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=" +
          process.env.NEXT_PUBLIC_ODCLOUD_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bsnm_cmpnm: businessName,
            numOfRows: 10,
            pageNo: 1,
          }),
        }
      );
      const data = await res.json();
      setSearchResults(data.data || []);
    } catch (err) {
      setAlertText("상호명 검색 실패: " + (err as any)?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpeningDateChange = (date: string) => {
    setOpeningDate(date);
  };

  const handleVerify = async () => {
    if (!businessName.trim()) {
      setAlertText("상호명을 선택해주세요.");
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

    if (!businessLicenseNumber.trim()) {
      setAlertText("사업자 등록번호를 입력해주세요.");
      return;
    }

    try {
      const result = await verifyBusinessLicense({
        businessNumber: businessLicenseNumber,
        startDate: openingDate.replace(/-/g, ""),
        ownerName: businessName,
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
    if (!isNextEnabled) {
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-[30px] md:p-10 border border-border w-full md:w-[600px] rounded-[20px]">
      <div className="flex flex-col gap-2.5 relative">
        <h3 className="text-text-primary text-14m md:text-16m">
          사업자 상호 <span className="text-error">*</span>
        </h3>
        <InputWithBtn
          type="search"
          searchValue={businessName}
          onSearchChange={setBusinessName}
          onSearchClick={handleSearch}
          placeholder="사업자 상호명을 검색해주세요."
        />
        {searchResults.length > 0 && (
          <div className="absolute w-full top-full mt-2 max-h-[358px] custom-scrollbar overflow-y-auto border border-background-light rounded-[10px] shadow bg-white z-10">
            {searchResults.map((item, idx) => (
              <div
                key={idx}
                className="group p-3.5 md:p-4 gap-1 hover:bg-main_bg2 cursor-pointer border-b last:border-none"
                onClick={() => {
                  setBusinessName(item.bsnmCmpnm || "");
                  setBusinessLicenseNumber(item.b_no?.replace(/-/g, "") || "");
                  if (item.opn_dt) {
                    const d = item.opn_dt;
                    setOpeningDate(
                      `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}`
                    );
                  }
                  setSearchResults([]);
                }}
              >
                <p className="text-text-primary text-16m md:text-18m group-hover:text-main">
                  {item.bsnmCmpnm} ({item.repr_nm || "대표자 없음"})
                </p>
                <p className="text-text-secondary text-14r md:text-16r">
                  {item.addr || "주소 정보 없음"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          전문분야 <span className="text-error">*</span>
        </h3>
        <CustomSelectBox
          options={EXPERT_CATEGORY}
          value={expertType}
          onChange={setExpertType}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-text-primary text-14m md:text-16m">
          상세분야 <span className="text-error">*</span>
        </h3>
        <MultiSelectBox
          options={EXPERT_DETAIL_CATEGORY}
          value={expertDetailType}
          onChange={setExpertDetailType}
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
        disabled={!isNextEnabled}
      />

      {alertText && (
        <AlertMessage text={alertText} onClose={() => setAlertText(null)} />
      )}
    </div>
  );
};

export default Step1;
