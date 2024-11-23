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
import { formatPrice } from "./utils/priceCalculations";

interface PriceChartProps {
  data: Array<{
    date: string;
    'Property Price': number;
    'Area Average': number;
    'City Average': number;
  }>;
}

const PriceChart = ({ data }: PriceChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart 
        data={data} 
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
  );
};

export default PriceChart;