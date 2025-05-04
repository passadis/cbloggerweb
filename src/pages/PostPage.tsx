
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import AuthorCard from "@/components/AuthorCard";
import PostCard from "@/components/PostCard";

const PostPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  
  // Mock post data for demo
  const [post, setPost] = useState({
    id: "1",
    title: "The Ultimate Guide to Build Your Custom AI Server",
    content: `
      <h2>Intro</h2>
      <p>Are you ready to unleash the true potential of AI? In this comprehensive guide, we dive into a concept inspired by the principles of the Model Context Protocol (MCP). To begin with, this comprehensive guide dives into a concept inspired by the principles of the Model Context Protocol (MCP). Nevertheless, we showcase a custom AI server built using JavaScript, deployed on AKS, and seamlessly integrated with Azure OpenAI.</p>
      
      <p>However, it's important to note that our solution does not leverage official MCP SDKs or APIs. Still, it delivers similar operability. For instance, it enables efficient session management, user roles such as Admin and User, and dynamic chat interactions through an intuitive and user-friendly interface. Consequently, by following this approach, you can discover the endless possibilities of MCP-like functionality, tailored perfectly to your unique needs and use cases. Ultimately, this empowers you to maximize the value derived from AI interactions.</p>
      
      <h2>What We Built</h2>
      <p>In this guide, we present a concept inspired by the principles of the Model Context Protocol (MCP). Specifically it provides functionality such as session management, user role-based access, and seamless integration with Azure OpenAI GPT-4 for conversational AI. Here's what we've built:</p>
      
      <ul>
        <li><strong>MCP Server Concept:</strong> A backend server written in JavaScript, managing active sessions and routing interactions between the client and the Azure OpenAI GPT-4 model. While not utilizing official MCP SDKs or APIs, it achieves similar functionality tailored for our use case.</li>
        <li><strong>Client Application with Dashboard:</strong> A dynamic frontend that allows users to:
          <ul>
            <li>Configure settings.</li>
            <li>View and manage active sessions.</li>
            <li>Engage in conversations with the AI model.</li>
            <li>Track usage metrics and performance statistics.</li>
          </ul>
        </li>
        <li><strong>Azure Integration:</strong> Deployment on Azure Kubernetes Service (AKS) for scalability and reliability, with direct integration to Azure OpenAI services.</li>
      </ul>
    `,
    slug: "ultimate-guide-custom-ai-server",
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop",
    category: "Azure",
    date: "2023-03-26",
    author: {
      name: "Konstantinos",
      bio: "Microsoft MVP with more than 20 years of working experience in IT. Tech enthusiast passionate about Azure, Microsoft 365, and DevOps solutions.",
      avatar: "",
    },
    tags: ["AI", "Azure", "Azure AI", "Azure AI Foundry", "Azure OpenAI"],
  });

  // Mock related posts
  const [relatedPosts] = useState([
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
  ]);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [slug]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'azure':
        return 'bg-azure/10 text-azure hover:bg-azure/20';
      case 'microsoft 365':
        return 'bg-m365/10 text-m365 hover:bg-m365/20';
      case 'devops':
        return 'bg-devops/10 text-devops hover:bg-devops/20';
      default:
        return 'bg-primary/10 text-primary hover:bg-primary/20';
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
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
        <article className="py-8">
          <div className="container max-w-4xl">
            {/* Post Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className={getCategoryColor(post.category)}>
                  {post.category}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
            </header>

            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Post Content */}
            <div 
              className="prose prose-blue max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-sm font-medium mb-3">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link 
                    key={tag} 
                    to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-secondary hover:bg-secondary/80 px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Card */}
            <div className="mb-12">
              <AuthorCard
                name={post.author.name}
                bio={post.author.bio}
                avatar={post.author.avatar}
              />
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        <section className="py-10 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PostPage;
