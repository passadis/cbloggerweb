
import { Link } from "react-router-dom";
import { Home, FileText, FolderPlus, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminNav = () => {
  const { logout } = useAdminAuth();

  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen p-4 hidden md:block">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">CloudBlogger Admin</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-slate-800 transition-colors">
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/posts" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-slate-800 transition-colors">
            <FileText size={18} />
            <span>Posts</span>
          </Link>
          <Link to="/admin/new-post" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-slate-800 transition-colors">
            <FolderPlus size={18} />
            <span>New Post</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-slate-800 transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:bg-slate-800"
          onClick={logout}
        >
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminNav;
