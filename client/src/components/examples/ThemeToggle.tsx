import { ThemeToggle } from '../theme-toggle';
import { ThemeProvider } from '../theme-provider';

export default function ThemeToggleExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background flex items-center gap-4">
        <span className="text-foreground">Toggle theme:</span>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
