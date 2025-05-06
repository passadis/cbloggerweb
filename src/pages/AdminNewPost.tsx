
import PostEditor from "@/components/PostEditor";

const AdminNewPost = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <div className="bg-white rounded-md border shadow-sm p-6">
        <PostEditor />
      </div>
    </div>
  );
};

export default AdminNewPost;
