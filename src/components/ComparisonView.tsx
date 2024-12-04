import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import ComparisonHeader from "./comparison/ComparisonHeader";
import ComparisonTable from "./comparison/ComparisonTable";

// Example properties data
const exampleProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Georgian Mansion",
    price: 4500000,
    location: "St John's Wood, London",
    bedrooms: 6,
    bathrooms: 5,
    sqft: 6500,
    property_type: "House",
    description: "Magnificent Georgian mansion with stunning period features and modern luxury amenities",
    image_url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    crime_rate: 8,
    mortgage: 15000,
    cost_of_living: 5000,
    council_tax: 3600,
    roi: 4.2,
    avg_monthly_rent: 12000,
    service_charge: 0,
    ground_rent: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Elegant Victorian Conversion",
    price: 2800000,
    location: "Kensington, London",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    property_type: "Apartment",
    description: "Beautifully converted Victorian property with high ceilings and original features",
    image_url: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace",
    crime_rate: 6,
    mortgage: 9500,
    cost_of_living: 4200,
    council_tax: 2800,
    roi: 4.8,
    avg_monthly_rent: 8500,
    service_charge: 4800,
    ground_rent: 350,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Historic Coach House",
    price: 1950000,
    location: "Richmond, London",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    property_type: "House",
    description: "Unique converted coach house with character features and private garden",
    image_url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    crime_rate: 5,
    mortgage: 6800,
    cost_of_living: 3800,
    council_tax: 2200,
    roi: 5.2,
    avg_monthly_rent: 6500,
    service_charge: 0,
    ground_rent: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

interface ComparisonViewProps {
  properties?: Property[];
}

const ComparisonView = ({ properties }: ComparisonViewProps) => {
  const displayProperties = properties || exampleProperties;
  
  return (
    <Card className="p-6 glass-effect">
      <ComparisonHeader properties={displayProperties} />
      <div className="mt-8">
        <ComparisonTable properties={displayProperties} />
      </div>
      
      {/* View Report Button */}
      <div className="grid auto-cols-fr gap-4 mt-8" style={{
        gridTemplateColumns: `200px repeat(${displayProperties.length}, minmax(200px, 1fr))`
      }}>
        <div className="col-span-1 border-t py-4">
          <span className="font-medium text-muted-foreground">Detailed Report</span>
        </div>
        {displayProperties.map((property) => (
          <div
            key={`${property.id}-report`}
            className="border-t border-primary/20 py-4 text-center bg-primary/5"
          >
            <Button 
              variant="default"
              className="bg-primary hover:bg-primary/90"
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