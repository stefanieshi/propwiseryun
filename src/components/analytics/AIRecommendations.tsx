import { Card } from "@/components/ui/card";
import { Check, AlertTriangle, TrendingUp, Info, Star, Home, DollarSign, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

  const categorizeRecommendation = (recommendation: string) => {
    const lowerRec = recommendation.toLowerCase();
    if (lowerRec.includes('price') || lowerRec.includes('value') || lowerRec.includes('cost')) {
      return 'pricing';
    }
    if (lowerRec.includes('location') || lowerRec.includes('area') || lowerRec.includes('neighborhood')) {
      return 'location';
    }
    if (lowerRec.includes('invest') || lowerRec.includes('roi') || lowerRec.includes('return')) {
      return 'investment';
    }
    if (lowerRec.includes('market') || lowerRec.includes('trend')) {
      return 'market';
    }
    return 'general';
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'pricing':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'location':
        return <Home className="h-5 w-5 text-blue-500" />;
      case 'investment':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'market':
        return <LineChart className="h-5 w-5 text-purple-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'pricing':
        return 'bg-green-100 text-green-800';
      case 'location':
        return 'bg-blue-100 text-blue-800';
      case 'investment':
        return 'bg-yellow-100 text-yellow-800';
      case 'market':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categorizedRecommendations = recommendations.reduce((acc, recommendation) => {
    const category = categorizeRecommendation(recommendation);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(recommendation);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          AI Property Insights
        </h3>
        
        <div className="space-y-6">
          {Object.entries(categorizedRecommendations).map(([category, recs]) => (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                {getIcon(category)}
                <h4 className="text-sm font-medium capitalize">{category} Insights</h4>
                <Badge className={`ml-2 ${getBadgeColor(category)}`}>
                  {recs.length} {recs.length === 1 ? 'insight' : 'insights'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {recs.map((recommendation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {recommendation.toLowerCase().includes('warning') || 
                       recommendation.toLowerCase().includes('caution') ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      ) : recommendation.toLowerCase().includes('good') || 
                         recommendation.toLowerCase().includes('positive') ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm">{recommendation}</p>
                  </motion.div>
                ))}
              </div>
              
              {Object.keys(categorizedRecommendations).indexOf(category) < 
               Object.keys(categorizedRecommendations).length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default AIRecommendations;