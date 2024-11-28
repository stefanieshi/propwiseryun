import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AreaSearch from "./AreaSearch";
import AreaMap from "./AreaMap";
import AreaTrendChart from "./AreaTrendChart";
import { Save } from "lucide-react";

const AreaResearch = () => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const { toast } = useToast();

  const { data: areaData, isLoading } = useQuery({
    queryKey: ["areaAnalytics", selectedAreas],
    queryFn: async () => {
      if (selectedAreas.length === 0) return null;
      
      const { data, error } = await supabase
        .from("area_analytics")
        .select("*")
        .in("postcode", selectedAreas);
      
      if (error) throw error;

      // Transform the data for the chart
      if (!data) return [];
      
      const transformedData = data.map(area => {
        const priceHistory = area.price_history as { date: string; price: number }[] || [];
        return priceHistory.map(history => ({
          date: history.date,
          [area.postcode]: history.price,
        }));
      });

      // Merge all price histories into a single array with all areas
      const mergedData = transformedData.reduce((acc, curr) => {
        curr.forEach(entry => {
          const existingEntry = acc.find(e => e.date === entry.date);
          if (existingEntry) {
            Object.assign(existingEntry, entry);
          } else {
            acc.push(entry);
          }
        });
        return acc;
      }, [] as Array<{ [key: string]: string | number }>);

      // Sort by date
      return mergedData.sort((a, b) => 
        new Date(a.date as string).getTime() - new Date(b.date as string).getTime()
      );
    },
    enabled: selectedAreas.length > 0,
  });

  const handleAreaSelect = (area: string) => {
    if (selectedAreas.length >= 4) {
      toast({
        title: "Maximum areas reached",
        description: "You can compare up to 4 areas at a time",
        variant: "destructive",
      });
      return;
    }
    if (!selectedAreas.includes(area)) {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleAreaRemove = (area: string) => {
    setSelectedAreas(selectedAreas.filter((a) => a !== area));
  };

  const handleSaveAnalysis = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save your analysis",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("saved_area_analyses").insert({
        user_id: user.id,
        title: `Area Analysis - ${new Date().toLocaleDateString()}`,
        selected_areas: selectedAreas,
      });

      if (error) throw error;

      toast({
        title: "Analysis saved",
        description: "You can view your saved analyses in your profile",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Area Research</h2>
        {selectedAreas.length > 0 && (
          <Button onClick={handleSaveAnalysis}>
            <Save className="h-4 w-4 mr-2" />
            Save Analysis
          </Button>
        )}
      </div>

      <AreaSearch
        onAreaSelect={handleAreaSelect}
        selectedAreas={selectedAreas}
        onAreaRemove={handleAreaRemove}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaMap selectedAreas={selectedAreas} priceData={areaData} />
        <AreaTrendChart
          data={areaData || []}
          selectedAreas={selectedAreas}
        />
      </div>
    </div>
  );
};

export default AreaResearch;