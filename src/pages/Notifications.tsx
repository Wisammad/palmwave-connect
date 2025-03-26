
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import TransactionItem from "@/components/notifications/TransactionItem";

const transactions = [
  {
    id: "tx1",
    title: "Coffee Shop",
    amount: "$4.50",
    type: "payment",
    merchant: "Starbucks",
    date: "Just now",
    status: "completed",
    category: "food",
    isNew: true,
  },
  {
    id: "tx2",
    title: "Grocery Shopping",
    amount: "$65.30",
    type: "payment",
    merchant: "Whole Foods",
    date: "Today, 10:24 AM",
    status: "completed",
    category: "shopping",
    isNew: true,
  },
  {
    id: "tx3",
    title: "Refund",
    amount: "$29.99",
    type: "refund",
    merchant: "Amazon",
    date: "Yesterday",
    status: "completed",
    category: "shopping",
  },
  {
    id: "tx4",
    title: "Restaurant",
    amount: "$42.75",
    type: "payment",
    merchant: "Olive Garden",
    date: "Feb 28, 2023",
    status: "completed",
    category: "food",
  },
  {
    id: "tx5",
    title: "Electronics",
    amount: "$249.99",
    type: "payment",
    merchant: "Best Buy",
    date: "Feb 25, 2023",
    status: "completed",
    category: "shopping",
  },
] as const;

const Notifications = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Recent Activity</h1>
        <p className="text-muted-foreground">View your recent transactions</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-palm-600">Today</h3>
          <div className="text-xs text-muted-foreground">2 new transactions</div>
        </div>
        
        {transactions.slice(0, 2).map((transaction) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
        
        <div className="flex items-center justify-between mt-6">
          <h3 className="font-medium text-palm-600">Earlier</h3>
        </div>
        
        {transactions.slice(2).map((transaction) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Notifications;
