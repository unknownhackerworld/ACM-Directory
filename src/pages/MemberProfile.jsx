import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import membersData from '../data/members.json';
import Navbar from '../components/Navbar';
import { FaArrowLeft } from 'react-icons/fa';

export default function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = membersData.find(m => m.id.toString() === id);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <h1 className="text-4xl font-bold mb-6">Member Not Found</h1>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xl transition-colors duration-200"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  const avatarUrl = `https://avatar.iran.liara.run/public/${member.gender}`;

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="max-w-5xl mx-auto py-16 px-20 sm:px-10">
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-3 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-xl mb-10 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-xl"
            >
              <FaArrowLeft className="text-xl" />
              <span className="font-medium">Back to Directory</span>
            </button>

            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-20 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Section */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                <div className="relative w-40 h-40">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className={`w-40 h-40 rounded-full shadow-xl border-4 border-blue-100 dark:border-blue-900 object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-extrabold tracking-tight">{member.name}</h2>
                  <p className="text-2xl text-blue-700 dark:text-blue-300 font-medium">{member.role}</p>
                  <p className="text-xl text-gray-600 dark:text-gray-300">{member.domain}</p>
                </div>
              </div>

              {/* Right Section */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 text-lg">
                <div>
                  <p className="font-semibold text-2xl">Email:</p>
                  <p className="text-lg break-words">{member.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-2xl">Phone:</p>
                  <p className="text-lg">{member.phone}</p>
                </div>
                <div>
                  <p className="font-semibold text-2xl">DOB:</p>
                  <p className="text-lg">{member.dob}</p>
                </div>
                <div>
                  <p className="font-semibold text-2xl">Gender:</p>
                  <p className="text-lg capitalize">{member.gender === 'boy' ? "Male" : "Female"}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-semibold text-2xl">Address:</p>
                  <p className="text-lg">{member.address}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-semibold text-2xl">Skills:</p>
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
        </main>

        <footer className="bg-blue-900 dark:bg-gray-800 text-white text-center py-6 mt-10">
          <p className="text-lg">© 2025 ACM Student Chapter. Built By Maattraan with 💙</p>
        </footer>
      </div>
    </>
  );
}
