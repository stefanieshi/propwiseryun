import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, X, Info } from "lucide-react";
import { Property } from "@/types";
import { useComparison } from "@/contexts/ComparisonContext";
import { motion } from "framer-motion";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";

interface ComparisonViewProps {
  properties: Property[];
}

const ComparisonView = ({ properties }: ComparisonViewProps) => {
  const { togglePropertySelection } = useComparison();

  const compareItems = [
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
    { 
      label: "ROI", 
      key: "roi",
      render: (value: number) => `${value}%`
    },
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
            <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
            <p className="text-sm text-muted-foreground">{property.description}</p>
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
            <div className="flex items-center gap-2 font-medium text-muted-foreground py-4 border-t">
              {label}
              <TooltipWrapper content={`More information about ${label.toLowerCase()}`}>
                <Info className="h-4 w-4 text-muted-foreground/70" />
              </TooltipWrapper>
            </div>
            {properties.map((property) => (
              <div
                key={`${property.id}-${key}`}
                className={`text-center flex justify-center items-center py-4 border-t
                  ${key === 'crime_rate' ? getCrimeRateColor(property[key]) : ''}`}
              >
                {Icon && <Icon className="h-4 w-4 mr-1 text-muted-foreground" />}
                {render
                  ? render(property[key])
                  : property[key]}
              </div>
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