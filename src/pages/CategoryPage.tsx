
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";

const CategoryPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  
  // Mock posts for demo purposes
  const [posts, setPosts] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate API call to fetch category data
    const fetchCategoryData = () => {
      setTimeout(() => {
        // Set category information based on the slug
        switch (slug) {
          case "azure":
            setCategoryName("Microsoft Azure");
            setCategoryDescription("Labs, Guides and Designs for Azure cloud solutions and services.");
            setPosts([
              {
                id: "1",
                title: "The Ultimate Guide to Build Your Custom AI Server",
                excerpt: "An Ultimate Guide for AI Development and Hosting: Building your own Custom AI Server with Dashboard and embedded Client UI.",
                slug: "ultimate-guide-custom-ai-server",
                featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
                category: "Azure",
                date: "2023-03-26",
                tags: ["AI", "Azure", "Azure AI", "Azure AI Foundry", "Azure OpenAI"],
              },
              {
                id: "2",
                title: "The Brand New Azure AI Agent Service at Your Fingertips",
                excerpt: "Azure AI Agent Service is the newest addition in Azure AI Foundry, making the process of creating Agents easier and fun! Let's see that in action.",
                slug: "azure-ai-agent-service",
                featuredImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
                category: "Azure",
                date: "2023-02-15",
                tags: ["Azure", "Azure AI", "Azure AI Agent Service", "Azure OpenAI"],
              },
              {
                id: "3",
                title: "Getting Started with Azure OpenAI",
                excerpt: "A beginner's guide to setting up and using Azure OpenAI services for your applications.",
                slug: "getting-started-azure-openai",
                featuredImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
                category: "Azure",
                date: "2023-01-20",
                tags: ["Azure", "OpenAI", "AI", "Getting Started"],
              },
              {
                id: "4",
                title: "Azure Virtual Machines Best Practices",
                excerpt: "Learn how to optimize your Azure virtual machines for performance, cost, and security.",
                slug: "azure-vm-best-practices",
                featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
                category: "Azure",
                date: "2023-04-15",
                tags: ["Azure", "Virtual Machines", "Best Practices", "Cloud"],
              },
            ]);
            break;
            
          case "microsoft-365":
            setCategoryName("Microsoft 365");
            setCategoryDescription("Hints and Tips for the Best 365 Experience!");
            setPosts([
              {
                id: "5",
                title: "Microsoft 365 Copilot: The Ultimate Productivity Assistant",
                excerpt: "Learn how Microsoft 365 Copilot is transforming productivity with AI-powered assistance across all Microsoft 365 apps.",
                slug: "microsoft-365-copilot",
                featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop",
                category: "Microsoft 365",
                date: "2023-04-10",
                tags: ["Microsoft 365", "Copilot", "AI", "Productivity"],
              },
              {
                id: "6",
                title: "Teams Best Practices for Remote Work",
                excerpt: "Optimize your Microsoft Teams setup for better remote work collaboration and productivity.",
                slug: "teams-remote-work-practices",
                featuredImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
                category: "Microsoft 365",
                date: "2023-05-05",
                tags: ["Microsoft 365", "Teams", "Remote Work", "Collaboration"],
              },
              {
                id: "7",
                title: "SharePoint Online Administration Tips",
                excerpt: "Essential tips for managing and optimizing your SharePoint Online environment.",
                slug: "sharepoint-online-administration",
                featuredImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
                category: "Microsoft 365",
                date: "2023-03-12",
                tags: ["Microsoft 365", "SharePoint", "Administration"],
              },
            ]);
            break;
            
          case "devops":
            setCategoryName("DevOps");
            setCategoryDescription("Collection of Ideas and Developments for DevOps practices and tools.");
            setPosts([
              {
                id: "8",
                title: "DevOps Automation: Streamline Your CI/CD Pipeline",
                excerpt: "Discover best practices for automating your DevOps workflows and optimizing your continuous integration and deployment processes.",
                slug: "devops-automation-cicd",
                featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
                category: "DevOps",
                date: "2023-05-20",
                tags: ["DevOps", "CI/CD", "Automation", "Pipeline"],
              },
              {
                id: "9",
                title: "Kubernetes for Beginners: Getting Started Guide",
                excerpt: "A comprehensive guide to getting started with Kubernetes container orchestration.",
                slug: "kubernetes-beginners-guide",
                featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
                category: "DevOps",
                date: "2023-02-28",
                tags: ["DevOps", "Kubernetes", "Containers", "Orchestration"],
              },
              {
                id: "10",
                title: "Infrastructure as Code with Terraform",
                excerpt: "Learn how to manage your infrastructure efficiently using Terraform and infrastructure as code principles.",
                slug: "terraform-infrastructure-code",
                featuredImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
                category: "DevOps",
                date: "2023-04-02",
                tags: ["DevOps", "Terraform", "Infrastructure as Code", "Cloud"],
              },
            ]);
            break;
            
          default:
            setCategoryName("Category Not Found");
            setCategoryDescription("The requested category does not exist.");
            setPosts([]);
        }
        
        setLoading(false);
      }, 500);
    };
    
    fetchCategoryData();
  }, [slug]);
  
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg overflow-hidden border">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Category Header */}
        <section className="py-10 bg-gradient-to-b from-white to-blue-50/50">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryName}</h1>
            <p className="text-muted-foreground text-lg">{categoryDescription}</p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-10">
          <div className="container">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No posts found</h3>
                <p className="text-muted-foreground">
                  There are no posts in this category yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
