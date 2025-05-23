import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string, avatarId?: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  username: string;
  email: string;
  avatarId: string;
  level: number;
  streak: number;
  xp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // For demo purposes, we'll just simulate a login
    const mockUser: User = {
      id: "1",
      username: "CodeMaster",
      email,
      avatarId: "wolf2",
      level: 3,
      streak: 7,
      xp: 840
    };
    
    // Store in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(mockUser));
    
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signup = async (email: string, password: string, username: string, avatarId: string = "fox1") => {
    // For demo purposes, we'll just simulate a signup
    const mockUser: User = {
      id: "1",
      username,
      email,
      avatarId,
      level: 1,
      streak: 0,
      xp: 0
    };
    
    // Store in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(mockUser));
    
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
