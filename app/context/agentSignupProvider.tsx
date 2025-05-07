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

  businessLicenseNumber: string;
  setBusinessLicenseNumber: (value: string) => void;

  openingDate: string;
  setOpeningDate: (value: string) => void;

  name: string;
  setName: (value: string) => void;

  birthday: string;
  setBirthday: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  phoneNumber: string;
  setPhoneNumber: (value: string) => void;

  foreigner: string;
  setForeigner: (value: string) => void;

  profileImage: string;
  setProfileImage: (value: string) => void;

  specializedType: string;
  setSpecializedType: (value: string) => void;

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

  const [type, setType] = useState<string>("REPRESENTATION");
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [businessLicenseNumber, setBusinessLicenseNumber] =
    useState<string>("");
  const [openingDate, setOpeningDate] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [foreigner, setForeigner] = useState<string>("L");
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

  const [specializedType, setSpecializedType] = useState<string>("");
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
        businessLicenseNumber,
        setBusinessLicenseNumber,
        openingDate,
        setOpeningDate,
        name,
        setName,
        birthday,
        setBirthday,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        foreigner,
        setForeigner,
        profileImage,
        setProfileImage,
        terms,
        setTerms,
        businessRegistrationFile,
        setBusinessRegistrationFile,
        brokerageLicenseFile,
        setBrokerageLicenseFile,
        specializedType,
        setSpecializedType,
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
