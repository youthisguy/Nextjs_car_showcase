'use client';

import { TypingTextProps } from '@/types/index';
import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../utils/motion';

export const TypingText = ({ title }: TypingTextProps) => (
  <motion.p
    variants={textContainer}
    className = 'hero__subtitle'
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);