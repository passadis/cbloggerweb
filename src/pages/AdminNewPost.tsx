
import { useNavigate } from "react-router-dom";
import PostEditor from "@/components/PostEditor";
import { postService } from "@/services/postService";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminNewPost = () => {
  const navigate = useNavigate();
  
  // Check authentication
  useAdminAuth();

  const handleSubmit = async (formData: any) => {
    try {
      await postService.createPost(formData);
      toast.success("Post created successfully");
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <div className="bg-white rounded-md border shadow-sm p-6">
        <PostEditor onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AdminNewPost;
