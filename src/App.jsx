import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import membersData from './data/members.json';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { FaBars, FaTimes } from 'react-icons/fa';
import Navbar from './components/Navbar';

const roles = ['All', 'Chair', 'Vice Chair', 'Secretary', 'Member'];
const domains = ['Web Development', 'AI/ML', 'Cybersecurity', 'App Development', 'IoT'];
const skillsList = ['React', 'Python', 'Cybersecurity', 'Node.js'];

const MEMBERS_PER_PAGE = 20;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const handleToggle = (value, list, setList) => {
    setList(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const filteredMembers = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return membersData.filter(member => {
      const matchesSearch =
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.skills.some(skill => skill.toLowerCase().includes(query));

      const matchesRole = selectedRole === 'All' || member.role === selectedRole;
      const matchesDomain =
        selectedDomains.length === 0 || selectedDomains.includes(member.domain);
      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some(skill => member.skills.includes(skill));

      return matchesSearch && matchesRole && matchesDomain && matchesSkills;
    });
  }, [searchQuery, selectedRole, selectedDomains, selectedSkills]);

  const totalPages = Math.ceil(filteredMembers.length / MEMBERS_PER_PAGE);
  const currentMembers = filteredMembers.slice(
    (currentPage - 1) * MEMBERS_PER_PAGE,
    currentPage * MEMBERS_PER_PAGE
  );

  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages - 2, totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, 3, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 2, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1, totalPages);
      }
    }

    return (
      <div className="flex gap-2 justify-center mt-10 flex-wrap">
        <button
          className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-blue-700"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ◀
        </button>

        {pages.map((page, idx) =>
          page === '...' ? (
            <span key={idx} className="px-3 py-1 text-gray-400">...</span>
          ) : (
            <button
              key={idx}
              className={`px-3 py-1 rounded ${currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-white hover:bg-blue-500'}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-blue-700"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          ▶
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar toggleFilters={() => setShowFilters(!showFilters)} />

      <div className="flex flex-grow relative">
        {/* Mobile Filters Button */}
        <button
          className="md:hidden fixed bottom-6 right-6 z-30 bg-blue-600 p-4 rounded-full shadow-lg"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>

        {/* Sidebar Filters */}
        <aside className={`
          w-64 bg-gray-800 px-4 py-6 rounded-lg shadow fixed md:relative h-full md:h-auto z-20
          transform transition-transform duration-300 ease-in-out
          ${showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🔍 Filters</h2>
            <button
              className="md:hidden text-xl"
              onClick={() => setShowFilters(false)}
            >
              <FaTimes />
            </button>
          </div>

          <h3 className="text-lg font-semibold mb-2">Domain</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {domains.map(domain => (
              <button
                key={domain}
                onClick={() => handleToggle(domain, selectedDomains, setSelectedDomains)}
                className={`px-3 py-1 rounded-full cursor-pointer text-sm border transition ${selectedDomains.includes(domain)
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-gray-700 text-white'}`}
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
                className={`px-3 py-1 cursor-pointer rounded-full text-sm border transition ${selectedSkills.includes(skill)
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-gray-700 text-white'}`}
              >
                {skill}
              </button>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {showFilters && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-grow p-4 md:ml-0 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="relative mb-6 w-full flex flex-col md:flex-row gap-4 md:items-center">
              {/* Search Input */}
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search by name, role, or skill..."
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Role Dropdown + Total Count */}
              <div className="flex items-center gap-3">
                <select
                  className="px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {roles.map(role => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
                <span className="text-gray-200 ml-10 text-xl">Total: {filteredMembers.length} Members</span>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedDomains.map(domain => (
                <span key={domain} className="bg-blue-800 text-white px-3 py-1 rounded-full flex items-center gap-2">
                  <button onClick={() => handleToggle(domain, selectedDomains, setSelectedDomains)} className="text-lg font-bold hover:text-red-500">×</button>
                  {domain}
                </span>
              ))}
              {selectedSkills.map(skill => (
                <span key={skill} className="bg-blue-800 text-white px-3 py-1 rounded-full flex items-center gap-2">
                  <button onClick={() => handleToggle(skill, selectedSkills, setSelectedSkills)} className="text-lg font-bold hover:text-red-500">×</button>
                  {skill}
                </span>
              ))}
            </div>

            {/* Member Cards */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentMembers.map(member => (
                <div
                  key={member.id}
                  className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl cursor-pointer transition overflow-hidden"
                  onClick={() => navigate(`/member/${member.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <IoPersonCircleSharp className="text-4xl text-blue-400" />
                    <span className="text-sm bg-blue-900 text-blue-200 px-2 py-1 rounded-full">
                      {member.role}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold mt-2">{member.name}</h2>
                  <p className="text-sm text-gray-300">{member.email}</p>
                  <p className="mt-2 text-sm text-gray-200">
                    Skills: <span className="text-blue-300">{member.skills.join(', ')}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && renderPagination()}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-4 mt-auto">
        <p>© 2025 ACM Student Chapter. Built By Maattraan with 💙</p>
      </footer>
    </div>
  );
}