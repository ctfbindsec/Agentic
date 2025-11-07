import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
      <select
        {...props}
        className="w-full bg-secondary border border-border text-text rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;