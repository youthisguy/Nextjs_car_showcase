"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image'
import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from "@/components/index";
import { fetchCars } from '@/utils/index';
import { motion } from 'framer-motion';
import { yearsOfProduction, fuels } from '@/constants/index';

export default function Home() {
        const [allCars, setAllCars] = useState([]);
        const [loading, setLoading] = useState(true);

        const [manufacturer, setManufacturer] = useState("");
        const [model, setModel] = useState("");

        const [fuel, setFuel] = useState("");
        const [year, setYear] = useState(2022);
        const [limit, setLimit] = useState(10);

        const getCars = async () => {
         try {
          const result = await fetchCars({
            manufacturer: manufacturer || "",
            year: year || 2022,
            fuel: fuel || "",
            limit: limit || 10,
            model: model || "",
          });   
          setAllCars(result);  
         } catch (error) {
          console.log(error)
         }  finally {
          setLoading(false);
         }
        }

        useEffect(() => {
          getCars();
        }, [fuel, year, limit, manufacturer, model])
        

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
          <SearchBar setManufacturer={setManufacturer}
                     setModel={setModel}                                />
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
        </div>

      </div>
      {
        loading && (
          <div className='mt-16 w-full flex-center'>
            <Image 
                    src="/loader" 
                    width={50}
                    height={50}
                    alt="loader"
                    className='object-contain'
                    />
          </div>
        )
      }
      { allCars.length > 0 ? (
        <section>
         <div className='home__cars-wrapper'>
            {allCars?.map((car) => (
            <CarCard car={car} />
            ))}
         </div>

      <ShowMore 
                pageNumber={limit / 10}
                isNext={(limit > allCars.length)}
                setLimit={setLimit}
              />

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
