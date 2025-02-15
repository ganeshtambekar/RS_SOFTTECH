import React from "react";

export const Alert = ({ children, variant }) => {
  const color =
    variant === "destructive"
      ? "bg-red-100 text-red-700 border-red-400"
      : "bg-blue-100 text-blue-700 border-blue-400";

  return (
    <div className={`border px-4 py-2 rounded-md ${color}`}>{children}</div>
  );
};

export const AlertDescription = ({ children }) => <p>{children}</p>;
