import React from 'react';
import { motion } from 'framer-motion';

const RevealAnimation = ({ children, yOffset = 50, duration = 0.6 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}  
      whileInView={{ opacity: 1, y: 0 }}  
      transition={{ duration: duration, ease: 'easeOut' }} 
      viewport={{ once: false, amount: 0.2 }} 
    >
      {children}
    </motion.div>
  );
};

export default RevealAnimation;
