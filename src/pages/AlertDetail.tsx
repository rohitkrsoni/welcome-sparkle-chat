import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingDown, AlertTriangle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const alertsData = {
  "profit-decline": {
    title: "Profit Margin Declining",
    severity: "high",
    icon: TrendingDown,
    description: "Profit margins have decreased by 15% over the last quarter",
    chartData: [
      { month: "Jan", profit: 42 },
      { month: "Feb", profit: 38 },
      { month: "Mar", profit: 35 },
      { month: "Apr", profit: 32 },
      { month: "May", profit: 28 },
      { month: "Jun", profit: 27 },
    ],
    analysis: `**Detailed Analysis:**

• Profit margins dropped from 42% in January to 27% in June
• Primary driver: 18% increase in operating expenses
• Revenue growth (8%) not keeping pace with cost increases
• Gross margins remain stable at 65%, indicating pricing power is intact
• Issue is concentrated in operational efficiency

**Root Causes:**

• Marketing spend increased 45% with lower than expected ROI
• Three new hires in Q2 increased payroll costs by $180K
• Technology infrastructure upgrades cost $95K
• Higher customer acquisition costs due to market competition`,
    recommendations: `**Immediate Actions (0-30 days):**

• Audit marketing campaigns and cut underperforming channels (save $25K/month)
• Renegotiate software licenses for 15% cost reduction
• Implement expense approval workflow for purchases over $1,000
• Review and optimize operational processes to reduce waste

**Short-term Strategy (1-3 months):**

• Launch customer retention program to reduce churn (lower CAC)
• Implement upsell strategies for existing customers
• Review pricing strategy for premium features
• Train new hires to reach full productivity faster

**Long-term Initiatives (3-6 months):**

• Invest in automation to reduce manual operational costs
• Develop more efficient customer acquisition channels
• Build strategic partnerships to share marketing costs
• Consider outsourcing non-core functions

**Expected Impact:** Implementing these recommendations should restore profit margins to 35-38% within 3 months.`,
  },
  "cash-flow": {
    title: "Cash Flow Warning",
    severity: "medium",
    icon: DollarSign,
    description: "Operating cash flow decreased by 22% compared to last month",
    chartData: [
      { month: "Jan", cashflow: 320 },
      { month: "Feb", cashflow: 285 },
      { month: "Mar", cashflow: 310 },
      { month: "Apr", cashflow: 265 },
      { month: "May", cashflow: 240 },
      { month: "Jun", cashflow: 250 },
    ],
    analysis: `**Cash Flow Analysis:**

• Operating cash flow declined from $320K in January to $250K in June
• Collections period increased from 35 to 42 days (DSO deterioration)
• Inventory levels rose by 30%, tying up working capital
• Payment terms to vendors maintained at 45 days
• Cash conversion cycle extended from 45 to 58 days

**Contributing Factors:**

• Two major customers requested extended payment terms
• Increased inventory purchases for anticipated Q3 demand
• Higher capital expenditures on technology infrastructure
• Seasonal payment patterns from enterprise customers`,
    recommendations: `**Immediate Cash Optimization:**

• Accelerate collections by offering 2% early payment discount
• Review and reduce excess inventory levels
• Negotiate improved payment terms with key suppliers
• Implement weekly cash flow monitoring and forecasting

**Working Capital Improvements:**

• Tighten credit approval process for new customers
• Set up automatic payment reminders for overdue invoices
• Consider invoice factoring for large receivables
• Optimize inventory management with just-in-time practices

**Strategic Measures:**

• Build cash reserve of 3-4 months operating expenses
• Establish line of credit as safety net ($500K recommended)
• Implement subscription-based pricing for more predictable cash flow
• Consider customer deposits for large projects

**Target:** Reduce cash conversion cycle to 45 days and maintain minimum cash balance of $800K.`,
  },
  "expense-spike": {
    title: "Unusual Expense Spike",
    severity: "low",
    icon: AlertTriangle,
    description: "Technology expenses increased by 35% this month",
    chartData: [
      { category: "Software", amount: 85 },
      { category: "Infrastructure", amount: 125 },
      { category: "Services", amount: 65 },
      { category: "Hardware", amount: 45 },
      { category: "Support", amount: 60 },
    ],
    analysis: `**Expense Breakdown:**

• Total technology expenses: $380K (up from $280K last month)
• Infrastructure costs increased by $55K due to server upgrades
• New software licenses added: $25K recurring monthly cost
• One-time migration services: $20K
• Overall 35% increase is partially due to one-time items

**Detailed Review:**

• Infrastructure upgrade was planned but costs exceeded estimate by 15%
• Added 3 new software tools: CRM ($12K/month), Analytics ($8K/month), Security ($5K/month)
• Cloud computing costs up 25% due to traffic growth
• Support costs remain stable and within budget`,
    recommendations: `**Cost Optimization Review:**

• Evaluate necessity of new software tools after 90-day trial
• Renegotiate cloud computing rates based on committed usage
• Consider bundled software packages for better pricing
• Review usage metrics to eliminate redundant tools

**Process Improvements:**

• Implement technology purchase approval workflow
• Require ROI analysis for any software over $5K/month
• Conduct quarterly software audit to identify unused licenses
• Consolidate vendors where possible for volume discounts

**Ongoing Monitoring:**

• Set budget alerts at 80% of monthly allocation
• Track key metrics: cost per user, cost per transaction
• Compare against industry benchmarks quarterly
• Plan major technology investments for Q1 next year

**Expected Outcome:** Reduce recurring technology costs by 10-15% ($35-50K annually) while maintaining operational efficiency.`,
  },
};

const AlertDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const alert = id ? alertsData[id as keyof typeof alertsData] : null;

  if (!alert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Alert not found</p>
      </div>
    );
  }

  const Icon = alert.icon;
  const severityColors = {
    high: "text-destructive",
    medium: "text-orange-500",
    low: "text-yellow-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chat
        </Button>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-card border ${severityColors[alert.severity as keyof typeof severityColors]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl">{alert.title}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {alert.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trend Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {id === "expense-spike" ? (
                  <BarChart data={alert.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={id === "expense-spike" ? "category" : "month"} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={id === "expense-spike" ? "amount" : id === "cash-flow" ? "cashflow" : "profit"} fill="hsl(var(--primary))" />
                  </BarChart>
                ) : (
                  <LineChart data={alert.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={id === "cash-flow" ? "cashflow" : "profit"}
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {alert.analysis.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return (
                      <h3 key={i} className="font-bold text-lg mt-4 mb-2">
                        {line.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('•')) {
                    return (
                      <li key={i} className="ml-4 my-1">
                        {line.substring(1).trim()}
                      </li>
                    );
                  }
                  return line ? <p key={i} className="my-1">{line}</p> : <br key={i} />;
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {alert.recommendations.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return (
                      <h3 key={i} className="font-bold text-lg mt-4 mb-2">
                        {line.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('•')) {
                    return (
                      <li key={i} className="ml-4 my-1">
                        {line.substring(1).trim()}
                      </li>
                    );
                  }
                  return line ? <p key={i} className="my-1">{line}</p> : <br key={i} />;
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlertDetail;
