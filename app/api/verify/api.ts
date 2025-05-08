import { VERIFY_LICENSE, VERIFY_MESSAGE, VERIFY_NUMBER } from "../apiUrl";
import axiosInstance from "../axiosInstance";

interface LicenseRequest {
  businessNumber: string; // '-' 없이 숫자만
  startDate: string; // YYYYMMDD 형식
  ownerName: string;
}

interface LicenseResponse {
  isReal: boolean;
}

/**
 * 사업자등록증 진위 여부 확인 (쿼리 파라미터로 전달)
 */
export async function verifyBusinessLicense(
  payload: LicenseRequest
): Promise<LicenseResponse> {
  try {
    const response = await axiosInstance.post<LicenseResponse>(
      VERIFY_LICENSE,
      null,
      { params: payload }
    );
    return response.data;
  } catch (error: any) {
    console.error("사업자등록증 인증 실패", error);
    throw new Error("사업자 등록증 인증 중 오류 발생");
  }
}

// 인증 문자 보내기
export const sendVerificationMessage = async (to: string): Promise<void> => {
  try {
    await axiosInstance.post(VERIFY_MESSAGE, { to });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "인증 문자 전송 실패");
  }
};

// 인증번호 확인
export const verifyPhoneCode = async (
  phoneNumber: string,
  code: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await axiosInstance.post(VERIFY_NUMBER, {
      phoneNumber,
      code,
    });
    return { success: res.data === true };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "인증 실패",
    };
  }
};
