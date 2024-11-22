import { useComparison } from "@/contexts/ComparisonContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ComparisonView from "@/components/ComparisonView";

const ComparisonPage = () => {
  const { selectedProperties, clearSelection } = useComparison();
  const navigate = useNavigate();

  const handleBack = () => {
    clearSelection();
    navigate(-1);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Property Comparison</h1>
      </div>
      <ComparisonView properties={selectedProperties} />
    </div>
  );
};

export default ComparisonPage;