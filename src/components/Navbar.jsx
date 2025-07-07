import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FaUsers, FaBars } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import membersData from '../data/members.json';

export default function Navbar({ toggleFilters }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [showDropdown, setShowDropdown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle positioning dropdown under the search bar
  useEffect(() => {
    if (showDropdown && searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'absolute',
        top: `${rect.bottom + window.scrollY + 4}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        zIndex: 9999,
      });
    }
  }, [showDropdown, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !searchRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const safeSearch = searchQuery || '';
  const suggestions = useMemo(() => {
    const q = safeSearch.toLowerCase().trim();
    if (!q) return [];
    return membersData.filter(member =>
      member.name.toLowerCase().includes(q) ||
      member.role.toLowerCase().includes(q) ||
      member.skills.some(skill => skill.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [safeSearch]);

  const handleSelect = (id) => {
    setShowDropdown(false);
    setSearchQuery('');
    navigate(`/member/${id}`);
  };

  const handleLogoClick = () => navigate('/');

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 backdrop-blur-md bg-opacity-90 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 z-50 shadow-[0px_1px_28px_0px_rgba(39,119,255,0.2)]">
        <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-4 relative">
          {/* Left: Logo and Hamburger */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-xl"
              onClick={toggleFilters}
            >
              <FaBars />
            </button>
            <h1
              className="text-2xl md:text-3xl font-bold flex items-center gap-2 cursor-pointer hover:text-blue-300 transition"
              onClick={handleLogoClick}
            >
              <FaUsers /> ACM Member Directory
            </h1>
          </div>

          {/* Right: Search & Toggle */}
          <div className="flex items-center gap-4 relative">
            {!isHome && (
              <input
                ref={searchRef}
                type="text"
                placeholder="Search by name, role, or skill..."
                className="w-64 px-4 py-2 rounded-md text-black dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
            )}

            {/* Dark Mode Toggle */}
           
          </div>
        </div>
      </header>

      {/* Floating Dropdown (external from navbar) */}
      {!isHome && showDropdown && suggestions.length > 0 && (
        <ul
          ref={dropdownRef}
          style={dropdownStyle}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-2xl ring-1 ring-blue-500/50 max-h-64 overflow-y-auto"
        >
          {suggestions.map(member => (
            <li
              key={member.id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white"
              onMouseDown={() => handleSelect(member.id)}
            >
              <span className="font-medium">{member.name}</span>
              <span className="text-sm text-gray-500 ml-2">({member.role})</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}