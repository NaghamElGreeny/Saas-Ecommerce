"use client";

import { useState } from "react";

const tabs = [
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

interface Props {
  onStatusChange: (status: string) => void;
}

export default function OrderStatusTabs({ onStatusChange }: Props) {
  const [active, setActive] = useState("in_progress");

  const handleClick = (value: string) => {
    setActive(value);
    onStatusChange(value);
  };

  return (
    <div className="flex max-w-[600px] justify-center gap-2 rounded-full bg-gray-50 p-2 text-sm md:text-base mx-auto transition-all duration-300">
      {tabs.map((tab) => {
        const isActive = active === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => handleClick(tab.value)}
            className={`px-4 py-2 font-semibold rounded-full transition-all duration-300
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
