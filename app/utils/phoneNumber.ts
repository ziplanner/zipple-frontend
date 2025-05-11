export const formatPhoneNumber = (phone: string) => {
  // 01012345678 → 010-1234-5678
  return phone.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
};
