import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface AreaFiltersProps {
  propertyType: string;
  setPropertyType: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  selectedAreas: string[];
  onRemoveArea: (postcode: string) => void;
}

const AreaFilters = ({
  propertyType,
  setPropertyType,
  timeRange,
  setTimeRange,
  priceRange,
  setPriceRange,
  selectedAreas,
  onRemoveArea,
}: AreaFiltersProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            <SelectItem value="house">Houses</SelectItem>
            <SelectItem value="flat">Flats</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Year</SelectItem>
            <SelectItem value="3">3 Years</SelectItem>
            <SelectItem value="5">5 Years</SelectItem>
            <SelectItem value="10">10 Years</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-250000">Up to £250k</SelectItem>
            <SelectItem value="250000-500000">£250k - £500k</SelectItem>
            <SelectItem value="500000-1000000">£500k - £1M</SelectItem>
            <SelectItem value="1000000+">£1M+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AreaFilters;