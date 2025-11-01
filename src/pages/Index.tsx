import { useState } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [chatKey, setChatKey] = useState(0);

  const handleNewChat = () => {
    setChatKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Header onNewChat={handleNewChat} />
      <ChatInterface key={chatKey} onReset={handleNewChat} />
    </div>
  );
};

export default Index;
