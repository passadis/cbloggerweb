
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import CategorySection from "@/components/CategorySection";
import { Link } from "react-router-dom";

const Index = () => {
  // Mock data for demo purposes
  const [featuredPost] = useState({
    id: "1",
    title: "The Ultimate Guide to Build Your Custom AI Server",
    excerpt: "An Ultimate Guide for AI Development and Hosting: Building your own Custom AI Server with Dashboard and embedded Client UI.",
    slug: "ultimate-guide-custom-ai-server",
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    category: "Azure",
    date: "2023-03-26",
    tags: ["AI", "Azure", "Azure AI", "Azure AI Foundry", "Azure OpenAI"],
  });

  const [latestPosts] = useState([
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
      title: "Microsoft 365 Copilot: The Ultimate Productivity Assistant",
      excerpt: "Learn how Microsoft 365 Copilot is transforming productivity with AI-powered assistance across all Microsoft 365 apps.",
      slug: "microsoft-365-copilot",
      featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop",
      category: "Microsoft 365",
      date: "2023-04-10",
      tags: ["Microsoft 365", "Copilot", "AI", "Productivity"],
    },
    {
      id: "4",
      title: "DevOps Automation: Streamline Your CI/CD Pipeline",
      excerpt: "Discover best practices for automating your DevOps workflows and optimizing your continuous integration and deployment processes.",
      slug: "devops-automation-cicd",
      featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
      category: "DevOps",
      date: "2023-05-20",
      tags: ["DevOps", "CI/CD", "Automation", "Pipeline"],
    },
  ]);

  const categories = [
    {
      title: "Microsoft Azure",
      description: "Labs, Guides and Designs for Azure cloud solutions. Learn about the latest Azure services and how to implement them effectively.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
      slug: "azure",
      color: "azure",
    },
    {
      title: "Microsoft 365",
      description: "Hints and Tips for the Best 365 Experience! Maximize your productivity with Microsoft's comprehensive suite of cloud-based tools.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
      slug: "microsoft-365",
      color: "m365",
    },
    {
      title: "DevOps",
      description: "Collection of Ideas and Developments! Best practices, tools, and methodologies for implementing DevOps in your organization.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
      slug: "devops",
      color: "devops",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-blue-50/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Welcome to <span className="text-gradient">CloudBlogger</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Your daily companion for Azure Solutions, Microsoft 365 tips, and DevOps best practices
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post Section */}
        <section className="py-10">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-6">Featured Post</h2>
            <PostCard post={featuredPost} featured={true} />
          </div>
        </section>

        {/* Category Blocks */}
        <section className="py-10 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-6">Main Categories</h2>
            <div className="grid gap-8">
              {categories.map((category) => (
                <CategorySection
                  key={category.slug}
                  title={category.title}
                  description={category.description}
                  image={category.image}
                  slug={category.slug}
                  color={category.color}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section className="py-10">
          <div className="container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Latest Posts</h2>
              <Link to="/blog" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-primary">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-2xl font-semibold text-white">Subscribe to Our Newsletter</h2>
              <p className="text-primary-foreground/90">
                Get the latest Azure, Microsoft 365, and DevOps updates delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-6 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md flex-1"
                />
                <button className="bg-white text-primary font-medium px-4 py-2 rounded-md hover:bg-white/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
