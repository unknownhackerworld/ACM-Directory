
import { useParams, useNavigate } from 'react-router-dom';
import membersData from '../data/members.json';

export default function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = membersData.find(m => m.id.toString() === id);

  if (!member) {
    return <div className="text-center mt-10 text-red-500">Member not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Back to Directory
      </button>

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-1 flex items-center justify-center">
          <img
            src={member.image || `https://via.placeholder.com/250x250.png?text=${member.name.split(' ')[0]}`}
            alt={member.name}
            className="rounded-lg w-full max-w-xs object-cover"
          />
        </div>

        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
          <p className="text-lg mb-4 text-blue-700 dark:text-blue-300">{member.role}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Email:</strong> {member.email}</p>
            <p><strong>Phone:</strong> {member.phone}</p>
            <p><strong>Date of Birth:</strong> {member.dob}</p>
            <p><strong>Address:</strong> {member.address}</p>
            <p><strong>Domain:</strong> {member.domain}</p>
            <p><strong>Skills:</strong> {member.skills.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}