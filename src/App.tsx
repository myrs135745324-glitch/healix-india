import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import Dashboard from "./pages/Dashboard";
import DietPlanner from "./pages/DietPlanner";
import NearMe from "./pages/NearMe";
import PeriodTracker from "./pages/PeriodTracker";
import BudgetTracker from "./pages/BudgetTracker";
import AIChat from "./pages/AIChat";
import ProfilePage from "./pages/ProfilePage";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AuthGate({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setNeedsOnboarding(true);
        setLoading(false);
        return;
      }
      const { data: profile } = await supabase.from("profiles").select("onboarding_complete").eq("id", session.user.id).single();
      if (!profile?.onboarding_complete) {
        setNeedsOnboarding(true);
      }
      setLoading(false);
    };
    check();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      check();
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (needsOnboarding) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<AuthGate><AppLayout><Dashboard /></AppLayout></AuthGate>} />
          <Route path="/diet" element={<AuthGate><AppLayout><DietPlanner /></AppLayout></AuthGate>} />
          <Route path="/nearme" element={<AuthGate><AppLayout><NearMe /></AppLayout></AuthGate>} />
          <Route path="/period" element={<AuthGate><AppLayout><PeriodTracker /></AppLayout></AuthGate>} />
          <Route path="/budget" element={<AuthGate><AppLayout><BudgetTracker /></AppLayout></AuthGate>} />
          <Route path="/chat" element={<AuthGate><AppLayout><AIChat /></AppLayout></AuthGate>} />
          <Route path="/profile" element={<AuthGate><AppLayout><ProfilePage /></AppLayout></AuthGate>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
