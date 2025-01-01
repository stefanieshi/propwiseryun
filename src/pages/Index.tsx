import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property, UserProgress } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { ProgressTracker } from "@/components/home/ProgressTracker";
import { QuickActions } from "@/components/home/QuickActions";

const sampleProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Kitchen Apartment",
    price: 2500000,
    location: "Central London",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    property_type: "Apartment",
    description: "Modern apartment with stunning kitchen and natural lighting",
    image_url: "/lovable-uploads/40b689a6-12a5-4e9d-9f98-61dac7376731.png",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Garden Terrace House",
    price: 3500000,
    location: "North London",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3000,
    property_type: "House",
    description: "Beautiful house with spacious garden and terrace",
    image_url: "/lovable-uploads/2223284a-1a67-4d4f-bb74-60fdb31adda0.png",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Riverside Apartments",
    price: 1800000,
    location: "Thames Bank",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    property_type: "Apartment",
    description: "Modern apartments with riverside views",
    image_url: "/lovable-uploads/cc8e1d8a-b412-4cd4-80bb-6a16c1def4a2.png",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "4",
    title: "Modern Architectural Marvel",
    price: 4500000,
    location: "Hampstead",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4000,
    property_type: "House",
    description: "Unique modern design with panoramic views",
    image_url: "/lovable-uploads/42ca702d-9604-4405-ad47-928c9dc888a4.png",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

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

      setProperties(sampleProperties);

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

  return (
    <ComparisonProvider>
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProgressTracker userProgress={userProgress} />
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
    </ComparisonProvider>
  );
};

export default Index;
