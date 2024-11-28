import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property, UserProgress } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import AreaResearch from "@/components/area-research/AreaResearch";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Home,
  FileText,
  LayoutDashboard,
  CheckCircle,
} from "lucide-react";

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      // Fetch saved properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from("properties")
        .select("*")
        .limit(6);

      if (propertiesError) throw propertiesError;

      // Fetch user progress
      const { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (progressError && progressError.code !== "PGRST116") throw progressError;

      setProperties(propertiesData || []);
      setUserProgress(progressData);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const progressSteps = [
    { title: "Research", icon: Home },
    { title: "Analysis", icon: FileText },
    { title: "Legal Check", icon: FileText },
    { title: "Final Steps", icon: CheckCircle },
  ];

  const calculateProgress = () => {
    if (!userProgress) return 0;
    const totalSteps = progressSteps.length;
    const currentStepIndex = progressSteps.findIndex(
      (step) => step.title.toLowerCase() === userProgress.stage.toLowerCase()
    );
    return ((currentStepIndex + 1) / totalSteps) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Progress Tracker */}
        <Card className="p-4 mb-6 sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Home Buying Progress</h2>
            <span className="text-sm text-muted-foreground">{Math.round(calculateProgress())}% Complete</span>
          </div>
          <Progress value={calculateProgress()} className="h-2 mb-3" />
          <div className="grid grid-cols-4 gap-2">
            {progressSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = userProgress?.stage.toLowerCase() === step.title.toLowerCase();
              const isCompleted = calculateProgress() > ((index + 1) / progressSteps.length) * 100;
              
              return (
                <div
                  key={step.title}
                  className={`flex items-center p-2 rounded-lg ${
                    isActive ? "bg-primary/10" : ""
                  }`}
                >
                  <StepIcon
                    className={`h-4 w-4 mr-1.5 ${
                      isCompleted ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  <span className="text-xs font-medium">{step.title}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Area Research */}
        <div className="mb-8">
          <AreaResearch />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-semibold">Saved Reports</h3>
                <p className="text-sm text-muted-foreground">
                  View your saved AI analysis reports
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate("/saved-reports")}>
                View Reports
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <LayoutDashboard className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-semibold">Comparison Dashboards</h3>
                <p className="text-sm text-muted-foreground">
                  View saved property comparisons
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate("/comparison")}>
                View Dashboards
              </Button>
            </div>
          </Card>
        </div>

        {/* Saved Properties */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Saved Properties</h2>
            <Button onClick={() => navigate("/viewed-properties")}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
