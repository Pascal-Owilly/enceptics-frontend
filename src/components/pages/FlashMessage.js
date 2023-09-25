
import React from 'react';

const FlashMessage = ({ message, type }) => {
  return (
    <div className={`flash-message ${type}`}>
      <p className='bg-dark'>{message}</p>
    </div>
  );
};

export default FlashMessage;
