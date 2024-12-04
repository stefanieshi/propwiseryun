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
      {properties.map((property) => (
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