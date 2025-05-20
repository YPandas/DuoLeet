import { useState } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppLayoutProps {
  children: React.ReactNode;
  onOpenLoginModal: () => void;
  onOpenOnboarding: () => void;
}

export default function AppLayout({ 
  children, 
  onOpenLoginModal,
  onOpenOnboarding
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const getPageTitle = () => {
    const path = location.split("/")[1];
    switch (path) {
      case "":
        return "Dashboard";
      case "problems":
        return "Problem Set";
      case "problem":
        return "Two Sum"; // For demo we'll hardcode this, in real app would be dynamic
      case "profile":
        return "My Profile";
      case "leaderboard":
        return "Leaderboard";
      case "friends":
        return "My Network";
      default:
        return "DuoLeetcode";
    }
  };

  const handleNotification = () => {
    toast({
      title: "Goal Completed!",
      description: "You solved 3 problems today. Keep it up!",
    });
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar / Navigation */}
      <Navigation 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        onOpenLoginModal={onOpenLoginModal}
      />
      
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-neutral-200 h-16 flex items-center px-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="text-neutral-500 hover:text-neutral-700 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="ml-4 flex-1">
          <span className="text-xl font-bold text-primary">DuoLeetcode</span>
        </div>
        <button onClick={onOpenLoginModal} className="text-neutral-500 hover:text-neutral-700 focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Header */}
        <header className="hidden lg:flex h-16 bg-white border-b border-neutral-200 px-6 items-center justify-between">
          <h1 className="text-xl font-semibold text-neutral-900">
            {getPageTitle()}
          </h1>
          
          <div className="flex items-center">
            <Button 
              onClick={handleNotification}
              variant="ghost" 
              size="icon" 
              className="relative mr-4 text-neutral-500 hover:text-neutral-700"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-secondary"></span>
            </Button>
            
            <Button 
              onClick={isAuthenticated ? undefined : onOpenLoginModal} 
              variant="outline"
              className="flex items-center text-sm"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </Button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50 pt-16 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
