import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Problems from "@/pages/Problems";
import Problem from "@/pages/Problem";
import Profile from "@/pages/Profile";
import Leaderboard from "@/pages/Leaderboard";
import Friends from "@/pages/Friends";
import LoginModal from "@/modals/LoginModal";
import OnboardingModal from "@/modals/OnboardingModal";
import AppLayout from "@/layouts/AppLayout";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

function AppContent() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Always show login modal on app start if not authenticated
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setShowLoginModal(false);
    toast({
      title: "Logged in successfully",
      description: "Welcome back to DuoLeet!",
    });
  };

  const handleSignup = () => {
    setShowLoginModal(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    toast({
      title: "Account created successfully",
      description: "Welcome to DuoLeet!",
    });
  };

  return (
    <TooltipProvider>
      <AppLayout 
        onOpenLoginModal={() => setShowLoginModal(true)}
        onOpenOnboarding={() => setShowOnboarding(true)}
      >
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/problems" component={Problems} />
          <Route path="/problem/:id" component={Problem} />
          <Route path="/profile" component={Profile} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/friends" component={Friends} />
          <Route component={NotFound} />
        </Switch>
      </AppLayout>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      <OnboardingModal 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />

      <Toaster />
    </TooltipProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
