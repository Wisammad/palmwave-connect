
import React from "react";
import BottomNavigation from "./BottomNavigation";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const AppLayout = ({ children, hideNav = false }: AppLayoutProps) => {
  const location = useLocation();
  
  // Add animation class based on route change
  const getAnimationClass = () => {
    return "animate-fade-in";
  };

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col">
      <main className={`flex-1 px-4 pb-20 pt-4 ${getAnimationClass()}`}>
        {children}
      </main>
      {!hideNav && <BottomNavigation />}
    </div>
  );
};

export default AppLayout;
