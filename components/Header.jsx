import React from 'react';

const Header = () => {
  return (
    <div className='p-5 flex items-center shadow-lg rounded-lg'>
      {/* Image on the left */}
      <img 
        src={'https://lahore.comsats.edu.pk/images/CUI-Lahore.jpg'} 
        alt='CUI Logo' 
        className='w-50 object-contain' 
      />
      
      {/* Centered Text */}
      <div className='flex-grow  text-center'>
        <h2 className='text-4xl w-6xl font-bold'>CUI QUIZ PANEL</h2>
      </div>
    </div>
  );
};

export default Header;
