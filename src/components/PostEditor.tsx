
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TagInput from "@/components/post/TagInput";
import ImagePreview from "@/components/post/ImagePreview";
import PostStatusToggle from "@/components/post/PostStatusToggle";
import FormActionButtons from "@/components/post/FormActionButtons";
import DatePicker from "@/components/post/DatePicker";
import CategorySelect from "@/components/post/CategorySelect";

// Define an interface for the post properties
interface PostData {
  id?: string;
  title?: string;
  content?: string;
  excerpt?: string;
  slug?: string;
  category?: string;
  date?: Date;
  tags?: string[];
  featuredImage?: string;
  status?: "published" | "draft";
}

// Use the interface in the component props
const PostEditor = ({ post = {} as PostData }) => {
  const [title, setTitle] = useState(post.title || "");
  const [content, setContent] = useState(post.content || "");
  const [excerpt, setExcerpt] = useState(post.excerpt || "");
  const [slug, setSlug] = useState(post.slug || "");
  const [category, setCategory] = useState(post.category || "");
  const [date, setDate] = useState(post.date ? new Date(post.date) : new Date());
  const [tags, setTags] = useState(post.tags || []);
  const [featuredImage, setFeaturedImage] = useState(post.featuredImage || "");
  const [isPublished, setIsPublished] = useState(post.status === "published");

  const handleAddTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const generateSlug = () => {
    setSlug(title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would handle form submission to a backend
    console.log({
      title,
      content,
      excerpt,
      slug,
      category,
      date,
      tags,
      featuredImage,
      status: isPublished ? "published" : "draft"
    });
    // Save to database/backend would happen here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Post title"
          className="mt-1" 
          required 
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-2/3">
          <Label htmlFor="slug">Slug</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input 
              id="slug" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)} 
              placeholder="post-url-slug"
              className="flex-1"
            />
            <Button type="button" onClick={generateSlug} variant="secondary">Generate</Button>
          </div>
        </div>
        
        <div className="w-full sm:w-1/3">
          <Label>Date</Label>
          <DatePicker date={date} onDateChange={setDate} />
        </div>
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea 
          id="content" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content (HTML allowed)"
          className="mt-1 min-h-[300px]" 
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea 
          id="excerpt" 
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short description of the post"
          className="mt-1" 
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <Label htmlFor="category">Category</Label>
          <CategorySelect value={category} onChange={setCategory} />
        </div>
        
        <div className="w-full sm:w-1/2">
          <Label htmlFor="featuredImage">Featured Image URL</Label>
          <Input 
            id="featuredImage" 
            value={featuredImage} 
            onChange={(e) => setFeaturedImage(e.target.value)} 
            placeholder="https://example.com/image.jpg"
            className="mt-1" 
          />
        </div>
      </div>

      <div>
        <Label>Tags</Label>
        <TagInput 
          tags={tags} 
          onAddTag={handleAddTag} 
          onRemoveTag={handleRemoveTag} 
        />
      </div>

      <ImagePreview imageUrl={featuredImage} />

      <PostStatusToggle 
        isPublished={isPublished} 
        onChange={setIsPublished} 
      />

      <FormActionButtons isPublished={isPublished} />
    </form>
  );
};

export default PostEditor;
