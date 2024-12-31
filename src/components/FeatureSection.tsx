import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Map, CreditCard, FileText, BarChart2 } from "lucide-react";

export const FeatureSection = () => {
  const features = [
    {
      icon: Map,
      title: "Area Research",
      description: "Explore neighborhoods with detailed insights and market trends.",
    },
    {
      icon: BarChart2,
      title: "AI Analysis",
      description: "Get personalized property recommendations and market predictions.",
    },
    {
      icon: CreditCard,
      title: "Mortgage Support",
      description: "Find the best mortgage rates and get expert guidance.",
    },
    {
      icon: FileText,
      title: "Conveyancing",
      description: "Streamline the legal process with trusted professionals.",
    },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Everything You Need for Property Success
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-gradient-futuristic hover:border-primary/50 transition-colors">
                <Icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};