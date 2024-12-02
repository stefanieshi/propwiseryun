import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Info, Check, AlertTriangle } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";

interface PreApprovalData {
  id: string;
  estimated_amount: number;
  approval_likelihood: number;
  criteria_matched: string[];
  interest_rate_range: {
    min: number;
    max: number;
  };
  monthly_payment_range: {
    min: number;
    max: number;
  };
  created_at: string;
}

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
      return data as PreApprovalData;
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Estimated Pre-approval Amount</h3>
              <Badge variant={preApproval.approval_likelihood > 70 ? "success" : "secondary"}>
                {preApproval.approval_likelihood}% Match
              </Badge>
            </div>
            <p className="text-3xl font-bold text-primary">
              £{preApproval.estimated_amount.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium">Interest Rate Range</h3>
                <TooltipWrapper content="Estimated rates based on your credit profile">
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipWrapper>
              </div>
              <p className="text-2xl font-semibold">
                {preApproval.interest_rate_range.min}% - {preApproval.interest_rate_range.max}%
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium">Monthly Payment</h3>
                <TooltipWrapper content="Estimated monthly payments including principal and interest">
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipWrapper>
              </div>
              <p className="text-2xl font-semibold">
                £{preApproval.monthly_payment_range.min.toLocaleString()} - 
                £{preApproval.monthly_payment_range.max.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Matching Criteria</h3>
            <div className="space-y-2">
              {preApproval.criteria_matched.map((criteria, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{criteria}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
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