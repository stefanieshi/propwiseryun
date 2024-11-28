import { Card } from "@/components/ui/card";

interface AreaMapProps {
  selectedAreas: string[];
  priceData: any; // We'll type this properly once we have the actual data structure
}

const AreaMap = ({ selectedAreas, priceData }: AreaMapProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Area Map</h2>
      <div className="bg-muted rounded-lg h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">
          Map integration will be implemented here
        </p>
      </div>
    </Card>
  );
};

export default AreaMap;