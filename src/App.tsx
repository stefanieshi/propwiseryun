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
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        // First clear any potentially invalid sessions
        await supabase.auth.signOut();
        
        // Then check for a valid session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error getting session:", sessionError.message);
          toast.error("Authentication error. Please try logging in again.");
          setSession(null);
        } else if (initialSession) {
          setSession(initialSession);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        toast.error("Authentication error. Please try logging in again.");
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_OUT') {
        setSession(null);
        toast.info("You have been signed out");
      } else if (_event === 'SIGNED_IN') {
        setSession(session);
        toast.success("Successfully signed in!");
      } else if (_event === 'TOKEN_REFRESHED') {
        setSession(session);
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