import { BasicBtn } from "@/app/components/button/basicBtn";
import { BlackBtn } from "@/app/components/button/blackBtn";
import { BlueBtn } from "@/app/components/button/blueBtn";
import { PrimaryBtn } from "@/app/components/button/primaryBtn";

const Test = () => {
  return (
    <div className="p-20">
      <div>
        <PrimaryBtn text={"Button"} />
        <BlackBtn text={"Button"} />
        <BlueBtn text={"Button"} />
        <BasicBtn text={"Button"} />
      </div>
    </div>
  );
};

export default Test;
