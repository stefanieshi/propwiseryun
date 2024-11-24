import { Info } from "lucide-react";
import { Property } from "@/types";
import { motion } from "framer-motion";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";
import { ComparisonRow } from "./ComparisonRow";

interface TimelineMetricsProps {
  properties: Property[];
}

export const TimelineMetrics = ({ properties }: TimelineMetricsProps) => {
  const timelineItems = [
    { 
      label: "Time to Sell", 
      key: "time_to_sell",
      render: (value: number) => `${value} months`
    },
    { 
      label: "Final Sale Date", 
      key: "final_sale_date",
      render: (value: string) => value
    },
    { 
      label: "Last Listed Date", 
      key: "last_listed_date",
      render: (value: string) => value
    },
    { 
      label: "Previous Sale Date", 
      key: "previous_sale_date",
      render: (value: string) => value
    },
    { 
      label: "Previous Listed Date", 
      key: "previous_listed_date",
      render: (value: string) => value
    }
  ];

  return (
    <>
      {timelineItems.map(({ label, key, render }) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
    </>
  );
};