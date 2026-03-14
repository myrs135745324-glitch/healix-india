import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/diet" element={<AppLayout><DietPlanner /></AppLayout>} />
          <Route path="/nearme" element={<AppLayout><NearMe /></AppLayout>} />
          <Route path="/period" element={<AppLayout><PeriodTracker /></AppLayout>} />
          <Route path="/budget" element={<AppLayout><BudgetTracker /></AppLayout>} />
          <Route path="/chat" element={<AppLayout><AIChat /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
