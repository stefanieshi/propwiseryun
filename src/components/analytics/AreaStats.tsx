import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AreaStatsProps {
  data?: any;
}

const AreaStats = ({ data }: AreaStatsProps) => {
  if (!data) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No area statistics available</p>
      </Card>
    );
  }

  const metrics = [
    { label: "Schools Rating", value: data.schools_rating, max: 10 },
    { label: "Transport Links", value: data.transport_rating, max: 10 },
    { label: "Crime Rate", value: data.crime_rating, max: 10 },
    { label: "Amenities", value: data.amenities_rating, max: 10 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Area Statistics</h3>
      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{metric.label}</span>
              <span className="text-sm text-muted-foreground">
                {metric.value}/{metric.max}
              </span>
            </div>
            <Progress value={(metric.value / metric.max) * 100} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AreaStats;