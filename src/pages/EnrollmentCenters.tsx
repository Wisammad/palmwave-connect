
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { EnrollmentCenter } from "@/types";
import { getEnrollmentCenters } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const EnrollmentCenters = () => {
  const [centers, setCenters] = useState<EnrollmentCenter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        setIsLoading(true);
        const data = await getEnrollmentCenters();
        setCenters(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load enrollment centers",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCenters();
  }, [toast]);

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Palm Enrollment Centers</h1>
        <p className="text-muted-foreground">Visit a center to register your palm biometrics</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 rounded-full border-4 border-palm-200 border-t-palm-500 animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {centers.map((center) => (
            <div key={center.id} className="palm-card-interactive">
              <h3 className="font-bold text-lg">{center.name}</h3>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-palm-500 mt-0.5" />
                  <span className="text-muted-foreground">
                    {center.address}, {center.city}, {center.state} {center.zipCode}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-palm-500" />
                  <span className="text-muted-foreground">{center.hours}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-palm-500" />
                  <span className="text-muted-foreground">{center.phone}</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <a 
                  href={`https://maps.google.com/?q=${center.latitude},${center.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-palm-500 flex items-center gap-1 text-sm hover:underline"
                >
                  Get directions
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default EnrollmentCenters;
