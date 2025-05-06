
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/0eef50fc-dbda-45e2-bd58-3d08c5481654.png" 
              alt="CloudBlogger Logo" 
              className="h-8" 
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/category/azure" className="text-sm font-medium hover:text-azure transition-colors">
              Azure
            </Link>
            <Link to="/category/microsoft-365" className="text-sm font-medium hover:text-m365 transition-colors">
              Microsoft 365
            </Link>
            <Link to="/category/devops" className="text-sm font-medium hover:text-devops transition-colors">
              DevOps
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {searchOpen ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[200px] h-9 rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setSearchOpen(false)}
              >
                ×
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="h-9 w-9 rounded-md flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          )}
          <Link 
            to="/admin" 
            className="h-9 px-3 rounded-md flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="Admin"
          >
            <User className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Admin</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
