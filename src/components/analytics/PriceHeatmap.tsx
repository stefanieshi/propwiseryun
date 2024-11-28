import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { formatPrice } from "./utils/priceCalculations";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ZoomIn, ZoomOut, Move } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));

  const getColor = (price: number) => {
    const normalizedPrice = (price - minPrice) / (maxPrice - minPrice);
    // Enhanced color gradient using HSL
    const hue = 240 - (normalizedPrice * 200); // Blue to Red gradient
    const saturation = 70 + (normalizedPrice * 20); // Increasing saturation with price
    const lightness = 50 - (normalizedPrice * 10); // Slightly darker for higher prices
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const getRadius = (price: number) => {
    const normalizedPrice = (price - minPrice) / (maxPrice - minPrice);
    return (20 + normalizedPrice * 20) * zoom; // Larger radius for higher prices
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Price Distribution Heatmap</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            className="h-8 w-8"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            className="h-8 w-8"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Move className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div 
        className="relative h-[400px] w-full bg-secondary/20 rounded-lg overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          style={{
            x: position.x,
            y: position.y,
            scale: zoom,
          }}
          className="absolute inset-0"
          transition={{ type: "spring", damping: 20 }}
        >
          <AnimatePresence>
            {data.map((point, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute rounded-full cursor-pointer hover:opacity-100 transition-opacity"
                      style={{
                        backgroundColor: getColor(point.price),
                        width: getRadius(point.price),
                        height: getRadius(point.price),
                        left: `${point.longitude}%`,
                        top: `${point.latitude}%`,
                        transform: `translate(-50%, -50%)`,
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      <p className="font-semibold">{point.area}</p>
                      <p>{formatPrice(point.price)}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ background: getColor(minPrice) }} />
          <span className="text-sm text-muted-foreground">{formatPrice(minPrice)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{formatPrice(maxPrice)}</span>
          <div className="w-4 h-4 rounded-full" style={{ background: getColor(maxPrice) }} />
        </div>
      </div>
    </Card>
  );
};

export default PriceHeatmap;