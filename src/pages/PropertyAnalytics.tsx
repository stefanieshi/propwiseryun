import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import BackButton from "@/components/BackButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PriceHistoryChart from "@/components/analytics/PriceHistoryChart";
import RentalAnalysis from "@/components/analytics/RentalAnalysis";
import AreaStats from "@/components/analytics/AreaStats";
import AIRecommendations from "@/components/analytics/AIRecommendations";
import MarketTrends from "@/components/analytics/MarketTrends";
import InvestmentMetrics from "@/components/analytics/InvestmentMetrics";
import { motion } from "framer-motion";
import { CommuteAnalysis } from "@/components/analytics/CommuteAnalysis";
import { MarketNews } from "@/components/analytics/MarketNews";

interface PropertyAnalyticsData {
  price_history: any;
  rental_estimates: any;
  area_stats: any;
  ai_recommendations: string[];
  market_trends: any;
  investment_metrics: any;
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
      return data as PropertyAnalyticsData;
    },
  });

  if (propertyLoading || analyticsLoading) {
    return <AnalyticsSkeleton />;
  }

  if (!property || !analytics) {
    return (
      <Card className="p-6">
        <BackButton className="mb-4" />
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
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-muted-foreground hover:text-primary">
                    Properties
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{property?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-secondary/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="market">Market & News</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
            <TabsTrigger value="rental">Rental</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="commute">Commute</TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PriceHistoryChart data={analytics?.price_history as any} />
          </TabsContent>

          <TabsContent value="market">
            <div className="space-y-6">
              <MarketTrends data={analytics?.market_trends as any} />
              <MarketNews location={property.location} />
            </div>
          </TabsContent>

          <TabsContent value="investment">
            <InvestmentMetrics data={analytics?.investment_metrics as any} />
          </TabsContent>

          <TabsContent value="rental">
            <RentalAnalysis data={analytics?.rental_estimates as any} />
          </TabsContent>

          <TabsContent value="area">
            <AreaStats data={analytics?.area_stats as any} />
          </TabsContent>

          <TabsContent value="commute">
            <CommuteAnalysis propertyId={id as string} />
          </TabsContent>

          <TabsContent value="ai">
            <AIRecommendations recommendations={analytics?.ai_recommendations || []} />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

const AnalyticsSkeleton = () => (
  <div className="space-y-6">
    <BackButton />
    <Skeleton className="h-8 w-64" />
    <Card className="p-6">
      <Skeleton className="h-[300px]" />
    </Card>
  </div>
);

export default PropertyAnalytics;
