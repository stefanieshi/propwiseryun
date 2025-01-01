import { NavLink } from "react-router-dom";
import { 
  Home, 
  LineChart, 
  Eye, 
  GitCompare, 
  Map, 
  Landmark, 
  Scale, 
  Train, 
  Bot,
  LogIn 
} from "lucide-react";

const SideNav = () => {
  return (
    <nav className="w-64 bg-card border-r border-border h-screen p-4 flex flex-col gap-2">
      <NavLink to="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
        <Home className="w-5 h-5" />
        <span>Home</span>
      </NavLink>
      
      <NavLink to="/viewed" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
        <Eye className="w-5 h-5" />
        <span>Viewed Properties</span>
      </NavLink>
      
      <NavLink to="/compare" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
        <GitCompare className="w-5 h-5" />
        <span>Compare</span>
      </NavLink>
      
      <NavLink to="/area-research" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
        <Map className="w-5 h-5" />
        <span>Area Research</span>
      </NavLink>
      
      <NavLink to="/mortgage" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
        <Landmark className="w-5 h-5" />
        <span>Mortgage</span>
      </NavLink>
      
      <NavLink to="/conveyancing" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
        <Scale className="w-5 h-5" />
        <span>Conveyancing</span>
      </NavLink>
      
      <NavLink to="/commute" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
        <Train className="w-5 h-5" />
        <span>Commute</span>
      </NavLink>

      <NavLink to="/ai-consultant" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
        <Bot className="w-5 h-5" />
        <span>AI Consultant</span>
      </NavLink>
      
      <NavLink to="/auth" className="mt-auto flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
        <LogIn className="w-5 h-5" />
        <span>Login</span>
      </NavLink>
    </nav>
  );
};

export default SideNav;