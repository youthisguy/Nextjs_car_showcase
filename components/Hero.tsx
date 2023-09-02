"use client";

import { motion } from "framer-motion";
import Image from 'next/Image';
import CustomButton from './CustomButton';
import { fadeIn, staggerContainer, textVariant } from '../utils/motion';

const Hero = () => {
    const handleScroll = () => {

    }


  return (


    <div className='hero'>
        <motion.div     
                variants={staggerContainer}
                initial='hidden'
                whileInView='show'
                viewport={{ once: false, amount: 0.25 }}
                className='flex-1 pt-36 padding-x'>
        <motion.h1 
                 variants={textVariant(1.1)}
                  className='hero__title'
                  >
          Find, book, or rent a car - quickly and easily!
        </motion.h1>
        <motion.p
          variants={textVariant(1.2)}
          className = 'hero__subtitle'>

          Streamline your car rental experience with our effortless booking process.
        </motion.p>

        <CustomButton 
              title="Explore Cars"
              containerStyles = "bg-primary-blue text-white rounded-full mt-10"
              handleClick={handleScroll}
              />
        <div className='hero__image-container'>
          <div className='hero__image'
                    >
            <Image src="/hero.png" alt="hero" fill className="object-contain" />
          </div>

          <div className='hero__image-overlay' />
        
        </div>
      </motion.div>
    </div>
  )
}

export default Hero