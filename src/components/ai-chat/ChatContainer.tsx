import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PrewrittenPrompts } from "./PrewrittenPrompts";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (content: string) => {
    try {
      setIsLoading(true);
      const newMessage: Message = { role: "user", content };
      setMessages([...messages, newMessage]);

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { messages: [...messages, newMessage] }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.choices[0].message.content 
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <Card className="flex flex-col h-[800px] p-4">
      <PrewrittenPrompts onSelectPrompt={handlePromptSelect} />
      <ScrollArea className="flex-1 pr-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Select a common question above or start a conversation with your AI real estate consultant
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        )}
      </ScrollArea>
      <div className="mt-4">
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </Card>
  );
}