import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface PriceData {
  area: string;
  price: number;
  latitude: number;
  longitude: number;
}

interface PriceHeatmapProps {
  data: PriceData[];
}

const PriceHeatmap = ({ data }: PriceHeatmapProps) => {
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));

  const getColor = (price: number) => {
    const normalizedPrice = (price - minPrice) / (maxPrice - minPrice);
    const hue = 240 - (normalizedPrice * 200); // Blue to Red gradient
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Price Distribution Heatmap</h3>
      <div className="relative h-[400px] w-full bg-gray-100 rounded-lg">
        {data.map((point, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            className="absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: getColor(point.price),
              left: `${point.longitude}%`,
              top: `${point.latitude}%`,
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between text-sm text-muted-foreground">
        <span>£{minPrice.toLocaleString()}</span>
        <span>£{maxPrice.toLocaleString()}</span>
      </div>
    </Card>
  );
};

export default PriceHeatmap;