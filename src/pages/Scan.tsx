
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Check, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Scan = () => {
  const [scanning, setScanning] = useState(true);
  const [found, setFound] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate finding a terminal
    const findTimer = setTimeout(() => {
      setScanning(false);
      setFound(true);
      
      toast({
        title: "Terminal found",
        description: "Place your palm on the terminal to complete payment",
      });
    }, 2000);
    
    // Simulate completing payment
    const completeTimer = setTimeout(() => {
      if (found) {
        setCompleted(true);
        
        toast({
          title: "Payment successful",
          description: "Transaction of $24.50 completed",
          variant: "default",
        });
        
        // Navigate back to home after success
        setTimeout(() => {
          navigate("/notifications");
        }, 2000);
      }
    }, 4000);
    
    return () => {
      clearTimeout(findTimer);
      clearTimeout(completeTimer);
    };
  }, [found, toast, navigate]);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">
            {scanning ? "Scanning for terminals..." : 
             found && !completed ? "Terminal found" : 
             "Payment complete"}
          </h1>
          <p className="text-muted-foreground">
            {scanning ? "Please stand near a PalmPay terminal" : 
             found && !completed ? "Place your palm on the terminal" : 
             "Thank you for using PalmPay"}
          </p>
        </div>
        
        <div className="relative mb-8">
          <div className={`w-64 h-64 rounded-full ${
            scanning ? "bg-palm-100 animate-pulse" : 
            found && !completed ? "bg-palm-200" : 
            "bg-green-100"
          } flex items-center justify-center`}>
            
            <div className={`w-48 h-48 rounded-full ${
              scanning ? "bg-palm-200" : 
              found && !completed ? "bg-palm-300" : 
              "bg-green-200"
            } flex items-center justify-center`}>
              
              <div className={`w-32 h-32 rounded-full ${
                scanning ? "bg-palm-300 flex items-center justify-center" : 
                found && !completed ? "bg-palm-400 flex items-center justify-center" : 
                "bg-green-500 flex items-center justify-center"
              }`}>
                {completed ? (
                  <Check size={60} className="text-white animate-verify-check" />
                ) : (
                  <img 
                    src="/lovable-uploads/49b4cf5f-acde-498d-b5f6-606d666aabfc.png" 
                    alt="Palm scan" 
                    className={`w-20 h-20 ${scanning ? "animate-pulse-scale" : ""}`}
                  />
                )}
              </div>
            </div>
          </div>
          
          {scanning && (
            <div className="absolute inset-0 rounded-full border-4 border-palm-500 border-t-transparent animate-spin"></div>
          )}
        </div>
        
        {found && !completed && (
          <div className="palm-card animate-slide-in-up flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <CreditCard size={20} className="text-palm-500" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Visa ending in 4242</div>
              <div className="text-sm text-muted-foreground">Default payment method</div>
            </div>
            <ChevronDown size={18} className="text-muted-foreground" />
          </div>
        )}
        
        {completed && (
          <div className="palm-card animate-slide-in-up">
            <div className="text-center">
              <span className="font-semibold text-lg">$24.50</span>
              <p className="text-muted-foreground">Grocery Store</p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

// Import CreditCard for the payment method display
import { CreditCard } from "lucide-react";

export default Scan;
