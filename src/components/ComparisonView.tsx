import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, X, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Property } from "@/types";
import { useComparison } from "@/contexts/ComparisonContext";
import { motion } from "framer-motion";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";
import { useState } from "react";

interface ComparisonViewProps {
  properties: Property[];
}

const ComparisonView = ({ properties }: ComparisonViewProps) => {
  const { togglePropertySelection } = useComparison();
  const [isExpanded, setIsExpanded] = useState(false);

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

  const getCrimeRateColor = (rate: number) => {
    if (rate <= 10) return "text-green-500";
    if (rate <= 30) return "text-yellow-500";
    if (rate <= 50) return "text-orange-500";
    return "text-red-500";
  };

  const ComparisonRow = ({ item, property }: { item: any, property: Property }) => (
    <div
      key={`${property.id}-${item.key}`}
      className={`text-center flex justify-center items-center py-4 border-t
        ${item.key === 'crime_rate' ? getCrimeRateColor(property[item.key]) : ''}
        ${item.highlight ? 'bg-primary/5 font-medium' : ''}`}
    >
      {item.icon && <item.icon className="h-4 w-4 mr-1 text-muted-foreground" />}
      {item.render
        ? item.render(property[item.key])
        : property[item.key]}
    </div>
  );

  return (
    <Card className="p-6 glass-effect">
      <div className="grid auto-cols-fr gap-4" style={{
        gridTemplateColumns: `200px repeat(${properties.length}, minmax(200px, 1fr))`
      }}>
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

        {/* Main Comparison Rows */}
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

        {/* ROI Section */}
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

        {/* Expanded ROI Details */}
        {isExpanded && expandedRoiItems.map(({ label, key, render }) => (
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

        {/* View Report Button */}
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