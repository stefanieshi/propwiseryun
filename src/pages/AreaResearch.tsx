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
    if (!searchTerm) return;
    
    if (selectedAreas.length >= 5) {
      toast.error("You can compare up to 5 areas at a time");
      return;
    }

    if (selectedAreas.includes(searchTerm)) {
      toast.error("This area is already selected");
      return;
    }

    const { data, error } = await supabase
      .from("area_analytics")
      .select("postcode")
      .ilike("postcode", `${searchTerm}%`)
      .limit(1)
      .single();

    if (error) {
      toast.error("Area not found");
      return;
    }

    setSelectedAreas(prev => [...prev, data.postcode]);
    setSearchTerm("");
  };

  const removeArea = (postcode: string) => {
    setSelectedAreas(prev => prev.filter(p => p !== postcode));
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

  const getHeatmapData = () => {
    if (!areaAnalytics) return [];
    
    return areaAnalytics.map(area => ({
      area: area.postcode,
      price: area.average_price,
      latitude: Math.random() * 100,
      longitude: Math.random() * 100
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Area Research</h1>
        <p className="text-muted-foreground">
          Compare property trends and market data across different areas
        </p>
      </div>

      <Card className="p-6">
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

        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : areaAnalytics && areaAnalytics.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <AreaPriceChart 
              data={getPriceHistoryData()} 
              selectedAreas={selectedAreas} 
            />

            <AreaInsights areaAnalytics={areaAnalytics} />

            <PriceHeatmap data={getHeatmapData()} />
          </motion.div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            {selectedAreas.length === 0 ? 
              "Search and select areas to view analytics" : 
              "No data available for the selected areas"}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AreaResearch;