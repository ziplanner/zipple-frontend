import apart from "@/app/images/icon/main/apart.svg";
import cleaing from "@/app/images/icon/main/cleaning.svg";
import cleaing2 from "@/app/images/icon/main/cleaing2.svg";
import move from "@/app/images/icon/main/move.svg";
import officetel from "@/app/images/icon/main/officetel.svg";
import oneroom from "@/app/images/icon/main/oneroom.svg";
import ontowroom from "@/app/images/icon/main/ontowroom.svg";
import part from "@/app/images/icon/main/part.svg";
import space from "@/app/images/icon/main/space.svg";

export const AGENT_CATEGORY = [
  { label: "아파트", image: apart, url: "/" },
  { label: "원룸/투룸", image: ontowroom, url: "/" },
  { label: "오피스텔", image: officetel, url: "/" },
];

export const EXPERT_CATEGORY = [
  { label: "이사", image: move, url: "/" },
  { label: "청소", image: cleaing, url: "/" },
  { label: "부분 인테리어", image: part, url: "/" },
  { label: "원룸/소형 이사", image: oneroom, url: "/" },
  { label: "입주 청소", image: cleaing2, url: "/" },
  { label: "공간 인테리어", image: space, url: "/" },
];
