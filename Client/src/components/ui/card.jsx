import React from "react";

export function Card({ children }) {
  return <div className="border rounded-lg shadow p-4">{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="border-b pb-2">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function CardDescription({ children }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
