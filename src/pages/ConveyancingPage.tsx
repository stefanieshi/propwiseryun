import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LawyerDirectory from "@/components/conveyancing/LawyerDirectory";
import FavoriteLawyers from "@/components/conveyancing/FavoriteLawyers";
import LawyerOrders from "@/components/conveyancing/LawyerOrders";

const ConveyancingPage = () => {
  const [activeTab, setActiveTab] = useState("directory");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Conveyancing Services</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="directory">Lawyer Directory</TabsTrigger>
          <TabsTrigger value="favorites">My Favorites</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="directory">
          <LawyerDirectory />
        </TabsContent>

        <TabsContent value="favorites">
          <FavoriteLawyers />
        </TabsContent>

        <TabsContent value="orders">
          <LawyerOrders />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConveyancingPage;