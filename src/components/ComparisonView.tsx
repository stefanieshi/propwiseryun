import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import ComparisonHeader from "./comparison/ComparisonHeader";
import ComparisonTable from "./comparison/ComparisonTable";

interface ComparisonViewProps {
  properties: Property[];
}

const ComparisonView = ({ properties }: ComparisonViewProps) => {
  return (
    <Card className="p-6 glass-effect">
      <ComparisonHeader properties={properties} />
      <div className="mt-8">
        <ComparisonTable properties={properties} />
      </div>
      
      {/* View Report Button */}
      <div className="grid auto-cols-fr gap-4 mt-8" style={{
        gridTemplateColumns: `200px repeat(${properties.length}, minmax(200px, 1fr))`
      }}>
        <div className="col-span-1 border-t py-4">
          <span className="font-medium text-muted-foreground">Detailed Report</span>
        </div>
        {properties.map((property) => (
          <div key={`${property.id}-report`} className="border-t py-4 text-center">
            <Button 
              variant="default"
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => window.open(`/property/${property.id}/report`, '_blank')}
            >
              View report
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ComparisonView;