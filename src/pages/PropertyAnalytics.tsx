import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import AnalyticsTabs from "@/components/analytics/AnalyticsTabs";

const PropertyAnalytics = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: property, isLoading: propertyLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!id) throw new Error("No property ID provided");
      
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        toast({
          title: "Error fetching property",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
    enabled: !!id,
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["property-analytics", id],
    queryFn: async () => {
      if (!id) throw new Error("No property ID provided");
      
      const { data, error } = await supabase
        .from("property_analytics")
        .select("*")
        .eq("property_id", id)
        .single();
      
      if (error) {
        toast({
          title: "Error fetching analytics",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
    enabled: !!id,
  });

  const handleGenerateReport = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to generate an AI report",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch('/api/create-report-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: id,
          userId: user.id,
          returnUrl: window.location.href,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (propertyLoading || analyticsLoading) {
    return (
      <Card className="glass-card p-6">
        <Skeleton className="h-[300px]" />
      </Card>
    );
  }

  if (!property || !analytics) {
    return (
      <Card className="glass-card p-6">
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

export default PropertyAnalytics;