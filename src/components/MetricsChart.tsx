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
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#1E40AF" name="Price (£)" />
          <Bar dataKey="sqft" fill="#0D9488" name="Square Footage" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;