import React, { useEffect, useRef } from 'react';
import sec11 from '../assets/sec11.png';
import { motion, useAnimation } from 'framer-motion';
import upright from '../assets/upright.svg'

const About2 = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  return (
    <div ref={sectionRef} className='w-full py-16 px-4'>
      <div className='max-w-[1240px] mx-auto p-8 rounded-lg shadow-md ' 
      style={{ 
        backgroundImage: `url(${upright})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'
      }}>
        <div className='grid md:grid-cols-2'>
          <motion.div
            className='flex flex-col justify-center'
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: 'easeInOut', delay: 0.5 } },
            }} 
          >
            <p className='font-bold'>Your languages, Your community</p>
            <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-violet-500 '>Exploring the communities</h1>
            <p className='text-2xl'>
              Join communities you are interested in according to the languages, didn't find one, create one! Explore and learn by talking to different people all over India with the power of code.
            </p>
            <motion.button
              className= ' w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-black bg-white hover:bg-gray-200'
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 1 }}
              transition={{ type: 'tween', duration: 0.5 }}
            >
              Explore network
            </motion.button>
          </motion.div>
          <motion.img
            className='w-[500px] mx-auto my-4'
            src={sec11}
            alt='/'
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: 'easeInOut', delay: 0.5 } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default About2;



