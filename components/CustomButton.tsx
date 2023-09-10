"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CustomButtonProps } from '@/types/index';

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  btnType = 'button',
  textStyles,
  rightIcon,
}: CustomButtonProps) => {
  const buttonVariants = {
    initial: { opacity: 0, scale: 0.5 },
    whileInView: { opacity: 1, scale: 1 },
  };

  return (
    <motion.button
      initial={buttonVariants.initial}
      whileInView={buttonVariants.whileInView}
      transition={{ type: 'spring', duration: 2 }}
      viewport={{ once: true }}
      disabled={false}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className='relative w-6 h-6'>
          <Image src={rightIcon} alt='arrow-right-icon' fill className='object-contain' />
        </div>
      )}
    </motion.button>
  );
};

export default CustomButton;
