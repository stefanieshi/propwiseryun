import { Card } from "@/components/ui/card";
import { Property } from "@/types";
import { cn } from "@/lib/utils";

interface ComparisonViewProps {
  properties: Property[];
}

const ComparisonView = ({ properties }: ComparisonViewProps) => {
  const metrics = [
    { 
      label: "Main Picture", 
      key: "imageUrl", 
      type: "image",
      highlight: false 
    },
    { 
      label: "Summary", 
      key: "title", 
      type: "text",
      highlight: false 
    },
    { 
      label: "Price", 
      key: "price", 
      type: "currency",
      highlight: false 
    },
    { 
      label: "Location", 
      key: "location", 
      type: "text",
      highlight: false 
    },
    { 
      label: "Crime", 
      key: "crime", 
      type: "number", 
      defaultValue: Math.floor(Math.random() * 100),
      highlight: false,
      formatValue: (value: number) => {
        if (value <= 10) return <span className="text-green-500 font-semibold">{value}</span>;
        if (value <= 30) return <span className="text-yellow-500 font-semibold">{value}</span>;
        return <span className="text-red-500 font-semibold">{value}</span>;
      }
    },
    { 
      label: "Mortgage", 
      key: "mortgage", 
      type: "currency", 
      defaultValue: 2000 + Math.floor(Math.random() * 500),
      highlight: false 
    },
    { 
      label: "Cost of Living", 
      key: "costOfLiving", 
      type: "currency", 
      defaultValue: 2000 + Math.floor(Math.random() * 500),
      highlight: true 
    },
    { 
      label: "Bill", 
      key: "bill", 
      type: "currency", 
      defaultValue: 200 + Math.floor(Math.random() * 300),
      highlight: false 
    },
    { 
      label: "Council tax", 
      key: "councilTax", 
      type: "currency", 
      defaultValue: 300 + Math.floor(Math.random() * 200),
      highlight: false 
    },
    { 
      label: "ROI", 
      key: "roi", 
      type: "percentage", 
      defaultValue: 5 + Math.floor(Math.random() * 6),
      highlight: true 
    },
    { 
      label: "Average monthly rent", 
      key: "rent", 
      type: "currency", 
      defaultValue: 1500 + Math.floor(Math.random() * 3000),
      highlight: false 
    },
    { 
      label: "Service charge", 
      key: "serviceCharge", 
      type: "currency", 
      defaultValue: 4000 + Math.floor(Math.random() * 3000),
      highlight: false 
    },
    { 
      label: "Ground rent", 
      key: "groundRent", 
      type: "currency", 
      defaultValue: 4000 + Math.floor(Math.random() * 3000),
      highlight: false 
    },
  ];

  const formatValue = (metric: any, property: Property) => {
    const value = property[metric.key as keyof Property] || metric.defaultValue;
    
    if (metric.formatValue) {
      return metric.formatValue(value);
    }
    
    switch (metric.type) {
      case "image":
        return (
          <img
            src={value as string}
            alt={property.title}
            className="w-full h-32 object-cover rounded-lg"
          />
        );
      case "currency":
        return `£${value.toLocaleString()}`;
      case "percentage":
        return `${value}%`;
      case "number":
        return value;
      default:
        return value;
    }
  };

  return (
    <Card className="p-6 overflow-x-auto">
      <div className="min-w-[800px]">
        <table className="w-full border-collapse">
          <tbody>
            {metrics.map((metric, index) => (
              <tr
                key={metric.key}
                className={cn(
                  "border-b last:border-b-0",
                  metric.highlight ? "bg-orange-50/5" : index % 2 === 0 ? "bg-secondary/5" : ""
                )}
              >
                <td className={cn(
                  "py-4 px-4 font-medium text-primary/80 w-[200px]",
                  metric.highlight && "text-orange-500"
                )}>
                  {metric.label}
                </td>
                {properties.map((property) => (
                  <td
                    key={property.id}
                    className="py-4 px-4 text-center"
                  >
                    {formatValue(metric, property)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComparisonView;