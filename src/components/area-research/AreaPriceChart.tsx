import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AreaPriceChartProps {
  data: any[];
  selectedAreas: string[];
}

const AreaPriceChart = ({ data, selectedAreas }: AreaPriceChartProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Price History Comparison</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedAreas.map((postcode, index) => (
              <Line
                key={postcode}
                type="monotone"
                dataKey={postcode}
                stroke={`hsl(${index * 60}, 70%, 50%)`}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AreaPriceChart;