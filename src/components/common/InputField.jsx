// src/components/LegalCases/LegalCaseTools/InputField.jsx
import React from "react";

const InputField = ({ label, name, value, onChange, type = "text", error, placeholder, options }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className={`w-full px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"} dark:border-gray-600 rounded-lg`}
        >
          <option value="">{placeholder}</option>
          {options &&
            options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"} dark:border-gray-600 rounded-lg`}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
