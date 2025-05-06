
import { Outlet } from "react-router-dom";
import AdminNav from "@/components/AdminNav";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 bg-slate-900 text-white flex items-center justify-between">
        <h2 className="font-bold">CloudBlogger Admin</h2>
        <Button variant="ghost" className="text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu />
        </Button>
      </div>
      
      <div className="flex">
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-black/30" onClick={() => setSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white p-4">
              <AdminNav />
            </div>
          </div>
        )}
        
        {/* Desktop Sidebar */}
        <AdminNav />
        
        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
