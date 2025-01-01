import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const PropertySearches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-conveyancing', {
        body: { 
          action: 'property_search', 
          data: { query: searchQuery }
        }
      });

      if (error) throw error;

      await supabase.from('property_searches').insert({
        property_id: data.property_id,
        search_type: 'land_registry',
        results: data.results,
        status: 'completed'
      });

      toast({
        title: "Success",
        description: "Property search completed successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Property Searches</h3>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter property address or title number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertySearches;