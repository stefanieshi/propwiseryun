import { Property } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
  selectedProperties?: Property[];
  onPropertySelect?: (property: Property) => void;
}

const PropertyGrid = ({ properties, loading, selectedProperties = [], onPropertySelect }: PropertyGridProps) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className={`relative ${
            selectedProperties.find((p) => p.id === property.id)
              ? "ring-2 ring-primary ring-offset-2"
              : ""
          }`}
          onClick={() => onPropertySelect?.(property)}
        >
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;