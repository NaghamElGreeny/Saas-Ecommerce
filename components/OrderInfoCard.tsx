import React from "react";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InfoCard = ({ title, icon, children }: InfoCardProps) => {
  return (
    <div>
      <div className="mb-1 text-xl font-semibold text-gray-700">{title}</div>
      <div className="flex flex-col h-fit min-h-[80px] justify-center items-start gap-2 rounded-xl bg-gray-100 p-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          {icon}
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
