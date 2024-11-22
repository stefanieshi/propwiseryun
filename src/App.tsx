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
import AuthPage from "./pages/AuthPage";
import { ComparisonButton } from "./components/ComparisonButton";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  useEffect(() => {
    // Check current session
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

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null; // Or a loading spinner
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
                    <div className="flex min-h-screen bg-background">
                      <SideNav onCollapsedChange={setIsMenuCollapsed} />
                      <motion.main
                        initial={false}
                        animate={{
                          marginLeft: isMenuCollapsed ? "4rem" : "16rem",
                          width: isMenuCollapsed ? "calc(100% - 4rem)" : "calc(100% - 16rem)"
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-1 p-8"
                      >
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/viewed-properties" element={<ViewedProperties />} />
                          <Route path="/comparison" element={<ComparisonPage />} />
                        </Routes>
                      </motion.main>
                      <ComparisonButton />
                    </div>
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