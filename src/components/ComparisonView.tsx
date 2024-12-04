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
    image_url: "/lovable-uploads/a103c4ad-b29e-4ca2-8b78-930831b670b3.png",
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
    title: "Modern Architectural Marvel",
    price: 6800000,
    location: "Hampstead, London",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7200,
    property_type: "House",
    description: "Stunning contemporary home with curved glass roof terrace and landscaped gardens",
    image_url: "/lovable-uploads/1a4be37c-90dd-4404-a312-da0a0654e491.png",
    crime_rate: 6,
    mortgage: 22000,
    cost_of_living: 6000,
    council_tax: 4200,
    roi: 3.8,
    avg_monthly_rent: 15000,
    service_charge: 0,
    ground_rent: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Historic Coach House",
    price: 3250000,
    location: "Richmond, London",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3800,
    property_type: "House",
    description: "Beautifully converted historic coach house with original features and modern amenities",
    image_url: "/lovable-uploads/753f39c6-065d-4521-98e8-03e7b4094058.png",
    crime_rate: 5,
    mortgage: 10500,
    cost_of_living: 4500,
    council_tax: 3200,
    roi: 4.5,
    avg_monthly_rent: 8500,
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