import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { useComparison } from "@/contexts/ComparisonContext";
import { motion } from "framer-motion";
import { PropertyHeader } from "./comparison/PropertyHeader";
import { ComparisonMetrics } from "./comparison/ComparisonMetrics";
import { ROISection } from "./comparison/ROISection";

interface ComparisonViewProps {
  properties: Property[];
}

const ComparisonView = ({ properties }: ComparisonViewProps) => {
  const { togglePropertySelection } = useComparison();

  return (
    <Card className="p-6 glass-effect">
      <div className="grid auto-cols-fr gap-4" style={{
        gridTemplateColumns: `200px repeat(${properties.length}, minmax(200px, 1fr))`
      }}>
        {/* Headers */}
        <div className="col-span-1"></div>
        {properties.map((property) => (
          <PropertyHeader
            key={property.id}
            property={property}
            onRemove={togglePropertySelection}
          />
        ))}

        {/* Main Comparison Metrics */}
        <ComparisonMetrics properties={properties} />

        {/* ROI Section with Timeline */}
        <ROISection properties={properties} />

        {/* View Report Button */}
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