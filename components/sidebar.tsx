"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Folder, 
  Building2, 
  Users, 
  Settings,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Invoice", href: "/invoice", icon: FileText },
  { name: "Other files", href: "/files", icon: Folder },
  { name: "Departments", href: "/departments", icon: Building2 },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Buchhaltung</h2>
            <p className="text-xs text-muted-foreground">12 members</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="mb-2">
          <p className="text-xs font-semibold text-muted-foreground px-3 mb-2" data-testid="text-nav-header">
            GENERAL
          </p>
        </div>
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-6 border-t">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-base font-bold text-primary">Flowbit AI</span>
        </div>
      </div>
    </aside>
  );
}
