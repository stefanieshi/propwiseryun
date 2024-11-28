import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface AreaAnalytics {
  average_price: number;
  city: string;
  rental_yields: {
    average: number;
  } | null;
  price_history: Array<{
    date: string;
    price: number;
  }> | null;
}

const AreaResearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: areaAnalytics, isLoading } = useQuery({
    queryKey: ["areaAnalytics", searchTerm],
    queryFn: async () => {
      if (!searchTerm) return null;
      const { data, error } = await supabase
        .from("area_analytics")
        .select("*")
        .ilike("postcode", `${searchTerm}%`)
        .limit(1)
        .single();

      if (error) throw error;
      return data as AreaAnalytics;
    },
    enabled: !!searchTerm
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Area Research</h1>
        <p className="text-muted-foreground">
          Analyze price trends and market data for different areas
        </p>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Enter postcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : areaAnalytics ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Average Price</h3>
                <p className="text-2xl font-bold">£{areaAnalytics.average_price.toLocaleString()}</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="text-2xl font-bold">{areaAnalytics.city}</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Rental Yield</h3>
                <p className="text-2xl font-bold">
                  {areaAnalytics.rental_yields?.average ?? "N/A"}%
                </p>
              </Card>
            </div>

            {areaAnalytics.price_history && Array.isArray(areaAnalytics.price_history) && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Price History</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={areaAnalytics.price_history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </motion.div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Enter a postcode to view area analytics
          </div>
        )}
      </Card>
    </div>
  );
};

export default AreaResearch;