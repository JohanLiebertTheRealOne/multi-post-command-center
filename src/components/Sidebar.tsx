
import { useState } from "react";
import { Calendar, Plus, BarChart3, Library, Settings, Home, ChevronLeft, ChevronRight, Instagram, Facebook, Youtube, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", color: "text-blue-600" },
    { id: "create", icon: Plus, label: "Créer", color: "text-green-600" },
    { id: "calendar", icon: Calendar, label: "Calendrier", color: "text-purple-600" },
    { id: "library", icon: Library, label: "Bibliothèque", color: "text-orange-600" },
    { id: "analytics", icon: BarChart3, label: "Rapports", color: "text-pink-600" },
    { id: "settings", icon: Settings, label: "Paramètres", color: "text-gray-600" },
  ];

  const platforms = [
    { icon: Instagram, label: "Instagram", color: "text-pink-500" },
    { icon: Facebook, label: "Facebook", color: "text-blue-600" },
    { icon: Youtube, label: "YouTube", color: "text-red-500" },
    { icon: Music, label: "TikTok", color: "text-gray-800" },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MP</span>
              </div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                MultiPost Studio
              </h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-12 transition-all duration-200",
                collapsed ? "px-3" : "px-4",
                isActive ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg" : "hover:bg-gray-100"
              )}
              onClick={() => setActiveView(item.id)}
            >
              <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-3", isActive ? "text-white" : item.color)} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Connected Platforms */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-100 mt-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Plateformes Connectées
          </h3>
          <div className="space-y-2">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Icon className={cn("h-4 w-4", platform.color)} />
                  <span className="text-sm text-gray-700">{platform.label}</span>
                  <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
