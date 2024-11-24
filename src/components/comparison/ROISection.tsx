import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { Property } from "@/types";
import { motion } from "framer-motion";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ComparisonRow } from "./ComparisonRow";
import { useState } from "react";

interface ROISectionProps {
  properties: Property[];
}

export const ROISection = ({ properties }: ROISectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const roiCompareItems = [
    { 
      label: "ROI", 
      key: "roi",
      render: (value: number) => `${value}%`,
      highlight: true
    }
  ];

  const expandedRoiItems = [
    { 
      label: "Average Monthly Rent", 
      key: "avg_monthly_rent",
      render: (value: number) => `£${value}`
    },
    { 
      label: "Service Charge", 
      key: "service_charge",
      render: (value: number) => `£${value}/year`
    },
    { 
      label: "Ground Rent", 
      key: "ground_rent",
      render: (value: number) => `£${value}/year`
    }
  ];

  return (
    <>
      {roiCompareItems.map(({ label, key, render }) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="contents"
        >
          <div className="flex items-center gap-2 font-medium text-primary py-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {label}
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              )}
            </Button>
            <TooltipWrapper content="Return on Investment calculation">
              <Info className="h-4 w-4 text-primary/70" />
            </TooltipWrapper>
          </div>
          {properties.map((property) => (
            <ComparisonRow 
              key={`${property.id}-${key}`} 
              item={{ key, render, highlight: true }} 
              property={property} 
            />
          ))}
        </motion.div>
      ))}

      {isExpanded && (
        <>
          {expandedRoiItems.map(({ label, key, render }) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="contents"
            >
              <div className="flex items-center gap-2 font-medium text-muted-foreground py-4 border-t pl-6">
                {label}
                <TooltipWrapper content={`More information about ${label.toLowerCase()}`}>
                  <Info className="h-4 w-4 text-muted-foreground/70" />
                </TooltipWrapper>
              </div>
              {properties.map((property) => (
                <ComparisonRow key={`${property.id}-${key}`} item={{ key, render }} property={property} />
              ))}
            </motion.div>
          ))}
          <TimelineMetrics properties={properties} />
        </>
      )}
    </>
  );
};