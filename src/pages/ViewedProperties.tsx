import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types";
import { Card } from "@/components/ui/card";
import ComparisonView from "@/components/ComparisonView";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ViewedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [searchParams] = useSearchParams();
  const isCompareMode = searchParams.get('mode') === 'compare';
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data: propertiesData, error } = await supabase
        .from("properties")
        .select("*");

      if (error) throw error;

      const mappedProperties: Property[] = (propertiesData || []).map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        location: p.location,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        sqft: p.sqft,
        type: p.property_type,
        description: p.description || "",
        imageUrl: p.image_url || "",
        source_url: p.source_url,
        created_at: p.created_at,
        updated_at: p.updated_at,
      }));

      setProperties(mappedProperties);
      // In compare mode, select the first 4 properties by default
      if (isCompareMode && mappedProperties.length > 0) {
        setSelectedProperties(mappedProperties.slice(0, 4));
      }
    } catch (error: any) {
      console.error("Error fetching properties:", error.message);
      toast({
        title: "Error fetching properties",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-8">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-accent/80 bg-clip-text text-transparent">
                Property Comparison
              </h1>
            </div>
          </div>

          {properties.length > 0 ? (
            <ComparisonView properties={properties.slice(0, 4)} />
          ) : (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground">
                No properties are available for comparison
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewedProperties;