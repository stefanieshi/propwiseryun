import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { Home, Bed, Bath, Square, TrendingUp, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useComparison } from "@/contexts/ComparisonContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();
  const { togglePropertySelection, isSelected } = useComparison();
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const loadImageUrl = async () => {
      console.log('Loading image for property:', property.id, 'Image URL:', property.image_url);
      
      if (!property.image_url) {
        console.log('No image URL provided for property:', property.id);
        setImageUrl('/placeholder.svg');
        return;
      }

      // Check if the image_url is an external URL (starts with http/https)
      if (property.image_url.startsWith('http')) {
        console.log('Using external URL directly:', property.image_url);
        setImageUrl(property.image_url);
        return;
      }

      // If not an external URL, get the public URL from Supabase storage
      try {
        // Remove any leading slash as getPublicUrl expects paths without them
        const storagePath = property.image_url.startsWith('/') 
          ? property.image_url.slice(1) 
          : property.image_url;
        
        const { data: { publicUrl } } = supabase
          .storage
          .from('properties')
          .getPublicUrl(storagePath);
        
        console.log('Generated Supabase public URL:', publicUrl);
        setImageUrl(publicUrl);
      } catch (error) {
        console.error('Error loading image for property:', property.id, error);
        setImageUrl('/placeholder.svg');
      }
    };

    loadImageUrl();
  }, [property.image_url, property.id]);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-105 glass-effect group relative">
      <div className="relative">
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.error('Image failed to load:', imageUrl);
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <Button
          variant={isSelected(property.id) ? "default" : "outline"}
          size="sm"
          className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
          onClick={() => togglePropertySelection(property)}
        >
          {isSelected(property.id) ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Selected
            </>
          ) : (
            "Compare"
          )}
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {property.title}
        </h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-[#40E0D0] to-[#20B2AA] bg-clip-text text-transparent mb-2">
          £{property.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-400 mb-4">{property.location}</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center text-gray-300">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bedrooms}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bathrooms}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Square className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.sqft} ft²</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => navigate(`/property/${property.id}/analytics`)}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Analyze Property
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;