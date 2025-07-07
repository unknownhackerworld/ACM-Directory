import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import membersData from './data/members.json';
import { IoPersonCircleSharp } from 'react-icons/io5';
import Navbar from './components/Navbar';
import './index.css'

const roles = ['All', 'Chair', 'Vice Chair', 'Secretary', 'Member'];
const domains = ['Web Development', 'AI/ML', 'Cybersecurity', 'App Development', 'IoT'];
const skillsList = ['React', 'Python', 'Cybersecurity', 'Node.js', 'UI/UX'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const navigate = useNavigate();

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
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content with Sidebar Filter */}
      <div className="flex flex-grow container mx-auto px-4 py-8 gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-56 lg:w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Filter by Domain</h2>
          {domains.map(domain => (
            <label key={domain} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                checked={selectedDomains.includes(domain)}
                onChange={() => handleToggle(domain, selectedDomains, setSelectedDomains)}
              />
              <span>{domain}</span>
            </label>
          ))}
          <h2 className="text-xl font-semibold mt-4 mb-2">Filter by Skills</h2>
          {skillsList.map(skill => (
            <label key={skill} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={() => handleToggle(skill, selectedSkills, setSelectedSkills)}
              />
              <span>{skill}</span>
            </label>
          ))}
        </aside>

        {/* Members Grid */}
        <main className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-grow">
          {filteredMembers.map(member => (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl cursor-pointer transition"
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
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 dark:bg-gray-800 text-white text-center py-4 mt-auto">
        <p>© 2025 ACM Student Chapter. Built with 💙 using React + TailwindCSS</p>
      </footer>
    </div>
  );
}
