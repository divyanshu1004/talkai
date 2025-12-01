import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col min-h-screen w-full bg-muted">
        <DashboardNavbar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
};
export default Layout;
