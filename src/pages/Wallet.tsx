
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import PaymentMethodCard from "@/components/wallet/PaymentMethodCard";
import { PlusCircle } from "lucide-react";

const paymentMethods = [
  {
    id: "pm1",
    name: "Visa Ending",
    last4: "4242",
    expiry: "12/25",
    type: "visa",
    isDefault: true,
  },
  {
    id: "pm2",
    name: "Chase Bank",
    last4: "7890",
    expiry: "09/26",
    type: "mastercard",
    isDefault: false,
  },
  {
    id: "pm3",
    name: "Amex Card",
    last4: "5123",
    expiry: "04/24",
    type: "amex",
    isDefault: false,
  },
] as const;

const Wallet = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Your Wallet</h1>
        <p className="text-muted-foreground">Manage your payment methods</p>
      </div>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <PaymentMethodCard key={method.id} {...method} />
        ))}
        
        <button className="palm-card-interactive border-2 border-dashed border-slate-200 w-full py-4 flex items-center justify-center gap-2 text-muted-foreground hover:border-palm-300 hover:text-palm-500 transition-colors">
          <PlusCircle size={18} />
          <span>Add Payment Method</span>
        </button>
      </div>
      
      <div className="mt-8 mb-6">
        <h2 className="text-xl font-bold">Palm Identity</h2>
        <p className="text-muted-foreground">Your biometric payment credentials</p>
      </div>
      
      <div className="palm-card bg-gradient-to-br from-palm-500 to-palm-700 text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">PalmPay</h3>
          <span className="palm-pill bg-white/20 backdrop-blur-sm text-white text-xs">Active</span>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <img 
                src="/lovable-uploads/49b4cf5f-acde-498d-b5f6-606d666aabfc.png" 
                alt="Palm icon" 
                className="w-6 h-6 opacity-90"
              />
            </div>
            <div>
              <div className="font-medium">Palm Authentication</div>
              <div className="text-sm text-white/70">Linked to Visa ending in 4242</div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-white/80">
          Your palm print is securely stored and can be used for payments at any PalmPay terminal.
        </div>
      </div>
    </AppLayout>
  );
};

export default Wallet;
