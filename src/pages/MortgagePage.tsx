import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { MortgageHeader } from "@/components/mortgage/MortgageHeader";
import { ProfileForm } from "@/components/mortgage/ProfileForm";
import { DocumentUpload } from "@/components/mortgage/DocumentUpload";
import { PreApproval } from "@/components/mortgage/PreApproval";
import { BrokerMatch } from "@/components/mortgage/BrokerMatch";
import { supabase } from "@/integrations/supabase/client";

const MortgagePage = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = async (values: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      toast({
        title: "Application submitted",
        description: "We'll process your information and get back to you shortly.",
      });
      
      setCurrentStep(currentStep + 1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <MortgageHeader 
        currentStep={currentStep} 
        title="AI Mortgage Platform" 
      />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="approval">Pre-approval</TabsTrigger>
          <TabsTrigger value="broker">Broker Match</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm onSubmit={onSubmit} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentUpload />
        </TabsContent>

        <TabsContent value="approval">
          <PreApproval />
        </TabsContent>

        <TabsContent value="broker">
          <BrokerMatch />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MortgagePage;