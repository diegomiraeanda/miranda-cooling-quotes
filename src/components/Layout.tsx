
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CalendarClock, FileText, Home, ListChecks, Users } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: FileText, label: "Orçamentos", path: "/quotes" },
    { icon: Users, label: "Clientes", path: "/customers" },
    { icon: ListChecks, label: "Serviços", path: "/services" },
    { icon: CalendarClock, label: "Agenda", path: "/schedule" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 w-64 transform transition-transform duration-300 bg-white border-r border-gray-200 shadow-sm">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-cooling-700 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">RM</span>
              </div>
              <div>
                <h1 className="font-bold text-cooling-800">Refrigeração</h1>
                <h2 className="text-sm font-medium text-cooling-600">Miranda</h2>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-cooling-50 text-cooling-700"
                    : "text-gray-600 hover:bg-cooling-50 hover:text-cooling-700"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t text-xs text-center text-gray-500">
            © {new Date().getFullYear()} Refrigeração Miranda
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
