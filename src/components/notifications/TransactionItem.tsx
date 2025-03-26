
import React from "react";
import { Check, CreditCard, ShoppingBag, Coffee, ArrowDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TransactionProps {
  id: string;
  title: string;
  amount: string;
  type: "payment" | "refund" | "deposit";
  merchant: string;
  date: string;
  status: "completed" | "pending" | "failed";
  category: "shopping" | "food" | "bills" | "transport" | "other";
  isNew?: boolean;
}

const getCategoryIcon = (category: TransactionProps["category"]) => {
  switch (category) {
    case "shopping":
      return <ShoppingBag size={20} />;
    case "food":
      return <Coffee size={20} />;
    default:
      return <CreditCard size={20} />;
  }
};

const getTypeIcon = (type: TransactionProps["type"]) => {
  switch (type) {
    case "refund":
      return <ArrowDownLeft size={20} className="text-green-500" />;
    default:
      return null;
  }
};

const TransactionItem = ({
  title,
  amount,
  type,
  merchant,
  date,
  status,
  category,
  isNew = false,
}: TransactionProps) => {
  return (
    <div className={cn(
      "palm-card-interactive flex items-center gap-4 border-l-4",
      {
        "border-l-palm-500": isNew,
        "border-l-transparent": !isNew,
      }
    )}>
      <div className="bg-slate-100 rounded-full p-3">
        {getCategoryIcon(category)}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium">{title}</span>
          <span className={cn(
            "font-semibold",
            type === "refund" ? "text-green-600" : ""
          )}>
            {type === "refund" ? "+" : "-"}{amount}
          </span>
        </div>
        
        <div className="flex justify-between mt-1">
          <span className="text-sm text-muted-foreground">{merchant}</span>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
      </div>
      
      {status === "completed" && (
        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
          <Check size={14} className="text-green-600" />
        </div>
      )}
      
      {getTypeIcon(type)}
    </div>
  );
};

export default TransactionItem;
