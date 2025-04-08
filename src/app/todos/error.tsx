"use client";

import React from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const error = (error: Error) => {
  toast.error("Something went wrong");
  console.error("Error:", error);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-50 px-4 text-center">
      <Image
        src="/images/error-illustration.svg" // Replace with your image path
        alt="Error illustration"
        width={300}
        height={300}
        className="mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
      <p className="text-gray-600 mb-1">An unexpected error has occurred.</p>
      <p className="text-gray-600 mb-4">Please try again, or contact support if the problem continues.</p>
      <button
        onClick={() => location.reload()}
        className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default error;
