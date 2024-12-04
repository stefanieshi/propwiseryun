import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import LawyerCard from "./LawyerCard";

const FavoriteLawyers = () => {
  const { data: favoriteLawyers, isLoading } = useQuery({
    queryKey: ["favoriteLawyers"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("favorite_lawyers")
        .select(`
          lawyer_id,
          lawyers (*)
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      return data.map((fav) => fav.lawyers);
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