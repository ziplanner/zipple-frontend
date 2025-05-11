export interface BrokerResponse {
  brokerId: number;
  profileImage: string;
  specializedType: string;
  portfolioCount: number;
  likesCount: number;
  isLiked: boolean;
  name: string;
  businessName: string;
  introduceTitle: string;
  introduceContent: string;
  representativeArea: string[];
}

export interface BrokerListResponse {
  portfolios: BrokerResponse[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  isLast: boolean;
}

export interface FetchBrokerListParams {
  page?: number;
  size?: number;
  specializedType?: string;
  sortBy?: string;
}

export interface ExpertResponse {
  expertId: number;
  profileImage: string;
  expertType: string;
  expertDetailType: string[];
  portfolioCount: number;
  likesCount: number;
  isLiked: boolean;
  name: string;
  businessName: string;
  introduceTitle: string;
  introduceContent: string;
}

export interface ExpertListResponse {
  portfolios: ExpertResponse[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  isLast: boolean;
}

export interface FetchExpertListParams {
  page?: number;
  size?: number;
  specializedType?: string;
  sortBy?: "RECENT" | "PORTFOLIO_COUNT" | "POPULAR";
}

export interface BrokerDetailResponse {
  name: string;
  introduceUrl: string;
  specializedType: string;
  representativeArea: string[];
  additionalArea: string[];
  businessName: string;
  representativeName: string;
  phoneNumber: string;
  introduceContent: string;
  portfolios: any[]; // 포트폴리오 타입 정의 시 교체
  totalElements: number;
  totalPages: number;
  currentPage: number;
  isLast: boolean;
}

export interface BrokerMenuDetailResponse {
  userId: number;
  roleName: "GENERAL" | "REPRESENTATIVE" | "ASSOCIATE" | "EXPERT";
  nickname: string;
  profileUrl: string;
  phoneNumber: string;
  likesCount: number;
}
