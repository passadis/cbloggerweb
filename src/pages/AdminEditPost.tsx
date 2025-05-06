
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostEditor from "@/components/PostEditor";
import { postService, Post } from "@/services/postService";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminEditPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check authentication
  useAdminAuth();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const fetchedPost = await postService.getPostById(id);
        
        if (!fetchedPost) {
          toast.error("Post not found");
          navigate("/admin/posts");
          return;
        }
        
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (formData: Omit<Post, "id">) => {
    if (!id) return;
    
    try {
      await postService.updatePost(id, formData);
      toast.success("Post updated successfully");
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
        <div className="bg-white rounded-md border shadow-sm p-6 flex justify-center">
          Loading post...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
        <div className="bg-white rounded-md border shadow-sm p-6">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <div className="bg-white rounded-md border shadow-sm p-6">
        <PostEditor post={post} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AdminEditPost;
