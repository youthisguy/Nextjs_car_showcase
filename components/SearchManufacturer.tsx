"use client"

import { useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { SearchManufacturerProps } from '@/types/index';
import React, { Fragment } from 'react';
import { manufacturers } from '@/constants/index';

const SearchManufacturer = ({ selected, setSelected }: SearchManufacturerProps) => {
  const [query, setQuery] = useState('');

  const filteredManufacturer =
    query === ''
      ? manufacturers
      : manufacturers.filter((item) =>
          item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image src="/car-logo.svg" width={20} height={20} className="ml-4" alt="Car Logo" />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Search manufacturer"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options>
              {filteredManufacturer.length === 0 && query !== '' ? (
                <Combobox.Option value={query} className="search-manufacturer__option">
                  Nothing was found
                </Combobox.Option>
              ) : (
                filteredManufacturer.map((item) => (
                  <Combobox.Option
                    key={item}
                    value={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item}</span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
