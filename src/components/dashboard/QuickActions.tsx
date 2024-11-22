import { useNavigate } from "react-router-dom";
import { TrendingUp, Calculator, GitCompare } from "lucide-react";
import { Card } from "@/components/ui/card";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "View current market trends and analytics",
      href: "/market-analysis",
    },
    {
      icon: Calculator,
      title: "ROI Calculator",
      description: "Calculate potential returns",
      href: "/calculator",
    },
    {
      icon: GitCompare,
      title: "Select Properties to Compare",
      description: "Compare multiple properties",
      href: "/viewed-properties?mode=compare",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Card
            key={action.href}
            className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate(action.href)}
          >
            <div>
              <Icon className="h-8 w-8 text-primary mb-2 animate-fade-in" />
              <h3 className="text-lg font-semibold">{action.title}</h3>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickActions;