import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary text-transparent bg-clip-text mb-6">
        Smart Property Decisions
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Make informed property decisions with AI-powered insights, market analysis, and expert guidance.
      </p>
      <div className="flex gap-4 justify-center">
        <Button
          size="lg"
          onClick={() => navigate("/area-research")}
          className="bg-gradient-primary hover:opacity-90"
        >
          Start Research
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate("/auth")}
        >
          Sign Up Free
        </Button>
      </div>
    </motion.div>
  );
};