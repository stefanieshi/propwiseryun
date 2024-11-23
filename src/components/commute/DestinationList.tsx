import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDestination } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Trash2 } from "lucide-react";

interface DestinationListProps {
  destinations: UserDestination[];
  loading: boolean;
  onDelete: () => void;
}

export const DestinationList = ({ destinations, loading, onDelete }: DestinationListProps) => {
  const { toast } = useToast();

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
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="flex items-start justify-between p-4 rounded-lg border"
            >
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <h3 className="font-medium">{destination.name}</h3>
                  <p className="text-sm text-muted-foreground">{destination.address}</p>
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
          ))}
        </div>
      )}
    </Card>
  );
};