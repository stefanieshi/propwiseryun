import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Robot, 
  Building2, 
  Scale, 
  ArrowRight, 
  BarChart3, 
  Globe2,
  MessagesSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Robot,
      title: "AI Property Advisor",
      description: "Find your dream home effortlessly with our AI-driven property recommendations"
    },
    {
      icon: Building2,
      title: "Mortgage Solutions",
      description: "Personalized loan matching and expert advice"
    },
    {
      icon: Scale,
      title: "Legal Support",
      description: "Streamlined legal guidance for secure transactions"
    }
  ];

  const marketInsights = [
    { label: "Average Property Price", value: "£350,000", trend: "+5.2%" },
    { label: "Market Growth", value: "7.8%", trend: "+2.1%" },
    { label: "Properties Listed", value: "15,234", trend: "+12%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm" />
          <img
            src="/lovable-uploads/42ca702d-9604-4405-ad47-928c9dc888a4.png"
            alt="Modern home"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Smart Guide to
              <span className="text-primary"> Global Home Buying</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Simplify your overseas property journey with AI-powered insights,
              personalized assistance, and end-to-end solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Explore Properties <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => navigate("/auth")}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Propwiser?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 rounded-lg glass-card"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="py-20 bg-gradient-futuristic">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real-Time Market Insights</h2>
            <p className="text-muted-foreground">
              Stay ahead with AI-powered market analytics
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketInsights.map((insight, index) => (
              <motion.div
                key={insight.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <h3 className="text-lg text-muted-foreground mb-2">
                  {insight.label}
                </h3>
                <p className="text-3xl font-bold text-primary mb-1">
                  {insight.value}
                </p>
                <span className="text-green-500 text-sm">{insight.trend}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Compare Properties Effortlessly
              </h2>
              <p className="text-muted-foreground mb-8">
                Our AI-powered comparison tool helps you make informed decisions
                by analyzing multiple properties across key metrics.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe2 className="h-6 w-6 text-primary" />
                  <span>Global property database</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <span>Advanced analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessagesSquare className="h-6 w-6 text-primary" />
                  <span>24/7 AI support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/lovable-uploads/753f39c6-065d-4521-98e8-03e7b4094058.png"
                alt="Property comparison"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Services</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">FAQs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe for market updates and insights
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground">
                © 2024 Propwiser. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;