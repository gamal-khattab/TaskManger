import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3 md:flex md:justify-between text-center md:text-left">
        <div className="flex items-center md:justify-between justify-center mb-2 md:mb-0">
          <div>
              <Link  href="/" className="text-xl font-bold text-gray-800 md:text-2xl ">TaskManager</Link>
          </div>
        </div>
        <div className="items-center md:flex">
          <div className="flex flex-col md:flex-row md:mx-6">
              <Link href="/" className="my-1 text-sm font-medium text-gray-700 hover:text-blue-500 md:mx-4 md:my-0">Login</Link>
              <Link href="/register" className="my-1 text-sm font-medium text-gray-700 hover:text-blue-500 md:mx-4 md:my-0">Register</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
