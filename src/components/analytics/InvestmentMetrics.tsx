import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface InvestmentMetricsProps {
  data?: {
    roi_5_years: number;
    cash_flow_potential: number;
    cap_rate: number;
    break_even_period: number;
  };
}

const InvestmentMetrics = ({ data }: InvestmentMetricsProps) => {
  if (!data) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No investment metrics available</p>
      </Card>
    );
  }

  const metrics = [
    {
      label: "5-Year ROI",
      value: data.roi_5_years,
      format: (v: number) => `${v.toFixed(1)}%`,
    },
    {
      label: "Cash Flow Potential",
      value: data.cash_flow_potential,
      format: (v: number) => `£${v.toLocaleString()}/month`,
    },
    {
      label: "Cap Rate",
      value: data.cap_rate,
      format: (v: number) => `${v.toFixed(2)}%`,
    },
    {
      label: "Break Even Period",
      value: data.break_even_period,
      format: (v: number) => `${v.toFixed(1)} years`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Investment Analysis</h3>
        <div className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{metric.label}</span>
                <span className="text-sm text-primary">{metric.format(metric.value)}</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default InvestmentMetrics;