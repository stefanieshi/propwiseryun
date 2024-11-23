import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Newspaper, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface MarketNewsProps {
  location: string;
}

export const MarketNews = ({ location }: MarketNewsProps) => {
  const { data: news, isLoading } = useQuery({
    queryKey: ["market-news", location],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("market_news")
        .select("*")
        .eq("location", location)
        .order("published_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <MarketNewsSkeleton />;
  }

  if (!news?.length) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center text-muted-foreground">
          <Newspaper className="h-5 w-5 mr-2" />
          <p>No market news available for this location</p>
        </div>
      </Card>
    );
  }

  const getImpactColor = (score: number) => {
    if (score >= 8) return "text-red-500";
    if (score >= 6) return "text-orange-500";
    if (score >= 4) return "text-yellow-500";
    return "text-green-500";
  };

  const getImpactIcon = (score: number) => {
    if (score >= 8) return <AlertTriangle className="h-5 w-5" />;
    if (score >= 6) return <TrendingUp className="h-5 w-5" />;
    if (score >= 4) return <Newspaper className="h-5 w-5" />;
    return <CheckCircle className="h-5 w-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          Market News & Analysis
        </h3>

        <div className="space-y-6">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={getImpactColor(item.impact_score || 0)}>
                  {getImpactIcon(item.impact_score || 0)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{item.title}</h4>
                    <Badge variant="outline">
                      Impact: {item.impact_score}/10
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                  {item.ai_analysis && (
                    <div className="mt-4 p-3 bg-primary/5 rounded-md">
                      <p className="text-sm font-medium mb-1">AI Analysis:</p>
                      <p className="text-sm text-muted-foreground">{item.ai_analysis}</p>
                    </div>
                  )}
                  {item.source_url && (
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline mt-2 inline-block"
                    >
                      Read full article →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

const MarketNewsSkeleton = () => (
  <Card className="p-6">
    <Skeleton className="h-7 w-48 mb-6" />
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </div>
      ))}
    </div>
  </Card>
);