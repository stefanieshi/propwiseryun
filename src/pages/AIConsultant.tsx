import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Calculator,
  ChartBar,
  ClipboardCheck,
  HomeIcon,
  TrendingUp,
  AlertTriangle,
  Building,
  DollarSign,
  LineChart,
  PieChart,
  BarChart3,
} from "lucide-react";

const AIConsultant = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Your personalized recommendations are ready.",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Property Consultant</h1>
          <p className="text-muted-foreground mt-2">
            Get personalized property insights and recommendations powered by AI
          </p>
        </div>
        <Button
          onClick={handleAnalysis}
          className="bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90 transition-all duration-300"
          disabled={isAnalyzing}
        >
          <Brain className="mr-2 h-4 w-4" />
          {isAnalyzing ? "Analyzing..." : "Start Analysis"}
        </Button>
      </div>

      <Tabs defaultValue="investment" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 gap-4">
          <TabsTrigger value="investment">Investment Analysis</TabsTrigger>
          <TabsTrigger value="market">Market Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Property Recommendations</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="investment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5 text-primary" />
                  ROI Calculator
                </CardTitle>
                <CardDescription>
                  Calculate potential returns on your property investment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes market data, property values, and rental yields to provide accurate ROI predictions.
                  </p>
                  <Button variant="outline" className="w-full">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Calculate ROI
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Growth Potential
                </CardTitle>
                <CardDescription>
                  Analyze property value appreciation potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Get AI-powered predictions for property value growth based on historical data and market trends.
                  </p>
                  <Button variant="outline" className="w-full">
                    <LineChart className="mr-2 h-4 w-4" />
                    View Potential
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ChartBar className="mr-2 h-5 w-5 text-primary" />
                Market Analysis
              </CardTitle>
              <CardDescription>
                Comprehensive market insights and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes current market conditions, trends, and future projections to help you make informed decisions.
                </p>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Market Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HomeIcon className="mr-2 h-5 w-5 text-primary" />
                Property Recommendations
              </CardTitle>
              <CardDescription>
                Personalized property suggestions based on your criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Get AI-powered property recommendations tailored to your preferences, budget, and investment goals.
                </p>
                <Button variant="outline" className="w-full">
                  <Building className="mr-2 h-4 w-4" />
                  View Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardCheck className="mr-2 h-5 w-5 text-primary" />
                Risk Assessment
              </CardTitle>
              <CardDescription>
                Comprehensive property risk analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our AI evaluates potential risks associated with properties, including market volatility, location factors, and financial considerations.
                </p>
                <Button variant="outline" className="w-full">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  View Risk Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIConsultant;