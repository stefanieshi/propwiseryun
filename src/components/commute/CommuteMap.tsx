import { Card } from "@/components/ui/card";
import { UserDestination } from "@/types";

interface CommuteMapProps {
  destinations: UserDestination[];
}

export const CommuteMap = ({ destinations }: CommuteMapProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Map View</h2>
      <div className="bg-muted rounded-lg h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">
          Map integration will be implemented here
        </p>
      </div>
    </Card>
  );
};