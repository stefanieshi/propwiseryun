import { ChatContainer } from "@/components/ai-chat/ChatContainer";

export default function AiConsultant() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="text-4xl font-bold mb-8">AI Real Estate Consultant</h1>
      <p className="text-muted-foreground mb-8">
        Chat with our AI consultant to get insights about properties, market trends, and investment advice. 
        Choose from common questions or ask your own specific questions.
      </p>
      <ChatContainer />
    </div>
  );
}