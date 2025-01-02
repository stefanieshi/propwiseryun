import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/BackButton";
import { motion } from "framer-motion";
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import AnalyticsTabs from "@/components/analytics/AnalyticsTabs";

const PropertyAnalytics = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: property, isLoading: propertyLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!id?.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        throw new Error("Invalid property ID format");
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Property not found");
      return data;
    },
    retry: false,
    onError: (error) => {
      toast({
        title: "Error loading property",
        description: error instanceof Error ? error.message : "Failed to load property details",
        variant: "destructive",
      });
    },
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["property-analytics", id],
    queryFn: async () => {
      if (!id?.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        throw new Error("Invalid property ID format");
      }

      const { data, error } = await supabase
        .from("property_analytics")
        .select("*")
        .eq("property_id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!property, // Only run this query if we have a valid property
    retry: false,
    onError: (error) => {
      toast({
        title: "Error loading analytics",
        description: error instanceof Error ? error.message : "Failed to load property analytics",
        variant: "destructive",
      });
    },
  });

  if (propertyLoading || analyticsLoading) {
    return <AnalyticsSkeleton />;
  }

  if (!property) {
    return (
      <Card className="glass-card p-6">
        <BackButton className="mb-4" />
        <p className="text-center text-muted-foreground">
          Property not found or invalid ID format
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
      <div className="space-y-6">
        <AnalyticsHeader
          propertyTitle={property?.title}
          propertyId={id}
          onGenerateReport={handleGenerateReport}
        />
        <AnalyticsTabs
          analytics={analytics}
          property={property}
          propertyId={id}
        />
      </div>
    </motion.div>
  );
};

const AnalyticsSkeleton = () => (
  <div className="space-y-6">
    <BackButton />
    <Skeleton className="h-8 w-64" />
    <Card className="glass-card p-6">
      <Skeleton className="h-[300px]" />
    </Card>
  </div>
);

export default PropertyAnalytics;