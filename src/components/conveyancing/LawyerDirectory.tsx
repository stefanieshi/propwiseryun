import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SortAscending, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LawyerCard from "./LawyerCard";
import { supabase } from "@/integrations/supabase/client";

const LawyerDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const { data: lawyers, isLoading } = useQuery({
    queryKey: ["lawyers", searchQuery, locationFilter, specializationFilter, sortBy],
    queryFn: async () => {
      let query = supabase
        .from("lawyers")
        .select("*");

      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }

      if (locationFilter) {
        query = query.contains("service_areas", [locationFilter]);
      }

      if (specializationFilter) {
        query = query.contains("specializations", [specializationFilter]);
      }

      if (sortBy === "rating") {
        query = query.order("rating", { ascending: false });
      } else if (sortBy === "hourly_rate") {
        query = query.order("hourly_rate", { ascending: true });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search lawyers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All locations</SelectItem>
            <SelectItem value="London">London</SelectItem>
            <SelectItem value="Manchester">Manchester</SelectItem>
            <SelectItem value="Birmingham">Birmingham</SelectItem>
          </SelectContent>
        </Select>

        <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All specializations</SelectItem>
            <SelectItem value="Property Law">Property Law</SelectItem>
            <SelectItem value="Commercial Property">Commercial Property</SelectItem>
            <SelectItem value="Residential Property">Residential Property</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="hourly_rate">Price (Low to High)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers?.map((lawyer) => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))}
      </div>
    </div>
  );
};

export default LawyerDirectory;