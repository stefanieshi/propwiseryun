import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DestinationForm } from "./DestinationForm";
import { DestinationList } from "./DestinationList";
import { CommuteMap } from "./CommuteMap";
import { supabase } from "@/integrations/supabase/client";
import { UserDestination } from "@/types";
import { Card } from "@/components/ui/card";

interface CommuteAnalysisProps {
  propertyId: string;
}

export const CommuteAnalysis = ({ propertyId }: CommuteAnalysisProps) => {
  const [destinations, setDestinations] = useState<UserDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase
        .from("user_destinations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDestinations(data || []);
    } catch (error) {
      toast({
        title: "Error fetching destinations",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Commute Analysis</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <DestinationForm onSuccess={fetchDestinations} />
          <DestinationList 
            destinations={destinations} 
            loading={loading}
            onDelete={fetchDestinations}
            propertyId={propertyId}
          />
        </div>
        <CommuteMap destinations={destinations} />
      </div>
    </Card>
  );
};