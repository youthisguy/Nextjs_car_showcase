"use client";

import { motion } from "framer-motion";
import Image from 'next/Image';
import CustomButton from './CustomButton';

const Hero = () => {
    const handleScroll = () => {

    }


  return (


    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <motion.h1 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className='hero__title'
                  >
          Find, book, or rent a car - quickly and easily!
        </motion.h1>
        <p className='hero__subtitle'>
          Streamline your car rental experience with our effortless booking process.
        </p>

        <CustomButton 
              title="Explore Cars"
              containerStyles = "bg-primary-blue text-white rounded-full mt-10"
              handleClick={handleScroll}
              />
        <div className='hero__image-container'>
          <motion.div  className='hero__image'
                    >
            <Image src="/hero.png" alt="hero" fill className="object-contain" />
          </motion.div>

          <div className='hero__image-overlay' />
        
        </div>
      </div>
    </div>
  )
}

export default Hero