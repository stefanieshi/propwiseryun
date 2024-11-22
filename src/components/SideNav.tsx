import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, ArrowLeftRight, FileText, BarChart2, User } from "lucide-react";

const SideNav = () => {
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
    <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-[#9b87f5] bg-[#F1F0FB]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNav;