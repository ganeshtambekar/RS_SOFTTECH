import React from "react";

export function Button({ children, variant = "default", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded ${
        variant === "outline" ? "border border-gray-500" : "bg-blue-600 text-white"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
