
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import StatusCard from "@/components/home/StatusCard";
import { Waves, ArrowRight, MapPin, FileCheck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Waves size={22} className="text-palm-500" />
            <h2 className="text-lg font-bold">Hello, {user?.firstName || "User"}</h2>
          </div>
          <p className="text-muted-foreground text-sm">Welcome back to PalmPay</p>
        </div>
        
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-palm-500 rounded-full border-2 border-white"></span>
        </div>
      </div>
      
      <StatusCard />
      
      <div className="mt-6 mb-4">
        <h3 className="font-medium">Quick Actions</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Link to="/wallet" className="palm-card-interactive flex flex-col items-center justify-center py-4 text-center">
          <CreditCard size={24} className="text-palm-500 mb-2" />
          <span className="text-sm">Payment Methods</span>
        </Link>
        
        <Link to="/enrollment-centers" className="palm-card-interactive flex flex-col items-center justify-center py-4 text-center">
          <MapPin size={24} className="text-palm-500 mb-2" />
          <span className="text-sm">Enrollment Centers</span>
        </Link>
        
        <Link to="/verification" className="palm-card-interactive flex flex-col items-center justify-center py-4 text-center">
          <FileCheck size={24} className="text-palm-500 mb-2" />
          <span className="text-sm">ID Verification</span>
        </Link>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Recent Transactions</h3>
          <Link to="/notifications" className="text-palm-500 text-sm flex items-center gap-1">
            View all
            <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="palm-card-interactive flex justify-between items-center py-3 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <img 
                src="/lovable-uploads/49b4cf5f-acde-498d-b5f6-606d666aabfc.png" 
                alt="Transaction" 
                className="w-6 h-6"
              />
            </div>
            <div>
              <div className="font-medium">Grocery Store</div>
              <div className="text-sm text-muted-foreground">Today, 2:34 PM</div>
            </div>
          </div>
          <div className="font-semibold">-$24.50</div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
