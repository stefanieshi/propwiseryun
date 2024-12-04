import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LawyerProfileProps {
  lawyer: any;
  matchScore?: number;
}

export const LawyerProfile = ({ lawyer, matchScore }: LawyerProfileProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="relative">
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
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold">{lawyer.name}</h3>
            {matchScore && (
              <Badge variant="secondary" className="ml-2">
                {matchScore}% Match
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1">{lawyer.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {lawyer.specializations?.map((spec: string, index: number) => (
              <Badge key={index} variant="outline">
                {spec}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};