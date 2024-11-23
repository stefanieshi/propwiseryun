import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RentalAnalysisProps {
  data?: any;
}

const RentalAnalysis = ({ data }: RentalAnalysisProps) => {
  if (!data) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No rental analysis data available</p>
      </Card>
    );
  }

  const metrics = [
    {
      title: "Estimated Monthly Rent",
      value: data.estimated_rent,
      format: (v: number) => `£${v.toLocaleString()}`,
    },
    {
      title: "Rental Yield",
      value: data.rental_yield,
      format: (v: number) => `${v.toFixed(2)}%`,
    },
    {
      title: "Area Average",
      value: data.area_average,
      format: (v: number) => `£${v.toLocaleString()}`,
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </h3>
            <p className="text-2xl font-bold mt-2">
              {metric.format(metric.value)}
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Rental Price Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default RentalAnalysis;