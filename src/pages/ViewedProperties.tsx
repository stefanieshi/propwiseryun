import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bed, Bath, Square } from "lucide-react";

interface Property {
  id: number;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
}

const ViewedProperties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - in a real app this would come from your backend
  const properties: Property[] = [
    {
      id: 1,
      address: "123 Main St",
      price: 1234000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1200,
      imageUrl: "https://placehold.co/600x400",
    },
    {
      id: 2,
      address: "456 Elm Ave",
      price: 2345000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2300,
      imageUrl: "https://placehold.co/600x400",
    },
    {
      id: 3,
      address: "789 Oak St",
      price: 3456000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3400,
      imageUrl: "https://placehold.co/600x400",
    },
  ];

  const filteredProperties = properties.filter((property) =>
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Viewed properties</h1>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search saved properties"
            className="pl-10 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <img
                src={property.imageUrl}
                alt={property.address}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{property.address}</h3>
                <p className="text-lg font-bold text-primary mb-2">
                  £{property.price.toLocaleString()}
                </p>
                <div className="flex justify-between text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} bd</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} ba</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => console.log("Analyze clicked")}
                  >
                    Analyze
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => console.log("Compare clicked")}
                  >
                    Compare
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewedProperties;