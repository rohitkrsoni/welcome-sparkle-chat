import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import SuggestedQuestions from "./SuggestedQuestions";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  onReset?: () => void;
}

const ChatInterface = ({ onReset }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setMessages([]);
    setInput("");
    onReset?.();
  };

  const getHardcodedResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("revenue") || lowerQuestion.includes("q4")) {
      return `**Q4 Revenue Growth Analysis**

| Quarter | Revenue | Growth % |
|---------|----------|----------|
| Q1 2024 | $2.4M | - |
| Q2 2024 | $2.7M | 12.5% |
| Q3 2024 | $3.1M | 14.8% |
| Q4 2024 | $3.8M | 22.6% |

**Key Insights:**
• Q4 showed exceptional growth of 22.6% compared to Q3
• Annual revenue increased by 58.3% from Q1 to Q4
• December contributed 45% of Q4 revenue due to holiday season demand
• Strong performance in enterprise sales segment (+35%)

**Recommendations:**
• Maintain momentum by investing in sales team expansion
• Capitalize on Q4 success patterns for Q1 2025 planning`;
    }
    
    if (lowerQuestion.includes("expense") || lowerQuestion.includes("breakdown")) {
      return `**Q4 Expense Breakdown**

| Category | Amount | % of Total | vs Q3 |
|----------|--------|------------|-------|
| Salaries & Wages | $1.2M | 42% | +8% |
| Marketing | $580K | 20% | +15% |
| Operations | $450K | 16% | +5% |
| Technology | $380K | 13% | +12% |
| Admin & Other | $260K | 9% | +3% |
| **Total** | **$2.87M** | **100%** | **+9%** |

**Analysis:**
• Marketing spend increased significantly due to holiday campaigns
• Technology costs rose from new software licenses and infrastructure
• Salary increases reflect 5 new hires in sales and engineering
• Overall expense growth (9%) was well below revenue growth (22.6%)

**Cost Optimization Opportunities:**
• Renegotiate software licenses for potential 15% savings ($57K annually)
• Consolidate marketing vendors to improve efficiency
• Review admin expenses for automation possibilities`;
    }
    
    if (lowerQuestion.includes("profit") || lowerQuestion.includes("recommendation")) {
      return `**Top Profit Optimization Recommendations**

**1. Revenue Enhancement (High Priority)**
• Introduce tiered pricing model - potential 18% revenue increase
• Upsell existing customers to premium features - $340K opportunity
• Expand into adjacent markets identified in Q4 analysis
• Launch referral program based on successful Q4 pilot

**2. Cost Reduction (Medium Priority)**
• Consolidate vendors and renegotiate contracts - Save $85K/year
• Implement automation for routine tasks - Reduce 200 hours/month
• Optimize cloud infrastructure costs - Save $25K/quarter
• Review and eliminate redundant software subscriptions

**3. Operational Efficiency (High Priority)**
• Streamline approval processes to reduce cycle time by 40%
• Implement better inventory management - Reduce waste by 12%
• Cross-train team members to improve resource utilization
• Adopt data-driven decision making tools

**4. Strategic Investments**
• Invest in customer retention programs (reduce churn from 8% to 5%)
• Enhance product features based on customer feedback
• Expand sales team in high-performing regions

**Projected Impact:** 
Implementing these recommendations could increase net profit by 25-30% within 6 months.`;
    }
    
    if (lowerQuestion.includes("cash flow") || lowerQuestion.includes("trend")) {
      return `**Cash Flow Trend Analysis**

| Month | Operating CF | Investing CF | Financing CF | Net CF |
|-------|--------------|--------------|--------------|--------|
| Oct | +$285K | -$45K | -$20K | +$220K |
| Nov | +$320K | -$30K | -$20K | +$270K |
| Dec | +$485K | -$55K | -$20K | +$410K |

**Trend Analysis:**
• Operating cash flow improved by 70% from October to December
• Strong positive trend driven by increased collections and revenue
• December spike correlates with holiday season revenue boost
• Investing activities remain controlled and strategic

**Key Observations:**
• Days Sales Outstanding (DSO) improved from 42 to 35 days
• Inventory turnover increased by 25%, freeing up working capital
• Accounts payable management optimized without straining relationships
• Cash conversion cycle reduced from 55 to 44 days

**Recommendations:**
• Maintain aggressive but fair collection policies
• Build cash reserve of 3-4 months operating expenses
• Consider strategic investments in Q1 given strong position
• Implement rolling 13-week cash flow forecasting`;
    }
    
    return "I'm your accounting assistant trained on your financial reports. I can help you analyze profit & loss statements, revenue trends, expense breakdowns, and provide strategic recommendations. Please ask me about your financial data!";
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response with hardcoded accounting data
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: getHardcodedResponse(messageText),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 pt-20">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {messages.length === 0 ? (
          <>
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                How can I help you today?
              </h1>
              <p className="text-muted-foreground text-lg">
                Choose a suggested question or ask me anything
              </p>
            </div>
            <SuggestedQuestions onQuestionClick={handleQuestionClick} />
          </>
        ) : (
          <ScrollArea className="h-[60vh] w-full">
            <div className="space-y-4 pr-4 pb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-in fade-in slide-in-from-bottom-4 duration-500`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-card border border-border"
                    }`}
                  >
                    <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
                      {message.content.split('\n').map((line, i) => {
                        // Handle table rows
                        if (line.includes('|')) {
                          return (
                            <div key={i} className="font-mono text-xs my-1">
                              {line}
                            </div>
                          );
                        }
                        // Handle bold text
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <p key={i} className="font-bold my-2">
                              {line.replace(/\*\*/g, '')}
                            </p>
                          );
                        }
                        // Handle bullet points
                        if (line.startsWith('•')) {
                          return (
                            <li key={i} className="ml-4 my-1">
                              {line.substring(1).trim()}
                            </li>
                          );
                        }
                        // Regular text
                        return line ? <p key={i} className="my-1">{line}</p> : <br key={i} />;
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-in fade-in duration-500">
                  <div className="bg-card border border-border rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}

        <div className="w-full max-w-3xl mx-auto">
          <div className="relative flex items-center gap-2 p-2 bg-card border border-border rounded-2xl shadow-lg">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSend()}
              size="icon"
              className="shrink-0 rounded-xl"
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
