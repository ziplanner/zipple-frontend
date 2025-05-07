"use client";

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

  businessName: string;
  setBusinessName: (value: string) => void;

  expertDetailType: string[];
  setExpertDetailType: (values: string[]) => void;

  expertType: string;
  setExpertType: (value: string) => void;

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

  terms: TermsState;
  setTerms: Dispatch<SetStateAction<TermsState>>;

  businessLicense: File | null;
  setBusinessLicense: (file: File | null) => void;
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

  const [businessName, setBusinessName] = useState<string>("");
  const [expertDetailType, setExpertDetailType] = useState<string[]>([]);
  const [expertType, setExpertType] = useState<string>("");
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

  const [businessLicense, setBusinessLicense] = useState<File | null>(null);

  return (
    <ExpertSignupContext.Provider
      value={{
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
        businessLicense,
        setBusinessLicense,
      }}
    >
      {children}
    </ExpertSignupContext.Provider>
  );
};
