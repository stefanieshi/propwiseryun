import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ComparisonView from "@/components/ComparisonView";
import { useToast } from "@/hooks/use-toast";

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
    } catch (error: any) {
      console.error("Error fetching properties:", error.message);
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

  const handleCompare = () => {
    if (selectedProperties.length < 2) {
      toast({
        title: "Not enough properties selected",
        description: "Please select at least 2 properties to compare",
        variant: "destructive",
      });
      return;
    }
    setSelectedProperties([]);
    navigate("/viewed-properties");
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-accent/80 bg-clip-text text-transparent">
              {isCompareMode ? "Select Properties to Compare" : "Viewed Properties"}
            </h2>
            <div className="space-x-4">
              {isCompareMode && (
                <Button
                  onClick={handleCompare}
                  variant="default"
                  className="hover:scale-105 transition-transform"
                  disabled={selectedProperties.length < 2}
                >
                  Compare Selected ({selectedProperties.length})
                </Button>
              )}
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="hover:scale-105 transition-transform"
              >
                Back
              </Button>
            </div>
          </div>

          {selectedProperties.length >= 2 && !isCompareMode && (
            <div className="mb-6">
              <ComparisonView properties={selectedProperties} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isCompareMode && selectedProperties.find((p) => p.id === property.id)
                    ? "ring-2 ring-primary ring-offset-2 scale-[1.02]"
                    : ""
                }`}
                onClick={() => isCompareMode && togglePropertySelection(property)}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewedProperties;