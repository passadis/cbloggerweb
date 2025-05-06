
import { Outlet, Link } from "react-router-dom";
import AdminNav from "@/components/AdminNav";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useState } from "react";
import { Menu } from "lucide-react";

const AdminLayout = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAuthenticated, logout } = useAdminAuth();

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile navigation toggle */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">CloudBlogger Admin</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="text-white hover:bg-slate-800"
        >
          <Menu />
        </Button>
      </div>

      {/* Mobile navigation menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-slate-900 text-white p-4">
          <nav className="space-y-2">
            <Link 
              to="/admin" 
              className="block py-2 px-3 rounded-md hover:bg-slate-800 transition-colors"
              onClick={() => setShowMobileMenu(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/posts" 
              className="block py-2 px-3 rounded-md hover:bg-slate-800 transition-colors"
              onClick={() => setShowMobileMenu(false)}
            >
              Posts
            </Link>
            <Link 
              to="/admin/new-post" 
              className="block py-2 px-3 rounded-md hover:bg-slate-800 transition-colors"
              onClick={() => setShowMobileMenu(false)}
            >
              New Post
            </Link>
            <Link 
              to="/admin/settings" 
              className="block py-2 px-3 rounded-md hover:bg-slate-800 transition-colors"
              onClick={() => setShowMobileMenu(false)}
            >
              Settings
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-slate-800 py-2 px-3"
              onClick={logout}
            >
              Logout
            </Button>
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <AdminNav />

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <Link to="/" className="text-sm text-blue-500 hover:underline">
            ← Back to Website
          </Link>
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </header>
        <main className="p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
