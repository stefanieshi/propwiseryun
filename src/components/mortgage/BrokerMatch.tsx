import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { BrokerStats } from "./BrokerStats";
import { BrokerReviews } from "./BrokerReviews";
import { ChatBox } from "./ChatBox";
import { BrokerReview } from "./types";

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

interface BrokerMatch {
  broker_id: string;
  match_score: number;
  match_reasons: string[];
  broker?: Broker;
  reviews?: BrokerReview[];
}

// Example data for demonstration
const exampleMatches: BrokerMatch[] = [
  {
    broker_id: "1",
    match_score: 95,
    match_reasons: [
      "Specializes in first-time buyers",
      "High approval rate",
      "Fast processing time",
      "Excellent customer reviews"
    ],
    broker: {
      id: "1",
      name: "Sarah Johnson",
      description: "Expert mortgage broker with 15 years of experience helping first-time buyers secure their dream homes.",
      approval_rate: 92,
      specializations: ["First-time buyers", "Buy-to-let", "Remortgaging"],
      average_processing_time: 14,
      rating: 4.8,
      review_count: 156,
      profile_picture_url: "/lovable-uploads/42ca702d-9604-4405-ad47-928c9dc888a4.png"
    },
    reviews: [
      {
        id: "1",
        rating: 5,
        comment: "Sarah made the whole process incredibly smooth. Highly recommended!",
        user: { full_name: "James Wilson" }
      },
      {
        id: "2",
        rating: 5,
        comment: "Excellent service and communication throughout.",
        user: { full_name: "Emma Thompson" }
      }
    ]
  },
  {
    broker_id: "2",
    match_score: 88,
    match_reasons: [
      "Specialized in complex cases",
      "Strong lender relationships",
      "Competitive rates",
      "Personalized service"
    ],
    broker: {
      id: "2",
      name: "Michael Chen",
      description: "Specialized in handling complex mortgage cases with a track record of finding solutions for challenging situations.",
      approval_rate: 88,
      specializations: ["Self-employed", "Complex income", "Large mortgages"],
      average_processing_time: 18,
      rating: 4.7,
      review_count: 132,
      profile_picture_url: "/lovable-uploads/753f39c6-065d-4521-98e8-03e7b4094058.png"
    },
    reviews: [
      {
        id: "3",
        rating: 5,
        comment: "Michael found me a great deal despite my complex income situation.",
        user: { full_name: "David Brown" }
      }
    ]
  },
  {
    broker_id: "3",
    match_score: 82,
    match_reasons: [
      "Buy-to-let specialist",
      "Excellent market knowledge",
      "Quick response times",
      "Great track record"
    ],
    broker: {
      id: "3",
      name: "Rachel Anderson",
      description: "Buy-to-let mortgage specialist with deep knowledge of the investment property market.",
      approval_rate: 85,
      specializations: ["Buy-to-let", "Portfolio landlords", "New build"],
      average_processing_time: 16,
      rating: 4.6,
      review_count: 98,
      profile_picture_url: "/lovable-uploads/92ce51d3-8dd2-4f65-9d00-5d9d53c6cb55.png"
    },
    reviews: [
      {
        id: "4",
        rating: 4,
        comment: "Very knowledgeable about the buy-to-let market.",
        user: { full_name: "Sophie Clark" }
      }
    ]
  }
];

export const BrokerMatch = () => {
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

      return matchesWithReviews.length > 0 ? matchesWithReviews : exampleMatches;
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

  if (!matches || matches.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">No broker matches found.</p>
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
        {matches.map((match, index) => (
          <motion.div
            key={match.broker_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-6 glass-card rounded-lg border bg-card/50 backdrop-blur-sm"
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

            <BrokerStats
              rating={match.broker?.rating || 0}
              reviewCount={match.broker?.review_count || 0}
              approvalRate={match.broker?.approval_rate || 0}
              processingTime={match.broker?.average_processing_time || 0}
            />

            <BrokerReviews reviews={match.reviews || []} />

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