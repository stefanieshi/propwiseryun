import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types";
import FilterBar from "@/components/properties/FilterBar";
import PropertyGrid from "@/components/properties/PropertyGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import ComparisonView from "@/components/ComparisonView";
import MetricsChart from "@/components/MetricsChart";

const ViewedProperties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [bedroomFilter, setBedroomFilter] = useState("all");
  const [properties, setProperties] = useState<Property[]>([]);
  const [externalProperties, setExternalProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingProperty, setSavingProperty] = useState(false);
  const [propertyUrl, setPropertyUrl] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
    fetchExternalProperties();
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

  const fetchExternalProperties = async () => {
    try {
      const { data, error } = await supabase.from("external_properties").select("*");
      if (error) throw error;
      setExternalProperties(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching external properties",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const saveExternalProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyUrl) return;

    setSavingProperty(true);
    try {
      const { error } = await supabase.functions.invoke('save-external-property', {
        body: { url: propertyUrl }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property saved successfully",
      });

      setPropertyUrl("");
      fetchExternalProperties();
    } catch (error: any) {
      toast({
        title: "Error saving property",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSavingProperty(false);
    }
  };

  const togglePropertySelection = (property: Property) => {
    if (selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties(selectedProperties.filter(p => p.id !== property.id));
    } else if (selectedProperties.length < 3) {
      setSelectedProperties([...selectedProperties, property]);
    } else {
      toast({
        title: "Maximum properties selected",
        description: "You can compare up to 3 properties at a time",
        variant: "destructive",
      });
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

  const filteredExternalProperties = externalProperties.filter((property) => {
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

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Saved Properties
            </h1>
            {selectedProperties.length > 1 && (
              <Button onClick={() => setShowComparison(!showComparison)}>
                {showComparison ? "Hide Comparison" : "Compare Selected"}
              </Button>
            )}
          </div>

          {showComparison && selectedProperties.length > 1 && (
            <div className="space-y-6">
              <ComparisonView properties={selectedProperties} />
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Price and Size Analysis</h2>
                <MetricsChart properties={selectedProperties} />
              </Card>
            </div>
          )}

          <Card className="p-6">
            <form onSubmit={saveExternalProperty} className="flex gap-4 mb-6">
              <Input
                type="url"
                placeholder="Paste Rightmove or Zoopla property URL..."
                value={propertyUrl}
                onChange={(e) => setPropertyUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={savingProperty}>
                {savingProperty && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Property
              </Button>
            </form>

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

          <Tabs defaultValue="internal" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="internal">Your Properties</TabsTrigger>
              <TabsTrigger value="external">Saved from Web</TabsTrigger>
            </TabsList>
            
            <TabsContent value="internal">
              <PropertyGrid 
                properties={filteredProperties} 
                loading={loading}
                selectedProperties={selectedProperties}
                onPropertySelect={togglePropertySelection}
              />
            </TabsContent>
            
            <TabsContent value="external">
              <PropertyGrid 
                properties={filteredExternalProperties.map(p => ({
                  ...p,
                  source_url: p.url
                }))} 
                loading={loading}
                selectedProperties={selectedProperties}
                onPropertySelect={togglePropertySelection}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ViewedProperties;
