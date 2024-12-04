import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
}

interface MetricsChartProps {
  properties: Property[];
}

const MetricsChart = ({ properties }: MetricsChartProps) => {
  const data = properties.map((property) => ({
    name: property.title,
    price: property.price,
    sqft: property.sqft,
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          className="glass-effect"
        >
          <XAxis 
            dataKey="name" 
            stroke="#94A3B8"
            tick={{ fill: '#94A3B8' }}
          />
          <YAxis 
            stroke="#94A3B8"
            tick={{ fill: '#94A3B8' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(26, 31, 44, 0.9)',
              border: '1px solid rgba(64, 224, 208, 0.2)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
            itemStyle={{ color: '#40E0D0' }}
            labelStyle={{ color: '#94A3B8' }}
          />
          <Bar 
            dataKey="price" 
            fill="#40E0D0" 
            name="Price (£)"
            radius={[4, 4, 0, 0]}
            className="filter drop-shadow-md"
          />
          <Bar 
            dataKey="sqft" 
            fill="#00CED1" 
            name="Square Footage"
            radius={[4, 4, 0, 0]}
            className="filter drop-shadow-md"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;