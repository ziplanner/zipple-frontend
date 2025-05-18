import { useEffect, useState } from "react";
import Image from "next/image";
import ping from "@/app/images/icon/ping.svg";
import vector from "@/app/images/icon/vector_gray.svg";
import roundVector from "@/app/images/icon/round_vector.svg";
import RegionModal from "@/app/components/modal/regionSelectModal";
import {
  Region,
  RegionSelector,
} from "@/app/components/selector/regionSelector";
import useResponsive from "@/app/hook/useResponsive";
import { motion, AnimatePresence } from "framer-motion";
import { getRegionFromCode } from "@/app/utils/getRegionLabel";

interface RegionSectionProps {
  selectedCodes: string[]; // 지역 코드 배열
  onChange: (codes: string[]) => void;
}

const RegionSection = ({ selectedCodes, onChange }: RegionSectionProps) => {
  const isMd = useResponsive("md");

  const [open, setOpen] = useState<boolean>(false);
  const [regions, setRegions] = useState<Region[]>([]);
  const [showSelector, setShowSelector] = useState<boolean>(true);

  useEffect(() => {
    const regionList: Region[] = selectedCodes.map(getRegionFromCode);
    setRegions(regionList);
  }, [selectedCodes]);

  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex items-center justify-between md:mb-5 ${
          !isMd && "cursor-pointer"
        }`}
        onClick={() => {
          if (!isMd) setOpen(true);
        }}
      >
        <div className="flex w-full flex-row justify-between items-center">
          <div className="flex gap-1 items-center text-16s md:text-20s">
            <Image src={ping} alt="ping" width={30} height={30} />
            <h1 className="text-text-primary">지역</h1>
            <p className="text-main">{regions.length}</p>
          </div>

          {isMd && (
            <motion.img
              src={roundVector.src}
              alt="vector"
              width={30}
              height={30}
              className="cursor-pointer"
              onClick={() => setShowSelector((prev) => !prev)}
              animate={{ rotate: showSelector ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        {!isMd && <Image src={vector} alt={"vector"} width={10} height={10} />}
      </div>

      {isMd && (
        <AnimatePresence>
          {showSelector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RegionSelector
                selectedRegions={regions}
                setSelectedRegions={(newRegions) => {
                  const regionArray = newRegions as Region[];
                  setRegions(regionArray);
                  onChange(regionArray.map((r) => r.district));
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {!isMd && open && (
        <RegionModal
          modalTitle="지역"
          onClose={() => setOpen(false)}
          onSave={(regions) => {
            setRegions(regions);
            onChange(regions.map((r) => r.district));
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
