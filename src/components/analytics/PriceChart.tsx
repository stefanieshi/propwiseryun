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
          stroke="rgba(64, 224, 208, 0.1)"
          className="animate-pulse"
        />
        <XAxis 
          dataKey="date"
          label={{ 
            value: 'Year', 
            position: 'insideBottom', 
            offset: -5,
            style: { fill: '#94A3B8' }
          }}
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
        />
        <YAxis 
          tickFormatter={formatPrice}
          label={{ 
            value: 'Price', 
            angle: -90, 
            position: 'insideLeft',
            style: { fill: '#94A3B8', textAnchor: 'middle' }
          }}
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
        />
        <Tooltip 
          formatter={(value: number) => formatPrice(value)}
          labelFormatter={(label) => `Year: ${label}`}
          contentStyle={{
            backgroundColor: 'rgba(26, 31, 44, 0.9)',
            border: '1px solid rgba(64, 224, 208, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
          itemStyle={{ color: '#40E0D0' }}
          labelStyle={{ color: '#94A3B8' }}
        />
        <Legend 
          wrapperStyle={{
            paddingTop: '20px',
            color: '#94A3B8'
          }}
        />
        <Line
          type="monotone"
          dataKey="Property Price"
          stroke="#40E0D0"
          strokeWidth={3}
          dot={false}
          className="filter drop-shadow-md"
          animationDuration={2000}
        />
        <Line
          type="monotone"
          dataKey="Area Average"
          stroke="#00CED1"
          strokeWidth={2}
          dot={false}
          className="filter drop-shadow-md"
          animationDuration={2000}
          animationBegin={300}
        />
        <Line
          type="monotone"
          dataKey="City Average"
          stroke="#85FFF4"
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