import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Info, Check, ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";

interface LoanOption {
  id: string;
  lender: string;
  interestRate: number;
  monthlyPayment: number;
  totalCost: number;
  term: number;
  fees: number;
  approvalLikelihood: number;
  bestFor: string[];
}

export const LoanRecommendations = () => {
  // This would typically come from an API call based on user profile
  const loanOptions: LoanOption[] = [
    {
      id: "1",
      lender: "Premier Mortgages",
      interestRate: 4.25,
      monthlyPayment: 1475,
      totalCost: 531000,
      term: 30,
      fees: 2500,
      approvalLikelihood: 85,
      bestFor: ["First-time buyers", "Low monthly payments"]
    },
    {
      id: "2",
      lender: "FastTrack Loans",
      interestRate: 4.75,
      monthlyPayment: 1675,
      totalCost: 503000,
      term: 25,
      fees: 2000,
      approvalLikelihood: 92,
      bestFor: ["Quick approval", "Good credit score"]
    },
    {
      id: "3",
      lender: "EcoMortgage",
      interestRate: 4.5,
      monthlyPayment: 1575,
      totalCost: 517000,
      term: 30,
      fees: 1800,
      approvalLikelihood: 78,
      bestFor: ["Green properties", "Energy efficiency"]
    }
  ];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Personalized Loan Recommendations</h2>
        <p className="text-muted-foreground">
          Based on your profile, here are your best-matched loan options
        </p>
      </div>

      <div className="space-y-6">
        {loanOptions.map((loan, index) => (
          <motion.div
            key={loan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">{loan.lender}</h3>
                <div className="flex gap-2 mt-1">
                  {loan.bestFor.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Badge 
                variant={loan.approvalLikelihood > 80 ? "success" : "secondary"}
                className="flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                {loan.approvalLikelihood}% Match
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  Interest Rate
                  <TooltipWrapper content="Annual Percentage Rate (APR)">
                    <Info className="w-4 h-4" />
                  </TooltipWrapper>
                </div>
                <div className="text-lg font-semibold flex items-center gap-1">
                  {loan.interestRate}%
                  {index === 0 && <TrendingDown className="w-4 h-4 text-green-500" />}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Monthly Payment</div>
                <div className="text-lg font-semibold">£{loan.monthlyPayment}</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Term</div>
                <div className="text-lg font-semibold">{loan.term} years</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Fees</div>
                <div className="text-lg font-semibold">£{loan.fees}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Cost of Borrowing</div>
                <div className="text-lg font-semibold">£{loan.totalCost.toLocaleString()}</div>
              </div>
              <Button className="flex items-center gap-2">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};