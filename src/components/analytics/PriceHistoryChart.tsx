import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PriceHistoryChartProps {
  data?: {
    property_prices?: Array<{ date: string; price: number }>;
    area_avg_prices?: Array<{ date: string; price: number }>;
    city_avg_prices?: Array<{ date: string; price: number }>;
  };
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const calculateAnnualIncrease = (prices: Array<{ date: string; price: number }>) => {
  if (!prices || prices.length < 2) return 0;
  
  const sortedPrices = [...prices].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const firstPrice = sortedPrices[0].price;
  const lastPrice = sortedPrices[sortedPrices.length - 1].price;
  const yearDiff = (
    new Date(sortedPrices[sortedPrices.length - 1].date).getTime() - 
    new Date(sortedPrices[0].date).getTime()
  ) / (1000 * 60 * 60 * 24 * 365);
  
  return ((lastPrice - firstPrice) / firstPrice) * (1 / yearDiff) * 100;
};

const generatePriceInsights = (
  propertyIncrease: number,
  areaIncrease: number,
  cityIncrease: number
) => {
  const insights = [];
  
  // Compare property performance
  if (propertyIncrease > areaIncrease && propertyIncrease > cityIncrease) {
    insights.push("This property has outperformed both area and city averages, showing strong appreciation potential.");
  } else if (propertyIncrease < areaIncrease && propertyIncrease < cityIncrease) {
    insights.push("The property's appreciation rate is below market averages, suggesting potential for future value catch-up.");
  }
  
  // Market dynamics
  if (areaIncrease > cityIncrease) {
    insights.push(`The local area is showing stronger growth (${areaIncrease.toFixed(1)}%) compared to the city average (${cityIncrease.toFixed(1)}%), indicating a developing neighborhood.`);
  }
  
  // Future outlook
  if (propertyIncrease > 0) {
    insights.push(`With an annual appreciation rate of ${propertyIncrease.toFixed(1)}%, this property shows positive long-term value growth.`);
  }
  
  return insights;
};

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
      <Card className="p-6 bg-gradient-to-br from-secondary/50 to-secondary border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4 text-primary animate-glow">Price History</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-background/50 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Property Growth</p>
              <p className="text-2xl font-bold">{propertyIncrease.toFixed(1)}%</p>
            </div>
            {propertyIncrease > 0 ? 
              <TrendingUp className="h-8 w-8 text-green-500" /> : 
              <TrendingDown className="h-8 w-8 text-red-500" />
            }
          </div>
          <div className="p-4 bg-background/50 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Area Growth</p>
              <p className="text-2xl font-bold">{areaIncrease.toFixed(1)}%</p>
            </div>
            {areaIncrease > 0 ? 
              <TrendingUp className="h-8 w-8 text-green-500" /> : 
              <TrendingDown className="h-8 w-8 text-red-500" />
            }
          </div>
          <div className="p-4 bg-background/50 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">City Growth</p>
              <p className="text-2xl font-bold">{cityIncrease.toFixed(1)}%</p>
            </div>
            {cityIncrease > 0 ? 
              <TrendingUp className="h-8 w-8 text-green-500" /> : 
              <TrendingDown className="h-8 w-8 text-red-500" />
            }
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart 
            data={combinedData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            className="animate-fade-in"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis 
              dataKey="date"
              label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
              stroke="#8B5CF6"
              tick={{ fill: '#8B5CF6' }}
            />
            <YAxis 
              tickFormatter={formatPrice}
              label={{ 
                value: 'Price', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
              stroke="#8B5CF6"
              tick={{ fill: '#8B5CF6' }}
            />
            <Tooltip 
              formatter={(value: number) => formatPrice(value)}
              labelFormatter={(label) => `Year: ${label}`}
              contentStyle={{
                backgroundColor: 'rgba(26, 31, 44, 0.9)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              itemStyle={{ color: '#8B5CF6' }}
              labelStyle={{ color: '#8B5CF6' }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                color: '#8B5CF6'
              }}
            />
            <Line
              type="monotone"
              dataKey="Property Price"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={false}
              className="filter drop-shadow-md"
              animationDuration={2000}
            />
            <Line
              type="monotone"
              dataKey="Area Average"
              stroke="#D946EF"
              strokeWidth={2}
              dot={false}
              className="filter drop-shadow-md"
              animationDuration={2000}
              animationBegin={300}
            />
            <Line
              type="monotone"
              dataKey="City Average"
              stroke="#F97316"
              strokeWidth={2}
              dot={false}
              className="filter drop-shadow-md"
              animationDuration={2000}
              animationBegin={600}
            />
          </LineChart>
        </ResponsiveContainer>
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