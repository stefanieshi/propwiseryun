import { TrendingUp, TrendingDown } from "lucide-react";

interface GrowthMetricsProps {
  propertyIncrease: number;
  areaIncrease: number;
  cityIncrease: number;
}

const GrowthMetrics = ({ propertyIncrease, areaIncrease, cityIncrease }: GrowthMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-background/50 rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Property Growth</p>
          <p className="text-2xl font-bold">{propertyIncrease.toFixed(1)}%</p>
        </div>
        {propertyIncrease > 0 ? 
          <TrendingUp className="h-8 w-8 text-green-500" /> : 
          <TrendingDown className="h-8 w-8 text-red-500" />
        }
      </div>
      <div className="p-4 bg-background/50 rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Area Growth</p>
          <p className="text-2xl font-bold">{areaIncrease.toFixed(1)}%</p>
        </div>
        {areaIncrease > 0 ? 
          <TrendingUp className="h-8 w-8 text-green-500" /> : 
          <TrendingDown className="h-8 w-8 text-red-500" />
        }
      </div>
      <div className="p-4 bg-background/50 rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">City Growth</p>
          <p className="text-2xl font-bold">{cityIncrease.toFixed(1)}%</p>
        </div>
        {cityIncrease > 0 ? 
          <TrendingUp className="h-8 w-8 text-green-500" /> : 
          <TrendingDown className="h-8 w-8 text-red-500" />
        }
      </div>
    </div>
  );
};

export default GrowthMetrics;