import { Property } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitCompare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
}

const PropertyGrid = ({ properties, loading }: PropertyGridProps) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const togglePropertySelection = (property: Property) => {
    if (!isSelectionMode) return;
    
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

  const handleCompareClick = () => {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
      toast({
        title: "Selection mode enabled",
        description: "Click on properties to select them for comparison",
      });
    } else {
      if (selectedProperties.length < 2) {
        toast({
          title: "Not enough properties selected",
          description: "Please select at least 2 properties to compare",
          variant: "destructive",
        });
        return;
      }
      // Navigate to the comparison dashboard with selected properties
      navigate("/viewed-properties", { state: { properties: selectedProperties } });
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
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isSelectionMode ? `${selectedProperties.length} properties selected` : ""}
        </p>
        <Button
          variant={isSelectionMode ? "secondary" : "default"}
          onClick={handleCompareClick}
          className="flex items-center gap-2"
        >
          <GitCompare className="h-4 w-4" />
          {isSelectionMode ? "Compare Selected" : "Select Properties to Compare"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isSelectable={isSelectionMode}
            isSelected={selectedProperties.some((p) => p.id === property.id)}
            onSelect={() => togglePropertySelection(property)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;