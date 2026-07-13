import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  Bell, 
  Settings, 
  Home, 
  UploadCloud, 
  Table, 
  BarChart3, 
  HelpCircle,
  Activity,
  Search
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Upload Dataset", path: "/upload", icon: UploadCloud },
    { name: "Preview Data", path: "/preview", icon: Table },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Help & Docs", path: "/help", icon: HelpCircle },
  ];

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Dashboard Overview";
      case "/upload": return "Upload Dataset";
      case "/preview": return "Preview Data";
      case "/dashboard": return "Analytics Dashboard";
      case "/help": return "Documentation & Help";
      default: return "FoodFusion Platform";
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="w-full h-16 sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-outline-variant/30 flex items-center justify-between px-6 md:px-8">
        
        {/* Left side: Hamburger on mobile, Title/Breadcrumbs on desktop */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-high transition-colors focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
          
          <h2 className="hidden md:block font-headline-md text-headline-md font-bold text-on-surface">
            {getPageTitle()}
          </h2>
          <div className="md:hidden flex items-center gap-2">
            <Activity size={18} className="text-primary" />
            <span className="font-bold text-on-surface text-base">FoodFusion</span>
          </div>
        </div>

        {/* Right side: Search bar, notifications, profile */}
        <div className="flex items-center gap-md">
          {/* Desktop Search */}
          <div className="hidden lg:flex items-center bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-1.5 focus-within:border-primary/50 transition-colors w-64">
            <Search size={16} className="text-on-surface-variant/70 mr-2" />
            <input 
              type="text" 
              placeholder="Search datasets, logs, reports..." 
              className="bg-transparent border-none text-on-surface text-sm focus:outline-none placeholder:text-on-surface-variant/50 w-full"
            />
          </div>

          <button className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-lg hover:bg-surface-container-high focus:outline-none relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary pulsing-indicator"></span>
          </button>
          
          <button className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-lg hover:bg-surface-container-high focus:outline-none">
            <Settings size={18} />
          </button>
          
          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/40 ml-2">
            <img 
              alt="User profile avatar" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
            />
          </div>
        </div>
      </header>

      {/* Collapsible Mobile Drawer Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 md:hidden animate-fade-in" onClick={() => setIsOpen(false)}>
          <div 
            className="w-64 h-full bg-background border-r border-outline-variant p-6 flex flex-col gap-6 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                <span className="font-bold text-on-surface text-lg">FoodFusion</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-high"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Menu Items */}
            <nav className="flex-1 space-y-1">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-sm py-2.5 rounded-lg transition-all duration-200 font-body-md text-body-md ${
                        isActive 
                          ? "text-primary font-semibold bg-surface-container-high border-r-2 border-primary" 
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
                      }`
                    }
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
            
            <div className="pt-4 border-t border-outline-variant/30 text-[11px] text-on-surface-variant/40 font-mono">
              FoodFusion v1.2.4 • All systems green
            </div>
          </div>
        </div>
      )}
    </>
  );
};
