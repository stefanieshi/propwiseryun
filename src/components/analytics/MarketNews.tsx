import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, TrendingUp, TrendingDown, School, Train, Building, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface MarketNewsProps {
  location: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'transportation':
      return <Train className="h-4 w-4" />;
    case 'education':
      return <School className="h-4 w-4" />;
    case 'retail':
      return <ShoppingBag className="h-4 w-4" />;
    case 'infrastructure':
      return <Building className="h-4 w-4" />;
    default:
      return <Newspaper className="h-4 w-4" />;
  }
};

const getImpactColor = (score: number) => {
  if (score >= 0.5) return "text-green-500";
  if (score <= -0.5) return "text-red-500";
  return "text-yellow-500";
};

const MarketNews = ({ location }: MarketNewsProps) => {
  const { data: news, isLoading } = useQuery({
    queryKey: ['market-news', location],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_news')
        .select('*')
        .eq('location', location)
        .order('published_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Market News & Updates</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          Market News & Updates
        </h3>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {news?.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category)}
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  {item.impact_score && (
                    <div className="flex items-center gap-1">
                      {item.impact_score > 0 ? (
                        <TrendingUp className={`h-4 w-4 ${getImpactColor(item.impact_score)}`} />
                      ) : (
                        <TrendingDown className={`h-4 w-4 ${getImpactColor(item.impact_score)}`} />
                      )}
                    </div>
                  )}
                </div>

                <h4 className="font-medium mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{item.summary}</p>
                
                {item.ai_analysis && (
                  <div className="mt-2 text-sm bg-primary/10 p-2 rounded">
                    <p className="text-primary">{item.ai_analysis}</p>
                  </div>
                )}

                {item.source_url && (
                  <a
                    href={item.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-2 inline-block"
                  >
                    Read more →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  );
};

export default MarketNews;