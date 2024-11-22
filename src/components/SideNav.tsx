import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, ArrowLeftRight, FileText, BarChart2, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SideNavProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const SideNav = ({ onCollapsedChange }: SideNavProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  const menuItems = [
    { icon: Home, label: "Property research", href: "/" },
    { icon: CreditCard, label: "Mortgage pre-approval", href: "/mortgage" },
    { icon: ArrowLeftRight, label: "Tracker", href: "/tracker" },
    { icon: FileText, label: "Conveyancing", href: "/conveyancing" },
    { icon: BarChart2, label: "AI consultant", href: "/ai-consultant" },
    { icon: User, label: "Account", href: "/account" },
  ];

  const NavLink = ({ item, isCollapsed }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.href;
    
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
                isActive
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className={cn(
                "h-6 w-6 flex-shrink-0 transition-transform duration-300",
                isActive ? 'scale-110' : '',
                !isCollapsed && 'group-hover:translate-x-1'
              )} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right" className="ml-2">
              {item.label}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ 
          width: isCollapsed ? "5rem" : "16rem",
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
        className={cn(
          "fixed left-0 top-0 h-full bg-[#1A1F2C] p-4 border-r border-[#2A2F3C] backdrop-blur-lg z-50",
          "flex flex-col transition-all duration-300 ease-in-out"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              >
                PropertyAI
              </motion.h1>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-white/5"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 animate-pulse" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink key={item.href} item={item} isCollapsed={isCollapsed} />
          ))}
        </div>
      </motion.nav>
      
      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed left-4 bottom-4 z-50"
          >
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsCollapsed(false)}
              className="rounded-full shadow-lg hover:shadow-xl transition-shadow bg-purple-500/20 hover:bg-purple-500/30"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideNav;