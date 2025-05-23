"use client";

import { useEffect } from "react";
import Image from "next/image";
import error from "@/app/images/icon/round_error.svg";
import { motion, AnimatePresence } from "framer-motion";

interface AlertMsgProps {
  text: string;
  duration?: number;
  onClose: () => void;
}

const ErrorAlertMessage = ({
  text,
  duration = 1500,
  onClose,
}: AlertMsgProps) => {
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
        rounded-[10px] bg-error/80 px-10 py-3 shadow-xl"
        >
          <Image src={error} alt="check" width={20} height={20} />
          <p className="text-white text-center text-16m md:text-18m whitespace-pre-line">
            {text}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorAlertMessage;
