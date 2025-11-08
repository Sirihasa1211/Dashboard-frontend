import { AppSidebar } from '../app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <div className="h-screen">
      <SidebarProvider style={style as React.CSSProperties}>
        <AppSidebar />
      </SidebarProvider>
    </div>
  );
}
