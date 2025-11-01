import { Sparkles, TrendingUp, HelpCircle, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const questions = [
  {
    icon: TrendingUp,
    text: "What was our revenue growth in Q4?",
    gradient: "from-primary/10 to-primary/5"
  },
  {
    icon: Sparkles,
    text: "Show me our expense breakdown for last quarter",
    gradient: "from-accent/10 to-accent/5"
  },
  {
    icon: Lightbulb,
    text: "What are our top profit recommendations?",
    gradient: "from-primary/10 to-primary/5"
  },
  {
    icon: HelpCircle,
    text: "Analyze our cash flow trends",
    gradient: "from-accent/10 to-accent/5"
  }
];

const SuggestedQuestions = ({ onQuestionClick }: SuggestedQuestionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl">
      {questions.map((question, index) => {
        const Icon = question.icon;
        return (
          <Card
            key={index}
            className="p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50 bg-card"
            onClick={() => onQuestionClick(question.text)}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${question.gradient}`}>
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-card-foreground flex-1">
                {question.text}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SuggestedQuestions;
