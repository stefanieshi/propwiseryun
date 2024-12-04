import { Star, Award, Clock, MessageSquare } from "lucide-react";

interface BrokerStatsProps {
  rating: number;
  reviewCount: number;
  approvalRate: number;
  processingTime: number;
}

export const BrokerStats = ({
  rating,
  reviewCount,
  approvalRate,
  processingTime,
}: BrokerStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 rounded-lg bg-secondary/10 backdrop-blur-sm">
        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400" />
          Rating
        </div>
        <div className="font-medium">
          {rating}/5 ({reviewCount} reviews)
        </div>
      </div>

      <div className="p-4 rounded-lg bg-secondary/10 backdrop-blur-sm">
        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
          <Award className="w-4 h-4 text-blue-400" />
          Approval Rate
        </div>
        <div className="font-medium">{approvalRate}%</div>
      </div>

      <div className="p-4 rounded-lg bg-secondary/10 backdrop-blur-sm">
        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
          <Clock className="w-4 h-4 text-green-400" />
          Processing Time
        </div>
        <div className="font-medium">{processingTime} days</div>
      </div>

      <div className="p-4 rounded-lg bg-secondary/10 backdrop-blur-sm">
        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
          <MessageSquare className="w-4 h-4 text-primary" />
          Chat Status
        </div>
        <div className="font-medium text-green-400">Online</div>
      </div>
    </div>
  );
};