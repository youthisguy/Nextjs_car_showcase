import React from 'react';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import { CarProps } from '@/types/index';
import { generateCarImageUrl } from '@/utils/index';

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as='div' className='fixed inset-0 z-10' onClose={closeModal}>
      <div className='fixed inset-0 bg-black bg-opacity-25' />

      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        leave='ease-in duration-200'
      >
        <div className='fixed inset-0 overflow-y-auto flex justify-center items-center'>
          <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
            <button
              type='button'
              className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
              onClick={closeModal}
            >
              <Image
                src='/close.svg'
                alt='close'
                width={20}
                height={20}
                className='object-contain'
              />
            </button>

            <div className='flex-1 flex flex-col gap-3'>
              <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
              </div>

              <div className='flex gap-3'>
                {["29", "33", "13"].map((imageKey, index) => (
                  <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg' key={index}>
                    <Image src={generateCarImageUrl(car, imageKey)} alt='car model' fill priority className='object-contain' />
                  </div>
                ))}
              </div>
            </div>

            <div className='flex-1 flex flex-col gap-2'>
              <h2 className='font-semibold text-xl capitalize'>
                {car.make} {car.model}
              </h2>

              <div className='mt-3 flex flex-wrap gap-4'>
                {Object.entries(car).map(([key, value]) => (
                  <div className='flex justify-between gap-5 w-full text-right' key={key} >
                    <h4 className='text-grey capitalize'>
                      {key.split("_").join(" ")}
                    </h4>
                    <p className='text-black-100 font-semibold'>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Transition.Child>
    </Dialog>
  </Transition>
);

export default CarDetails;