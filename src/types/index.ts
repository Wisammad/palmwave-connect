
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface BiometricData {
  id: string;
  userId: string;
  registeredAt: string;
  registrationLocation: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface PaymentMethod {
  id: string;
  name: string;
  last4: string;
  expiry: string;
  type: "visa" | "mastercard" | "amex" | "bank";
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  amount: string;
  type: "payment" | "refund";
  merchant: string;
  date: string;
  status: "completed" | "pending" | "failed";
  category: string;
  isNew?: boolean;
}

export interface EnrollmentCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  hours: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export interface VerificationDocument {
  id: string;
  type: "id_card" | "passport" | "driver_license";
  status: "pending" | "verified" | "rejected";
  uploadedAt: string;
  verifiedAt?: string;
}
