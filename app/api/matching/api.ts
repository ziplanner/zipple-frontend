import {
  BrokerDetailResponse,
  BrokerListResponse,
  BrokerMenuDetailResponse,
  ExpertListResponse,
  FetchBrokerListParams,
  FetchExpertListParams,
} from "@/app/types/api";
import {
  AGENT_DETAIL,
  AGENT_MATCHING,
  EXPERT_MATCHING,
  LIKES,
} from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 중개사 매칭 목록
export const fetchBrokerList = async ({
  page = 1,
  size = 10,
  specializedType = "",
  sortBy = "RECENT",
  area = [],
}: FetchBrokerListParams): Promise<BrokerListResponse> => {
  const params: Record<string, string | number | string[]> = {
    page,
    size,
    sortBy,
  };

  if (specializedType) {
    params.specializedType = specializedType;
  }

  if (area.length > 0) {
    params.area = area;
  }

  const res = await axiosInstance.get<BrokerListResponse>(AGENT_MATCHING, {
    params,
  });

  return res.data;
};

// 생활 전문가 매칭 목록
export const fetchExpertList = async ({
  page = 1,
  size = 10,
  specializedType = "",
  sortBy = "RECENT",
}: FetchExpertListParams): Promise<ExpertListResponse> => {
  const params: Record<string, string | number> = {
    page,
    size,
    sortBy,
  };

  if (specializedType) {
    params.specializedType = specializedType;
  }

  const res = await axiosInstance.get<ExpertListResponse>(EXPERT_MATCHING, {
    params,
  });

  return res.data;
};

// 중개사 상세 조회
export const fetchBrokerDetail = async (
  brokerId: number
): Promise<BrokerDetailResponse> => {
  const res = await axiosInstance.get<BrokerDetailResponse>(
    `${AGENT_DETAIL}/${brokerId}`
  );
  return res.data;
};

// 중개사 상세 메뉴 조회
export const fetchBrokerMenuDetail = async (
  brokerId: number
): Promise<BrokerMenuDetailResponse> => {
  const res = await axiosInstance.get<BrokerMenuDetailResponse>(
    `${AGENT_DETAIL}/${brokerId}/lnb`
  );
  return res.data;
};

// 좋아요 누르기
export const likeReceiver = async (receiverId: number): Promise<void> => {
  await axiosInstance.post(`${LIKES}/${receiverId}`);
};

// 좋아요 해제하기
export const unlikeReceiver = async (receiverId: number): Promise<void> => {
  await axiosInstance.delete(`${LIKES}/${receiverId}`);
};
