// src/ui/Badge.js
import React from 'react';

export const Badge = ({ variant = 'default', children, className = '' }) => {
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800',
    destructive: 'bg-red-100 text-red-800',
    outline: 'border border-gray-300 text-gray-700'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};