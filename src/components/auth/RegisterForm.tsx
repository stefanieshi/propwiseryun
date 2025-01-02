import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import GoogleButton from "./GoogleButton";

const RegisterForm = ({ loading, setLoading }: { loading: boolean; setLoading: (loading: boolean) => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            full_name: `${firstName} ${lastName}`.trim(),
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

      toast.success("Registration successful! You can now log in with your credentials.");
      navigate("/auth?tab=login");
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-base font-semibold text-[#1A1F2C] dark:text-white">First Name</label>
            <Input
              type="text"
              placeholder="Your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-12 rounded-lg border-gray-200 bg-secondary/50 text-white placeholder:text-gray-400"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-base font-semibold text-[#1A1F2C] dark:text-white">Last Name</label>
            <Input
              type="text"
              placeholder="Your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-12 rounded-lg border-gray-200 bg-secondary/50 text-white placeholder:text-gray-400"
              required
              disabled={loading}
            />
          </div>
        </div>
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-lg border-gray-200 bg-secondary/50 text-white placeholder:text-gray-400"
            required
            disabled={loading}
            minLength={8}
          />
          <p className="text-sm text-muted-foreground">
            * At least: 8 characters, 1 number, 1 upper, 1 lower
          </p>
        </div>
        <Button 
          type="submit" 
          className="w-full h-12 text-base bg-[#40E0D0] hover:bg-[#20B2AA] text-white" 
          disabled={loading}
        >
          Create Account
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

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth?tab=login" className="text-[#40E0D0] hover:text-[#20B2AA]">
            Log in
          </Link>
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          By continuing, you agree to our{" "}
          <a href="#" className="text-[#40E0D0] hover:text-[#20B2AA]">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-[#40E0D0] hover:text-[#20B2AA]">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;