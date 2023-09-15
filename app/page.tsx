"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from "@/components/index";
import { fetchCars } from '@/utils/index';
import { yearsOfProduction, fuels } from '@/constants/index';
import { motion } from "framer-motion";
import { container, itemdisplay } from '@utils/motion';

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id="discover">
        <motion.div className='home__text-container'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", duration: 1 }} >
          <h1 className='text-4x1 font-extrabold'>Car Catalogue</h1>
          <p>
            Explore the cars you might like:
          </p>
        </motion.div>

        <div className='home__filters'>
          <motion.span 
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", duration: 1 }}
          >
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          </motion.span>
          <motion.div className='home__filter-container'
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", duration: 1 }}   >
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </motion.div>
        </div>

      

        {allCars.length > 0 ? (
          <section>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <motion.div variants={itemdisplay}>
                  <CarCard car={car} />
                </motion.div>
              ))}
            </motion.div>

            {loading && (
          <div className='mt-16 w-full flex-center'>
            <Image
              src="./loader.svg"
              width={50}
              height={50}
              alt="loader"
              className='object-contain'
            />
          </div>
        )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          !loading && (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
          )
        )}
      </div>
    </main>
  );
}
