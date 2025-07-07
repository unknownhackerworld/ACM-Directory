import React, { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-6 shadow-lg z-50 relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1
          className="text-2xl md:text-3xl font-bold flex items-center gap-2 cursor-pointer hover:text-purple-300 transition"
          onClick={() => navigate('/')}
        >
          <FaUsers /> ACM Member Directory
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className="text-xl p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? <BsSun className="text-yellow-400" /> : <BsMoon className="text-gray-100" />}
          </button>
        </div>
      </div>
    </header>
  );
}
