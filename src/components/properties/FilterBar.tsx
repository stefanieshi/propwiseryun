import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  priceFilter: string;
  setPriceFilter: (value: string) => void;
  bedroomFilter: string;
  setBedroomFilter: (value: string) => void;
  resetFilters: () => void;
}

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  priceFilter,
  setPriceFilter,
  bedroomFilter,
  setBedroomFilter,
  resetFilters,
}: FilterBarProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search properties..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Select value={priceFilter} onValueChange={setPriceFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Price range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All prices</SelectItem>
          <SelectItem value="under1m">Under £1M</SelectItem>
          <SelectItem value="1m-2m">£1M - £2M</SelectItem>
          <SelectItem value="over2m">Over £2M</SelectItem>
        </SelectContent>
      </Select>

      <Select value={bedroomFilter} onValueChange={setBedroomFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Bedrooms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any bedrooms</SelectItem>
          {[1, 2, 3, 4, 5].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} {num === 1 ? "bedroom" : "bedrooms"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={resetFilters}>
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterBar;