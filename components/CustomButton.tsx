"use client";

import { motion } from 'framer-motion';
import { CustomButtonProps } from '@/types/index';
import Image from 'next/image';

const CustomButton = ({ title, containerStyles, handleClick, btnType }: CustomButtonProps) => {
  return (
    <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 2 }}
            viewport={{ once: true }}
            disabled={false}
            type={btnType || "button"}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}>
    <span className={`flex-1`}>
        {title}
    </span>
    </motion.button>
  )
}

export default CustomButton