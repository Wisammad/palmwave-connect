
import React from "react";
import { CheckCircle } from "lucide-react";

const StatusCard = () => {
  return (
    <div className="palm-card mt-8 text-center">
      <div className="flex justify-center mb-2">
        <div className="w-20 h-20 rounded-full bg-palm-50 flex items-center justify-center shadow-soft">
          <div className="animate-verify-check">
            <CheckCircle size={40} className="text-palm-500" strokeWidth={1.5} />
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mt-4 mb-2">Your Digital Identity</h1>
      
      <p className="text-muted-foreground text-center mb-6 max-w-xs mx-auto">
        A unified system for identification, authentication, and authorization across
        your digital and physical life.
      </p>
      
      <div className="space-y-3 mt-8">
        <div className="palm-card-interactive flex justify-between items-center py-4">
          <span className="font-medium">Government ID</span>
          <span className="palm-success-pill">Verified</span>
        </div>
        
        <div className="palm-card-interactive flex justify-between items-center py-4">
          <span className="font-medium">Payment Methods</span>
          <span className="palm-info-pill">5 Linked</span>
        </div>
        
        <div className="palm-card-interactive flex justify-between items-center py-4">
          <span className="font-medium">Access Credentials</span>
          <span className="palm-info-pill">3 Active</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
