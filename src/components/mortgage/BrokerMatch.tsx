import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Star, ThumbsUp, Award, Clock, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { ChatBox } from "./ChatBox";

interface Broker {
  id: string;
  name: string;
  description: string;
  approval_rate: number;
  specializations: string[];
  average_processing_time: number;
  rating: number;
  review_count: number;
  profile_picture_url: string | null;
}

interface BrokerReview {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    full_name: string;
  };
}

interface BrokerMatch {
  broker_id: string;
  match_score: number;
  match_reasons: string[];
  broker?: Broker;
  reviews?: BrokerReview[];
}

export const BrokerMatch = () => {
  const { toast } = useToast();

  const { data: matches, isLoading } = useQuery({
    queryKey: ["broker-matches"],
    queryFn: async () => {
      const { data: matchesData, error: matchesError } = await supabase
        .from("broker_matches")
        .select(`
          broker_id,
          match_score,
          match_reasons,
          broker:brokers(
            id,
            name,
            description,
            approval_rate,
            specializations,
            average_processing_time,
            rating,
            review_count,
            profile_picture_url
          )
        `)
        .order("match_score", { ascending: false })
        .limit(3);

      if (matchesError) throw matchesError;

      // Fetch reviews for each broker
      const matchesWithReviews = await Promise.all(
        matchesData.map(async (match) => {
          const { data: reviews } = await supabase
            .from("broker_reviews")
            .select(`
              id,
              rating,
              comment,
              created_at,
              user:profiles(full_name)
            `)
            .eq("broker_id", match.broker_id)
            .order("created_at", { ascending: false })
            .limit(3);

          return {
            ...match,
            reviews: reviews || [],
          };
        })
      );

      return matchesWithReviews as BrokerMatch[];
    },
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">AI-Matched Brokers</h2>
        <p className="text-muted-foreground">
          Based on your profile, here are your best-matched mortgage brokers
        </p>
      </div>

      <div className="space-y-6">
        {matches?.map((match, index) => (
          <motion.div
            key={match.broker_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-6 glass-card rounded-lg"
          >
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                {match.match_score}% Match
              </Badge>
            </div>

            <div className="flex items-start gap-6 mb-6">
              <Avatar className="h-20 w-20 border-2 border-primary">
                <AvatarImage
                  src={match.broker?.profile_picture_url || ""}
                  alt={match.broker?.name}
                />
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {match.broker?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="text-xl font-medium">{match.broker?.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {match.broker?.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {match.broker?.specializations.map((specialty, i) => (
                    <Badge key={i} variant="outline" className="capitalize">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-secondary/10 backdrop-blur-sm">
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Rating
                </div>
                <div className="font-medium">
                  {match.broker?.rating}/5 ({match.broker?.review_count} reviews)
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/10 backdrop-blur-sm">
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Award className="w-4 h-4 text-blue-400" />
                  Approval Rate
                </div>
                <div className="font-medium">{match.broker?.approval_rate}%</div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/10 backdrop-blur-sm">
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-green-400" />
                  Processing Time
                </div>
                <div className="font-medium">
                  {match.broker?.average_processing_time} days
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/10 backdrop-blur-sm">
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Chat Status
                </div>
                <div className="font-medium text-green-400">Online</div>
              </div>
            </div>

            {match.reviews && match.reviews.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Recent Reviews</h4>
                <div className="space-y-3">
                  {match.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 rounded-lg bg-secondary/10 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {review.user?.full_name || "Anonymous"}
                        </span>
                        <div className="flex items-center">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 mb-6">
              <div className="text-sm text-muted-foreground">Match Reasons:</div>
              <div className="flex flex-wrap gap-2">
                {match.match_reasons.map((reason, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>

            <ChatBox brokerMatchId={match.broker_id} />
          </motion.div>
        ))}
      </div>
    </Card>
  );
};