import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-blue-500 to-green-500">
      <h1 className="text-9xl font-bold text-white">404</h1>
      <h2 className="text-4xl font-semibold text-white mt-4">Page Not Found</h2>
      <p className="text-lg text-white mt-2 mb-8 text-center max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
