// src/components/FilterSelect.jsx
import React from 'react';

export default function FilterSelect({ label, options, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      <select
        className="w-full px-3 py-2 rounded-md text-black dark:text-white bg-gray-100 dark:bg-gray-700"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
