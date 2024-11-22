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

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error getting session:", error.message);
        toast.error("Authentication error. Please try logging in again.");
        setSession(null);
      } else {
        setSession(session);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
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

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null; // Or a loading spinner
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
                    <SideNav />
                    <main className="flex-1 ml-64 p-8">
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