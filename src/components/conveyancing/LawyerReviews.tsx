import { Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Review {
  rating: number;
  comment: string;
  user_name?: string;
}

interface LawyerReviewsProps {
  reviews: Review[];
}

export const LawyerReviews = ({ reviews }: LawyerReviewsProps) => {
  if (!reviews?.length) return null;

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-lg">Recent Reviews</h4>
      <ScrollArea className="h-[200px] rounded-lg bg-secondary/5 p-4">
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-secondary/10 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">
                  {review.user_name || "Anonymous"}
                </span>
                <div className="flex">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};