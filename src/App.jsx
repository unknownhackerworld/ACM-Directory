import React, { useState, useMemo, Suspense, lazy, useEffect } from 'react';
import membersData from './data/members.json';
import { FaSearch, FaUsers } from 'react-icons/fa';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { Dialog } from '@headlessui/react';
import './index.css';

const MemberModal = lazy(() => import('./components/MemberModal'));

const roles = ['All', 'Chair', 'Vice Chair', 'Secretary', 'Member'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedMember, setSelectedMember] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredMembers = useMemo(() => {
    return membersData.filter(member => {
      const matchesName = member.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = selectedRole === 'All' || member.role === selectedRole;
      return matchesName && matchesRole;
    });
  }, [searchQuery, selectedRole]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
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
            <div className="flex items-center gap-2">
              <label htmlFor="themeToggle">Dark Mode</label>
              <input
                id="themeToggle"
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="accent-blue-600"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Members Grid */}
      <main className="container mx-auto px-4 py-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-grow">
        {filteredMembers.map(member => (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl cursor-pointer transition"
            onClick={() => setSelectedMember(member)}
          >
            <div className="flex items-center justify-between">
              <IoPersonCircleSharp className="text-4xl text-blue-700 dark:text-blue-400" />
              <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                {member.role}
              </span>
            </div>
            <h2 className="text-lg font-semibold mt-2">{member.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{member.email}</p>
            <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
              Skills: <span className="text-blue-700 dark:text-blue-300">{member.skills.join(', ')}</span>
            </p>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 dark:bg-gray-800 text-white text-center py-4 b-0">
        <p>© 2025 ACM Student Chapter. Built with 💙 using React + TailwindCSS</p>
      </footer>

      {/* Member Modal */}
      <Suspense fallback={<div className="text-center text-lg">Loading profile...</div>}>
        {selectedMember && (
          <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </Suspense>
    </div>
  );
}
