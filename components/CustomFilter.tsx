import { useState, Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Listbox, Transition } from "@headlessui/react";
import { CustomFilterProps } from '@/types/index';
import { updateSearchParams } from '@/utils/index';

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]);

  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());
    router.push(newPathName);
  };

  return (
    <div className='w-fit'>
      <Listbox value={selected} onChange={(e) => { setSelected(e); handleUpdateParams(e); }}>
        <div className='relative w-fit z-10'>
          <Listbox.Button className="custom-filter__btn">
            <span className='block truncate'>
              {selected.title}
            </span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              alt="chevron-up-down"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((listItem) => (
                <Listbox.Option
                  key={listItem.title}
                  value={listItem}
                  className={({ active }: any) => `relative cursor-default select-none py-2 px-4 ${
                    active ? "bg-primary-blue text-white" : "text-gray-900"
                  }`}
                >
                  {({ selected }: any) => (
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {listItem.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}