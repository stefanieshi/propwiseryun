import { useNavigate } from "react-router-dom";
import { Property } from "@/types";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SavedPropertiesProps {
  properties: Property[];
  loading: boolean;
}

const SavedProperties = ({ properties, loading }: SavedPropertiesProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-[400px] animate-pulse">
            <div className="h-48 bg-secondary/20 rounded-t-lg" />
            <div className="p-4 space-y-4">
              <div className="h-4 bg-secondary/20 rounded w-3/4" />
              <div className="h-4 bg-secondary/20 rounded w-1/2" />
              <div className="h-4 bg-secondary/20 rounded w-2/3" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-accent/80 bg-clip-text text-transparent">
          Saved Properties
        </h2>
        <Button
          onClick={() => navigate("/viewed-properties")}
          className="hover:scale-105 transition-transform"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SavedProperties;