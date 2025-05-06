
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold text-gradient">
          CloudBlogger
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">
            Home
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">
            About
          </Link>
          <Link to="/category/azure" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">
            Azure
          </Link>
          <Link to="/category/microsoft-365" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">
            Microsoft 365
          </Link>
          <Link to="/category/devops" className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4">
            DevOps
          </Link>
          <Button variant="outline" asChild>
            <Link to="/admin/login">Admin</Link>
          </Button>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <nav className="container flex flex-col py-4 space-y-3">
            <Link 
              to="/" 
              className="px-2 py-1 hover:bg-muted rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="px-2 py-1 hover:bg-muted rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/category/azure" 
              className="px-2 py-1 hover:bg-muted rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Azure
            </Link>
            <Link 
              to="/category/microsoft-365" 
              className="px-2 py-1 hover:bg-muted rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Microsoft 365
            </Link>
            <Link 
              to="/category/devops" 
              className="px-2 py-1 hover:bg-muted rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              DevOps
            </Link>
            <Link 
              to="/admin/login" 
              className="px-2 py-1 bg-primary/10 text-primary rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
