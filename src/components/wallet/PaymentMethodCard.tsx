
import React from "react";
import { CreditCard, Trash2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaymentMethodProps {
  id: string;
  name: string;
  last4: string;
  expiry: string;
  type: "visa" | "mastercard" | "amex" | "bank";
  isDefault?: boolean;
  onDelete?: () => void;
  onSetDefault?: () => void;
}

const PaymentMethodCard = ({
  name,
  last4,
  expiry,
  type,
  isDefault = false,
  onDelete,
  onSetDefault,
}: PaymentMethodProps) => {
  return (
    <div className={cn(
      "palm-card-interactive relative overflow-hidden",
      isDefault ? "bg-gradient-to-r from-palm-500 to-palm-600 text-white" : ""
    )}>
      <div className="absolute top-2 right-2">
        {isDefault ? (
          <span className="palm-pill bg-white/20 backdrop-blur-sm text-white text-xs">Default</span>
        ) : (
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-full" onClick={onSetDefault}>
              <Star size={16} className="text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full" onClick={onDelete}>
              <Trash2 size={16} className="text-slate-400" />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <CreditCard 
          size={24} 
          className={isDefault ? "text-white" : "text-palm-600"} 
          strokeWidth={isDefault ? 1.5 : 2}
        />
        <span className={cn(
          "font-medium",
          isDefault ? "text-white" : "text-foreground"
        )}>
          {name}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <div className={cn(
            "text-sm font-mono",
            isDefault ? "text-white/80" : "text-muted-foreground"
          )}>
            **** {last4}
          </div>
          <div className={cn(
            "text-xs mt-1",
            isDefault ? "text-white/70" : "text-muted-foreground"
          )}>
            Expires {expiry}
          </div>
        </div>
        
        <div className={cn(
          "uppercase text-sm font-semibold",
          isDefault ? "text-white" : "text-foreground"
        )}>
          {type}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
