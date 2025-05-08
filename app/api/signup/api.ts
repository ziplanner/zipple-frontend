import axiosInstance from "@/app/api/axiosInstance";
import {
  REGISTER_ASSOCIATE,
  REGISTER_EXPERT,
  REGISTER_GENERAL,
  REGISTER_REPRESENTATIVE,
} from "../apiUrl";

export interface RegisterGeneralUserPayload {
  name: string;
  phoneNumber: string;
  address: string;
  housingType: string;
  mainEmail?: string;
  requiredConsent: boolean;
  marketing: boolean;
}

export interface RegisterExpertRequest {
  name: string;
  birthday: string;
  email: string;
  foreigner: string;
  phoneNumber: string;
  businessName: string;
  businessLicenseNumber: string;
  openingDate: string;
  expertType: string;
  expertDetailType: string[];
  requiredConsent: boolean;
  marketing: boolean;
}

interface AssociateRegisterRequest {
  name: string;
  birthday: string;
  email: string;
  foreigner: string;
  businessName: string;
  phoneNumber: string;
  businessLicenseNumber: string;
  openingDate: string;
  specializedType: string;
  requiredConsent: boolean;
  marketing: boolean;
}

interface RepresentativeRegisterRequest {
  name: string;
  birthday: string;
  email: string;
  foreigner: string;
  phoneNumber: string;
  representativePhoneNumber: string;
  businessName: string;
  businessLicenseNumber: string;
  openingDate: string;
  specializedType: string;
  requiredConsent: boolean;
  marketing: boolean;
}

// 일반 회원가입
export const registerGeneralUser = async (data: RegisterGeneralUserPayload) => {
  const response = await axiosInstance.post(REGISTER_GENERAL, data);
  return response.data;
};

// 생활 전문가 회원가입
export const registerExpertUser = async (
  registerRequest: RegisterExpertRequest,
  businessLicense: File,
  profileImage: File
) => {
  const formData = new FormData();

  formData.append("registerRequest", JSON.stringify(registerRequest));
  formData.append("businessLicense", businessLicense);
  formData.append("profileImage", profileImage);

  const response = await axiosInstance.post(REGISTER_EXPERT, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 소속 중개사 회원가입
export const registerAssociateUser = async (
  data: AssociateRegisterRequest,
  agentLicense: File,
  profileImage: File
) => {
  const formData = new FormData();
  formData.append(
    "registerRequest",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
  formData.append("agentLicense", agentLicense);
  formData.append("profileImage", profileImage);

  const response = await axiosInstance.post(REGISTER_ASSOCIATE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// 대표 중개사 회원가입
export const registerRepresentativeUser = async (
  data: RepresentativeRegisterRequest,
  businessLicense: File,
  brokerLicense: File,
  profileImage: File
) => {
  const formData = new FormData();
  formData.append(
    "registerRequest",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
  formData.append("businessLicense", businessLicense);
  formData.append("brokerLicense", brokerLicense);
  formData.append("profileImage", profileImage);

  const response = await axiosInstance.post(REGISTER_REPRESENTATIVE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
