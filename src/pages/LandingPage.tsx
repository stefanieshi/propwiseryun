import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { House, DollarSign, ChartBar, Info, List, Search, Building, Shield } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/92ce51d3-8dd2-4f65-9d00-5d9d53c6cb55.png" 
            alt="Propwiser Logo" 
            className="mx-auto h-20 mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-[#9b87f5] mb-4">
            Your AI-Powered Property Navigator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Make smarter property decisions with AI-driven insights and comprehensive analysis. 
            From area research to mortgage advice, we're here to guide you through every step of your property journey.
          </p>
          <Button 
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#403E43]">
            Comprehensive Property Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Search className="h-8 w-8 text-[#9b87f5]" />}
              title="Area Research"
              description="Discover the perfect neighborhood with our advanced area analysis tools, including price trends, local amenities, and community insights."
            />
            <ServiceCard
              icon={<Building className="h-8 w-8 text-[#9b87f5]" />}
              title="Property Analysis"
              description="Get detailed property insights, including price history, potential rental yields, and comprehensive market comparisons."
            />
            <ServiceCard
              icon={<Shield className="h-8 w-8 text-[#9b87f5]" />}
              title="Legal & Financial Support"
              description="Access expert mortgage advice and conveyancing services to ensure a smooth property transaction process."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#403E43]">
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="Free"
              features={[
                "Basic area research",
                "Property price history",
                "Market trends overview",
                "Limited property comparisons"
              ]}
              buttonText="Get Started"
              onClick={() => navigate("/auth")}
            />
            <PricingCard
              title="Pro"
              price="£29/month"
              features={[
                "Advanced area analysis",
                "Detailed property insights",
                "Unlimited comparisons",
                "AI-powered recommendations",
                "Mortgage pre-approval check"
              ]}
              buttonText="Try Pro"
              onClick={() => navigate("/auth")}
              highlighted
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              features={[
                "All Pro features",
                "API access",
                "Custom integrations",
                "Dedicated support",
                "Priority access to new features"
              ]}
              buttonText="Contact Us"
              onClick={() => navigate("/contact")}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-[#403E43]">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const PricingCard = ({ title, price, features, buttonText, onClick, highlighted = false }) => (
  <div className={`p-6 rounded-lg ${
    highlighted 
      ? 'bg-[#9b87f5] text-white shadow-xl transform scale-105' 
      : 'bg-white text-gray-900 shadow-lg'
  }`}>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="text-3xl font-bold mb-4">{price}</div>
    <ul className="mb-6 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <List className="h-4 w-4 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <Button
      className={`w-full ${
        highlighted 
          ? 'bg-white text-[#9b87f5] hover:bg-gray-100' 
          : 'bg-[#9b87f5] text-white hover:bg-[#7E69AB]'
      }`}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  </div>
);

export default LandingPage;