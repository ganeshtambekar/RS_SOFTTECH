// src/ui/Select.js
import React, { useState, useRef, useEffect } from 'react';

// Define all sub-components first
const SelectTrigger = ({ children, className = "", ...props }) => (
  <div
    className={`flex items-center justify-between p-2 border border-gray-300 rounded-md cursor-pointer ${className}`}
    {...props}
  >
    {children}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  </div>
);

const SelectContent = ({ children, isOpen }) => (
  isOpen && (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
      {children}
    </div>
  )
);

const SelectItem = ({ value, children, onSelect, isSelected }) => (
  <div
    className={`p-2 cursor-pointer hover:bg-gray-100 ${
      isSelected ? 'bg-blue-100' : ''
    }`}
    onClick={() => onSelect(value)}
  >
    <div className="flex items-center">
      {isSelected && (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-blue-600">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )}
      <span className={`${isSelected ? 'ml-2' : 'ml-6'}`}>{children}</span>
    </div>
  </div>
);

const SelectValue = ({ children }) => (
  <div className="truncate">{children}</div>
);

// Main Select component
const Select = ({ 
  children, 
  value = [],  
  onValueChange, 
  multiple = false,
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const safeValue = multiple ? (Array.isArray(value) ? value : []) : value;
  const selectRef = useRef(null);

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue) => {
    if (multiple) {
      const newValues = safeValue.includes(selectedValue)
        ? safeValue.filter((v) => v !== selectedValue)
        : [...safeValue, selectedValue];
      onValueChange(newValues);
    } else {
      onValueChange(selectedValue);
      setIsOpen(false);
    }
  };

  // Function to get display values for course titles in StudentSection
  const getDisplayValues = (selectedValues, children) => {
    if (!selectedValues || (Array.isArray(selectedValues) && selectedValues.length === 0)) {
      return "Select...";
    }

    // For single select
    if (!Array.isArray(selectedValues)) {
      const selectedItem = React.Children.toArray(children).find(
        child => child.props.value === selectedValues
      );
      return selectedItem ? selectedItem.props.children : selectedValues;
    }

    // For multi-select
    const selectedLabels = React.Children.toArray(children)
      .filter(child => selectedValues.includes(child.props.value))
      .map(child => child.props.children);
    
    if (selectedLabels.length === 0) {
      return selectedValues.join(', ');
    }
    
    return selectedLabels.join(', ');
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue>
          {getDisplayValues(safeValue, children)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent isOpen={isOpen}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onSelect: handleSelect,
              isSelected: multiple
                ? safeValue.includes(child.props.value)
                : safeValue === child.props.value,
            });
          }
          return child;
        })}
      </SelectContent>
    </div>
  );
};

// Export all components
export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
};