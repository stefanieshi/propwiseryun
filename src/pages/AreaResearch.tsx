import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PriceHeatmap from "@/components/analytics/PriceHeatmap";
import { toast } from "sonner";

interface AreaAnalytics {
  average_price: number;
  city: string;
  rental_yields: any;
  price_history: any;
  postcode: string;
  id: string;
  property_types: any;
  historical_prices: any;
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
          .slice(-parseInt(timeRange) * 12) // Convert years to months
          .forEach(([date, price]) => {
            const existingEntry = allData.find(d => d.date === date);
            if (existingEntry) {
              existingEntry[area.postcode] = price;
            } else {
              allData.push({
                date,
                [area.postcode]: price
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
      // These would ideally come from the database, using mock values for now
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="flex gap-2">
            <Input
              placeholder="Enter postcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4" />
            </Button>
          </div>

          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="house">Houses</SelectItem>
              <SelectItem value="flat">Flats</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Year</SelectItem>
              <SelectItem value="3">3 Years</SelectItem>
              <SelectItem value="5">5 Years</SelectItem>
              <SelectItem value="10">10 Years</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-250000">Up to £250k</SelectItem>
              <SelectItem value="250000-500000">£250k - £500k</SelectItem>
              <SelectItem value="500000-1000000">£500k - £1M</SelectItem>
              <SelectItem value="1000000+">£1M+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {selectedAreas.map((postcode) => (
            <div
              key={postcode}
              className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full"
            >
              <span>{postcode}</span>
              <button
                onClick={() => removeArea(postcode)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

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
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Price History Comparison</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getPriceHistoryData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedAreas.map((postcode, index) => (
                      <Line
                        key={postcode}
                        type="monotone"
                        dataKey={postcode}
                        stroke={`hsl(${index * 60}, 70%, 50%)`}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {areaAnalytics.map((area) => (
                <Card key={area.id} className="p-4">
                  <h4 className="font-medium mb-2">{area.postcode}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Price</span>
                      <span className="font-medium">£{area.average_price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rental Yield</span>
                      <span className="font-medium">
                        {area.rental_yields?.average ? `${area.rental_yields.average}%` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Growth</span>
                      <span className="font-medium">
                        {area.historical_prices ? 
                          `${((Object.values(area.historical_prices).slice(-1)[0] as number / 
                             Object.values(area.historical_prices)[0] as number - 1) * 100).toFixed(1)}%` 
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

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