
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockPosts = [
  {
    id: "1",
    title: "The Ultimate Guide to Build Your Custom AI Server",
    status: "published",
    category: "Azure",
    date: "2023-03-26",
  },
  {
    id: "2",
    title: "The Brand New Azure AI Agent Service at Your Fingertips",
    status: "published",
    category: "Azure",
    date: "2023-02-15",
  },
  {
    id: "3",
    title: "Microsoft 365 Copilot: The Ultimate Productivity Assistant",
    status: "published",
    category: "Microsoft 365",
    date: "2023-04-10",
  },
  {
    id: "4",
    title: "DevOps Automation: Streamline Your CI/CD Pipeline",
    status: "draft",
    category: "DevOps",
    date: "2023-05-20",
  },
];

const AdminPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = mockPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link to="/admin/new-post">
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-medium">Title</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="p-4">{post.title}</td>
                  <td className="p-4">
                    <Badge variant="outline" className="font-normal">
                      {post.category}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={post.status === "published" ? "default" : "secondary"}
                      className="font-normal"
                    >
                      {post.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString('en-US')}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
