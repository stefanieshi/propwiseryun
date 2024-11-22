import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, ArrowLeftRight, FileText, BarChart2, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SideNavProps {
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

const SideNav = ({ isExpanded, onExpandedChange }: SideNavProps) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Property research", href: "/" },
    { icon: CreditCard, label: "Mortgage pre-approval", href: "/mortgage" },
    { icon: ArrowLeftRight, label: "Tracker", href: "/tracker" },
    { icon: FileText, label: "Conveyancing", href: "/conveyancing" },
    { icon: BarChart2, label: "AI consultant", href: "/ai-consultant" },
    { icon: User, label: "Account", href: "/account" },
  ];

  return (
    <nav 
      className={cn(
        "fixed left-0 top-0 h-full bg-[#1A1F2C] border-r border-[#2A2F3C] backdrop-blur-lg transition-all duration-300",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {isExpanded && (
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            PropertyAI
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-white/5"
          onClick={() => onExpandedChange(!isExpanded)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-2 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                isActive
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white animate-glow"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
              title={!isExpanded ? item.label : undefined}
            >
              <Icon className={cn(
                "h-5 w-5 transition-transform duration-300",
                isActive ? 'scale-110' : '',
                !isExpanded ? 'mx-auto' : ''
              )} />
              {isExpanded && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNav;