import { MapPin, Info } from "lucide-react";
import { Property } from "@/types";
import { motion } from "framer-motion";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";
import { ComparisonRow } from "./ComparisonRow";

interface ComparisonMetricsProps {
  properties: Property[];
}

export const ComparisonMetrics = ({ properties }: ComparisonMetricsProps) => {
  const mainCompareItems = [
    { 
      label: "Price", 
      key: "price", 
      render: (value: number) => `£${value.toLocaleString()}`
    },
    { 
      label: "Location", 
      key: "location", 
      icon: MapPin 
    },
    { 
      label: "Crime Rate", 
      key: "crime_rate",
      render: (value: number) => (
        <div className={`inline-flex items-center ${getCrimeRateColor(value)}`}>
          {value}
        </div>
      )
    },
    { 
      label: "Mortgage", 
      key: "mortgage",
      render: (value: number) => `£${value}/month`
    },
    { 
      label: "Cost of Living", 
      key: "cost_of_living",
      render: (value: number) => `£${value}/month`
    },
    { 
      label: "Council Tax", 
      key: "council_tax",
      render: (value: number) => `£${value}/year`
    },
  ];

  return (
    <>
      {mainCompareItems.map(({ label, key, icon: Icon, render }) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="contents"
        >
          <div className="flex items-center gap-2 font-medium text-muted-foreground py-4 border-t">
            {label}
            <TooltipWrapper content={`More information about ${label.toLowerCase()}`}>
              <Info className="h-4 w-4 text-muted-foreground/70" />
            </TooltipWrapper>
          </div>
          {properties.map((property) => (
            <ComparisonRow key={`${property.id}-${key}`} item={{ key, icon: Icon, render }} property={property} />
          ))}
        </motion.div>
      ))}
    </>
  );
};

const getCrimeRateColor = (rate: number) => {
  if (rate <= 10) return "text-green-500";
  if (rate <= 30) return "text-yellow-500";
  if (rate <= 50) return "text-orange-500";
  return "text-red-500";
};