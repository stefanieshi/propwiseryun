import { Property } from "@/types";
import { MapPin } from "lucide-react";
import ComparisonRow from "./ComparisonRow";
import { formatPrice } from "@/components/analytics/utils/priceCalculations";

interface ComparisonTableProps {
  properties: Property[];
}

const ComparisonTable = ({ properties }: ComparisonTableProps) => {
  const formatDate = (value: string) => value ? new Date(value).toLocaleDateString() : 'N/A';
  
  const getCrimeRateColor = (rate: number | undefined) => {
    if (!rate) return "text-gray-400";
    if (rate <= 10) return "text-green-500";
    if (rate <= 30) return "text-yellow-500";
    if (rate <= 50) return "text-orange-500";
    return "text-red-500";
  };

  const mainRows = [
    { 
      label: "Price",
      key: "price" as keyof Property,
      formatter: (value: number | undefined) => value ? formatPrice(value) : 'N/A',
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
      formatter: (value: number | undefined) => (
        <span className={getCrimeRateColor(value)}>{value ?? 'N/A'}</span>
      ),
      tooltip: "Local area crime rate"
    },
    {
      label: "Mortgage",
      key: "mortgage" as keyof Property,
      formatter: (value: number | undefined) => value ? `${formatPrice(value)}/month` : 'N/A',
      tooltip: "Estimated monthly mortgage payment"
    },
    {
      label: "Cost of Living",
      key: "cost_of_living" as keyof Property,
      formatter: (value: number | undefined) => value ? `${formatPrice(value)}/month` : 'N/A',
      tooltip: "Estimated monthly living costs"
    },
    {
      label: "Council Tax",
      key: "council_tax" as keyof Property,
      formatter: (value: number | undefined) => value ? `${formatPrice(value)}/year` : 'N/A',
      tooltip: "Annual council tax"
    }
  ];

  const roiRows = [
    {
      label: "ROI",
      key: "roi" as keyof Property,
      formatter: (value: number | undefined) => value ? `${value}%` : 'N/A',
      tooltip: "Return on Investment",
      highlight: true
    },
    {
      label: "Average Monthly Rent",
      key: "avg_monthly_rent" as keyof Property,
      formatter: (value: number | undefined) => value ? formatPrice(value) : 'N/A',
      tooltip: "Expected rental income"
    },
    {
      label: "Service Charge",
      key: "service_charge" as keyof Property,
      formatter: (value: number | undefined) => value ? `${formatPrice(value)}/year` : 'N/A',
      tooltip: "Annual service charge"
    },
    {
      label: "Ground Rent",
      key: "ground_rent" as keyof Property,
      formatter: (value: number | undefined) => value ? `${formatPrice(value)}/year` : 'N/A',
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