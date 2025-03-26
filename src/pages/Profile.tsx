
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import IdentityCard from "@/components/profile/IdentityCard";
import { ChevronRight, Shield, Lock, CreditCard, Bell, HelpCircle, LogOut } from "lucide-react";

const menuItems = [
  {
    icon: <Shield size={20} className="text-palm-500" />,
    title: "Security Settings",
    link: "#",
  },
  {
    icon: <Lock size={20} className="text-palm-500" />,
    title: "Privacy",
    link: "#",
  },
  {
    icon: <CreditCard size={20} className="text-palm-500" />,
    title: "Payment Preferences",
    link: "#",
  },
  {
    icon: <Bell size={20} className="text-palm-500" />,
    title: "Notifications",
    link: "#",
  },
  {
    icon: <HelpCircle size={20} className="text-palm-500" />,
    title: "Help & Support",
    link: "#",
  },
];

const Profile = () => {
  return (
    <AppLayout>
      <div className="palm-card flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-slate-200"></div>
        
        <div>
          <h1 className="text-xl font-bold">Alex Johnson</h1>
          <p className="text-muted-foreground">alex.johnson@example.com</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Digital Identity</h2>
        
        <div className="space-y-3">
          <IdentityCard 
            title="Government ID" 
            status="Verified" 
            icon="shield"
            statusColor="green"
          />
          
          <IdentityCard 
            title="Biometric Authentication" 
            status="Active" 
            icon="fingerprint"
            statusColor="blue"
          />
          
          <IdentityCard 
            title="Access Credentials" 
            status="3 Active" 
            icon="fingerprint"
            statusColor="blue"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        
        <div className="palm-card space-y-4 divide-y divide-slate-100">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.title}</span>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
      
      <button className="w-full palm-card-interactive mt-6 py-3 flex items-center justify-center gap-2 text-red-500">
        <LogOut size={18} />
        <span>Sign Out</span>
      </button>
    </AppLayout>
  );
};

export default Profile;
