import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import LawyerCard from "./LawyerCard";

const FavoriteLawyers = () => {
  const { data: favoriteLawyers, isLoading } = useQuery({
    queryKey: ["favoriteLawyers"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // First get the favorite lawyer IDs
      const { data: favorites, error: favoritesError } = await supabase
        .from("favorite_lawyers")
        .select("lawyer_id")
        .eq("user_id", user.id);

      if (favoritesError) throw favoritesError;
      
      if (!favorites?.length) return [];

      // Then fetch the actual lawyer details
      const { data: lawyers, error: lawyersError } = await supabase
        .from("brokers")
        .select("*")
        .in("id", favorites.map(f => f.lawyer_id));

      if (lawyersError) throw lawyersError;
      return lawyers || [];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!favoriteLawyers?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No favorite lawyers yet</h3>
        <p className="text-muted-foreground">
          Browse the lawyer directory and add some to your favorites
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteLawyers.map((lawyer) => (
        <LawyerCard key={lawyer.id} lawyer={lawyer} />
      ))}
    </div>
  );
};

export default FavoriteLawyers;