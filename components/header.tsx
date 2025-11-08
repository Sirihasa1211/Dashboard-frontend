"use client";

import { MoreVertical } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground" data-testid="text-page-title">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div 
            className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium"
            data-testid="img-avatar"
          >
            AJ
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground" data-testid="text-user-name">
              Amit Jadhav
            </span>
            <span className="text-xs text-muted-foreground" data-testid="text-user-role">
              Admin
            </span>
          </div>
          <button 
            className="p-1 hover:bg-secondary rounded-md transition-colors"
            data-testid="button-menu"
          >
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
