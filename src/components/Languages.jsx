import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import python from '../assets/python.png';
import react from '../assets/react.png'
import nodejs from '../assets/nodejs.png'
import spring from '../assets/spring.png'
import c from '../assets/c.png'
import java from '../assets/java.png'
import django from '../assets/django.png'
import postgres from '../assets/postgres.png'
import redux from '../assets/redux.png'
import mongodb from '../assets/mongodb.webp'
import grid from '../assets/grid.png'


const Languages = () => {
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
  const languages = [
    { name: 'Python', img: python },
    { name: 'SpringBoot', img: spring},
    { name: 'C++', img: c },
    { name: 'Java', img: java },
    { name: 'Django', img: django },
    { name: 'NodeJS', img: nodejs },
    { name: 'PostgreSQL', img: postgres },
    { name: 'React', img: react },
    { name: 'MongoDB', img: mongodb },
    { name: 'Redux', img: redux }
  ];

  return (
    <div ref={sectionRef} className="languages" style={{ 
      backgroundImage: `url(${grid})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="container mx-auto py-10">
        <h2 className="title text-center text-3xl font-bold my-5 ">Explore your language community</h2>
        <p className="text-[#FFFFFF] text-center mb-5">
        Explore dedicated communities for Python, JavaScript, Java, C++, and more.
        </p>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: 'easeInOut', delay: 0.5 } },
          }}
        >
          {languages.map((language, index) => (
            <motion.div 
              key={index} 
              className="developer-card flex items-center py-2 px-3 bg-gray-800 rounded-md transition-shadow"
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img className="w-12 h-12 mr-3 rounded-full" src={language.img} alt={language.name} />
              <h6 className="text-white m-0">{language.name}</h6>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Languages;

// bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-violet-500
