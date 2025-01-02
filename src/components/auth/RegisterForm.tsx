import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const RegisterForm = ({ loading, setLoading }: { loading: boolean; setLoading: (loading: boolean) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      
      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Please try logging in instead.");
        } else {
          toast.error(error.message);
        }
        return;
      }
      
      toast.success("Registration successful! Please check your email for verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 rounded-lg border-gray-200 bg-secondary/50"
          required
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-lg border-gray-200 bg-secondary/50"
          required
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 rounded-lg border-gray-200 bg-secondary/50"
          required
          disabled={loading}
          minLength={6}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full h-12 text-base bg-[#9b87f5] hover:bg-[#9b87f5]/80 text-white" 
        disabled={loading}
      >
        Create account
      </Button>
      <div className="mt-4 text-sm text-muted-foreground flex gap-2">
        Already have an account?
        <Link to="/auth?tab=login" className="text-[#9b87f5] hover:text-[#9b87f5]/80">
          Log in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;