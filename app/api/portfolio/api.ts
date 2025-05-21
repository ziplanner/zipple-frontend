import { MYPAGE_PORTFOLIO } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 포트폴리오 생성
export const createPortfolio = async (
  images: File,
  title: string,
  url: string
) => {
  const formData = new FormData();

  formData.append("portfolioImages", images);
  formData.append("portfolioTitle", title);
  formData.append("portfolioUrl", url);

  const res = await axiosInstance.post(MYPAGE_PORTFOLIO, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// 포트폴리오 수정
export const updatePortfolio = async (
  portfolioId: number,
  images: File,
  title: string,
  url: string
) => {
  const formData = new FormData();
  formData.append("portfolioImages", images);
  formData.append("portfolioTitle", title);
  formData.append("portfolioUrl", url);

  const res = await axiosInstance.put(
    `${MYPAGE_PORTFOLIO}/${portfolioId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

// 포트폴리오 삭제
export const deletePortfolio = async (portfolioId: number) => {
  const res = await axiosInstance.delete(`${MYPAGE_PORTFOLIO}/${portfolioId}`);
  return res.data;
};

// 포트폴리오 조회
export const getPortfolios = async (page = 1, size = 10) => {
  const res = await axiosInstance.get(
    `${MYPAGE_PORTFOLIO}/?page=${page}&size=${size}`
  );
  return res.data;
};
