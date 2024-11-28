import { Card } from "@/components/ui/card";

interface AreaAnalytics {
  average_price: number;
  postcode: string;
  rental_yields?: { average?: number };
  historical_prices?: Record<string, number>;
}

interface AreaInsightsProps {
  areaAnalytics: AreaAnalytics[];
}

const AreaInsights = ({ areaAnalytics }: AreaInsightsProps) => {
  const calculateGrowthRate = (historical_prices: Record<string, number> | undefined) => {
    if (!historical_prices) return 'N/A';
    
    const prices = Object.values(historical_prices);
    if (prices.length < 2) return 'N/A';
    
    const firstPrice = Number(prices[0]);
    const lastPrice = Number(prices[prices.length - 1]);
    
    if (isNaN(firstPrice) || isNaN(lastPrice) || firstPrice === 0) return 'N/A';
    
    return `${((lastPrice / firstPrice - 1) * 100).toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {areaAnalytics.map((area) => (
        <Card key={area.postcode} className="p-4">
          <h4 className="font-medium mb-2">{area.postcode}</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average Price</span>
              <span className="font-medium">£{area.average_price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rental Yield</span>
              <span className="font-medium">
                {area.rental_yields?.average ? `${area.rental_yields.average}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Annual Growth</span>
              <span className="font-medium">
                {calculateGrowthRate(area.historical_prices)}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AreaInsights;