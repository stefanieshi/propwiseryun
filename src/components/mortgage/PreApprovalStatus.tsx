import { Badge } from "@/components/ui/badge";
import { Info, Check } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";
import { motion } from "framer-motion";
import { PreApprovalData } from "./types";

interface PreApprovalStatusProps {
  preApproval: PreApprovalData;
}

export const PreApprovalStatus = ({ preApproval }: PreApprovalStatusProps) => {
  return (
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
            {preApproval.interest_rate_range ? 
              `${preApproval.interest_rate_range.min}% - ${preApproval.interest_rate_range.max}%` :
              "Not available"
            }
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
            {preApproval.monthly_payment_range ? 
              `£${preApproval.monthly_payment_range.min.toLocaleString()} - 
               £${preApproval.monthly_payment_range.max.toLocaleString()}` :
              "Not available"
            }
          </p>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Matching Criteria</h3>
        <div className="space-y-2">
          {(preApproval.criteria_matched || []).map((criteria, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500" />
              <span>{criteria}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};