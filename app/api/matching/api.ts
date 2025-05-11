import {
  BrokerListResponse,
  ExpertListResponse,
  FetchBrokerListParams,
  FetchExpertListParams,
} from "@/app/types/api";
import { AGENT_MATCHING, EXPERT_MATCHING } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 중개사 매칭 목록
export const fetchBrokerList = async ({
  page = 1,
  size = 10,
  specializedType = "",
  sortBy = "RECENT",
}: FetchBrokerListParams): Promise<BrokerListResponse> => {
  const params: Record<string, string | number> = {
    page,
    size,
    sortBy,
  };

  if (specializedType) {
    params.specializedType = specializedType;
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
