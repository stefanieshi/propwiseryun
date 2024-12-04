import { Property } from "@/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";
import { motion } from "framer-motion";

interface ComparisonHeaderProps {
  properties: Property[];
}

const ComparisonHeader = ({ properties }: ComparisonHeaderProps) => {
  const { togglePropertySelection } = useComparison();

  return (
    <div className="grid auto-cols-fr gap-4" style={{
      gridTemplateColumns: `200px repeat(${properties.length}, minmax(200px, 1fr))`
    }}>
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
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            onClick={() => togglePropertySelection(property)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="relative mb-4">
            <img
              src={property.image_url || ''}
              alt={property.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2 truncate" title={property.title}>
            {property.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ComparisonHeader;