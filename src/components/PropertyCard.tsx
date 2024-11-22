import { Card } from "@/components/ui/card";
import { Home, Bed, Bath, Square } from "lucide-react";

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  imageUrl: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-105 glass-effect group">
      <div className="relative">
        <img
          src={property.imageUrl}
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
        <div className="grid grid-cols-3 gap-2">
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
      </div>
    </Card>
  );
};

export default PropertyCard;