import { Star, Award, Clock, MessageSquare } from "lucide-react";

interface LawyerStatsProps {
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  isOnline?: boolean;
}

export const LawyerStats = ({
  rating,
  reviewCount,
  hourlyRate,
  isOnline = true,
}: LawyerStatsProps) => {
  // Format the fee based on hourlyRate
  const getFee = () => {
    if (hourlyRate <= 100) return "£1,500";
    if (hourlyRate <= 200) return "£1,800";
    if (hourlyRate <= 250) return "£2,000";
    return "£2,200";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-4 rounded-lg bg-secondary/10">
        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400" />
          Rating
        </div>
        <div className="font-medium">
          {rating}/5 ({reviewCount} reviews)
        </div>
      </div>

      <div className="p-4 rounded-lg bg-secondary/10">
        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
          <Award className="w-4 h-4 text-blue-400" />
          Solicitor Fee
        </div>
        <div className="font-medium">{getFee()}</div>
      </div>

      <div className="p-4 rounded-lg bg-secondary/10">
        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
          <Clock className="w-4 h-4 text-green-400" />
          Response Time
        </div>
        <div className="font-medium">{"2-4 hours"}</div>
      </div>

      <div className="p-4 rounded-lg bg-secondary/10">
        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
          <MessageSquare className="w-4 h-4 text-primary" />
          Chat Status
        </div>
        <div className="font-medium text-green-400">
          {isOnline ? "Available Now" : "Offline"}
        </div>
      </div>
    </div>
  );
};