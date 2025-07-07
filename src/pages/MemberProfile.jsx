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
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white p-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">Member Not Found</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-3 md:px-8 md:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg md:text-xl transition-colors duration-200"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  const avatarUrl = `https://avatar.iran.liara.run/public/${member.gender === 'male' ? "boy" : "girl"}?seed=${member.id}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto py-8 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-20">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 md:gap-3 border border-gray-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl mb-6 md:mb-10 hover:bg-gray-700 transition-colors duration-200 text-base md:text-xl"
          >
            <FaArrowLeft className="text-lg md:text-xl" />
            <span className="font-medium">Back to Directory</span>
          </button>

          <div className="bg-gray-800 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 md:space-y-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className={`w-full h-full rounded-full shadow-md md:shadow-xl border-4 border-blue-900 object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  loading="lazy"
                />
              </div>
              <div className="space-y-1 md:space-y-2">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">{member.name}</h2>
                <p className="text-lg md:text-xl lg:text-2xl text-blue-300 font-medium">{member.role}</p>
                <p className="text-base md:text-lg lg:text-xl text-gray-300">{member.domain}</p>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 text-base md:text-lg">
              <div>
                <p className="font-semibold text-xl md:text-2xl">Email:</p>
                <p className="break-words">{member.email}</p>
              </div>
              <div>
                <p className="font-semibold text-xl md:text-2xl">Phone:</p>
                <p>{member.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-xl md:text-2xl">DOB:</p>
                <p>{member.dob}</p>
              </div>
              <div>
                <p className="font-semibold text-xl md:text-2xl">Gender:</p>
                <p className="capitalize">{member.gender === 'boy' ? "Male" : "Female"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-semibold text-xl md:text-2xl">Address:</p>
                <p>{member.address}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-semibold text-xl md:text-2xl">Skills:</p>
                <div className="flex flex-wrap gap-2 md:gap-3 mt-1 md:mt-2">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-900 text-blue-200 px-3 py-1 md:px-4 md:py-1 rounded-full text-sm md:text-base"
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

      <footer className="bg-gray-950 text-white text-center py-4 md:py-6 mt-6 md:mt-10">
        <p className="text-sm md:text-lg">© 2025 ACM Student Chapter. Built By Maattraan with 💙</p>
      </footer>
    </div>
  );
}