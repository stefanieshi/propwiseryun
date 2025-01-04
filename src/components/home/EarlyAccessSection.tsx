import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rocket } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const EarlyAccessSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with your backend
    toast({
      title: "Thanks for signing up!",
      description: "We'll notify you when early access becomes available.",
    });
    setEmail("");
  };

  return (
    <section className="py-12 bg-secondary/5 rounded-lg my-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-2xl font-bold">Get Early Access</h2>
          </div>
          <p className="text-muted-foreground">
            Be the first to experience our AI-powered property navigation platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <Button type="submit">
              Sign Up
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default EarlyAccessSection;