
import React from "react";
import { NavLink } from "react-router-dom";
import { CreditCard, Home, Bell, User, Scan, MapPin, FileCheck } from "lucide-react";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 shadow-soft">
      <div className="max-w-md mx-auto px-4 py-2">
        <nav className="flex justify-between items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `palm-nav-item ${isActive ? "active" : ""}`
            }
          >
            <Home size={22} />
            <span className="text-xs">Home</span>
          </NavLink>
          
          <NavLink
            to="/wallet"
            className={({ isActive }) =>
              `palm-nav-item ${isActive ? "active" : ""}`
            }
          >
            <CreditCard size={22} />
            <span className="text-xs">Wallet</span>
          </NavLink>
          
          <NavLink
            to="/scan"
            className={({ isActive }) =>
              `palm-nav-item ${isActive ? "active" : ""}`
            }
          >
            <div className="relative -mt-8 bg-palm-500 rounded-full p-4 shadow-lg">
              <Scan size={24} className="text-white" />
              <div className="absolute inset-0 rounded-full bg-palm-500/50 animate-ripple"></div>
            </div>
            <span className="text-xs mt-2">Pay</span>
          </NavLink>
          
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `palm-nav-item ${isActive ? "active" : ""}`
            }
          >
            <Bell size={22} />
            <span className="text-xs">Activity</span>
          </NavLink>
          
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `palm-nav-item ${isActive ? "active" : ""}`
            }
          >
            <User size={22} />
            <span className="text-xs">Profile</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default BottomNavigation;
