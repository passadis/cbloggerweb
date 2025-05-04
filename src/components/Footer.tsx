
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-white">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/0eef50fc-dbda-45e2-bd58-3d08c5481654.png" 
                alt="CloudBlogger Logo" 
                className="h-8" 
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Your daily companion for Azure Solutions, Workshops and Microsoft 365 and DevOps tips and tricks!
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/category/azure" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Azure
                  </Link>
                </li>
                <li>
                  <Link to="/category/microsoft-365" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Microsoft 365
                  </Link>
                </li>
                <li>
                  <Link to="/category/devops" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    DevOps
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} CloudBlogger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
