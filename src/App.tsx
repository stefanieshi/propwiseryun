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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (currentSession) {
          const { data: { session: refreshedSession }, error: refreshError } = 
            await supabase.auth.refreshSession();
          
          if (refreshError) {
            console.error("Session refresh error:", refreshError);
            setSession(null);
            return;
          }
          
          if (refreshedSession) {
            setSession(refreshedSession);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log("Auth state changed:", event, currentSession);
      
      if (event === 'SIGNED_OUT') {
        setSession(null);
        toast.info("You have been signed out");
        return;
      }
      
      if (currentSession) {
        try {
          const { data: { session: refreshedSession }, error: refreshError } = 
            await supabase.auth.refreshSession();
          
          if (refreshError) throw refreshError;
          
          if (refreshedSession) {
            setSession(refreshedSession);
            if (event === 'SIGNED_IN') {
              toast.success("Successfully signed in!");
            }
          }
        } catch (error) {
          console.error("Session refresh error:", error);
          setSession(null);
        }
      }
    });

    initializeAuth();

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