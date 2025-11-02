import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BarChart3 } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "abc" && password === "password") {
      toast.success("Login successful!");
      navigate("/home");
    } else {
      toast.error("Invalid credentials. Try username: abc, password: password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">AccountAI</h1>
          </div>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-card p-8 rounded-lg shadow-lg border">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Demo credentials: username: <span className="font-mono">abc</span>, password: <span className="font-mono">password</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
