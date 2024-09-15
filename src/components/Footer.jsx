import React from 'react';
import imglogo from '../assets/coderoom1.png'; 

const Footer = () => (
  <footer className="bg-black/30 border-t border-white/10 py-20 relative z-30 backdrop-blur w-full">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 px-6">
      <a href="https://vercel.com/home" className="w-[100px] p-2 order-1 md:ml-4" aria-label="Vercel Home">
        <img src={imglogo} alt="Vercel Logo" className="w-full h-auto" />
      </a>
      <p className="text-sm text-gray-500 text-center lg:text-left order-3 md:order-2">
        &copy; 2024 CODEROOM, All rights reserved.
      </p>
      <div className="flex items-center space-x-4 order-2 md:order-3">
        <a
          href="https://github.com"
          title="GitHub"
          className="py-1 text-gray-500 hover:text-white transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com"
          title="Twitter"
          className="py-1 text-gray-500 hover:text-white transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
