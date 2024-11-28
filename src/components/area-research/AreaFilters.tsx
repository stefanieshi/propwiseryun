import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface AreaFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  selectedAreas: string[];
  onSearch: () => void;
  onRemoveArea: (postcode: string) => void;
}

const AreaFilters = ({
  searchTerm,
  setSearchTerm,
  propertyType,
  setPropertyType,
  timeRange,
  setTimeRange,
  priceRange,
  setPriceRange,
  selectedAreas,
  onSearch,
  onRemoveArea,
}: AreaFiltersProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter city or postcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="bg-background/50"
          />
          <Button onClick={onSearch} className="bg-primary hover:bg-primary/90">
            <Search className="w-4 h-4" />
          </Button>
        </div>

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

      <div className="flex flex-wrap gap-2 mb-6">
        {selectedAreas.map((postcode, index) => (
          <motion.div
            key={postcode}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full"
          >
            <span className="text-sm font-medium">{postcode}</span>
            <button
              onClick={() => onRemoveArea(postcode)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AreaFilters;