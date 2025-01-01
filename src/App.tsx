import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import SideNav from "./components/SideNav";
import Index from "./pages/Index";
import ViewedProperties from "./pages/ViewedProperties";
import ComparisonPage from "./pages/ComparisonPage";
import PropertyAnalytics from "./pages/PropertyAnalytics";
import AreaResearch from "./pages/AreaResearch";
import AuthPage from "./pages/AuthPage";
import MortgagePage from "./pages/MortgagePage";
import ConveyancingPage from "./pages/ConveyancingPage";
import AiConsultant from "./pages/AiConsultant";
import { ComparisonButton } from "./components/ComparisonButton";
import { motion } from "framer-motion";

const queryClient = new QueryClient();

const AppLayout = ({ children }) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <SideNav onCollapsedChange={setIsMenuCollapsed} />
      <motion.main
        initial={false}
        animate={{
          marginLeft: isMenuCollapsed ? "4.5rem" : "16rem",
          width: isMenuCollapsed ? "calc(100% - 4.5rem)" : "calc(100% - 16rem)"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 p-8"
      >
        {children}
      </motion.main>
      <ComparisonButton />
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ComparisonProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/auth"
                element={
                  isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />
                }
              />
              <Route
                path="/*"
                element={
                  isAuthenticated ? (
                    <AppLayout>
                      <Routes>
                        <Route path="/area-research" element={<AreaResearch />} />
                        <Route path="/" element={<Index />} />
                        <Route path="/viewed-properties" element={<ViewedProperties />} />
                        <Route path="/comparison" element={<ComparisonPage />} />
                        <Route path="/property/:id/analytics" element={<PropertyAnalytics />} />
                        <Route path="/mortgage" element={<MortgagePage />} />
                        <Route path="/conveyancing" element={<ConveyancingPage />} />
                        <Route path="/ai-consultant" element={<AiConsultant />} />
                      </Routes>
                    </AppLayout>
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />
            </Routes>
          </BrowserRouter>
        </ComparisonProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;