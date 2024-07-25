import React from 'react';
import comingSoonImage from '../assets/coming_soon.png'; 

const Blogs = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <img src={comingSoonImage} alt="Coming Soon" className="max-w-full max-h-full" />
    </div>
  );
}

export default Blogs;
