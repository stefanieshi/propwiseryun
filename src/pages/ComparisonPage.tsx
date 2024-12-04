import { useComparison } from "@/contexts/ComparisonContext";
import ComparisonView from "@/components/ComparisonView";
import BackButton from "@/components/BackButton";

const ComparisonPage = () => {
  const { selectedProperties, clearSelection } = useComparison();

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <BackButton onClick={clearSelection} />
        <h1 className="text-2xl font-bold ml-4">Property Comparison</h1>
      </div>
      <ComparisonView properties={selectedProperties.length > 0 ? selectedProperties : undefined} />
    </div>
  );
};

export default ComparisonPage;