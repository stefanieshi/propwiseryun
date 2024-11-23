import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface MarketTrendsProps {
  data?: {
    price_per_sqft_trend: Array<{ date: string; value: number }>;
    days_on_market: Array<{ date: string; value: number }>;
    market_health_index: number;
    supply_demand_ratio: number;
  };
}

const MarketTrends = ({ data }: MarketTrendsProps) => {
  if (!data) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No market trends data available</p>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Market Trends</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-secondary/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Market Health Index</p>
            <p className="text-2xl font-bold">{data.market_health_index}/10</p>
          </div>
          <div className="p-4 bg-secondary/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Supply/Demand Ratio</p>
            <p className="text-2xl font-bold">{data.supply_demand_ratio}</p>
          </div>
        </div>

        <div className="h-[300px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.price_per_sqft_trend}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};

export default MarketTrends;