import { ChatContainer } from "@/components/chat/ChatContainer";

const Index = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Property Assistant</h1>
      <div className="max-w-3xl mx-auto">
        <ChatContainer />
      </div>
    </div>
  );
};

export default Index;