import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LawyerDirectory from "@/components/conveyancing/LawyerDirectory";
import FavoriteLawyers from "@/components/conveyancing/FavoriteLawyers";
import LawyerOrders from "@/components/conveyancing/LawyerOrders";
import ConveyancingDashboard from "@/components/conveyancing/ConveyancingDashboard";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const ConveyancingHeader = ({ title }: { title: string }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">
        Find and connect with experienced conveyancing lawyers for your property transaction
      </p>
    </div>
  );
};

const ConveyancingPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="directory">Lawyer Directory</TabsTrigger>
            <TabsTrigger value="favorites">My Favorites</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <ConveyancingDashboard />
          </TabsContent>

          <TabsContent value="directory" className="space-y-4">
            <LawyerDirectory />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <FavoriteLawyers />
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <LawyerOrders />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ConveyancingPage;