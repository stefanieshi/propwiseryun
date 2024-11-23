import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceHistoryChart from "@/components/analytics/PriceHistoryChart";
import RentalAnalysis from "@/components/analytics/RentalAnalysis";
import AreaStats from "@/components/analytics/AreaStats";
import AIRecommendations from "@/components/analytics/AIRecommendations";
import { Property } from "@/types";

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
      return data as Property;
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
      return data;
    },
  });

  if (propertyLoading || analyticsLoading) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Property Analysis</h1>
        <h2 className="text-xl text-muted-foreground">{property?.title}</h2>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rental">Rental Analysis</TabsTrigger>
          <TabsTrigger value="area">Area Stats</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Price History</h3>
            <PriceHistoryChart data={analytics?.price_history} />
          </Card>
        </TabsContent>

        <TabsContent value="rental">
          <RentalAnalysis data={analytics?.rental_estimates} />
        </TabsContent>

        <TabsContent value="area">
          <AreaStats data={analytics?.area_stats} />
        </TabsContent>

        <TabsContent value="ai">
          <AIRecommendations recommendations={analytics?.ai_recommendations} />
        </TabsContent>
      </Tabs>
    </div>
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