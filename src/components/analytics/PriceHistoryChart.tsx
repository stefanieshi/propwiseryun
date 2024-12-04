import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { calculateAnnualIncrease, generatePriceInsights } from "./utils/priceCalculations";
import GrowthMetrics from "./GrowthMetrics";
import PriceChart from "./PriceChart";

interface PriceHistoryChartProps {
  data?: {
    property_prices?: Array<{ date: string; price: number }>;
    area_avg_prices?: Array<{ date: string; price: number }>;
    city_avg_prices?: Array<{ date: string; price: number }>;
  };
}

const PriceHistoryChart = ({ data }: PriceHistoryChartProps) => {
  if (!data?.property_prices) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No price history data available</p>
      </Card>
    );
  }

  const propertyIncrease = calculateAnnualIncrease(data.property_prices);
  const areaIncrease = data.area_avg_prices ? calculateAnnualIncrease(data.area_avg_prices) : 0;
  const cityIncrease = data.city_avg_prices ? calculateAnnualIncrease(data.city_avg_prices) : 0;
  
  const insights = generatePriceInsights(propertyIncrease, areaIncrease, cityIncrease);

  const combinedData = data.property_prices.map((item) => ({
    date: item.date,
    'Property Price': item.price,
    'Area Average': data.area_avg_prices?.find(a => a.date === item.date)?.price,
    'City Average': data.city_avg_prices?.find(c => c.date === item.date)?.price,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full space-y-6"
    >
      <Card className="p-6 bg-[#1A1F2C] border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4 text-primary animate-glow">Price History Comparison</h3>
        
        <GrowthMetrics 
          propertyIncrease={propertyIncrease}
          areaIncrease={areaIncrease}
          cityIncrease={cityIncrease}
        />
        
        <PriceChart data={combinedData} />
      </Card>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <Alert key={index} className="bg-primary/5 border-primary/20">
            <AlertDescription>{insight}</AlertDescription>
          </Alert>
        ))}
      </div>
    </motion.div>
  );
};

export default PriceHistoryChart;