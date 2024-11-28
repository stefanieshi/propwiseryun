import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AreaTrendChartProps {
  data: Array<{
    date: string;
    [key: string]: number | string;
  }>;
  selectedAreas: string[];
}

const AreaTrendChart = ({ data, selectedAreas }: AreaTrendChartProps) => {
  const colors = ["#8B5CF6", "#EC4899", "#F97316", "#10B981"];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Price Trends</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedAreas.map((area, index) => (
              <Line
                key={area}
                type="monotone"
                dataKey={area}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AreaTrendChart;