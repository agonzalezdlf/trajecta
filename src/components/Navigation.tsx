import { Link, useLocation } from "react-router-dom";
import { Rocket, Map, Brain, Users, User } from "lucide-react";
import { cn } from "../lib/utils";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="https://illustrations.popsy.co/white/launching-rocket.svg" alt="Trajecta Logo" className="size-8 object-contain" referrerPolicy="no-referrer" />
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">Trajecta</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold hover:text-primary transition-colors">Login</Link>
          <Link to="/onboarding">
            <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export const BottomNav = () => {
  const location = useLocation();
  const items = [
    { label: "Path", icon: Map, path: "/dashboard" },
    { label: "Skills", icon: Brain, path: "/skills" },
    { label: "Network", icon: Users, path: "/network" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-white dark:bg-background-dark border-t border-primary/10 px-4 pb-6 pt-2 flex justify-between items-center z-50">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path || "#"}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 transition-colors",
              isActive ? "text-primary" : "text-slate-400 dark:text-slate-500 hover:text-primary"
            )}
          >
            {typeof item.icon === "string" ? (
               <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
            ) : (
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            )}
            <p className={cn("text-xs leading-normal tracking-tight", isActive ? "font-bold" : "font-medium")}>
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
