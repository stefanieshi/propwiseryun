import { Card } from "@/components/ui/card";
import { Property } from "@/types";
import { cn } from "@/lib/utils";

interface ComparisonViewProps {
  properties: Property[];
}

const ComparisonView = ({ properties }: ComparisonViewProps) => {
  const metrics = [
    { label: "Main Picture", key: "imageUrl", type: "image" },
    { label: "Summary", key: "title", type: "text" },
    { label: "Price", key: "price", type: "currency" },
    { label: "Location", key: "location", type: "text" },
    { label: "Crime", key: "crime", type: "number", defaultValue: Math.floor(Math.random() * 100) },
    { label: "Mortgage", key: "mortgage", type: "currency", defaultValue: 2000 + Math.floor(Math.random() * 500) },
    { label: "Cost of Living", key: "costOfLiving", type: "currency", defaultValue: 2000 + Math.floor(Math.random() * 500) },
    { label: "Bill", key: "bill", type: "currency", defaultValue: 200 + Math.floor(Math.random() * 300) },
    { label: "Council tax", key: "councilTax", type: "currency", defaultValue: 300 + Math.floor(Math.random() * 200) },
    { label: "ROI", key: "roi", type: "percentage", defaultValue: 5 + Math.floor(Math.random() * 6) },
    { label: "Average monthly rent", key: "rent", type: "currency", defaultValue: 1500 + Math.floor(Math.random() * 3000) },
    { label: "Service charge", key: "serviceCharge", type: "currency", defaultValue: 4000 + Math.floor(Math.random() * 3000) },
    { label: "Ground rent", key: "groundRent", type: "currency", defaultValue: 4000 + Math.floor(Math.random() * 3000) },
  ];

  const formatValue = (metric: any, property: Property) => {
    const value = property[metric.key as keyof Property] || metric.defaultValue;
    
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
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-primary/80 to-accent/80 bg-clip-text text-transparent">
        Compare Properties
      </h2>
      <div className="min-w-[800px]">
        <table className="w-full">
          <tbody>
            {metrics.map((metric, index) => (
              <tr
                key={metric.key}
                className={cn(
                  "border-b last:border-b-0",
                  index % 2 === 0 ? "bg-secondary/5" : ""
                )}
              >
                <td className="py-4 px-4 font-medium text-primary/80 w-[200px]">
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