import { Bell, User, Plus, TrendingDown, DollarSign, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onNewChat?: () => void;
}

const alerts = [
  {
    id: "profit-decline",
    title: "Profit Margin Declining",
    description: "Profit margins decreased by 15% over the last quarter",
    icon: TrendingDown,
    severity: "high"
  },
  {
    id: "cash-flow",
    title: "Cash Flow Warning",
    description: "Operating cash flow decreased by 22% compared to last month",
    icon: DollarSign,
    severity: "medium"
  },
  {
    id: "expense-spike",
    title: "Unusual Expense Spike",
    description: "Technology expenses increased by 35% this month",
    icon: AlertTriangle,
    severity: "low"
  }
];

const Header = ({ onNewChat }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">AI</span>
          </div>
          <span className="font-semibold text-lg">ChatBot</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onNewChat}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Chat</span>
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-secondary"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-muted-foreground">You have {alerts.length} unread alerts</p>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {alerts.map((alert) => {
                  const Icon = alert.icon;
                  const severityColors = {
                    high: "text-destructive bg-destructive/10",
                    medium: "text-orange-500 bg-orange-500/10",
                    low: "text-yellow-500 bg-yellow-500/10"
                  };
                  return (
                    <div
                      key={alert.id}
                      onClick={() => navigate(`/alert/${alert.id}`)}
                      className="p-4 border-b hover:bg-secondary/50 cursor-pointer transition-colors"
                    >
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-lg ${severityColors[alert.severity as keyof typeof severityColors]}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{alert.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {alert.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary"
            aria-label="User profile"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
