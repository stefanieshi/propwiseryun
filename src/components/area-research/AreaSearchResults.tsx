import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchResult {
  postcode: string;
  city: string;
}

interface AreaSearchResultsProps {
  searchResults: SearchResult[];
  onAddArea: (postcode: string, city: string) => void;
}

const AreaSearchResults = ({ searchResults, onAddArea }: AreaSearchResultsProps) => {
  if (searchResults.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4"
    >
      <ScrollArea className="h-40 rounded-md border p-4">
        <div className="space-y-2">
          {searchResults.map((result) => (
            <motion.div
              key={result.postcode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            >
              <span className="text-sm">
                {result.city} ({result.postcode})
              </span>
              <button
                onClick={() => onAddArea(result.postcode, result.city)}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Add to comparison
              </button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default AreaSearchResults;