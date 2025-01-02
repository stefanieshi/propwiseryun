import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GoogleButton from "./GoogleButton";

const RegisterForm = ({ loading, setLoading }: { loading: boolean; setLoading: (loading: boolean) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
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

      toast.success("Registration successful! Please check your email to verify your account.");
      navigate("/auth?tab=login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1A1F2C] dark:text-white">Full Name</label>
          <Input
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12 rounded-lg border-gray-200 bg-secondary/50"
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1A1F2C] dark:text-white">Email</label>
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-lg border-gray-200 bg-secondary/50"
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#1A1F2C] dark:text-white">Password</label>
          <Input
            type="password"
            placeholder="Create a password"
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
          className="w-full h-12 text-base bg-[#40E0D0] hover:bg-[#20B2AA] text-white" 
          disabled={loading}
        >
          Create account
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

export default RegisterForm;