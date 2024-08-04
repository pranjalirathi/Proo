import React from 'react';
import Sidebar from '../components/Sidebar';
import Compiler from '../components/Compiler';

const CompilerPage = () => {
  return (
    <div className='flex h-screen bg-customBackground1 overflow-hidden'>
      <div className='w-16'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <Compiler />
      </div>
    </div>
  );
}

export default CompilerPage;
