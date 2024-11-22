import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, X } from "lucide-react";
import { Property } from "@/types";
import { useComparison } from "@/contexts/ComparisonContext";
import { motion } from "framer-motion";

interface ComparisonViewProps {
  properties: Property[];
}

const ComparisonView = ({ properties }: ComparisonViewProps) => {
  const { togglePropertySelection } = useComparison();

  const compareItems = [
    { label: "Price", key: "price", render: (value: number) => `£${value.toLocaleString()}` },
    { label: "Location", key: "location", icon: MapPin },
    { label: "Bedrooms", key: "bedrooms", icon: Bed },
    { label: "Bathrooms", key: "bathrooms", icon: Bath },
    { label: "Square Footage", key: "sqft", icon: Square, render: (value: number) => `${value} ft²` },
    { label: "Property Type", key: "property_type" },
  ];

  return (
    <Card className="p-6 glass-effect">
      <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {/* Headers */}
        <div className="col-span-1"></div>
        {properties.map((property) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center relative group"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => togglePropertySelection(property)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative">
              <img
                src={property.image_url || ''}
                alt={property.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
          </motion.div>
        ))}

        {/* Comparison Rows */}
        {compareItems.map(({ label, key, icon: Icon, render }) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="contents"
          >
            <div className="font-medium text-muted-foreground py-4 border-t">
              {label}
            </div>
            {properties.map((property) => (
              <div
                key={`${property.id}-${key}`}
                className="text-center flex justify-center items-center py-4 border-t"
              >
                {Icon && <Icon className="h-4 w-4 mr-1 text-muted-foreground" />}
                {render
                  ? render(property[key as keyof Property] as number)
                  : property[key as keyof Property]}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default ComparisonView;