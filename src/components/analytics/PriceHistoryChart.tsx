import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PriceHistoryChartProps {
  data?: any;
}

const PriceHistoryChart = ({ data }: PriceHistoryChartProps) => {
  if (!data || !Array.isArray(data)) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No price history data available</p>
      </Card>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceHistoryChart;