import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import midbot from '../assets/chakkar111.png';
import { Link } from 'react-router-dom';

const HeroSectionFinal = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['all platform POTDs', 'Exciting Challenges ', 'Blogs and Resources', 'SDE Sheets'],
      typeSpeed: 40,
      backSpeed: 40,
      loop: true,
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div
      className='text-white'
      style={{
        backgroundImage: `url(${midbot})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className=' font-bold p-2 text-xl'>
          Launching one of the biggest platforms
        </p>
        <motion.h1
          className='md:text-8xl sm:text-6xl text-4xl font-bold md:py-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 via-purple-500 to-violet-500 '
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          C O D E R O O M
        </motion.h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Presenting
          </p>
          <span
            ref={typedElement}
            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
          />
        </div>
        <Link to="/home" className='rounded-md  w-[200px] font-medium my-6 mx-auto py-3 text-black bg-white hover:bg-gray-200 '>
          Get Started
        </Link>


      </div>
    </div>
  );
};

export default HeroSectionFinal;


