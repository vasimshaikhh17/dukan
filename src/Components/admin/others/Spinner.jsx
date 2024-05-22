import React from 'react';

const Spinner = () => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-transparent border-t-blue-500 border-l-blue-500 border-b-blue-500 border-r-transparent">
        <div className="absolute top-0 left-0 h-full w-full animate-ping rounded-full border-4 border-blue-500 opacity-75"></div>
        <div className="absolute top-0 left-0 h-full w-full animate-ping rounded-full border-4 border-blue-500 opacity-25 delay-150"></div>
      </div>
      <span
        className="absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
