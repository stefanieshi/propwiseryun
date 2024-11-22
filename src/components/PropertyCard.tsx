import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { Home, Bed, Bath, Square, TrendingUp, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-105 glass-effect group">
      <div className="relative">
        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {property.title}
        </h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
          £{property.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-400 mb-4">{property.location}</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center text-gray-300">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bedrooms}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bathrooms}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Square className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.sqft} ft²</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={() => navigate(`/property/${property.id}/analytics`)}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => navigate(`/property/${property.id}/calculator`)}
          >
            <Calculator className="h-4 w-4 mr-2" />
            ROI
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;