import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import global from '../assets/global.png';
import midbot from '../assets/midbot.svg';

const EarthSection = () => {
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
    <div
      ref={sectionRef}
      className="flex flex-col justify-center items-center min-h-screen text-center relative z-2"
      style={{
        backgroundImage: `url(${midbot})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div
        className="relative flex flex-col justify-center items-center mb-[6.5rem]"
        initial={{ opacity: 0, y: -50 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: 'easeInOut' } },
        }}
      >
        <motion.img
          src={global}
          className="relative z-1"
          width={255}
          height={255}
          alt="Sphere"
          whileHover={{ scale: 1.1, rotate: 360, transition: { loop: Infinity, duration: 10 } }}
          whileTap={{ scale: 0.8, rotate: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <motion.p
          className="mt-20 text-5xl font-mono leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: 'easeInOut', delay: 0.5 } },
          }}
        >
          Let's connect across India with the power of <br></br> <span className="text-orange-500 font-bold"> Y O U </span> and <span className="text-orange-500 font-bold">C O D E R O O M</span>
        </motion.p>

      </motion.div>
    </div>
  );
};

export default EarthSection;
