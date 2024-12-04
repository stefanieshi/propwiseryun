import { useState } from "react";
import { User, Bookmark, BookmarkCheck, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatBox } from "@/components/mortgage/ChatBox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface LawyerCardProps {
  lawyer: any;
}

const LawyerCard = ({ lawyer }: LawyerCardProps) => {
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

  const renderRatingStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < lawyer.rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {lawyer.profile_picture_url ? (
              <img
                src={lawyer.profile_picture_url}
                alt={lawyer.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg">{lawyer.name}</h3>
              <div className="flex items-center space-x-1 mt-1">
                {renderRatingStars()}
                <span className="text-sm text-muted-foreground ml-2">
                  ({lawyer.review_count} reviews)
                </span>
              </div>
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
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {lawyer.specializations?.map((spec: string, index: number) => (
            <Badge key={index} variant="secondary">
              {spec}
            </Badge>
          ))}
        </div>
        
        <div className="bg-secondary/10 rounded-lg p-3">
          <p className="text-sm">
            <span className="font-medium">Hourly Rate:</span>{" "}
            £{lawyer.fees?.hourly_rate || "N/A"}
          </p>
          {lawyer.description && (
            <p className="text-sm text-muted-foreground mt-2">
              {lawyer.description}
            </p>
          )}
        </div>

        {lawyer.recent_reviews && (
          <div className="bg-card rounded-lg border p-3">
            <h4 className="font-medium mb-2">Recent Reviews</h4>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {lawyer.recent_reviews.map((review: any, index: number) => (
                  <div
                    key={index}
                    className="bg-secondary/5 rounded-lg p-3 text-sm"
                  >
                    <div className="flex items-center space-x-1 mb-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        {showChat ? (
          <div className="w-full space-y-2">
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
            className="w-full flex items-center justify-center space-x-2"
            onClick={() => setShowChat(true)}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with Solicitor</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default LawyerCard;