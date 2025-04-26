"use client";

import { useState } from "react";
import Input from "./components/input/input";

export default function Home() {
  const [inputValue, setInputValue] = useState("zzzzz");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <Input
        value={inputValue}
        onChange={handleInputChange}
        error={true}
        errorMessage="다시 입력해주세요."
      /> */}
    </div>
  );
}
