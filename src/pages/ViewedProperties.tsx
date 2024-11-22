import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ViewedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-accent/80 bg-clip-text text-transparent">
              Viewed Properties
            </h2>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="hover:scale-105 transition-transform"
            >
              Back
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

export default ViewedProperties;