import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Property, UserProgress } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { LandingHero } from "@/components/LandingHero";
import { FeatureSection } from "@/components/FeatureSection";
import { HomeProgress } from "@/components/home/HomeProgress";
import { QuickActions } from "@/components/home/QuickActions";
import { SavedProperties } from "@/components/home/SavedProperties";

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const generateImageForProperty = async (property: Property) => {
    try {
      const response = await fetch('/api/generate-property-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ property }),
      });

      if (!response.ok) throw new Error('Failed to generate image');
      
      const { image } = await response.json();
      
      const { error: updateError } = await supabase
        .from('properties')
        .update({ image_url: image })
        .eq('id', property.id);

      if (updateError) throw updateError;

      setProperties(prevProperties =>
        prevProperties.map(p =>
          p.id === property.id ? { ...p, image_url: image } : p
        )
      );

      toast({
        title: "Image Generated",
        description: "Property image has been generated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch saved properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from("properties")
        .select("*")
        .limit(6);

      if (propertiesError) throw propertiesError;

      // Generate images for properties that don't have them
      const propertiesWithImages = propertiesData || [];
      for (const property of propertiesWithImages) {
        if (!property.image_url) {
          await generateImageForProperty(property);
        }
      }

      setProperties(propertiesWithImages);
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
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <LandingHero />
        <FeatureSection />
        <HomeProgress userProgress={userProgress} />
        <QuickActions />
        <SavedProperties properties={properties} />
      </main>
    </div>
  );
};

export default Index;