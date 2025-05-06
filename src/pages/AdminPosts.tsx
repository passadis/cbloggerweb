
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { postService, Post } from "@/services/postService";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Check authentication
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      if (isAuthenticated) {
        try {
          setIsLoading(true);
          const fetchedPosts = await postService.getAllPosts();
          setPosts(fetchedPosts);
        } catch (error) {
          console.error("Error fetching posts:", error);
          toast.error("Failed to load posts");
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (isAuthenticated !== null) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const handleDeletePost = async () => {
    if (!postToDelete) return;
    
    try {
      await postService.deletePost(postToDelete);
      setPosts(posts.filter(post => post.id !== postToDelete));
      setPostToDelete(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isAuthenticated === null) {
    return <div className="p-6">Loading...</div>;
  }

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

      {isLoading ? (
        <div className="text-center py-8">Loading posts...</div>
      ) : (
        <div className="bg-white rounded-md border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No posts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {post.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={post.status === "published" ? "default" : "secondary"}
                        className="font-normal"
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => navigate(`/post/${post.slug}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => navigate(`/admin/edit-post/${post.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog open={postToDelete === post.id} onOpenChange={(open) => !open && setPostToDelete(null)}>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => setPostToDelete(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the post "{post.title}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeletePost} className="bg-red-600 hover:bg-red-700">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
