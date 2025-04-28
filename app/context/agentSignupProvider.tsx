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

  type: string;
  setType: (value: string) => void;

  searchValue: string;
  setSearchValue: (value: string) => void;

  checkedValues: string[];
  setCheckedValues: (values: string[]) => void;

  businessNumber: string;
  setBusinessNumber: (value: string) => void;

  openingDate: string;
  setOpeningDate: (value: string) => void;

  name: string;
  setName: (value: string) => void;

  birth: string;
  setBirth: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  nationality: string;
  setNationality: (value: string) => void;

  profileImage: string;
  setProfileImage: (value: string) => void;

  selectedSpecialty: string;
  setSelectedSpecialty: (value: string) => void;

  terms: TermsState;
  setTerms: Dispatch<SetStateAction<TermsState>>;

  businessRegistrationFileName: string;
  setBusinessRegistrationFileName: (value: string) => void;

  brokerageLicenseFileName: string;
  setBrokerageLicenseFileName: (value: string) => void;

  businessRegistrationFile: File | null;
  setBusinessRegistrationFile: (file: File | null) => void;

  brokerageLicenseFile: File | null;
  setBrokerageLicenseFile: (file: File | null) => void;
}

const AgentSignupContext = createContext<SignupContextType | undefined>(
  undefined
);

export const useAgentSignup = () => {
  const context = useContext(AgentSignupContext);
  if (!context) {
    throw new Error("useAgentSignup must be used within a AgentSignupProvider");
  }
  return context;
};

interface SignupProviderProps {
  children: ReactNode;
}

export const AgentSignupProvider: React.FC<SignupProviderProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [type, setType] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>(""); // 사업자 상호 검색값
  const [checkedValues, setCheckedValues] = useState<string[]>([]); // 상세분야 체크된 값들
  const [businessNumber, setBusinessNumber] = useState<string>(""); // 사업자등록번호 값
  const [openingDate, setOpeningDate] = useState<string>(""); // 개업일자 값

  const [name, setName] = useState<string>(""); // 이름
  const [birth, setBirth] = useState<string>(""); // 생년월일
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

  const [businessRegistrationFile, setBusinessRegistrationFile] =
    useState<File | null>(null);
  const [brokerageLicenseFile, setBrokerageLicenseFile] = useState<File | null>(
    null
  );

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(""); // 전문분야
  const [businessRegistrationFileName, setBusinessRegistrationFileName] =
    useState<string>("");
  const [brokerageLicenseFileName, setBrokerageLicenseFileName] =
    useState<string>("");

  return (
    <AgentSignupContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        type,
        setType,
        searchValue,
        setSearchValue,
        checkedValues,
        setCheckedValues,
        businessNumber,
        setBusinessNumber,
        openingDate,
        setOpeningDate,
        name,
        setName,
        birth,
        setBirth,
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
        businessRegistrationFile,
        setBusinessRegistrationFile,
        brokerageLicenseFile,
        setBrokerageLicenseFile,
        selectedSpecialty,
        setSelectedSpecialty,
        businessRegistrationFileName,
        setBusinessRegistrationFileName,
        brokerageLicenseFileName,
        setBrokerageLicenseFileName,
      }}
    >
      {children}
    </AgentSignupContext.Provider>
  );
};
