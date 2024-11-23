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
import MarketTrends from "@/components/analytics/MarketTrends";
import InvestmentMetrics from "@/components/analytics/InvestmentMetrics";
import SustainabilityScore from "@/components/analytics/SustainabilityScore";
import { motion } from "framer-motion";

interface PropertyAnalytics {
  id: string;
  property_id: string;
  price_history: {
    property_prices?: Array<{ date: string; price: number }>;
    area_avg_prices?: Array<{ date: string; price: number }>;
    city_avg_prices?: Array<{ date: string; price: number }>;
  };
  market_trends: {
    price_per_sqft_trend: Array<{ date: string; value: number }>;
    days_on_market: Array<{ date: string; value: number }>;
    market_health_index: number;
    supply_demand_ratio: number;
  };
  investment_metrics: {
    roi_5_years: number;
    cash_flow_potential: number;
    cap_rate: number;
    break_even_period: number;
  };
  sustainability_score: {
    energy_efficiency: number;
    green_features: string[];
    environmental_impact: number;
  };
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
      return data as PropertyAnalytics;
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
        <TabsList className="grid w-full grid-cols-7 bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
          <TabsTrigger value="rental">Rental</TabsTrigger>
          <TabsTrigger value="area">Area</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PriceHistoryChart data={analytics.price_history} />
        </TabsContent>

        <TabsContent value="market">
          <MarketTrends data={analytics.market_trends} />
        </TabsContent>

        <TabsContent value="investment">
          <InvestmentMetrics data={analytics.investment_metrics} />
        </TabsContent>

        <TabsContent value="rental">
          <RentalAnalysis data={analytics.rental_estimates} />
        </TabsContent>

        <TabsContent value="area">
          <AreaStats data={analytics.area_stats} />
        </TabsContent>

        <TabsContent value="sustainability">
          <SustainabilityScore data={analytics.sustainability_score} />
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