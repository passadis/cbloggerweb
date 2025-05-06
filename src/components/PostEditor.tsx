
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar as CalendarIcon, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  const [newTag, setNewTag] = useState("");
  const [featuredImage, setFeaturedImage] = useState(post.featuredImage || "");
  const [isPublished, setIsPublished] = useState(post.status === "published");

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full mt-1"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Azure">Azure</SelectItem>
              <SelectItem value="Microsoft 365">Microsoft 365</SelectItem>
              <SelectItem value="DevOps">DevOps</SelectItem>
            </SelectContent>
          </Select>
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
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1 py-1 px-3">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input 
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button type="button" onClick={handleAddTag} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {featuredImage && (
        <Card>
          <CardContent className="p-4">
            <div className="font-medium mb-2">Featured Image Preview</div>
            <div className="aspect-video rounded-md overflow-hidden bg-muted">
              <img 
                src={featuredImage} 
                alt="Featured" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/600x400?text=Image+not+found";
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          id="status"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="status" className="ml-2">
          Publish immediately
        </Label>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit">
          {isPublished ? "Publish" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default PostEditor;
