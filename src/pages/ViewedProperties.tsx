import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types";
import FilterBar from "@/components/properties/FilterBar";
import PropertyGrid from "@/components/properties/PropertyGrid";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

const ViewedProperties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [bedroomFilter, setBedroomFilter] = useState("all");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setIsRefreshing(true);
      const { data, error } = await supabase.from("properties").select("*");

      if (error) throw error;

      setProperties(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching properties",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Saved Properties
            </h1>
            <Button 
              variant="outline" 
              onClick={fetchProperties}
              disabled={isRefreshing}
              className="relative group"
            >
              <RefreshCw className={`h-4 w-4 mr-2 transition-transform ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
          <p className="text-muted-foreground">
            View and manage your saved properties
          </p>
        </div>

        {/* Filters Section */}
        <Card className="p-6 glass-effect border-primary/20">
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

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredProperties.length} of {properties.length} properties
            </span>
          </div>
          
          <PropertyGrid 
            properties={filteredProperties} 
            loading={loading} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ViewedProperties;