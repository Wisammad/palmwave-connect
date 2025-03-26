
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import IdentityCard from "@/components/profile/IdentityCard";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Lock, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  User as UserIcon,
  MapPin,
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserProfile } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  {
    icon: <Shield size={20} className="text-palm-500" />,
    title: "Security Settings",
    link: "#",
  },
  {
    icon: <Lock size={20} className="text-palm-500" />,
    title: "Privacy",
    link: "#",
  },
  {
    icon: <CreditCard size={20} className="text-palm-500" />,
    title: "Payment Preferences",
    link: "/wallet",
  },
  {
    icon: <Bell size={20} className="text-palm-500" />,
    title: "Notifications",
    link: "/notifications",
  },
  {
    icon: <MapPin size={20} className="text-palm-500" />,
    title: "Enrollment Centers",
    link: "/enrollment-centers",
  },
  {
    icon: <FileCheck size={20} className="text-palm-500" />,
    title: "ID Verification",
    link: "/verification",
  },
  {
    icon: <HelpCircle size={20} className="text-palm-500" />,
    title: "Help & Support",
    link: "#",
  },
];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(user?.firstName || "");
  const [editedLastName, setEditedLastName] = useState(user?.lastName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = async () => {
    try {
      setIsUpdating(true);
      await updateUserProfile({
        firstName: editedFirstName,
        lastName: editedLastName,
      });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUpdating(true);
      // Call password change API (to be implemented)
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Password change failed",
        description: "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Call account deletion API (to be implemented)
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully",
      });
      logout();
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: "Failed to delete account",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <AppLayout>
      <div className="palm-card flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-slate-200"></div>
        
        <div>
          <h1 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Digital Identity</h2>
        
        <div className="space-y-3">
          <IdentityCard 
            title="Government ID" 
            status="Verified" 
            icon="shield"
            statusColor="green"
          />
          
          <IdentityCard 
            title="Biometric Authentication" 
            status="Active" 
            icon="fingerprint"
            statusColor="blue"
          />
          
          <IdentityCard 
            title="Access Credentials" 
            status="3 Active" 
            icon="fingerprint"
            statusColor="blue"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        
        <div className="palm-card space-y-4 divide-y divide-slate-100">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.title}</span>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Edit Profile Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <UserIcon size={16} className="mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your personal information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={editedFirstName}
                  onChange={(e) => setEditedFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={editedLastName}
                  onChange={(e) => setEditedLastName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={handleUpdateProfile}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Change Password Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Lock size={16} className="mr-2" />
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Update your account password.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={handleChangePassword}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Password"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Delete Account Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                variant="destructive"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <button className="w-full palm-card-interactive mt-6 py-3 flex items-center justify-center gap-2 text-red-500" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </AppLayout>
  );
};

export default Profile;
