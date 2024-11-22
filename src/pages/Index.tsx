import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard,
  Home,
  ArrowRightLeft,
  Save,
  TrendingUp,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import ComparisonView from "@/components/ComparisonView";
import MetricsChart from "@/components/MetricsChart";

const Index = () => {
  const [selectedView, setSelectedView] = useState<"dashboard" | "comparison">(
    "dashboard"
  );

  // Mock data - in a real app this would come from your backend
  const savedProperties = [
    {
      id: 1,
      title: "Modern City Apartment",
      price: 450000,
      location: "Manchester City Center",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 850,
      type: "Apartment",
      imageUrl: "https://placehold.co/600x400",
    },
    {
      id: 2,
      title: "Suburban Family Home",
      price: 650000,
      location: "South Manchester",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 1800,
      type: "House",
      imageUrl: "https://placehold.co/600x400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                PropertyAI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedView("dashboard")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedView === "dashboard"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard className="h-5 w-5 inline-block mr-1" />
                Dashboard
              </button>
              <button
                onClick={() => setSelectedView("comparison")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedView === "comparison"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ArrowRightLeft className="h-5 w-5 inline-block mr-1" />
                Compare
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center">
              <Save className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Saved Properties
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {savedProperties.length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-accent" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Average Property Value
                </p>
                <p className="text-2xl font-semibold text-gray-900">£550,000</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-secondary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Most Common Type
                </p>
                <p className="text-2xl font-semibold text-gray-900">Apartment</p>
              </div>
            </div>
          </Card>
        </div>

        {selectedView === "dashboard" ? (
          <>
            {/* Charts Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Property Metrics
              </h2>
              <Card className="p-6">
                <MetricsChart properties={savedProperties} />
              </Card>
            </div>

            {/* Saved Properties */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Saved Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <ComparisonView properties={savedProperties} />
        )}
      </main>
    </div>
  );
};

export default Index;