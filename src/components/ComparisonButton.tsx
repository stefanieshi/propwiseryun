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
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={clearSelection}
          className="rounded-full bg-background/95 shadow-lg hover:bg-background/80 border-2 border-[#9b87f5] animate-pulse"
        >
          <X className="h-5 w-5 text-[#9b87f5]" />
        </Button>
        <Button
          className="rounded-full shadow-xl bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 transition-all duration-300 
                     py-6 px-8 text-xl font-bold animate-glow scale-105 hover:scale-110
                     border-2 border-[#9b87f5]/20 backdrop-blur-sm"
          onClick={() => navigate("/comparison")}
        >
          <Scale className="mr-3 h-5 w-5" />
          <span className="text-white tracking-wide">
            Compare {selectedProperties.length} Properties
          </span>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}