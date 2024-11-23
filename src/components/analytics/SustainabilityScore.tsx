import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

interface SustainabilityScoreProps {
  data?: {
    energy_efficiency: number;
    green_features: string[];
    environmental_impact: number;
  };
}

const SustainabilityScore = ({ data }: SustainabilityScoreProps) => {
  if (!data) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No sustainability data available</p>
      </Card>
    );
  }

  const getEnergyRating = (score: number) => {
    if (score >= 90) return { label: "A", color: "text-green-500" };
    if (score >= 80) return { label: "B", color: "text-green-400" };
    if (score >= 70) return { label: "C", color: "text-yellow-500" };
    if (score >= 60) return { label: "D", color: "text-yellow-400" };
    if (score >= 50) return { label: "E", color: "text-orange-500" };
    if (score >= 40) return { label: "F", color: "text-red-400" };
    return { label: "G", color: "text-red-500" };
  };

  const rating = getEnergyRating(data.energy_efficiency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Sustainability Score</h3>
          <Leaf className="h-5 w-5 text-green-500" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Energy Rating</p>
            <span className={`text-4xl font-bold ${rating.color}`}>
              {rating.label}
            </span>
          </div>
          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Environmental Impact</p>
            <span className="text-4xl font-bold text-primary">
              {data.environmental_impact}/10
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Green Features</h4>
          <div className="flex flex-wrap gap-2">
            {data.green_features.map((feature, index) => (
              <Badge key={index} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SustainabilityScore;