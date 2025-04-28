import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import defaultProfile from "@/app/images/icon/default_profile.svg";

interface TermsState {
  all: boolean;
  service: boolean;
  privacy: boolean;
  policy: boolean;
  age: boolean;
  marketing: boolean;
}

interface SignupContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;

  searchValue: string;
  setSearchValue: (value: string) => void;

  checkedValues: string[];
  setCheckedValues: (values: string[]) => void;

  customSelect: string;
  setCustomSelect: (value: string) => void;

  businessNumber: string;
  setBusinessNumber: (value: string) => void;

  openingDate: string;
  setOpeningDate: (value: string) => void;

  name: string;
  setName: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  nationality: string;
  setNationality: (value: string) => void;

  profileImage: string;
  setProfileImage: (value: string) => void;

  terms: TermsState;
  setTerms: Dispatch<SetStateAction<TermsState>>;

  businessFile: File | null;
  setBusinessFile: (file: File | null) => void;
}

const ExpertSignupContext = createContext<SignupContextType | undefined>(
  undefined
);

export const useExpertSignup = () => {
  const context = useContext(ExpertSignupContext);
  if (!context) {
    throw new Error(
      "useExpertSignup must be used within a ExpertSignupProvider"
    );
  }
  return context;
};

interface SignupProviderProps {
  children: ReactNode;
}

export const ExpertSignupProvider: React.FC<SignupProviderProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [searchValue, setSearchValue] = useState<string>(""); // 사업자 상호 검색값
  const [checkedValues, setCheckedValues] = useState<string[]>([]); // 상세분야 체크된 값들
  const [customSelect, setCustomSelect] = useState<string>(""); // 전문분야 선택값
  const [businessNumber, setBusinessNumber] = useState<string>(""); // 사업자등록번호 값
  const [openingDate, setOpeningDate] = useState<string>(""); // 개업일자 값

  const [name, setName] = useState<string>(""); // 이름
  const [email, setEmail] = useState<string>(""); // 이메일
  const [phone, setPhone] = useState<string>(""); // 전화번호
  const [nationality, setNationality] = useState<string>("내국인"); // 국적
  const [profileImage, setProfileImage] = useState<string>(defaultProfile);

  const [terms, setTerms] = useState<TermsState>({
    all: false,
    service: false,
    privacy: false,
    policy: false,
    age: false,
    marketing: false,
  });

  const [businessFile, setBusinessFile] = useState<File | null>(null);

  return (
    <ExpertSignupContext.Provider
      value={{
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
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
        nationality,
        setNationality,
        profileImage,
        setProfileImage,
        terms,
        setTerms,
        businessFile,
        setBusinessFile,
      }}
    >
      {children}
    </ExpertSignupContext.Provider>
  );
};
