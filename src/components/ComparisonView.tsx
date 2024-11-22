import { Card } from "@/components/ui/card";
import { Bed, Bath, Square, MapPin } from "lucide-react";

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

interface ComparisonViewProps {
  properties: Property[];
}

const ComparisonView = ({ properties }: ComparisonViewProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Property Comparison
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Headers */}
        <div className="col-span-1"></div>
        {properties.map((property) => (
          <div key={property.id} className="text-center">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
          </div>
        ))}

        {/* Price */}
        <div className="font-medium text-gray-600">Price</div>
        {properties.map((property) => (
          <div key={property.id} className="text-center font-bold text-primary">
            £{property.price.toLocaleString()}
          </div>
        ))}

        {/* Location */}
        <div className="font-medium text-gray-600">Location</div>
        {properties.map((property) => (
          <div key={property.id} className="text-center flex justify-center items-center">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            {property.location}
          </div>
        ))}

        {/* Bedrooms */}
        <div className="font-medium text-gray-600">Bedrooms</div>
        {properties.map((property) => (
          <div key={property.id} className="text-center flex justify-center items-center">
            <Bed className="h-4 w-4 mr-1 text-gray-400" />
            {property.bedrooms}
          </div>
        ))}

        {/* Bathrooms */}
        <div className="font-medium text-gray-600">Bathrooms</div>
        {properties.map((property) => (
          <div key={property.id} className="text-center flex justify-center items-center">
            <Bath className="h-4 w-4 mr-1 text-gray-400" />
            {property.bathrooms}
          </div>
        ))}

        {/* Square Footage */}
        <div className="font-medium text-gray-600">Square Footage</div>
        {properties.map((property) => (
          <div key={property.id} className="text-center flex justify-center items-center">
            <Square className="h-4 w-4 mr-1 text-gray-400" />
            {property.sqft} ft²
          </div>
        ))}

        {/* Property Type */}
        <div className="font-medium text-gray-600">Property Type</div>
        {properties.map((property) => (
          <div key={property.id} className="text-center">
            {property.type}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ComparisonView;