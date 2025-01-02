import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const prompts = {
  "Initial Research": [
    "What type of property are you looking for? (e.g., house, flat, studio)",
    "Which area or postcode are you interested in?",
    "What is your budget range for purchasing a property?",
    "Would you like to see properties with a specific number of bedrooms or bathrooms?",
    "Are there any must-have amenities you're looking for? (e.g., parking, garden, nearby schools)",
  ],
  "Financial Assistance": [
    "Would you like help calculating your mortgage affordability?",
    "Do you need assistance finding a mortgage broker?",
    "What is your planned down payment amount?",
    "Are you interested in comparing loan options from different lenders?",
    "Would you like to estimate your monthly repayments based on current interest rates?",
  ],
  "Property Analysis": [
    "Would you like to analyze the price trends in your target area?",
    "Are you interested in rental yield and ROI analysis for this property?",
    "Would you like to see historical sale prices of the property you're interested in?",
    "Shall I compare this property with others in the same neighborhood?",
    "Do you want insights into the average price trends in nearby areas?",
  ],
  "Legal and Administrative": [
    "Do you need guidance on the legal steps of buying a property?",
    "Would you like assistance finding a solicitor to manage the legal process?",
    "Are there any questions you have about the ownership type (e.g., freehold, leasehold)?",
    "Would you like to know about potential taxes and fees involved in the purchase?",
  ],
  "Market Insights": [
    "Would you like to see the latest news impacting property prices in this area?",
    "Are you interested in transportation links and commute times for this location?",
    "Would you like to explore investment opportunities in nearby regions?",
    "Do you want to know how this area compares to others in terms of safety or amenities?",
  ],
  "Post-Purchase Support": [
    "Would you like recommendations for setting up utilities in your new property?",
    "Are you planning to renovate or rent out the property? I can provide insights!",
    "Do you need help calculating long-term maintenance costs for this property?",
    "Would you like to store this property analysis report in your dashboard for future reference?",
  ],
};

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex justify-end mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-[300px] justify-between">
              <span>Select a prompt</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] max-h-[400px] overflow-y-auto">
            {Object.entries(prompts).map(([category, categoryPrompts]) => (
              <div key={category}>
                <DropdownMenuLabel>{category}</DropdownMenuLabel>
                {categoryPrompts.map((prompt, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handlePromptSelect(prompt)}
                    className="cursor-pointer"
                  >
                    {prompt}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about real estate..."
          className="min-h-[60px]"
          disabled={disabled}
        />
        <Button type="submit" size="icon" disabled={disabled || !input.trim()}>
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}