import { useState } from "react";
import { User, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LawyerCardProps {
  lawyer: any; // We'll keep this as any since it comes from the brokers table
}

const LawyerCard = ({ lawyer }: LawyerCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const toggleFavorite = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save favorites",
          variant: "destructive",
        });
        return;
      }

      if (isFavorite) {
        const { error } = await supabase
          .from("favorite_lawyers")
          .delete()
          .eq("user_id", user.id)
          .eq("lawyer_id", lawyer.id);

        if (error) throw error;
        setIsFavorite(false);
        toast({
          title: "Removed from favorites",
          description: "Lawyer has been removed from your favorites",
        });
      } else {
        const { error } = await supabase
          .from("favorite_lawyers")
          .insert([
            {
              user_id: user.id,
              lawyer_id: lawyer.id,
            },
          ]);

        if (error) throw error;
        setIsFavorite(true);
        toast({
          title: "Added to favorites",
          description: "Lawyer has been added to your favorites",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {lawyer.profile_picture_url ? (
            <img
              src={lawyer.profile_picture_url}
              alt={lawyer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-muted-foreground" />
          )}
          <div>
            <h3 className="font-semibold">{lawyer.name}</h3>
            <p className="text-sm text-muted-foreground">
              £{lawyer.fees?.hourly_rate || 0}/hr
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFavorite}
          className="hover:bg-transparent"
        >
          {isFavorite ? (
            <BookmarkCheck className="h-5 w-5 text-primary" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Specializations:</span>{" "}
          {lawyer.specializations?.join(", ") || "Not specified"}
        </p>
        <p className="text-sm">
          <span className="font-medium">Rating:</span> {lawyer.rating} ({lawyer.review_count} reviews)
        </p>
        {lawyer.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {lawyer.description}
          </p>
        )}
      </div>

      <div className="pt-4">
        <Button className="w-full">Contact Lawyer</Button>
      </div>
    </div>
  );
};

export default LawyerCard;