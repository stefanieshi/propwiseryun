import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import LawyerDirectory from "@/components/conveyancing/LawyerDirectory";
import FavoriteLawyers from "@/components/conveyancing/FavoriteLawyers";
import LawyerOrders from "@/components/conveyancing/LawyerOrders";
import DocumentAutomation from "@/components/conveyancing/DocumentAutomation";
import TaskManagement from "@/components/conveyancing/TaskManagement";
import LandRegistry from "@/components/conveyancing/LandRegistry";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const ConveyancingHeader = ({ title }: { title: string }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">
        Streamline your conveyancing process with AI-powered tools and expert lawyers
      </p>
    </div>
  );
};

const ConveyancingPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("directory");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ConveyancingHeader title="AI Conveyancing Platform" />

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="directory">Lawyer Directory</TabsTrigger>
            <TabsTrigger value="favorites">My Favorites</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="documents">Document Automation</TabsTrigger>
            <TabsTrigger value="tasks">Task Management</TabsTrigger>
            <TabsTrigger value="registry">Land Registry</TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="space-y-4">
            <LawyerDirectory />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <FavoriteLawyers />
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <LawyerOrders />
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <DocumentAutomation />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <TaskManagement />
          </TabsContent>

          <TabsContent value="registry" className="space-y-4">
            <LandRegistry />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ConveyancingPage;