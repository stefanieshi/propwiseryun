import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PropertyAnalytics from "./pages/PropertyAnalytics";
import ViewedProperties from "./pages/ViewedProperties";
import ComparisonPage from "./pages/ComparisonPage";
import AreaResearch from "./pages/AreaResearch";
import MortgagePage from "./pages/MortgagePage";
import ConveyancingPage from "./pages/ConveyancingPage";
import CommutePage from "./pages/CommutePage";
import AIConsultant from "./pages/AIConsultant";
import AuthPage from "./pages/AuthPage";
import SideNav from "./components/SideNav";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <SideNav />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analytics/:id" element={<PropertyAnalytics />} />
            <Route path="/viewed" element={<ViewedProperties />} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/area-research" element={<AreaResearch />} />
            <Route path="/mortgage" element={<MortgagePage />} />
            <Route path="/conveyancing" element={<ConveyancingPage />} />
            <Route path="/commute" element={<CommutePage />} />
            <Route path="/ai-consultant" element={<AIConsultant />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </main>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;