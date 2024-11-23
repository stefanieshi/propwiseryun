import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DestinationForm } from "@/components/commute/DestinationForm";
import { DestinationList } from "@/components/commute/DestinationList";
import { CommuteMap } from "@/components/commute/CommuteMap";
import { supabase } from "@/integrations/supabase/client";
import { UserDestination } from "@/types";

const CommutePage = () => {
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Commute Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Add and manage your frequent destinations to analyze commute times for properties.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <DestinationForm onSuccess={fetchDestinations} />
          <DestinationList 
            destinations={destinations} 
            loading={loading}
            onDelete={fetchDestinations}
          />
        </div>
        <CommuteMap destinations={destinations} />
      </div>
    </div>
  );
};

export default CommutePage;