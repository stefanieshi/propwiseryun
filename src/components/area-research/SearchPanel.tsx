import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { X, ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SearchPanelProps {
  onAreaSelect: (areas: string[]) => void;
}

interface PostcodeGroup {
  prefix: string;
  codes: string[];
}

export const SearchPanel = ({ onAreaSelect }: SearchPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState<string | null>(null);
  const [postcodeGroups, setPostcodeGroups] = useState<PostcodeGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    if (city) {
      fetchPostcodes(city);
    }
  }, [city]);

  const fetchPostcodes = async (cityName: string) => {
    const { data, error } = await supabase
      .from("area_analytics")
      .select("postcode")
      .ilike("city", `${cityName}%`)
      .order("postcode");

    if (error) {
      toast.error("Failed to fetch postcodes");
      return;
    }

    // Group postcodes by their prefix (e.g., "SE", "E", "W")
    const groups = data.reduce((acc: PostcodeGroup[], { postcode }) => {
      const prefix = postcode.match(/^[A-Z]+/)?.[0] || "";
      const existingGroup = acc.find(g => g.prefix === prefix);
      
      if (existingGroup) {
        existingGroup.codes.push(postcode);
      } else {
        acc.push({ prefix, codes: [postcode] });
      }
      
      return acc;
    }, []);

    setPostcodeGroups(groups);
  };

  const handleSearch = () => {
    if (!searchTerm) {
      toast.error("Please enter a city name");
      return;
    }
    setCity(searchTerm);
    setSelectedGroup(null);
  };

  const handleGroupSelect = (prefix: string) => {
    setSelectedGroup(prefix);
  };

  const handleAreaSelect = (postcode: string) => {
    if (selectedAreas.length >= 5 && !selectedAreas.includes(postcode)) {
      toast.error("You can compare up to 5 areas at a time");
      return;
    }

    const newSelectedAreas = selectedAreas.includes(postcode)
      ? selectedAreas.filter(area => area !== postcode)
      : [...selectedAreas, postcode];

    setSelectedAreas(newSelectedAreas);
    onAreaSelect(newSelectedAreas);
  };

  const handleSelectAllInGroup = (prefix: string) => {
    const group = postcodeGroups.find(g => g.prefix === prefix);
    if (!group) return;

    const newAreas = [...new Set([...selectedAreas, ...group.codes])].slice(0, 5);
    setSelectedAreas(newAreas);
    onAreaSelect(newAreas);

    if (newAreas.length === 5) {
      toast.info("Maximum 5 areas selected");
    }
  };

  const clearSelections = () => {
    setSelectedAreas([]);
    setSelectedGroup(null);
    setCity(null);
    setSearchTerm("");
    onAreaSelect([]);
  };

  return (
    <div className="space-y-4 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
      {/* Search Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Enter city name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="bg-background/50"
        />
        <Button onClick={handleSearch} variant="default">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Breadcrumb Navigation */}
      {city && (
        <Breadcrumb className="animate-fade-in">
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => setSelectedGroup(null)}>
              {city}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {selectedGroup && (
            <BreadcrumbItem>
              <ChevronRight className="h-4 w-4" />
              <BreadcrumbLink>{selectedGroup}</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      )}

      {/* Selected Areas */}
      {selectedAreas.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {selectedAreas.map((area) => (
            <Badge
              key={area}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {area}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleAreaSelect(area)}
              />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSelections}
            className="text-muted-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Postcode Groups */}
      {city && !selectedGroup && postcodeGroups.length > 0 && (
        <ScrollArea className="h-60 rounded-md border p-4">
          <div className="space-y-2">
            {postcodeGroups.map(({ prefix, codes }) => (
              <div
                key={prefix}
                className="flex items-center justify-between p-2 hover:bg-secondary/10 rounded-lg transition-colors animate-fade-in"
              >
                <span className="font-medium">{prefix}</span>
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSelectAllInGroup(prefix)}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGroupSelect(prefix)}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Individual Postcodes */}
      {selectedGroup && (
        <ScrollArea className="h-60 rounded-md border p-4">
          <div className="space-y-2">
            {postcodeGroups
              .find(g => g.prefix === selectedGroup)
              ?.codes.map((postcode) => (
                <div
                  key={postcode}
                  className="flex items-center justify-between p-2 hover:bg-secondary/10 rounded-lg transition-colors animate-fade-in"
                >
                  <span>{postcode}</span>
                  <Button
                    variant={selectedAreas.includes(postcode) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAreaSelect(postcode)}
                  >
                    {selectedAreas.includes(postcode) ? "Selected" : "Select"}
                  </Button>
                </div>
              ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};