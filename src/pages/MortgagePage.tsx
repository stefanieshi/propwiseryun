import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { MortgageHeader } from "@/components/mortgage/MortgageHeader";
import { ProfileForm } from "@/components/mortgage/ProfileForm";
import { DocumentUpload } from "@/components/mortgage/DocumentUpload";
import { PreApproval } from "@/components/mortgage/PreApproval";
import { BrokerMatch } from "@/components/mortgage/BrokerMatch";
import { LoanRecommendations } from "@/components/mortgage/LoanRecommendations";
import { EnhancedOnboarding } from "@/components/mortgage/EnhancedOnboarding";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const MortgagePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("onboarding");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: preApproval } = await supabase
        .from("pre_approvals")
        .select("*")
        .eq("user_id", user.id)
        .limit(1);

      setHasCompletedOnboarding(!!preApproval && preApproval.length > 0);
      if (preApproval && preApproval.length > 0) {
        setActiveTab("profile");
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

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setActiveTab("profile");
    toast({
      title: "Profile Updated",
      description: "Your mortgage profile has been successfully created.",
    });
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

  if (hasCompletedOnboarding === false) {
    return (
      <div className="container mx-auto py-8">
        <MortgageHeader 
          currentStep={currentStep} 
          title="Complete Your Profile" 
        />
        <EnhancedOnboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <MortgageHeader 
        currentStep={currentStep} 
        title="AI Mortgage Platform" 
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="recommendations">Loan Options</TabsTrigger>
          <TabsTrigger value="approval">Pre-approval</TabsTrigger>
          <TabsTrigger value="broker">Broker Match</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm onSubmit={() => setCurrentStep(currentStep + 1)} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentUpload />
        </TabsContent>

        <TabsContent value="recommendations">
          <LoanRecommendations />
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