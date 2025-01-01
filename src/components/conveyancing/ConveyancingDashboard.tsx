import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DocumentGenerator from "./DocumentGenerator";
import LawyerDirectory from "./LawyerDirectory";
import FavoriteLawyers from "./FavoriteLawyers";
import StampDutyCalculator from "./StampDutyCalculator";

const ConveyancingDashboard = () => {
  const [activeTab, setActiveTab] = useState("lawyers");
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Conveyancing Dashboard</h2>
      </div>

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="lawyers">Lawyers</TabsTrigger>
            <TabsTrigger value="favorites">My Favorites</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="lawyers" className="mt-6">
            <LawyerDirectory />
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <FavoriteLawyers />
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <DocumentGenerator />
          </TabsContent>

          <TabsContent value="calculator" className="mt-6">
            <StampDutyCalculator />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ConveyancingDashboard;