import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { toast } from "sonner";
import PriceHeatmap from "@/components/analytics/PriceHeatmap";
import AreaFilters from "@/components/area-research/AreaFilters";
import AreaInsights from "@/components/area-research/AreaInsights";
import AreaPriceChart from "@/components/area-research/AreaPriceChart";
import AreaResearchHeader from "@/components/area-research/AreaResearchHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AreaAnalytics {
  average_price: number;
  city: string;
  rental_yields: any;
  price_history: any;
  postcode: string;
  id: string;
  property_types: any;
  historical_prices: Record<string, number>;
}

const AreaResearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState("all");
  const [timeRange, setTimeRange] = useState("10");
  const [priceRange, setPriceRange] = useState("all");
  const [searchResults, setSearchResults] = useState<{ postcode: string; city: string }[]>([]);

  const { data: areaAnalytics, isLoading } = useQuery({
    queryKey: ["areaAnalytics", selectedAreas, propertyType, timeRange, priceRange],
    queryFn: async () => {
      if (selectedAreas.length === 0) return [];
      
      const { data, error } = await supabase
        .from("area_analytics")
        .select("*")
        .in("postcode", selectedAreas);

      if (error) {
        toast.error("Failed to fetch area analytics");
        throw error;
      }
      return data as AreaAnalytics[];
    },
    enabled: selectedAreas.length > 0
  });

  const handleSearch = async () => {
    if (!searchTerm) {
      toast.error("Please enter a location or postcode");
      return;
    }

    const { data, error } = await supabase
      .from("area_analytics")
      .select("postcode, city")
      .or(`city.ilike.%${searchTerm}%, postcode.ilike.%${searchTerm}%`)
      .limit(10); // Increased limit to show more results

    if (error || !data || data.length === 0) {
      toast.error("No areas found");
      setSearchResults([]);
      return;
    }

    setSearchResults(data);
    toast.success(`Found ${data.length} areas matching "${searchTerm}"`);
  };

  const addArea = (postcode: string, city: string) => {
    if (selectedAreas.length >= 5) {
      toast.error("You can compare up to 5 areas at a time");
      return;
    }

    if (selectedAreas.includes(postcode)) {
      toast.error("This area is already selected");
      return;
    }

    setSelectedAreas(prev => [...prev, postcode]);
    toast.success(`Added ${city} (${postcode}) to comparison`);
    setSearchResults([]); // Clear search results after selection
    setSearchTerm(""); // Clear search term
  };

  const removeArea = (postcode: string) => {
    setSelectedAreas(prev => prev.filter(p => p !== postcode));
    toast.success(`Removed ${postcode} from comparison`);
  };

  const getPriceHistoryData = () => {
    if (!areaAnalytics) return [];

    const allData: any[] = [];
    areaAnalytics.forEach(area => {
      if (area.historical_prices) {
        Object.entries(area.historical_prices)
          .slice(-parseInt(timeRange) * 12)
          .forEach(([date, price]) => {
            const existingEntry = allData.find(d => d.date === date);
            if (existingEntry) {
              existingEntry[area.postcode] = Number(price);
            } else {
              allData.push({
                date,
                [area.postcode]: Number(price)
              });
            }
          });
      }
    });

    return allData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return (
    <div className="space-y-6">
      <AreaResearchHeader />

      <Card className="p-6 glass-effect">
        <AreaFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedAreas={selectedAreas}
          onSearch={handleSearch}
          onRemoveArea={removeArea}
        />

        {/* Search Results */}
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <ScrollArea className="h-40 rounded-md border p-4">
              <div className="space-y-2">
                {searchResults.map((result) => (
                  <motion.div
                    key={result.postcode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-lg transition-colors"
                  >
                    <span className="text-sm">
                      {result.city} ({result.postcode})
                    </span>
                    <button
                      onClick={() => addArea(result.postcode, result.city)}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Add to comparison
                    </button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}

        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : areaAnalytics && areaAnalytics.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mt-6"
          >
            <AreaPriceChart 
              data={getPriceHistoryData()} 
              selectedAreas={selectedAreas} 
            />

            <AreaInsights areaAnalytics={areaAnalytics} />

            {selectedAreas.length > 1 && (
              <PriceHeatmap 
                data={areaAnalytics.map(area => ({
                  area: area.postcode,
                  price: area.average_price,
                  latitude: Math.random() * 100,
                  longitude: Math.random() * 100
                }))} 
              />
            )}
          </motion.div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg mb-2">
              {selectedAreas.length === 0 ? 
                "Search and select areas to view analytics" : 
                "No data available for the selected areas"}
            </p>
            <p className="text-sm">
              Try searching for a city name or postcode
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AreaResearch;