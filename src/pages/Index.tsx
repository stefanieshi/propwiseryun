import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property, UserProgress } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  CheckCircle,
} from "lucide-react";
import QuickActions from "@/components/home/QuickActions";
import EarlyAccessSection from "@/components/home/EarlyAccessSection";

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

      // Fetch properties from Supabase instead of using sample data
      const { data: propertiesData, error: propertiesError } = await supabase
        .from("properties")
        .select("*")
        .limit(3);

      if (propertiesError) throw propertiesError;
      setProperties(propertiesData || []);

      // Fetch user progress
      const { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (progressError && progressError.code !== "PGRST116") throw progressError;

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

        {/* Early Access Section */}
        <EarlyAccessSection />

        {/* Quick Actions */}
        <QuickActions />

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