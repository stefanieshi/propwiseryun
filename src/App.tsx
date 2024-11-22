import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideNav from "./components/SideNav";
import Index from "./pages/Index";
import ViewedProperties from "./pages/ViewedProperties";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

const App = () => {
  // TODO: Implement actual authentication check
  const isAuthenticated = false;

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
                isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />
              }
            />
            <Route
              path="/*"
              element={
                isAuthenticated ? (
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