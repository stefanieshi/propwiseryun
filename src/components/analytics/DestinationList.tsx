import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDestination } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Trash2, Clock, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface DestinationListProps {
  destinations: UserDestination[];
  loading: boolean;
  onDelete: () => void;
  propertyId: string;
}

export const DestinationList = ({ destinations, loading, onDelete, propertyId }: DestinationListProps) => {
  const { toast } = useToast();

  const { data: commuteAnalysis } = useQuery({
    queryKey: ["commute-analysis", propertyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("property_commute_analysis")
        .select("*")
        .eq("property_id", propertyId);

      if (error) throw error;
      return data || [];
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("user_destinations")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Destination deleted",
        description: "The destination has been removed successfully.",
      });

      onDelete();
    } catch (error) {
      toast({
        title: "Error deleting destination",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const getCommuteInfo = (destinationId: string) => {
    return commuteAnalysis?.find(a => a.destination_id === destinationId);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Your Destinations</h2>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Your Destinations</h2>
      {destinations.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No destinations added yet. Add your first destination above.
        </p>
      ) : (
        <div className="space-y-4">
          {destinations.map((destination) => {
            const commuteInfo = getCommuteInfo(destination.id);
            
            return (
              <div
                key={destination.id}
                className="flex items-start justify-between p-4 rounded-lg border"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <h3 className="font-medium">{destination.name}</h3>
                    <p className="text-sm text-muted-foreground">{destination.address}</p>
                    {commuteInfo && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{Math.round(commuteInfo.commute_time / 60)} mins</span>
                        <ArrowRight className="h-4 w-4" />
                        <span>{commuteInfo.commute_distance.toFixed(1)} miles</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(destination.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};