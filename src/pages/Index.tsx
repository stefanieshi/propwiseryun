import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property, UserProgress } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Home,
  TrendingUp,
  Calculator,
  FileText,
  CheckCircle,
  PlusCircle,
} from "lucide-react";

// Extract ProgressTracker into a separate component for better organization
const ProgressTracker = ({ userProgress }: { userProgress: UserProgress | null }) => {
  const progressSteps = [
    { title: "Research", icon: Home },
    { title: "Financial Analysis", icon: Calculator },
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-xl mx-auto px-4 py-2">
        <Card className="p-2">
          <h2 className="text-xs font-semibold mb-1.5">Your Home Buying Journey</h2>
          <Progress value={calculateProgress()} className="mb-1.5 h-1.5" />
          <div className="grid grid-cols-4 gap-1">
            {progressSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = userProgress?.stage.toLowerCase() === step.title.toLowerCase();
              const isCompleted = calculateProgress() > ((index + 1) / progressSteps.length) * 100;
              
              return (
                <div
                  key={step.title}
                  className={`flex flex-col items-center p-1 rounded-lg ${
                    isActive ? "bg-primary/10" : ""
                  }`}
                >
                  <StepIcon
                    className={`h-3 w-3 mb-0.5 ${
                      isCompleted ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  <span className="text-[9px] font-medium">{step.title}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
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

      // Map the properties data to match our Property interface
      const mappedProperties: Property[] = (propertiesData || []).map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        location: p.location,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        sqft: p.sqft,
        type: p.property_type,
        description: p.description || '',
        imageUrl: p.image_url || '',
        source_url: p.source_url,
        created_at: p.created_at,
        updated_at: p.updated_at
      }));

      // Fetch user progress
      const { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (progressError && progressError.code !== "PGRST116") throw progressError;

      setProperties(mappedProperties);
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

  return (
    <div className="min-h-screen bg-background pt-16">
      <ProgressTracker userProgress={userProgress} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-semibold">Market Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  View current market trends and analytics
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate("/market-analysis")}>
                View
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Calculator className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-semibold">ROI Calculator</h3>
                <p className="text-sm text-muted-foreground">
                  Calculate potential returns
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate("/calculator")}>
                Calculate
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <PlusCircle className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-semibold">Add Property</h3>
                <p className="text-sm text-muted-foreground">
                  Save a new property
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate("/add-property")}>
                Add
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
