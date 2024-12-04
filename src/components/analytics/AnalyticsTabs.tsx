import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceHistoryChart from "./PriceHistoryChart";
import RentalAnalysis from "./RentalAnalysis";
import AreaStats from "./AreaStats";
import AIRecommendations from "./AIRecommendations";
import MarketTrends from "./MarketTrends";
import InvestmentMetrics from "./InvestmentMetrics";
import { CommuteAnalysis } from "./CommuteAnalysis";
import { MarketNews } from "./MarketNews";

interface AnalyticsTabsProps {
  analytics: any;
  property: any;
  propertyId: string;
}

const AnalyticsTabs = ({ analytics, property, propertyId }: AnalyticsTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-7 bg-gradient-futuristic backdrop-blur-md border border-primary/10 rounded-lg shadow-lg">
        <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Overview</TabsTrigger>
        <TabsTrigger value="market" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Market & News</TabsTrigger>
        <TabsTrigger value="investment" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Investment</TabsTrigger>
        <TabsTrigger value="rental" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Rental</TabsTrigger>
        <TabsTrigger value="area" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Area</TabsTrigger>
        <TabsTrigger value="commute" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Commute</TabsTrigger>
        <TabsTrigger value="ai" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">AI Insights</TabsTrigger>
      </TabsList>

      <div className="mt-6 space-y-6">
        <TabsContent value="overview" className="glass-card p-6 animate-fade-in">
          <PriceHistoryChart data={analytics?.price_history} />
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="glass-card p-6 animate-fade-in">
            <MarketTrends data={analytics?.market_trends} />
          </div>
          <div className="glass-card p-6 animate-fade-in">
            <MarketNews location={property.location} />
          </div>
        </TabsContent>

        <TabsContent value="investment" className="glass-card p-6 animate-fade-in">
          <InvestmentMetrics data={analytics?.investment_metrics} />
        </TabsContent>

        <TabsContent value="rental" className="glass-card p-6 animate-fade-in">
          <RentalAnalysis data={analytics?.rental_estimates} />
        </TabsContent>

        <TabsContent value="area" className="glass-card p-6 animate-fade-in">
          <AreaStats data={analytics?.area_stats} />
        </TabsContent>

        <TabsContent value="commute" className="glass-card p-6 animate-fade-in">
          <CommuteAnalysis propertyId={propertyId} />
        </TabsContent>

        <TabsContent value="ai" className="glass-card p-6 animate-fade-in">
          <AIRecommendations recommendations={analytics?.ai_recommendations || []} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AnalyticsTabs;