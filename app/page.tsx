"use client"

import Image from 'next/image'
import { Hero, CustomFilter, SearchBar, CarCard } from "@/components/index";
import { fetchCars } from '@/utils/index';
import { motion } from 'framer-motion';

export default async function Home() {
  const allCars = await fetchCars();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length <1 || !allCars;


  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id="discover">
        <div className='home__text-container'>
          <h1 className='text-4x1 font-extrabold'>Car Catalogue</h1>
          <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", duration: 1 }}>
            Explore the cars you might like:
          </motion.p>
        </div>

        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
        </div>

      </div>

      { !isDataEmpty? (
        <section>
         <div className='home__cars-wrapper'>
            {allCars?.map((car) => (
            <CarCard car={car} />
            ))}
         </div>
        </section>
      ) : (
        <div className='home__error-container'>
          <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          <p>{allCars?.message}</p>
        </div>
      )}

      </div>
    </main>
  );
}
