import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Code2, 
  User, 
  Trophy, 
  Users, 
  X
} from "lucide-react";

interface NavigationProps {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  onOpenLoginModal: () => void;
}

export default function Navigation({ 
  sidebarOpen, 
  setSidebarOpen,
  onOpenLoginModal
}: NavigationProps) {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  const NAV_ITEMS = [
    { path: "/", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { path: "/problems", label: "Problems", icon: <Code2 className="w-5 h-5" /> },
    { path: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { path: "/leaderboard", label: "Leaderboard", icon: <Trophy className="w-5 h-5" /> },
    { path: "/friends", label: "Friends", icon: <Users className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <div 
      className={cn(
        "bg-white w-64 border-r border-neutral-200 flex-shrink-0 transition-transform duration-300 ease-in-out lg:static fixed inset-y-0 left-0 z-40",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo and Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-600">DuoLeetcode</span>
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
          {isAuthenticated ? (
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img 
                  className="h-10 w-10 rounded-full" 
                  src="https://images.unsplash.com/photo-1500479694472-551d1fb6258d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                  alt="User avatar" 
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-700">CodeMaster</p>
                <p className="text-xs text-neutral-500">Level 3 • 7 day streak</p>
              </div>
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
