import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const promptCategories = [
  {
    title: "Initial Research",
    prompts: [
      "What type of property are you looking for? (e.g., house, flat, studio)",
      "Which area or postcode are you interested in?",
      "What is your budget range for purchasing a property?",
      "Would you like to see properties with a specific number of bedrooms or bathrooms?",
      "Are there any must-have amenities you're looking for? (e.g., parking, garden, nearby schools)",
    ],
  },
  {
    title: "Financial Assistance",
    prompts: [
      "Would you like help calculating your mortgage affordability?",
      "Do you need assistance finding a mortgage broker?",
      "What is your planned down payment amount?",
      "Are you interested in comparing loan options from different lenders?",
      "Would you like to estimate your monthly repayments based on current interest rates?",
    ],
  },
  {
    title: "Property Analysis",
    prompts: [
      "Would you like to analyze the price trends in your target area?",
      "Are you interested in rental yield and ROI analysis for this property?",
      "Would you like to see historical sale prices of the property you're interested in?",
      "Shall I compare this property with others in the same neighborhood?",
      "Do you want insights into the average price trends in nearby areas?",
    ],
  },
  {
    title: "Legal and Administrative Support",
    prompts: [
      "Do you need guidance on the legal steps of buying a property?",
      "Would you like assistance finding a solicitor to manage the legal process?",
      "Are there any questions you have about the ownership type (e.g., freehold, leasehold)?",
      "Would you like to know about potential taxes and fees involved in the purchase?",
    ],
  },
  {
    title: "Viewing and Decision-Making",
    prompts: [
      "Would you like to schedule a viewing for this property?",
      "Do you need a checklist to evaluate properties during viewings?",
      "Would you like suggestions for nearby properties similar to this one?",
      "Do you want tips on negotiating the property price?",
      "Would you like to know the expected time frame for closing the purchase?",
    ],
  },
  {
    title: "Market Insights",
    prompts: [
      "Would you like to see the latest news impacting property prices in this area?",
      "Are you interested in transportation links and commute times for this location?",
      "Would you like to explore investment opportunities in nearby regions?",
      "Do you want to know how this area compares to others in terms of safety or amenities?",
    ],
  },
  {
    title: "Post-Purchase Support",
    prompts: [
      "Would you like recommendations for setting up utilities in your new property?",
      "Are you planning to renovate or rent out the property? I can provide insights!",
      "Do you need help calculating long-term maintenance costs for this property?",
      "Would you like to store this property analysis report in your dashboard for future reference?",
    ],
  },
];

const AIConsultant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI property consultant. How can I help you today? You can select from the suggested prompts or type your own question.",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handlePromptClick = (prompt: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt },
      { 
        role: "assistant", 
        content: "I'm processing your request about: " + prompt + "\n\nThis is a placeholder response. In a full implementation, this would connect to an AI service to provide relevant information and next steps based on your query."
      },
    ]);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">AI Property Consultant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Prompt Categories */}
        <div className="md:col-span-1">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Topics</h2>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {promptCategories.map((category) => (
                  <div key={category.title} className="space-y-2">
                    <Button
                      variant={selectedCategory === category.title ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.title)}
                    >
                      {category.title}
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            {/* Messages Area */}
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Suggested Prompts */}
            {selectedCategory && (
              <div className="p-4 border-t">
                <h3 className="font-medium mb-2">Suggested Questions:</h3>
                <ScrollArea className="h-[100px]">
                  <div className="space-y-2">
                    {promptCategories
                      .find((cat) => cat.title === selectedCategory)
                      ?.prompts.map((prompt, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start text-left"
                          onClick={() => handlePromptClick(prompt)}
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          {prompt}
                        </Button>
                      ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;