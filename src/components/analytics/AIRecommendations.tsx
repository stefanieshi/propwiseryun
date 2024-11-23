import { Card } from "@/components/ui/card";
import { Check, AlertTriangle, TrendingUp } from "lucide-react";

interface AIRecommendationsProps {
  recommendations?: string[];
}

const AIRecommendations = ({ recommendations }: AIRecommendationsProps) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No AI recommendations available</p>
      </Card>
    );
  }

  const getIcon = (recommendation: string) => {
    if (recommendation.toLowerCase().includes("good") || recommendation.toLowerCase().includes("positive")) {
      return <Check className="h-5 w-5 text-green-500" />;
    }
    if (recommendation.toLowerCase().includes("caution") || recommendation.toLowerCase().includes("warning")) {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
    return <TrendingUp className="h-5 w-5 text-blue-500" />;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 rounded-lg bg-secondary"
          >
            {getIcon(recommendation)}
            <p className="text-sm">{recommendation}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AIRecommendations;