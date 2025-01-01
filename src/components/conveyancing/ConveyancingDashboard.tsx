import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DocumentGenerator from "./DocumentGenerator";
import PropertySearches from "./PropertySearches";
import WorkflowManager from "./WorkflowManager";
import StampDutyCalculator from "./StampDutyCalculator";
import ConveyancingChat from "./ConveyancingChat";

const ConveyancingDashboard = () => {
  const [activeTab, setActiveTab] = useState("documents");
  const { toast } = useToast();

  const { data: workflows, isLoading } = useQuery({
    queryKey: ["conveyancing-workflows"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conveyancing_workflows")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load workflows",
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Conveyancing Dashboard</h2>
      </div>

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="searches">Searches</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="mt-6">
            <DocumentGenerator />
          </TabsContent>

          <TabsContent value="searches" className="mt-6">
            <PropertySearches />
          </TabsContent>

          <TabsContent value="workflow" className="mt-6">
            <WorkflowManager workflows={workflows} />
          </TabsContent>

          <TabsContent value="calculator" className="mt-6">
            <StampDutyCalculator />
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <ConveyancingChat />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ConveyancingDashboard;