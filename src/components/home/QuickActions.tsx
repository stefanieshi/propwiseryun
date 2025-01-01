import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <FileText className="h-8 w-8 text-primary mb-2" />
            <h3 className="text-lg font-semibold">Saved Reports</h3>
            <p className="text-sm text-muted-foreground">
              View your saved AI analysis reports
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/saved-reports")}>
            View Reports
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <LayoutDashboard className="h-8 w-8 text-primary mb-2" />
            <h3 className="text-lg font-semibold">Comparison Dashboards</h3>
            <p className="text-sm text-muted-foreground">
              View saved property comparisons
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/comparison")}>
            View Dashboards
          </Button>
        </div>
      </Card>
    </div>
  );
};