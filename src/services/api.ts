
import { User, BiometricData, PaymentMethod, Transaction, EnrollmentCenter, VerificationDocument } from "@/types";

const API_URL = "https://api.palmpay.example"; // Replace with your actual API URL

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }
  return response.json();
};

// Authentication
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await handleResponse(response);
  localStorage.setItem("token", data.token);
  return data.user;
};

export const register = async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  
  return handleResponse(response);
};

export const logout = () => {
  localStorage.removeItem("token");
};

// User Profile
export const getUserProfile = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return handleResponse(response);
};

export const updateUserProfile = async (profileData: Partial<User>) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/users/profile`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(profileData),
  });
  
  return handleResponse(response);
};

// Biometrics
export const getBiometricData = async (): Promise<BiometricData[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/biometrics/my-data`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return handleResponse(response);
};

export const verifyBiometric = async (biometricData: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/biometrics/verify`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(biometricData),
  });
  
  return handleResponse(response);
};

// Payment Methods
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/payment-methods/my-cards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return handleResponse(response);
};

export const addPaymentMethod = async (cardData: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/payment-methods/add`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(cardData),
  });
  
  return handleResponse(response);
};

export const deletePaymentMethod = async (paymentMethodId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/payment-methods/${paymentMethodId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return handleResponse(response);
};

export const setDefaultPaymentMethod = async (paymentMethodId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/payment-methods/${paymentMethodId}/set-default`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return handleResponse(response);
};

// Transactions
export const getRecentTransactions = async (): Promise<Transaction[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/transaction-logs/recent`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return handleResponse(response);
};

export const getTransactionDetails = async (transactionId: string): Promise<Transaction> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/transaction-logs/${transactionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return handleResponse(response);
};

// Enrollment Centers
export const getEnrollmentCenters = async (): Promise<EnrollmentCenter[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/enrollment-centers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return handleResponse(response);
};

// ID Verification
export const uploadVerificationDocument = async (documentType: string, file: File) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("documentType", documentType);
  formData.append("file", file);
  
  const response = await fetch(`${API_URL}/api/verification/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  
  return handleResponse(response);
};

export const getVerificationStatus = async (): Promise<VerificationDocument[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/verification/status`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return handleResponse(response);
};
