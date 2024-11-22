import { createContext, useContext, useState, ReactNode } from "react";
import { Property } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface ComparisonContextType {
  selectedProperties: Property[];
  togglePropertySelection: (property: Property) => void;
  clearSelection: () => void;
  isSelected: (propertyId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const { toast } = useToast();

  const togglePropertySelection = (property: Property) => {
    setSelectedProperties((prev) => {
      if (prev.find((p) => p.id === property.id)) {
        return prev.filter((p) => p.id !== property.id);
      }
      if (prev.length >= 3) {
        toast({
          title: "Maximum properties reached",
          description: "You can compare up to 3 properties at a time",
          variant: "destructive",
        });
        return prev;
      }
      return [...prev, property];
    });
  };

  const clearSelection = () => {
    setSelectedProperties([]);
  };

  const isSelected = (propertyId: string) => {
    return selectedProperties.some((p) => p.id === propertyId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedProperties,
        togglePropertySelection,
        clearSelection,
        isSelected,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
}