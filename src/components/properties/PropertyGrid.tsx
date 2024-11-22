import { Property } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitCompare } from "lucide-react";
import { useState } from "react";
import ComparisonView from "@/components/ComparisonView";
import { useToast } from "@/hooks/use-toast";

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
}

const PropertyGrid = ({ properties, loading }: PropertyGridProps) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const { toast } = useToast();

  const togglePropertySelection = (property: Property) => {
    if (selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties(selectedProperties.filter(p => p.id !== property.id));
    } else {
      if (selectedProperties.length >= 4) {
        toast({
          title: "Maximum properties reached",
          description: "You can compare up to 4 properties at a time",
          variant: "destructive",
        });
        return;
      }
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">No properties found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {selectedProperties.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedProperties.length} properties selected
          </p>
          <Button
            variant={showComparison ? "secondary" : "default"}
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center gap-2"
          >
            <GitCompare className="h-4 w-4" />
            {showComparison ? "Hide Comparison" : "Compare Properties"}
          </Button>
        </div>
      )}

      {showComparison && selectedProperties.length > 0 && (
        <ComparisonView properties={selectedProperties} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className={`relative cursor-pointer transition-all duration-300 ${
              selectedProperties.find((p) => p.id === property.id)
                ? "ring-2 ring-primary ring-offset-2 scale-[1.02]"
                : ""
            }`}
            onClick={() => togglePropertySelection(property)}
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;