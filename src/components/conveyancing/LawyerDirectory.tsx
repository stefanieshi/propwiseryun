import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ArrowUpDown, User } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const { data: lawyers, isLoading } = useQuery({
    queryKey: ["brokers", searchQuery, specializationFilter, sortBy],
    queryFn: async () => {
      let query = supabase
        .from("brokers")
        .select("*");

      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }

      if (specializationFilter !== "all") {
        query = query.contains("specializations", [specializationFilter]);
      }

      if (sortBy === "rating") {
        query = query.order("rating", { ascending: false });
      } else if (sortBy === "hourly_rate") {
        query = query.order("fees->hourly_rate", { ascending: true });
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All specializations</SelectItem>
            <SelectItem value="property_law">Property Law</SelectItem>
            <SelectItem value="commercial_property">Commercial Property</SelectItem>
            <SelectItem value="residential_property">Residential Property</SelectItem>
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