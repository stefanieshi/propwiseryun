import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatBox } from "@/components/mortgage/ChatBox";
import { Card, CardContent } from "@/components/ui/card";
import { LawyerProfile } from "./LawyerProfile";
import { LawyerStats } from "./LawyerStats";
import { LawyerReviews } from "./LawyerReviews";

interface LawyerCardProps {
  lawyer: any;
  matchScore?: number;
}

const LawyerCard = ({ lawyer, matchScore }: LawyerCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showChat, setShowChat] = useState(false);
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
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <LawyerProfile lawyer={lawyer} matchScore={matchScore} />
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

        <LawyerStats
          rating={lawyer.rating}
          reviewCount={lawyer.review_count}
          hourlyRate={lawyer.fees?.hourly_rate || 0}
        />

        <LawyerReviews reviews={lawyer.recent_reviews || []} />

        {showChat ? (
          <div className="space-y-2">
            <ChatBox brokerMatchId={lawyer.id} />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowChat(false)}
            >
              Close Chat
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={() => setShowChat(true)}
          >
            Start Chat
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default LawyerCard;