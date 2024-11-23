import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface DestinationFormProps {
  onSuccess: () => void;
}

export const DestinationForm = ({ onSuccess }: DestinationFormProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No authenticated user found");
      }

      // In a real app, we would use a geocoding service here
      // For demo purposes, using mock coordinates
      const mockLat = 40.7128;
      const mockLng = -74.0060;

      const { error } = await supabase.from("user_destinations").insert({
        name,
        address,
        latitude: mockLat,
        longitude: mockLng,
        user_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Destination added",
        description: "Your destination has been saved successfully.",
      });

      setName("");
      setAddress("");
      onSuccess();
    } catch (error) {
      toast({
        title: "Error adding destination",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Add New Destination</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Destination name (e.g., Work, Gym)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Destination"
          )}
        </Button>
      </form>
    </Card>
  );
};