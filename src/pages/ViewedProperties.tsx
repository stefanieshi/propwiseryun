import { useLocation, useNavigate } from "react-router-dom";
import { Property } from "@/types";
import ComparisonView from "@/components/ComparisonView";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ViewedProperties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProperties = location.state?.properties || [];

  if (selectedProperties.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-xl font-semibold mb-4">No properties selected</h3>
        <p className="text-muted-foreground mb-6">
          Please select properties to compare from the dashboard
        </p>
        <Button onClick={() => navigate("/")} variant="outline">
          Return to Dashboard
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-accent/80 bg-clip-text text-transparent">
          Property Comparison
        </h1>
      </div>
      <ComparisonView properties={selectedProperties} />
    </div>
  );
};

export default ViewedProperties;