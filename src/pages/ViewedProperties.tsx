import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types";
import FilterBar from "@/components/properties/FilterBar";
import PropertyGrid from "@/components/properties/PropertyGrid";

const ViewedProperties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [bedroomFilter, setBedroomFilter] = useState("all");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase.from("properties").select("*");

      if (error) throw error;

      setProperties(data || []);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error fetching properties",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceFilter("all");
    setBedroomFilter("all");
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under1m" && property.price < 1000000) ||
      (priceFilter === "1m-2m" &&
        property.price >= 1000000 &&
        property.price < 2000000) ||
      (priceFilter === "over2m" && property.price >= 2000000);
    const matchesBedrooms =
      bedroomFilter === "all" || property.bedrooms.toString() === bedroomFilter;

    return matchesSearch && matchesPrice && matchesBedrooms;
  });

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Saved Properties
            </h1>
            <Button variant="outline" onClick={() => fetchProperties()}>
              Refresh
            </Button>
          </div>

          <Card className="p-6 glass-effect">
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              bedroomFilter={bedroomFilter}
              setBedroomFilter={setBedroomFilter}
              resetFilters={resetFilters}
            />
          </Card>

          <PropertyGrid properties={filteredProperties} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ViewedProperties;