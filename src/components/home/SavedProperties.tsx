import { Property } from "@/types";
import PropertyCard from "../PropertyCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SavedPropertiesProps {
  properties: Property[];
}

export const SavedProperties = ({ properties }: SavedPropertiesProps) => {
  const navigate = useNavigate();

  if (properties.length === 0) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Saved Properties</h2>
        <Button onClick={() => navigate("/viewed-properties")}>
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