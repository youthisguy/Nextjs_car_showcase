"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import CustomButton from './CustomButton';
import { staggerContainer, textVariant } from '../utils/motion';

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='hero'>
      <motion.div
        className='flex-1 pt-36 padding-x'
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.h1 variants={textVariant(1.1)} className='hero__title'>
        Reserve, or lease a vehicle - swiftly and conveniently!
        </motion.h1>
        <motion.p variants={textVariant(1.2)} className='hero__subtitle'>
          Streamline your car rental experience with our effortless booking process.
        </motion.p>

        <CustomButton
          title='Explore Cars'
          containerStyles='bg-primary-blue text-white rounded-full mt-10'
          handleClick={handleScroll}
        />
      </motion.div>

      <div className='hero__image-container'>
        <motion.div
          className='hero__image'
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 1.5 }}
        >
          <Image src='/audi-hero.png' alt='hero' fill className='object-contain' />
        </motion.div>

        <div className='hero__image-overlay' />
      </div>
    </div>
  );
};

export default Hero;
