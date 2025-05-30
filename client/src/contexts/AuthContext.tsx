import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: { username: string; avatar: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('userData');
    const authStatus = localStorage.getItem('isAuthenticated');
    
    if (userData && authStatus === 'true') {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // For demo purposes, we'll just set authenticated
    // In a real app, you'd validate credentials
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const signup = async (userData: { username: string; avatar: string; email: string; password: string }) => {
    const newUser: User = {
      username: userData.username,
      avatar: userData.avatar,
      level: 1,
      xp: 10,
      streak: 5
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    
    // Store in localStorage
    localStorage.setItem('userData', JSON.stringify(newUser));
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
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
