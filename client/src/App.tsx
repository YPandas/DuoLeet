import { useEffect, useRef, useState } from "react";
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
import { AuthProvider } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { toast } = useToast();

  // TRACKING HOOK (per-page clicks):

  const startTimeRef = useRef<number>(Date.now());
  const clickCountsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const handleClick = () => {
      const path = window.location.pathname;
      clickCountsRef.current[path] = (clickCountsRef.current[path] || 0) + 1;
      console.log(`Click #${clickCountsRef.current[path]} on ${path}`);
    };

    const handleBeforeUnload = () => {
      const elapsedMs = Date.now() - startTimeRef.current;
      console.log(`Total time on app: ${elapsedMs} ms`);

      let totalClicks = 0;
      Object.entries(clickCountsRef.current).forEach(([page, clicks]) => {
        console.log(`Page ${page}: ${clicks} clicks`);
        totalClicks += clicks;
      });
      console.log(`Total clicks: ${totalClicks}`);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // FIRST-VISIT LOGIN / ONBOARDING

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      const timer = setTimeout(() => setShowLoginModal(true), 1000);
      localStorage.setItem("hasVisited", "true");
      return () => clearTimeout(timer);
    }
  }, []);


  const handleLogin = () => {
    setShowLoginModal(false);
    toast({
      title: "Logged in successfully",
      description: "Welcome back to DuoLeetcode!",
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
      description: "Welcome to DuoLeetcode!",
    });
  };

  return (
    <AuthProvider>
      <TooltipProvider>
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
        <AppLayout
          onOpenLoginModal={() => setShowLoginModal(true)}
          onOpenOnboarding={() => setShowOnboarding(true)}
        >
          <Switch>
            <Route
              path="/"
              component={() => (
                <Dashboard onOpenOnboarding={() => setShowOnboarding(true)} />
              )}
            />
            <Route path="/problems" component={Problems} />
            <Route path="/problem/:id" component={Problem} />
            <Route path="/profile" component={Profile} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/friends" component={Friends} />
            <Route component={NotFound} />
          </Switch>
        </AppLayout>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
