import { Info } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";

const AreaResearchHeader = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Area Research
          </h1>
          <p className="text-muted-foreground mt-2">
            Compare property trends and market data across different areas
          </p>
        </div>
        <TooltipWrapper content="Compare up to 5 areas to analyze market trends, average prices, and other key metrics">
          <Info className="h-5 w-5 text-muted-foreground" />
        </TooltipWrapper>
      </div>
    </div>
  );
};

export default AreaResearchHeader;