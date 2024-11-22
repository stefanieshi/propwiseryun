import { Button } from "@/components/ui/button";
import { useComparison } from "@/contexts/ComparisonContext";
import { Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ComparisonButton() {
  const { selectedProperties } = useComparison();
  const navigate = useNavigate();

  if (selectedProperties.length === 0) return null;

  return (
    <Button
      className="fixed bottom-4 right-4 z-50"
      onClick={() => navigate("/comparison")}
    >
      <Scale className="mr-2 h-4 w-4" />
      Compare {selectedProperties.length} Properties
    </Button>
  );
}