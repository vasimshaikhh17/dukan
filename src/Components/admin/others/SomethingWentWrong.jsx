import React from "react";

const SomethingWentWrong = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-yellow-900 bg-yellow-300 p-4 rounded-md mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        We're sorry, but an unexpected error has occurred. Please try again later.
      </p>
      
    </div>
  </div>
  );
};

export default SomethingWentWrong;
