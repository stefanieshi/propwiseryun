import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const prompts = [
  {
    category: "Property Analysis",
    items: [
      "What factors should I consider when evaluating a property's investment potential?",
      "How do I calculate the potential rental yield for a property?",
      "What are the key indicators of a property's future value appreciation?"
    ]
  },
  {
    category: "Market Research",
    items: [
      "What are the current market trends in the UK property market?",
      "How do I identify up-and-coming areas for property investment?",
      "What impact might current economic conditions have on property values?"
    ]
  },
  {
    category: "Legal & Finance",
    items: [
      "What are the main legal considerations when buying a property?",
      "Can you explain the mortgage application process?",
      "What taxes do I need to consider when buying a property?"
    ]
  }
];

interface PrewrittenPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export function PrewrittenPrompts({ onSelectPrompt }: PrewrittenPromptsProps) {
  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-semibold">Common Questions</h3>
      <div className="grid gap-4">
        {prompts.map((category) => (
          <div key={category.category} className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">{category.category}</h4>
            <Select onValueChange={onSelectPrompt}>
              <SelectTrigger>
                <SelectValue placeholder="Select a question..." />
              </SelectTrigger>
              <SelectContent>
                {category.items.map((prompt) => (
                  <SelectItem key={prompt} value={prompt}>
                    {prompt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}