import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PropertyCard from "@/components/PropertyCard";
import BackButton from "@/components/BackButton";
import { Property } from "@/types";

const PLACEHOLDER_IMAGES = [
  "photo-1721322800607-8c38375eef04",
  "photo-1466721591366-2d5fba72006d",
  "photo-1493962853295-0fd70327578a",
  "photo-1535268647677-300dbf3d78d1",
  "photo-1452960962994-acf4fd70b632",
  "photo-1518877593221-1f28583780b4"
];

const ViewedProperties = () => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["viewed-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Add placeholder images to properties that don't have images
      return data?.map((property: Property, index: number) => ({
        ...property,
        image_url: property.image_url || `https://images.unsplash.com/${PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]}?auto=format&fit=crop&w=800&q=80`
      }));
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold ml-4">Viewed Properties</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-t-lg" />
              <div className="bg-gray-200 h-32 rounded-b-lg p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold ml-4">Viewed Properties</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default ViewedProperties;