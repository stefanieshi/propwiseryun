import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, X } from "lucide-react";

interface AreaSearchProps {
  onAreaSelect: (area: string) => void;
  selectedAreas: string[];
  onAreaRemove: (area: string) => void;
}

const AreaSearch = ({ onAreaSelect, selectedAreas, onAreaRemove }: AreaSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onAreaSelect(searchQuery.trim());
      setSearchQuery("");
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search by city or postcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        {selectedAreas.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedAreas.map((area) => (
              <div
                key={area}
                className="bg-secondary px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span className="text-sm">{area}</span>
                <button
                  type="button"
                  onClick={() => onAreaRemove(area)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </form>
    </Card>
  );
};

export default AreaSearch;