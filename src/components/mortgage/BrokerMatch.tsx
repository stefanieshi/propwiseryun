import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Star, ThumbsUp, Award, Clock } from "lucide-react";
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
}

interface BrokerMatch {
  broker_id: string;
  match_score: number;
  match_reasons: string[];
  broker?: Broker;
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
            review_count
          )
        `)
        .order("match_score", { ascending: false })
        .limit(3);

      if (matchesError) throw matchesError;
      return matchesData as unknown as BrokerMatch[];
    }
  });

  const handleContactBroker = async (brokerId: string) => {
    toast({
      title: "Contact request sent",
      description: "The broker will contact you shortly.",
    });
  };

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

      <div className="space-y-4">
        {matches?.map((match, index) => (
          <motion.div
            key={match.broker_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-6 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                {match.match_score}% Match
              </Badge>
            </div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">{match.broker?.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {match.broker?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Rating
                </div>
                <div className="font-medium">
                  {match.broker?.rating}/5 ({match.broker?.review_count} reviews)
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Award className="w-4 h-4 text-blue-400" />
                  Approval Rate
                </div>
                <div className="font-medium">{match.broker?.approval_rate}%</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-green-400" />
                  Processing Time
                </div>
                <div className="font-medium">
                  {match.broker?.average_processing_time} days
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Match Reasons:</div>
              <div className="flex flex-wrap gap-2">
                {match.match_reasons.map((reason, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <ChatBox brokerMatchId={match.broker_id} />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};