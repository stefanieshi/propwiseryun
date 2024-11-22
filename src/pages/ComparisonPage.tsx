import { useComparison } from "@/contexts/ComparisonContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ComparisonView from "@/components/ComparisonView";
import { Property } from "@/types";

const ComparisonPage = () => {
  const { selectedProperties, clearSelection } = useComparison();
  const navigate = useNavigate();

  const handleBack = () => {
    clearSelection();
    navigate(-1);
  };

  // Map database properties to frontend Property type
  const mappedProperties: Property[] = selectedProperties.map(prop => ({
    id: prop.id,
    title: prop.title,
    price: prop.price,
    location: prop.location,
    bedrooms: prop.bedrooms,
    bathrooms: prop.bathrooms,
    sqft: prop.sqft,
    type: prop.property_type, // Map property_type to type
    imageUrl: prop.image_url || '', // Map image_url to imageUrl
    description: prop.description,
    source_url: prop.source_url,
    created_at: prop.created_at,
    updated_at: prop.updated_at
  }));

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Property Comparison</h1>
      </div>
      <ComparisonView properties={mappedProperties} />
    </div>
  );
};

export default ComparisonPage;