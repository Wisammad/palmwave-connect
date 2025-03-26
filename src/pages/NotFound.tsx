
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout hideNav>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertCircle size={30} className="text-red-500" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
        
        <a href="/" className="palm-card-interactive px-6 py-3 inline-flex items-center justify-center bg-palm-500 text-white">
          Return to Home
        </a>
      </div>
    </AppLayout>
  );
};

export default NotFound;
