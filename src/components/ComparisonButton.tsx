import { Button } from "@/components/ui/button";
import { useComparison } from "@/contexts/ComparisonContext";
import { Scale, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function ComparisonButton() {
  const { selectedProperties, clearSelection } = useComparison();
  const navigate = useNavigate();

  if (selectedProperties.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={clearSelection}
          className="rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={() => navigate("/comparison")}
        >
          <Scale className="mr-2 h-4 w-4" />
          Compare {selectedProperties.length} Properties
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}