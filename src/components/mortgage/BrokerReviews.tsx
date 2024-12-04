import { Star } from "lucide-react";
import { BrokerReview } from "@/integrations/supabase/types";

interface BrokerReviewsProps {
  reviews: BrokerReview[];
}

export const BrokerReviews = ({ reviews }: BrokerReviewsProps) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium mb-3">Recent Reviews</h4>
      <div className="space-y-3">
        {reviews.map((review) => (
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
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};