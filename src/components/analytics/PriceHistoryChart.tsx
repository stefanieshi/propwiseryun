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
  if (!data || !data.property_prices) {
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
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date"
          label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          tickFormatter={formatPrice}
          label={{ 
            value: 'Price', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle' }
          }}
        />
        <Tooltip 
          formatter={(value: number) => formatPrice(value)}
          labelFormatter={(label) => `Year: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="Property Price"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Area Average"
          stroke="hsl(var(--secondary))"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="City Average"
          stroke="hsl(var(--destructive))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceHistoryChart;