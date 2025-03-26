
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import PaymentMethodCard from "@/components/wallet/PaymentMethodCard";
import { PlusCircle, CreditCard, AlertCircle } from "lucide-react";
import { getPaymentMethods, addPaymentMethod, deletePaymentMethod, setDefaultPaymentMethod } from "@/services/api";
import { PaymentMethod } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Wallet = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      setIsLoading(true);
      const methods = await getPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load payment methods",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCard = async () => {
    if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
      toast({
        title: "Missing information",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await addPaymentMethod({
        name: cardName,
        number: cardNumber,
        expiry: cardExpiry,
        cvc: cardCvc,
      });
      
      toast({
        title: "Card added",
        description: "Your payment method has been added successfully",
      });
      
      // Reset form
      setCardName("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      
      // Refresh payment methods
      fetchPaymentMethods();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add payment method",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      await deletePaymentMethod(id);
      toast({
        title: "Card deleted",
        description: "Your payment method has been removed",
      });
      fetchPaymentMethods();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete payment method",
        variant: "destructive",
      });
    }
  };

  const handleSetDefaultCard = async (id: string) => {
    try {
      await setDefaultPaymentMethod(id);
      toast({
        title: "Default updated",
        description: "Your default payment method has been updated",
      });
      fetchPaymentMethods();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update default payment method",
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Your Wallet</h1>
        <p className="text-muted-foreground">Manage your payment methods</p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 rounded-full border-4 border-palm-200 border-t-palm-500 animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentMethods.length === 0 ? (
            <div className="palm-card flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-medium">No payment methods</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Add a credit or debit card to make payments with PalmPay
              </p>
            </div>
          ) : (
            paymentMethods.map((method) => (
              <PaymentMethodCard 
                key={method.id} 
                {...method} 
                onDelete={() => handleDeleteCard(method.id)}
                onSetDefault={() => handleSetDefaultCard(method.id)}
              />
            ))
          )}
          
          <Dialog>
            <DialogTrigger asChild>
              <button className="palm-card-interactive border-2 border-dashed border-slate-200 w-full py-4 flex items-center justify-center gap-2 text-muted-foreground hover:border-palm-300 hover:text-palm-500 transition-colors">
                <PlusCircle size={18} />
                <span>Add Payment Method</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>
                  Add a new credit or debit card to your account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName" 
                    placeholder="John Doe" 
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="cardNumber" 
                      placeholder="1234 5678 9012 3456" 
                      className="pl-10"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input 
                      id="cardExpiry" 
                      placeholder="MM/YY" 
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input 
                      id="cardCvc" 
                      placeholder="123" 
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleAddCard}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Card"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
      
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
              <div className="text-sm text-white/70">
                {paymentMethods.find(m => m.isDefault) 
                  ? `Linked to ${paymentMethods.find(m => m.isDefault)?.type} ending in ${paymentMethods.find(m => m.isDefault)?.last4}`
                  : "No default payment method linked"}
              </div>
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
