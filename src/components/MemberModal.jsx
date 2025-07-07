import React from 'react';
import { Dialog } from '@headlessui/react';

export default function MemberModal({ member, onClose }) {
  return (
    <Dialog open={!!member} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-xl shadow-xl max-w-md mx-auto p-6 z-50 relative">
          <Dialog.Title className="text-2xl font-bold mb-2">{member.name}</Dialog.Title>
          <p className="text-sm text-gray-600 mb-1"><strong>Role:</strong> {member.role}</p>
          <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {member.email}</p>
          <p className="text-sm text-gray-600"><strong>Skills:</strong> {member.skills.join(', ')}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
}
