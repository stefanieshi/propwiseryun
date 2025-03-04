import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GoogleButton from "./GoogleButton";

const LoginForm = ({ loading, setLoading }: { loading: boolean; setLoading: (loading: boolean) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message === "Invalid login credentials") {
          toast.error("Invalid email or password. Please try again.");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please verify your email before logging in.");
        } else {
          toast.error(error.message);
        }
        return;
      }
      
      navigate("/");
      toast.success("Successfully logged in!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1A1F2C] dark:text-white">Email</label>
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-lg border-gray-200 bg-secondary/50 text-white placeholder:text-gray-400"
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1A1F2C] dark:text-white">Password</label>
          <Input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-lg border-gray-200 bg-secondary/50 text-white placeholder:text-gray-400"
            required
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full h-12 text-base bg-[#40E0D0] hover:bg-[#20B2AA] text-white" 
          disabled={loading}
        >
          Log In
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <GoogleButton loading={loading} />
      </div>
    </div>
  );
};

export default LoginForm;