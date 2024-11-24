import { Property } from "@/types";

interface ComparisonRowProps {
  item: any;
  property: Property;
}

export const ComparisonRow = ({ item, property }: ComparisonRowProps) => (
  <div
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

const getCrimeRateColor = (rate: number) => {
  if (rate <= 10) return "text-green-500";
  if (rate <= 30) return "text-yellow-500";
  if (rate <= 50) return "text-orange-500";
  return "text-red-500";
};