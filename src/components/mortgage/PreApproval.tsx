import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { PreApprovalStatus } from "./PreApprovalStatus";
import { PreApprovalData, PreApprovalResponse } from "./types";

export const PreApproval = () => {
  const { toast } = useToast();
  const [isCalculating, setIsCalculating] = useState(false);

  const { data: preApproval, isLoading } = useQuery({
    queryKey: ["preApproval"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("pre_approvals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      
      // Transform the data to match our frontend type
      if (data) {
        const transformedData: PreApprovalData = {
          ...data,
          interest_rate_range: data.interest_rate_range as { min: number; max: number },
          monthly_payment_range: data.monthly_payment_range as { min: number; max: number }
        };
        return transformedData;
      }
      return null;
    }
  });

  const calculatePreApproval = async () => {
    try {
      setIsCalculating(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Mock data - in real app, this would come from the ProfileForm
      const mockProfileData = {
        income: 75000,
        creditScore: 720,
        employmentStatus: "Full-time"
      };

      const response = await supabase.functions.invoke("calculate-pre-approval", {
        body: mockProfileData
      });

      if (response.error) throw response.error;

      const { data: preApproval, error } = await supabase
        .from("pre_approvals")
        .insert({
          user_id: user.id,
          income: mockProfileData.income,
          credit_score: mockProfileData.creditScore,
          employment_status: mockProfileData.employmentStatus,
          estimated_amount: response.data.estimatedAmount,
          approval_likelihood: response.data.approvalLikelihood,
          criteria_matched: response.data.criteriaMatched,
          debt_to_income_ratio: response.data.debtToIncomeRatio,
          interest_rate_range: response.data.interestRateRange,
          monthly_payment_range: response.data.monthlyPaymentRange
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Pre-approval calculation complete",
        description: "Your pre-approval estimate has been updated."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Pre-approval Status</h2>
          <p className="text-muted-foreground">
            Based on your profile and market conditions
          </p>
        </div>
        <Button
          onClick={calculatePreApproval}
          disabled={isCalculating}
        >
          Recalculate
        </Button>
      </div>

      {preApproval ? (
        <PreApprovalStatus preApproval={preApproval} />
      ) : (
        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Pre-approval Found</h3>
          <p className="text-muted-foreground mb-4">
            Click the button above to calculate your pre-approval amount
          </p>
        </div>
      )}
    </Card>
  );
};