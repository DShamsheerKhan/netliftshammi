import React, { useState } from 'react';
import { Field } from 'formik';
import { X } from 'lucide-react';
import './style/CustomMultiSelect.css';
import { FormattedMessage } from "react-intl"

const CustomMultiSelect = ({ name, value, onChange, onBlur, errors, touched }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedValues = Array.isArray(value) ? value : [];

  const options = [
    { value: "Employment", label: "employment / وظيفة" },
    { value: "Business", label: "Business / تجارة" },
    { value: "Real Estate", label: "Real Estate / عقار" },
    { value: "Inheritance", label: "Inheritance / إرث" },
    { value: "Stock", label: "Stock / أسهم" },
    { value: "Other", label: "Other / أخرى" }
  ];

  const handleSelect = (option) => {
    if (!selectedValues.includes(option.value)) {
      const newValue = [...selectedValues, option.value];
      onChange(name, newValue);
    }
    setIsOpen(false);
  };

  const handleRemove = (optionValue) => {
    const newValue = selectedValues.filter(v => v !== optionValue);
    onChange(name, newValue);
  };

  return (
    <div className="custom-multi-select">
      <div 
        className={`custom-multi-select-field ${errors && touched ? 'error' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length === 0 && (
          <span className="custom-multi-select-placeholder"><FormattedMessage id="please_select" /></span>
        )}
        {selectedValues.map((val, index) => (
          <span key={val} className="custom-multi-select-tag">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(val);
              }}
              className="custom-multi-select-remove"
            >
              <X size={14} />
            </button>
            {options.find(opt => opt.value === val)?.label}
            {index < selectedValues.length - 1 && ","}
          </span>
        ))}
      </div>

      {isOpen && (
        <div className="custom-multi-select-dropdown">
          {options
            .filter(option => !selectedValues.includes(option.value))
            .map(option => (
              <div
                key={option.value}
                className="custom-multi-select-option"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
        </div>
      )}

      <Field type="hidden" name={name} value={selectedValues} />
    </div>
  );
};

export default CustomMultiSelect;