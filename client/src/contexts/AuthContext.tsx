import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  goals?: {
    solveCount: number;
    daysPerWeek: number;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: { 
    username: string; 
    avatar: string; 
    email: string; 
    password: string;
    goals?: { solveCount: number; daysPerWeek: number };
  }) => Promise<void>;
  updateUserGoals: (goals: { solveCount: number; daysPerWeek: number }) => void;
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
      const parsedUser = JSON.parse(userData);
      
      // Update user data if it has old values (streak 0 or xp 0)
      if (parsedUser.streak === 0 || parsedUser.xp === 0) {
        const updatedUser = {
          ...parsedUser,
          streak: 5,
          xp: 10,
          goals: parsedUser.goals || { solveCount: 3, daysPerWeek: 5 }
        };
        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
      } else {
        setUser(parsedUser);
      }
      
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // For demo purposes, we'll just set authenticated
    // In a real app, you'd validate credentials
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const signup = async (userData: { 
    username: string; 
    avatar: string; 
    email: string; 
    password: string;
    goals?: { solveCount: number; daysPerWeek: number };
  }) => {
    const newUser: User = {
      username: userData.username,
      avatar: userData.avatar,
      level: 1,
      xp: 10,
      streak: 5,
      goals: userData.goals || { solveCount: 3, daysPerWeek: 5 }
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    
    // Store in localStorage
    localStorage.setItem('userData', JSON.stringify(newUser));
    localStorage.setItem('isAuthenticated', 'true');
  };

  const updateUserGoals = (goals: { solveCount: number; daysPerWeek: number }) => {
    if (user) {
      const updatedUser = { ...user, goals };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, updateUserGoals, logout }}>
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
