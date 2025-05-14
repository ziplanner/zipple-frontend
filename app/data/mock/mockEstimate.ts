export const mockEstimateList = [
  {
    status: "quoted" as const,
    expertName: "홍길동",
    businessName: "길동홈",
    date: "2025.01.01 15:00",
    serviceType: "이사 > 가정이사",
    estimateAmount: 90000,
  },
  {
    status: "request" as const,
    expertName: "이영희",
    businessName: "이사천국",
    date: "2025.01.02 10:00",
    serviceType: "이사 > 포장이사",
    estimateAmount: 150000,
  },
  {
    status: "canceled" as const,
    expertName: "최철민",
    businessName: "퍼펙트이사",
    date: "2025.01.04 09:00",
    serviceType: "이사 > 사무실이사",
    estimateAmount: 300000,
  },
  {
    status: "request" as const,
    expertName: "윤미라",
    businessName: "미라클청소",
    date: "2025.01.06 13:30",
    serviceType: "청소 > 거주청소",
    estimateAmount: 60000,
  },
  {
    status: "quoted" as const,
    expertName: "김성수",
    businessName: "착한이사",
    date: "2025.01.07 11:00",
    serviceType: "이사 > 가정이사",
    estimateAmount: 80000,
  },
];

export const mockRequestList = [
  {
    status: "waiting" as const,
    expertName: "박철수",
    date: "2025.01.03 09:00",
    serviceType: "청소 > 입주청소",
  },
  {
    status: "overdue" as const,
    expertName: "최미나",
    date: "2025.01.03 09:00",
    serviceType: "청소 > 거주청소",
  },
  {
    status: "userCanceled" as const,
    expertName: "조현우",
    date: "2025.01.04 14:00",
    serviceType: "이사 > 가정이사",
  },
  {
    status: "waiting" as const,
    expertName: "김지은",
    date: "2025.01.05 11:30",
    serviceType: "이사 > 포장이사",
  },
  {
    status: "overdue" as const,
    expertName: "이수연",
    date: "2025.01.06 15:00",
    serviceType: "이사 > 사무실이사",
  },
  {
    status: "userCanceled" as const,
    expertName: "정한결",
    date: "2025.01.07 17:20",
    serviceType: "청소 > 입주청소",
  },
];
