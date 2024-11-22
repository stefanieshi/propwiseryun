import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import SideNav from "./components/SideNav";
import Index from "./pages/Index";
import ViewedProperties from "./pages/ViewedProperties";
import AuthPage from "./pages/AuthPage";
import { Session } from "@supabase/supabase-js";
import { toast } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get current session first
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        // If there's no valid session, clear it
        if (!currentSession) {
          await supabase.auth.signOut();
          setSession(null);
        } else {
          setSession(currentSession);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log("Auth state changed:", event, currentSession);
      
      switch (event) {
        case 'SIGNED_OUT':
          setSession(null);
          toast.info("You have been signed out");
          break;
        case 'SIGNED_IN':
          if (currentSession) {
            setSession(currentSession);
            toast.success("Successfully signed in!");
          }
          break;
        case 'TOKEN_REFRESHED':
          if (currentSession) {
            setSession(currentSession);
          }
          break;
        case 'USER_UPDATED':
          // Re-fetch session to ensure we have the latest state
          const { data: { session: latestSession } } = await supabase.auth.getSession();
          setSession(latestSession);
          break;
        default:
          // For any other events, verify the session
          const { data: { session: verifiedSession } } = await supabase.auth.getSession();
          if (!verifiedSession) {
            setSession(null);
          } else {
            setSession(verifiedSession);
          }
      }
      
      setLoading(false);
    });

    // Initialize auth
    initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/auth"
              element={
                session ? <Navigate to="/" replace /> : <AuthPage />
              }
            />
            <Route
              path="/*"
              element={
                session ? (
                  <div className="flex min-h-screen">
                    <SideNav isExpanded={isNavExpanded} onExpandedChange={setIsNavExpanded} />
                    <main 
                      className="flex-1 p-8 transition-all duration-300"
                      style={{ marginLeft: isNavExpanded ? "256px" : "64px" }}
                    >
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/viewed-properties" element={<ViewedProperties />} />
                      </Routes>
                    </main>
                  </div>
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;