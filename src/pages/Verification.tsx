
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Upload, Check, AlertTriangle, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { uploadVerificationDocument, getVerificationStatus } from "@/services/api";
import { VerificationDocument } from "@/types";

const Verification = () => {
  const [documents, setDocuments] = useState<VerificationDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const data = await getVerificationStatus();
      setDocuments(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load verification documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await uploadVerificationDocument(documentType, file);
      toast({
        title: "Upload successful",
        description: "Your document has been uploaded for verification",
      });
      fetchDocuments();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your document",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <Check size={18} className="text-green-500" />;
      case "rejected":
        return <AlertTriangle size={18} className="text-red-500" />;
      default:
        return <Clock size={18} className="text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "rejected":
        return "Rejected";
      default:
        return "Pending";
    }
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">ID Verification</h1>
        <p className="text-muted-foreground">Upload your ID documents for verification</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 rounded-full border-4 border-palm-200 border-t-palm-500 animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="palm-card mb-6">
            <h2 className="font-bold mb-4">Upload Documents</h2>
            
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="id-upload" 
                  className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-lg p-6 cursor-pointer hover:border-palm-300 transition-colors"
                >
                  <Upload size={20} className="text-palm-500" />
                  <span>Upload ID Card or Driver's License</span>
                  <input
                    id="id-upload"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "id_card")}
                    disabled={isUploading}
                  />
                </label>
              </div>
              
              <div>
                <label 
                  htmlFor="passport-upload" 
                  className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-lg p-6 cursor-pointer hover:border-palm-300 transition-colors"
                >
                  <Upload size={20} className="text-palm-500" />
                  <span>Upload Passport</span>
                  <input
                    id="passport-upload"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "passport")}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="mb-4 flex justify-between items-center">
            <h2 className="font-bold">Your Documents</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchDocuments}
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              <span className="ml-2">Refresh</span>
            </Button>
          </div>
          
          {documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No documents uploaded yet
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="palm-card flex justify-between items-center">
                  <div>
                    <h3 className="font-medium capitalize">
                      {doc.type.replace('_', ' ')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(doc.status)}
                    <span className={`text-sm ${
                      doc.status === "verified" ? "text-green-500" : 
                      doc.status === "rejected" ? "text-red-500" : 
                      "text-yellow-500"
                    }`}>
                      {getStatusText(doc.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </AppLayout>
  );
};

export default Verification;
