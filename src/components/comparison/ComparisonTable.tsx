import { Property } from "@/types";
import { MapPin } from "lucide-react";
import ComparisonRow from "./ComparisonRow";

interface ComparisonTableProps {
  properties: Property[];
}

const ComparisonTable = ({ properties }: ComparisonTableProps) => {
  const formatPrice = (value: number) => `£${value.toLocaleString()}`;
  const formatDate = (value: string) => new Date(value).toLocaleDateString();
  
  const getCrimeRateColor = (rate: number) => {
    if (rate <= 10) return "text-green-500";
    if (rate <= 30) return "text-yellow-500";
    if (rate <= 50) return "text-orange-500";
    return "text-red-500";
  };

  const mainRows = [
    { 
      label: "Price",
      key: "price" as keyof Property,
      formatter: formatPrice,
      tooltip: "Current listing price"
    },
    {
      label: "Location",
      key: "location" as keyof Property,
      icon: MapPin,
      tooltip: "Property location"
    },
    {
      label: "Crime Rate",
      key: "crime_rate" as keyof Property,
      formatter: (value: number) => (
        <span className={getCrimeRateColor(value)}>{value}</span>
      ),
      tooltip: "Local area crime rate"
    },
    {
      label: "Mortgage",
      key: "mortgage" as keyof Property,
      formatter: (value: number) => `£${value}/month`,
      tooltip: "Estimated monthly mortgage payment"
    },
    {
      label: "Cost of Living",
      key: "cost_of_living" as keyof Property,
      formatter: (value: number) => `£${value}/month`,
      tooltip: "Estimated monthly living costs"
    },
    {
      label: "Council Tax",
      key: "council_tax" as keyof Property,
      formatter: (value: number) => `£${value}/year`,
      tooltip: "Annual council tax"
    }
  ];

  const roiRows = [
    {
      label: "ROI",
      key: "roi" as keyof Property,
      formatter: (value: number) => `${value}%`,
      tooltip: "Return on Investment",
      highlight: true
    },
    {
      label: "Average Monthly Rent",
      key: "avg_monthly_rent" as keyof Property,
      formatter: formatPrice,
      tooltip: "Expected rental income"
    },
    {
      label: "Service Charge",
      key: "service_charge" as keyof Property,
      formatter: (value: number) => `£${value}/year`,
      tooltip: "Annual service charge"
    },
    {
      label: "Ground Rent",
      key: "ground_rent" as keyof Property,
      formatter: (value: number) => `£${value}/year`,
      tooltip: "Annual ground rent"
    }
  ];

  return (
    <div className="grid auto-cols-fr gap-4" style={{
      gridTemplateColumns: `200px repeat(${properties.length}, minmax(200px, 1fr))`
    }}>
      {mainRows.map((row) => (
        <ComparisonRow
          key={row.key}
          label={row.label}
          propertyKey={row.key}
          properties={properties}
          tooltip={row.tooltip}
          icon={row.icon}
          formatter={row.formatter}
        />
      ))}
      
      {roiRows.map((row) => (
        <ComparisonRow
          key={row.key}
          label={row.label}
          propertyKey={row.key}
          properties={properties}
          tooltip={row.tooltip}
          formatter={row.formatter}
          highlight={row.highlight}
        />
      ))}
    </div>
  );
};

export default ComparisonTable;