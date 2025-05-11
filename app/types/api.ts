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
