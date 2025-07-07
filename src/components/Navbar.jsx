// src/components/Navbar.jsx
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';

export default function Navbar({ searchQuery, setSearchQuery, selectedRole, setSelectedRole, darkMode, setDarkMode }) {
  const roles = ['All', 'Chair', 'Vice Chair', 'Secretary', 'Member'];

  return (
    <header className="bg-blue-900 dark:bg-gray-800 text-white py-6 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaUsers className="text-white" /> ACM Member Directory
        </h1>
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-3 py-1 rounded-md text-black dark:text-white dark:bg-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-3 py-1 rounded-md text-black dark:text-white dark:bg-gray-700"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map(role => <option key={role}>{role}</option>)}
          </select>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle Theme"
          >
            {darkMode ? <BsSun className="text-yellow-400" /> : <BsMoon className="text-gray-200" />}
          </button>
        </div>
      </div>
    </header>
  );
}
