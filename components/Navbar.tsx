"use client"


import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import { motion } from 'framer-motion';
import { navVariants } from '../utils/motion';


import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
            <motion.nav 
                        variants={navVariants}
                        initial="hidden"
                        whileInView="show"
                    className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
            <Link href="/" className="flex justify-center items-center">
                <Image 
                        src="/logo.svg"
                        alt="Car Hub Logo"
                        width={118}
                        height={18}
                        className="object-contain"
                                              />
                </Link>

        <CustomButton 
                        title="Sign In"
                        btnType="button"
                        containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]" />
            </motion.nav>
    </header>       
  )
}

export default Navbar