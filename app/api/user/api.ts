import {
  MYPAGE_ASSOCIATE,
  MYPAGE_EXPERT,
  MYPAGE_GENERAL,
  MYPAGE_REPRESENTATIVE,
} from "../apiUrl";
import axiosInstance from "../axiosInstance";

interface GeneralUserResponse {
  nickname: string;
  phoneNumber: string;
  address: string;
  houseType: string;
  mainEmail: string;
}

interface GeneralUserRequest {
  nickname: string;
  phoneNumber: string;
  address: string;
  houseType: string;
  mainEmail: string;
}

interface RepresentativeUserResponse {
  phoneNumber: string;
  mainEmail: string;
  introduceUrl: string;
  representativeArea: string;
  additionalArea: string;
  introduceTitle: string;
  introduceContent: string;
  specializedType: string;
}

interface RepresentativeUserRequest {
  phoneNumber: string;
  mainEmail: string;
  introduceUrl: string;
  representativeArea: string[];
  additionalArea: string[];
  introduceTitle: string;
  introduceContent: string;
}

interface AssociateUserRequest {
  phoneNumber: string;
  mainEmail: string;
  introduceUrl: string;
  introduceTitle: string;
  introduceContent: string;
}

interface AssociateUserResponse {
  phoneNumber: string;
  mainEmail: string;
  introduceUrl: string;
  introduceTitle: string;
  introduceContent: string;
  specializedType: string;
}

interface ExpertUserRequest {
  phoneNumber: string;
  mainEmail: string;
  introduceTitle: string;
  introduceContent: string;
}

interface ExpertUserResponse {
  phoneNumber: string;
  mainEmail: string;
  introduceTitle: string;
  introduceContent: string;
  expertType: string;
  expertDetail: string[];
}

// 일반 회원정보 조회
export const getGeneralUserRole = async (): Promise<GeneralUserResponse> => {
  const response = await axiosInstance.get(MYPAGE_GENERAL);
  return response.data;
};

// 일반 회원정보 수정
export const updateGeneralUserRole = async (
  data: GeneralUserRequest
): Promise<void> => {
  await axiosInstance.put(MYPAGE_GENERAL, data);
};

// 대표 회원정보 조회
export const getRepUserRole = async (): Promise<RepresentativeUserResponse> => {
  const response = await axiosInstance.get(MYPAGE_REPRESENTATIVE);
  return response.data;
};

// 대표 회원정보 수정
export const updateRepUserRole = async (
  data: RepresentativeUserRequest
): Promise<void> => {
  await axiosInstance.put(MYPAGE_REPRESENTATIVE, data);
};

// 소속 회원정보 조회
export const getAssociateUserRole =
  async (): Promise<AssociateUserResponse> => {
    const response = await axiosInstance.get(MYPAGE_ASSOCIATE);
    return response.data;
  };

// 소속 회원정보 조회
export const updateAssociateUserRole = async (
  data: AssociateUserRequest
): Promise<void> => {
  await axiosInstance.put(MYPAGE_ASSOCIATE, data);
};

// 생활전문가 회원정보 조회
export const getExpertUserRole = async (): Promise<ExpertUserResponse> => {
  const response = await axiosInstance.get(MYPAGE_EXPERT);
  return response.data;
};

// 생활전문가 회원정보 수정
export const updateExpertUserRole = async (
  data: ExpertUserRequest
): Promise<void> => {
  await axiosInstance.put(MYPAGE_EXPERT, data);
};
