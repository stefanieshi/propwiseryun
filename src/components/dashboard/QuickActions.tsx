import { useNavigate } from "react-router-dom";
import { TrendingUp, Calculator, GitCompare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Property } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const QuickActions = () => {
  const navigate = useNavigate();
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

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
  ];

  const handleCompareClick = () => {
    if (isCompareMode) {
      if (selectedProperties.length < 2) {
        toast.error("Please select at least 2 properties to compare");
        return;
      }
      navigate("/viewed-properties", { state: { properties: selectedProperties } });
    } else {
      setIsCompareMode(true);
      toast.info("Select properties to compare. Click Compare when ready.");
    }
  };

  return (
    <div className="space-y-6">
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
        <Button
          onClick={handleCompareClick}
          className="flex items-center gap-2 h-full"
          variant={isCompareMode ? "default" : "outline"}
        >
          <GitCompare className="h-6 w-6" />
          <div>
            <h3 className="text-lg font-semibold">
              {isCompareMode ? "Compare Selected" : "Select Properties to Compare"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isCompareMode
                ? `${selectedProperties.length} properties selected`
                : "Compare multiple properties"}
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;