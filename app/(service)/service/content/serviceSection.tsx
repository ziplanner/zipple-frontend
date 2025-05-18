import { useEffect, useState } from "react";
import Image from "next/image";
import office from "@/app/images/icon/office.svg";
import vector from "@/app/images/icon/vector_gray.svg";
import useResponsive from "@/app/hook/useResponsive";
import CategorySelector from "@/app/components/selector/categorySelector";
import CategoryModal from "@/app/components/modal/categoryModal";

interface ServiceSectionProps {
  onSelect: (value: string) => void;
  initialValue?: string;
}

const ServiceSection = ({ onSelect, initialValue }: ServiceSectionProps) => {
  const isMd = useResponsive("md");

  const [selected, setSelected] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>(
    initialValue || ""
  );
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (value: string, label: string) => {
    setSelectedValue(value);
    setSelected(label);
    onSelect(value);
    setOpen(false);
  };

  useEffect(() => {
    if (initialValue) {
      onSelect(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="w-full md:w-[260px] bg-white mb-[120px]">
      <div
        className={`flex items-center justify-between md:mb-8 ${
          !isMd && "cursor-pointer"
        }`}
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="flex gap-1 items-center text-16s md:text-20s">
          <Image src={office} alt={"office"} width={30} height={30} />
          <h1 className="text-text-primary">전문분야</h1>
        </div>
        {!isMd && (
          <div className="flex gap-4 items-center">
            <p className="text-text-secondary text-16r">{selected}</p>
            <Image src={vector} alt={"vector"} width={10} height={10} />
          </div>
        )}
      </div>

      {isMd ? (
        <CategorySelector
          selected={selected}
          selectedValue={selectedValue}
          onSelect={handleSelect}
          type="service"
        />
      ) : null}
      {!isMd && open && (
        <CategoryModal
          selected={selectedValue}
          onSelect={handleSelect}
          onClose={() => setOpen(false)}
          type="service"
        />
      )}
    </div>
  );
};

export default ServiceSection;
