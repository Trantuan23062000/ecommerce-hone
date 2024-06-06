import React from "react";

const BrandCheckbox = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange(id)}
        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
      />
      <label htmlFor={id} className="text-gray-600 ml-3 cursor-pointer">
        {label}
      </label>
      <div className="ml-auto text-gray-600 text-sm"></div>
    </div>
  );
};

export default BrandCheckbox;