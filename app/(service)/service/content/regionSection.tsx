import { useState } from "react";
import Image from "next/image";
import ping from "@/app/images/icon/ping.svg";
import vector from "@/app/images/icon/vector_gray.svg";
import RegionModal from "@/app/components/modal/regionSelectModal";
import {
  Region,
  RegionSelector,
} from "@/app/components/selector/regionSelector";
import useResponsive from "@/app/hook/useResponsive";

const RegionSection = () => {
  const isMd = useResponsive("md");

  const [open, setOpen] = useState<boolean>(false);
  const [regions, setRegions] = useState<Region[]>([]);

  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex items-center justify-between md:mb-5 ${
          !isMd && "cursor-pointer"
        }`}
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="flex gap-1 items-center text-16s md:text-20s">
          <Image src={ping} alt={"ping"} width={30} height={30} />
          <h1 className="text-text-primary">지역</h1>
          <p className="text-main">10</p>
        </div>
        {!isMd && <Image src={vector} alt={"vector"} width={10} height={10} />}
      </div>
      {isMd && (
        <RegionSelector
          selectedRegions={regions}
          setSelectedRegions={setRegions}
        />
      )}
      {!isMd && open && (
        <RegionModal
          modalTitle="지역"
          onClose={() => setOpen(false)}
          onSave={(regions) => {
            setRegions(regions);
            setOpen(false);
          }}
          initialRegions={regions}
          maxSelectable={10}
          btnType={"double"}
        />
      )}
    </div>
  );
};

export default RegionSection;
