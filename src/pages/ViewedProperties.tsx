import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Bed, Bath, Square, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types";

const ViewedProperties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [bedroomFilter, setBedroomFilter] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*");

      if (error) throw error;

      setProperties(data || []);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error fetching properties",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = !priceFilter || 
      (priceFilter === "under1m" && property.price < 1000000) ||
      (priceFilter === "1m-2m" && property.price >= 1000000 && property.price < 2000000) ||
      (priceFilter === "over2m" && property.price >= 2000000);
    const matchesBedrooms = !bedroomFilter || property.bedrooms.toString() === bedroomFilter;

    return matchesSearch && matchesPrice && matchesBedrooms;
  });

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Viewed Properties
            </h1>
            <Button variant="outline" onClick={() => fetchProperties()}>
              Refresh
            </Button>
          </div>

          {/* Filters Section */}
          <Card className="p-6 glass-effect">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search properties..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All prices</SelectItem>
                  <SelectItem value="under1m">Under £1M</SelectItem>
                  <SelectItem value="1m-2m">£1M - £2M</SelectItem>
                  <SelectItem value="over2m">Over £2M</SelectItem>
                </SelectContent>
              </Select>

              <Select value={bedroomFilter} onValueChange={setBedroomFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "bedroom" : "bedrooms"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setPriceFilter("");
                  setBedroomFilter("");
                }}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </Card>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card 
                  key={property.id} 
                  className="overflow-hidden transition-all duration-300 hover:scale-105 glass-effect group"
                >
                  <div className="relative">
                    <img
                      src={property.image_url || "https://images.unsplash.com/photo-1469474968028-56623f02e42e"}
                      alt={property.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {property.title}
                    </h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                      £{property.price.toLocaleString()}
                    </p>
                    <div className="flex items-center text-gray-400 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
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
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="default" className="w-full">
                        View Details
                      </Button>
                      <Button variant="outline" className="w-full">
                        Compare
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredProperties.length === 0 && (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewedProperties;