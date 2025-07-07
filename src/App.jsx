import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import membersData from './data/members.json';
import { IoPersonCircleSharp } from 'react-icons/io5';
import Navbar from './components/Navbar';
import './index.css';

const roles = ['All', 'Chair', 'Vice Chair', 'Secretary', 'Member'];
const domains = ['Web Development', 'AI/ML', 'Cybersecurity', 'App Development', 'IoT'];
const skillsList = ['React', 'Python', 'Cybersecurity', 'Node.js', 'UI/UX'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
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

  const handleToggle = (value, list, setList) => {
    setList(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const filteredMembers = useMemo(() => {
    return membersData.filter(member => {
      const matchesName = member.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = selectedRole === 'All' || member.role === selectedRole;
      const matchesDomain = selectedDomains.length === 0 || selectedDomains.includes(member.domain);
      const matchesSkills = selectedSkills.length === 0 || selectedSkills.some(skill => member.skills.includes(skill));
      return matchesName && matchesRole && matchesDomain && matchesSkills;
    });
  }, [searchQuery, selectedRole, selectedDomains, selectedSkills]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-grow container mx-auto px-4 py-8 gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-56 lg:w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">🔍 Filters</h2>

          <h3 className="text-lg font-semibold mb-2">Domain</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {domains.map(domain => (
              <button
                key={domain}
                onClick={() => handleToggle(domain, selectedDomains, setSelectedDomains)}
                className={`px-3 py-1 rounded-full text-sm border transition ${selectedDomains.includes(domain)
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  }`}
              >
                {domain}
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skillsList.map(skill => (
              <button
                key={skill}
                onClick={() => handleToggle(skill, selectedSkills, setSelectedSkills)}
                className={`px-3 py-1 rounded-full text-sm border transition ${selectedSkills.includes(skill)
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Panel */}
        <main className="flex-grow overflow-hidden">
          {/* Search Bar - Only on Home Page */}
          {location.pathname === '/' && (
            <div className="relative mb-6 w-full flex flex-col md:flex-row gap-4 md:items-center">
              {/* Search Input */}
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search by name, role, or skill..."
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white focus:outline-0 dark:bg-gray-700 text-black dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* Dropdown Suggestions */}
                
              </div>

              {/* Role Dropdown */}
              <select
                className="px-4 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map(role => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </div>
          )}


          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedDomains.map(domain => (
              <span key={domain} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full flex items-center gap-2">
                <button onClick={() => handleToggle(domain, selectedDomains, setSelectedDomains)} className="text-lg font-bold hover:text-red-500">×</button>
                {domain}
              </span>
            ))}
            {selectedSkills.map(skill => (
              <span key={skill} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full flex items-center gap-2">
                <button onClick={() => handleToggle(skill, selectedSkills, setSelectedSkills)} className="text-lg font-bold hover:text-red-500">×</button>
                {skill}
              </span>
            ))}
          </div>

          {/* Member Cards */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map(member => (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl cursor-pointer transition overflow-hidden"
                onClick={() => navigate(`/member/${member.id}`)}
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
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 dark:bg-gray-800 text-white text-center py-4 mt-auto">
        <p>© 2025 ACM Student Chapter. Built By Maattraan with 💙</p>
      </footer>
    </div>
  );
}
