import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Property } from "@/types";
import { motion } from "framer-motion";

interface PropertyHeaderProps {
  property: Property;
  onRemove: (property: Property) => void;
}

export const PropertyHeader = ({ property, onRemove }: PropertyHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center relative group"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={() => onRemove(property)}
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
  );
};