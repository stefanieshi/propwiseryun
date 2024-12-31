import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import SideNav from "./components/SideNav";
import Index from "./pages/Index";
import ViewedProperties from "./pages/ViewedProperties";
import ComparisonPage from "./pages/ComparisonPage";
import PropertyAnalytics from "./pages/PropertyAnalytics";
import AreaResearch from "./pages/AreaResearch";
import MortgagePage from "./pages/MortgagePage";
import ConveyancingPage from "./pages/ConveyancingPage";
import { ComparisonButton } from "./components/ComparisonButton";
import { motion } from "framer-motion";

const queryClient = new QueryClient();

const AppLayout = ({ children }) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <SideNav onCollapsedChange={setIsMenuCollapsed} isAuthenticated={true} />
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ComparisonProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <AppLayout>
                    <Index />
                  </AppLayout>
                }
              />
              <Route
                path="/area-research"
                element={
                  <AppLayout>
                    <AreaResearch />
                  </AppLayout>
                }
              />
              <Route
                path="/viewed-properties"
                element={
                  <AppLayout>
                    <ViewedProperties />
                  </AppLayout>
                }
              />
              <Route
                path="/comparison"
                element={
                  <AppLayout>
                    <ComparisonPage />
                  </AppLayout>
                }
              />
              <Route
                path="/property/:id/analytics"
                element={
                  <AppLayout>
                    <PropertyAnalytics />
                  </AppLayout>
                }
              />
              <Route
                path="/mortgage"
                element={
                  <AppLayout>
                    <MortgagePage />
                  </AppLayout>
                }
              />
              <Route
                path="/conveyancing"
                element={
                  <AppLayout>
                    <ConveyancingPage />
                  </AppLayout>
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