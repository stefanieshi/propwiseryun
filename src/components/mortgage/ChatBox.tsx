import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Loader2, Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Message {
  id: string;
  content: string;
  sender_type: 'user' | 'broker';
  created_at: string;
  read_at: string | null;
}

interface ChatBoxProps {
  brokerMatchId: string;
}

export const ChatBox = ({ brokerMatchId }: ChatBoxProps) => {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const { data: messages, isLoading } = useQuery({
    queryKey: ['broker-messages', brokerMatchId],
    queryFn: async () => {
      // Validate UUID format before making the request
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(brokerMatchId)) {
        console.warn('Invalid UUID format for broker_match_id:', brokerMatchId);
        return [];
      }

      const { data, error } = await supabase
        .from('broker_messages')
        .select('*')
        .eq('broker_match_id', brokerMatchId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }
      return data as Message[];
    },
    enabled: isExpanded && !!brokerMatchId // Only fetch when chat is expanded and we have a valid ID
  });

  useEffect(() => {
    const channel = supabase
      .channel('broker-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'broker_messages',
          filter: `broker_match_id=eq.${brokerMatchId}`
        },
        (payload) => {
          console.log('New message:', payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [brokerMatchId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isExpanded]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('broker_messages')
        .insert({
          broker_match_id: brokerMatchId,
          content: newMessage,
          sender_type: 'user'
        });

      if (error) throw error;
      setNewMessage("");
      
      toast({
        title: "Message sent",
        description: "Your message has been sent to the broker.",
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isExpanded) {
    return (
      <Button 
        className="w-full flex items-center gap-2" 
        onClick={() => setIsExpanded(true)}
      >
        <Send className="w-4 h-4" />
        Start Chat
      </Button>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[400px] border rounded-lg bg-secondary/5 backdrop-blur-sm">
      <div className="p-3 border-b flex justify-between items-center">
        <h4 className="font-medium">Chat with Broker</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(false)}
        >
          Minimize
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender_type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender_type === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-secondary/20 backdrop-blur-sm'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70">
                  {format(new Date(message.created_at), 'HH:mm')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <form onSubmit={sendMessage} className="p-4 border-t bg-secondary/5">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-secondary/10"
          />
          <Button type="submit" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};