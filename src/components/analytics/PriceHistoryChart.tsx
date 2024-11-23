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

interface PriceHistoryChartProps {
  data?: {
    property_prices?: Array<{ date: string; price: number }>;
    area_avg_prices?: Array<{ date: string; price: number }>;
    city_avg_prices?: Array<{ date: string; price: number }>;
  };
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const PriceHistoryChart = ({ data }: PriceHistoryChartProps) => {
  if (!data?.property_prices) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No price history data available</p>
      </Card>
    );
  }

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
      className="w-full"
    >
      <Card className="p-6 bg-gradient-to-br from-secondary/50 to-secondary border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4 text-primary animate-glow">Price History</h3>
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
    </motion.div>
  );
};

export default PriceHistoryChart;