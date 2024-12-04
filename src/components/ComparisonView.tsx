import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import ComparisonHeader from "./comparison/ComparisonHeader";
import ComparisonTable from "./comparison/ComparisonTable";

// Example properties data
const exampleProperties: Property[] = [
  {
    id: "1",
    title: "Modern City Apartment",
    price: 450000,
    location: "Manchester City Centre",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 850,
    property_type: "Apartment",
    description: "A stunning modern apartment in the heart of Manchester",
    image_url: "https://placehold.co/600x400",
    crime_rate: 15,
    mortgage: 1800,
    cost_of_living: 2500,
    council_tax: 1600,
    roi: 5.8,
    avg_monthly_rent: 1500,
    service_charge: 2400,
    ground_rent: 250,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Victorian Terrace House",
    price: 380000,
    location: "Didsbury, Manchester",
    bedrooms: 3,
    bathrooms: 1,
    sqft: 1200,
    property_type: "House",
    description: "Charming Victorian terrace with period features",
    image_url: "https://placehold.co/600x400",
    crime_rate: 8,
    mortgage: 1500,
    cost_of_living: 2200,
    council_tax: 1400,
    roi: 6.2,
    avg_monthly_rent: 1300,
    service_charge: 0,
    ground_rent: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Modern New Build",
    price: 520000,
    location: "Salford Quays",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1500,
    property_type: "House",
    description: "Spacious new build property with modern amenities",
    image_url: "https://placehold.co/600x400",
    crime_rate: 12,
    mortgage: 2100,
    cost_of_living: 2800,
    council_tax: 1800,
    roi: 5.5,
    avg_monthly_rent: 1800,
    service_charge: 1200,
    ground_rent: 150,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

interface ComparisonViewProps {
  properties: Property[];
}

const ComparisonView = ({ properties = exampleProperties }: ComparisonViewProps) => {
  return (
    <Card className="p-6 glass-effect">
      <ComparisonHeader properties={properties} />
      <div className="mt-8">
        <ComparisonTable properties={properties} />
      </div>
      
      {/* View Report Button */}
      <div className="grid auto-cols-fr gap-4 mt-8" style={{
        gridTemplateColumns: `200px repeat(${properties.length}, minmax(200px, 1fr))`
      }}>
        <div className="col-span-1 border-t py-4">
          <span className="font-medium text-muted-foreground">Detailed Report</span>
        </div>
        {properties.map((property) => (
          <div key={`${property.id}-report`} className="border-t py-4 text-center">
            <Button 
              variant="default"
              className="bg-orange-500 hover:bg-orange-600"
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