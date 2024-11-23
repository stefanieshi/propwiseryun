import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import PriceHistoryChart from "@/components/analytics/PriceHistoryChart";
import RentalAnalysis from "@/components/analytics/RentalAnalysis";
import AreaStats from "@/components/analytics/AreaStats";
import AIRecommendations from "@/components/analytics/AIRecommendations";
import { motion } from "framer-motion";

interface AnalyticsData {
  price_history: {
    property_prices?: Array<{ date: string; price: number }>;
    area_avg_prices?: Array<{ date: string; price: number }>;
    city_avg_prices?: Array<{ date: string; price: number }>;
  };
  rental_estimates: any;
  area_stats: any;
  ai_recommendations: string[];
}

const PropertyAnalytics = () => {
  const { id } = useParams<{ id: string }>();

  const { data: property, isLoading: propertyLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["property-analytics", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("property_analytics")
        .select("*")
        .eq("property_id", id)
        .single();
      if (error) throw error;
      return data as AnalyticsData;
    },
  });

  if (propertyLoading || analyticsLoading) {
    return <AnalyticsSkeleton />;
  }

  if (!property || !analytics) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          No analytics data available for this property
        </p>
      </Card>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Property Analysis
        </motion.h1>
        <motion.h2 
          className="text-xl text-muted-foreground"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {property.title}
        </motion.h2>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rental">Rental Analysis</TabsTrigger>
          <TabsTrigger value="area">Area Stats</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <PriceHistoryChart data={analytics.price_history} />
        </TabsContent>

        <TabsContent value="rental">
          <RentalAnalysis data={analytics.rental_estimates} />
        </TabsContent>

        <TabsContent value="area">
          <AreaStats data={analytics.area_stats} />
        </TabsContent>

        <TabsContent value="ai">
          <AIRecommendations recommendations={analytics.ai_recommendations} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

const AnalyticsSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-64" />
    <Card className="p-6">
      <Skeleton className="h-[300px]" />
    </Card>
  </div>
);

export default PropertyAnalytics;