import { ChatContainer } from "@/components/ai-chat/ChatContainer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";

export default function AiConsultant() {
  return (
    <div className="container mx-auto max-w-6xl py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">AI Real Estate Consultant</h1>
          <p className="text-muted-foreground mt-2">
            Get instant insights about properties, market trends, and investment advice
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          <TooltipWrapper content="Using advanced AI to provide real-time assistance">
            <Info className="w-4 h-4 mr-2" />
          </TooltipWrapper>
          AI Powered
        </Badge>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
          <TabsTrigger value="insights">Quick Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="p-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-muted/50">
                  <h3 className="font-semibold mb-2">Property Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Get detailed insights about any property's value, history, and potential
                  </p>
                </Card>
                <Card className="p-4 bg-muted/50">
                  <h3 className="font-semibold mb-2">Market Research</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand market trends, price comparisons, and area statistics
                  </p>
                </Card>
                <Card className="p-4 bg-muted/50">
                  <h3 className="font-semibold mb-2">Investment Advice</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized recommendations for your investment strategy
                  </p>
                </Card>
              </div>
            </div>
          </Card>
          <ChatContainer />
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Quick Market Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Latest Market Trends</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center text-muted-foreground">
                    • Average property prices up 3.2% in your area
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    • New developments increasing in southwest region
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    • Rental demand growing in city center
                  </li>
                </ul>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Investment Opportunities</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center text-muted-foreground">
                    • High yield potential in emerging neighborhoods
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    • Commercial property vacancy rates decreasing
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    • New tax incentives for first-time investors
                  </li>
                </ul>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}