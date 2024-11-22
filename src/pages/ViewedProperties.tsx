import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ComparisonView from "@/components/ComparisonView";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

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

  const togglePropertySelection = (property: Property) => {
    if (selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties(selectedProperties.filter(p => p.id !== property.id));
    } else {
      if (selectedProperties.length >= 4) {
        toast({
          title: "Maximum properties reached",
          description: "You can compare up to 4 properties at a time",
          variant: "destructive",
        });
        return;
      }
      setSelectedProperties([...selectedProperties, property]);
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
                {isCompareMode ? "Select Properties to Compare" : "Property Comparison"}
              </h1>
            </div>
            {selectedProperties.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {selectedProperties.length} properties selected
              </div>
            )}
          </div>

          {selectedProperties.length > 0 ? (
            <ComparisonView properties={selectedProperties} />
          ) : (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No properties selected</h3>
              <p className="text-muted-foreground">
                Select properties below to compare them
              </p>
            </Card>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <Card
                key={property.id}
                className={`relative cursor-pointer transition-all duration-300 overflow-hidden group hover:shadow-lg ${
                  selectedProperties.find((p) => p.id === property.id)
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
                onClick={() => togglePropertySelection(property)}
              >
                <div className="relative h-48">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {property.title}
                  </h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-accent/80 bg-clip-text text-transparent">
                    £{property.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {property.location}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewedProperties;