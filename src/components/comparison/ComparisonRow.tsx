import { Property } from "@/types";
import { Info } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";
import { motion } from "framer-motion";

interface ComparisonRowProps {
  label: string;
  propertyKey: keyof Property;
  properties: Property[];
  tooltip?: string;
  highlight?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  formatter?: (value: any) => string | JSX.Element;
}

const ComparisonRow = ({
  label,
  propertyKey,
  properties,
  tooltip,
  highlight,
  icon: Icon,
  formatter
}: ComparisonRowProps) => {
  // Example property data for demonstration
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

  // Use example properties if no properties are provided
  const displayProperties = properties.length > 0 ? properties : exampleProperties;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="contents"
    >
      <div className={`flex items-center gap-2 font-medium py-4 border-t
        ${highlight ? 'text-primary' : 'text-muted-foreground'}`}
      >
        {label}
        {tooltip && (
          <TooltipWrapper content={tooltip}>
            <Info className="h-4 w-4 text-muted-foreground/70" />
          </TooltipWrapper>
        )}
      </div>
      {displayProperties.map((property) => (
        <div
          key={`${property.id}-${propertyKey}`}
          className={`text-center flex justify-center items-center py-4 border-t
            ${highlight ? 'bg-primary/5 font-medium' : ''}`}
        >
          {Icon && <Icon className="h-4 w-4 mr-1 text-muted-foreground" />}
          {formatter ? formatter(property[propertyKey]) : property[propertyKey]}
        </div>
      ))}
    </motion.div>
  );
};

export default ComparisonRow;