"use client";

import { useEffect } from "react";
import Image from "next/image";
import check from "@/app/images/icon/round_check.svg";
import { motion, AnimatePresence } from "framer-motion";

interface AlertMsgProps {
  text: string;
  duration?: number;
  onClose: () => void;
}

const AlertMessage = ({ text, duration = 1500, onClose }: AlertMsgProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="alert"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="pointer-events-auto flex items-center justify-center gap-2
        rounded-[10px] bg-main/90 px-10 py-3 shadow-xl"
        >
          <Image src={check} alt="check" width={20} height={20} />
          <p className="text-white text-18m whitespace-nowrap">{text}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlertMessage;
