"use client"

import React, { useState } from 'react';
import Image from '@/node_modules/next/image';
import CustomButton from './CustomButton';
import CarDetails from './CarDetails';
import { calculateCarRent } from '@/utils/index';
import { motion } from 'framer-motion';
import { CarProps } from '@/types/index';

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const carRent = calculateCarRent(city_mpg, year);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className='car-card group'
    >
      <div className='car-card_content'>
        <h2 className='car-card__content-title'>
          {make} {model}
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] font-extrabold'>
        <span className='self-start text-[14px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src='/hero.png' alt={make} fill priority className='object-contain' />
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='steering-wheel.svg' width={30} height={30} alt='steering wheel' />
            <p className='text-[14px] font-medium'>
              {transmission === 'a' ? 'automatic' : 'manual'}
            </p>
          </div>

          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/tire.svg' width={30} height={30} alt='tire' />
            <p className='text-[14px] font-medium'> {drive.toUpperCase()}</p>
          </div>

          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/gas.svg' width={30} height={30} alt='gas' />
            <p className='text-[14px] font-medium'>{city_mpg} MPG</p>
          </div>
        </div>

        <div className='car-card__btn-container'>
          <CustomButton
            title='View more'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </motion.div>
  );
};

export default CarCard;
