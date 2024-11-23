import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PriceChart from "@/components/analytics/PriceChart";
import RentalAnalysis from "@/components/analytics/RentalAnalysis";
import AreaStats from "@/components/analytics/AreaStats";
import MarketTrends from "@/components/analytics/MarketTrends";
import AIRecommendations from "@/components/analytics/AIRecommendations";
import InvestmentMetrics from "@/components/analytics/InvestmentMetrics";
import SustainabilityScore from "@/components/analytics/SustainabilityScore";
import MarketNews from "@/components/analytics/MarketNews";
import { Skeleton } from "@/components/ui/skeleton";

const PropertyAnalytics = () => {
  const { id } = useParams<{ id: string }>();

  const { data: property, isLoading: propertyLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['property-analytics', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_analytics')
        .select('*')
        .eq('property_id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (propertyLoading || analyticsLoading) {
    return <div className="space-y-8">
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[200px] w-full" />
    </div>;
  }

  if (!property || !analytics) {
    return <div>Property not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PriceChart data={analytics.price_history} />
        <RentalAnalysis data={analytics.rental_estimates} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AreaStats data={analytics.area_stats} />
        <MarketTrends data={analytics.market_trends} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InvestmentMetrics data={analytics.investment_metrics} />
        <SustainabilityScore data={analytics.sustainability_score} />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <MarketNews location={property.location} />
        <AIRecommendations recommendations={analytics.ai_recommendations} />
      </div>
    </div>
  );
};

export default PropertyAnalytics;