import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  UploadCloud, 
  Table, 
  BarChart3, 
  HelpCircle,
  Activity
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Upload Dataset", path: "/upload", icon: UploadCloud },
    { name: "Preview Data", path: "/preview", icon: Table },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 border-r border-outline-variant bg-background py-lg px-md sticky top-0 shrink-0 select-none">
      <div className="mb-xl px-sm flex items-center gap-sm">
        <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
          <Activity size={18} className="text-[#00285d]" />
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">FoodFusion</h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-primary font-mono">ETL Platform</p>
        </div>
      </div>
      
      <nav className="flex-grow space-y-1">
        <p className="text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-widest px-sm mb-sm font-mono">Data Engine</p>
        {menuItems.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-sm py-2 rounded-lg transition-all duration-200 font-body-md text-body-md group ${
                isActive 
                  ? "text-primary font-semibold border-r-2 border-primary bg-surface-container-high" 
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
              }`
            }
          >
            {({ isActive }) => {
              const Icon = item.icon;
              return (
                <>
                  <Icon 
                    size={18} 
                    className={`transition-colors duration-200 ${
                      isActive 
                        ? "text-primary" 
                        : "text-on-surface-variant group-hover:text-on-surface"
                    }`} 
                  />
                  <span>{item.name}</span>
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-lg border-t border-outline-variant/30">
        <NavLink
          to="/help"
          className={({ isActive }) => 
            `flex items-center gap-3 px-sm py-2 rounded-lg transition-all duration-200 font-body-md text-body-md group ${
              isActive 
                ? "text-primary font-semibold border-r-2 border-primary bg-surface-container-high" 
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
            }`
          }
        >
          <HelpCircle size={18} />
          <span>Help & Docs</span>
        </NavLink>
        <div className="mt-md px-sm text-[11px] text-on-surface-variant/40 font-mono">
          FoodFusion v1.2.4
        </div>
      </div>
    </aside>
  );
};
