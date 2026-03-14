import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Utensils, MapPin, Calendar,
  Wallet, MessageSquare, User, Menu, X,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Utensils, label: "Diet Planner", path: "/diet" },
  { icon: MapPin, label: "NearMe", path: "/nearme" },
  { icon: Calendar, label: "Period Tracker", path: "/period" },
  { icon: Wallet, label: "Budget Tracker", path: "/budget" },
  { icon: MessageSquare, label: "AI Chat", path: "/chat" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-foreground/30 z-40 md:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-[240px] bg-primary z-50 transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 flex items-center gap-3">
          <img src="/healix-logo.png" className="h-9 w-auto" alt="Healix" />
          <span className="text-primary-foreground font-bold text-xl tracking-tight">Healix</span>
        </div>
        <div className="h-[1px] bg-primary-foreground/20 mx-6 mb-4" />
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); onClose(); }}
                className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 group
                  ${active ? "bg-healix-button border-l-[3px] border-primary-foreground" : "hover:bg-primary-foreground/10"}`}
              >
                <item.icon className={`w-5 h-5 ${active ? "text-primary-foreground" : "text-primary-foreground/70 group-hover:text-primary-foreground"}`} />
                <span className={`text-sm font-medium ${active ? "text-primary-foreground" : "text-primary-foreground/70 group-hover:text-primary-foreground"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-8 w-full text-center">
          <p className="text-primary-foreground/50 text-[10px] uppercase tracking-widest font-semibold">
            Powered by Gemini AI
          </p>
        </div>
      </aside>
    </>
  );
}

export function TopBar({ title, onMenuClick }: { title: string; onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-[240px] h-16 bg-background border-b border-border flex items-center justify-between px-8 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden p-2">
          <Menu className="w-6 h-6 text-primary" />
        </button>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-9 h-9 bg-healix-button rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-inner">
            P
          </div>
          <span className="hidden sm:block text-sm font-semibold text-foreground">Priya</span>
        </div>
      </div>
    </header>
  );
}

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/diet": "Diet Planner",
  "/nearme": "NearMe",
  "/period": "Period Tracker",
  "/budget": "Budget Tracker",
  "/chat": "AI Chat",
  "/profile": "Profile",
};

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || "Healix";

  return (
    <div className="min-h-screen bg-background font-poppins antialiased">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopBar title={title} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <main className="md:ml-[240px] pt-16 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
