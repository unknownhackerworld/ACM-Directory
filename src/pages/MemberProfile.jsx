import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import membersData from '../data/members.json';
import Navbar from '../components/Navbar';
import { FaArrowLeft } from 'react-icons/fa';

export default function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = membersData.find(m => m.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <h1 className="text-4xl font-bold mb-4">Member Not Found</h1>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  const avatarUrl = `https://avatar.iran.liara.run/public/${member.gender}`;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto py-12 px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg mb-6 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <FaArrowLeft />
          <span className="font-medium">Back to Directory</span>
        </button>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-28 h-28 rounded-full shadow-lg mb-4"
            />
            <h2 className="text-3xl font-bold">{member.name}</h2>
            <p className="text-xl text-blue-700 dark:text-blue-300">{member.role}</p>
            <p className="text-base text-gray-600 dark:text-gray-300 mt-1">{member.domain}</p>
          </div>

          {/* Right Section */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
            <div>
              <p className="font-semibold text-xl">Email:</p>
              <p className="text-lg break-words">{member.email}</p>
            </div>
            <div>
              <p className="font-semibold text-xl">Phone:</p>
              <p className="text-lg">{member.phone}</p>
            </div>
            <div>
              <p className="font-semibold text-xl">DOB:</p>
              <p className="text-lg">{member.dob}</p>
            </div>
            <div>
              <p className="font-semibold text-xl">Gender:</p>
              <p className="text-lg capitalize">{member.gender}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-semibold text-xl">Address:</p>
              <p className="text-lg">{member.address}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-semibold text-xl">Skills:</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {member.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-1 rounded-full text-base"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
