
import React from "react";
import { Shield, Fingerprint } from "lucide-react";

interface IdentityCardProps {
  title: string;
  status: string;
  icon: "shield" | "fingerprint";
  statusColor: "blue" | "green" | "yellow";
}

const IdentityCard = ({ title, status, icon, statusColor }: IdentityCardProps) => {
  const getStatusClasses = () => {
    switch (statusColor) {
      case "green":
        return "bg-green-50 text-green-600";
      case "yellow":
        return "bg-yellow-50 text-yellow-600";
      default:
        return "bg-palm-100 text-palm-600";
    }
  };

  const IconComponent = icon === "shield" ? Shield : Fingerprint;

  return (
    <div className="palm-card-interactive flex items-center gap-4">
      <div className="bg-slate-100 rounded-full p-3">
        <IconComponent size={20} className="text-palm-600" />
      </div>
      
      <div className="flex-1">
        <span className="font-medium">{title}</span>
      </div>
      
      <div className={`palm-pill ${getStatusClasses()}`}>
        {status}
      </div>
    </div>
  );
};

export default IdentityCard;
