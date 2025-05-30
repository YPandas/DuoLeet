import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Code, 
  User, 
  Trophy, 
  Users, 
  X,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
  { path: "/problems", label: "Problems", icon: <Code className="h-5 w-5" /> },
  { path: "/leaderboard", label: "Leaderboard", icon: <Trophy className="h-5 w-5" /> },
  { path: "/friends", label: "My Network", icon: <Users className="h-5 w-5" /> },
  { path: "/profile", label: "My Profile", icon: <User className="h-5 w-5" /> },
];

interface NavigationProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onOpenLoginModal: () => void;
}

export default function Navigation({ 
  sidebarOpen, 
  setSidebarOpen,
  onOpenLoginModal
}: NavigationProps) {
  const [location] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location.startsWith(path);
  };

  if (!sidebarOpen) {
    return null;
  }
  
  return (
    <div 
      className="bg-white w-full h-full border-r border-neutral-200 flex-shrink-0 transition-transform duration-300 ease-in-out lg:static fixed inset-y-0 left-0 z-40"
    >
      <div className="flex flex-col h-full">
        {/* Logo and Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-600">DuoLeet</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="lg:hidden text-neutral-500 hover:text-neutral-700 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link href={item.path} key={item.path}>
              <a 
                className={cn(
                  "flex items-center w-full px-2 py-2 text-sm font-medium rounded-md",
                  isActive(item.path) 
                    ? "bg-primary-50 text-primary-700" 
                    : "text-neutral-700 hover:bg-neutral-50"
                )}
              >
                <span className={cn(
                  "mr-3",
                  isActive(item.path) ? "text-primary-500" : "text-neutral-400"
                )}>
                  {item.icon}
                </span>
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
        
        {/* User Profile */}
        <div className="border-t border-neutral-200 p-4">
          {isAuthenticated && user ? (
            <div>
              <div className="flex items-center mb-3">
                <div className="flex-shrink-0">
                  <img 
                    className="h-10 w-10 rounded-full object-contain object-center bg-white" 
                    src={user.avatar} 
                    alt="User avatar" 
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-700">{user.username}</p>
                  <p className="text-xs text-neutral-500">Level {user.level} • {user.streak} day streak</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <button 
              onClick={onOpenLoginModal}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
