
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const AdminSettings = () => {
  const [siteTitle, setSiteTitle] = useState("CloudBlogger");
  const [siteDescription, setSiteDescription] = useState("Your daily companion for Azure Solutions, Microsoft 365 tips, and DevOps best practices");
  const [authorName, setAuthorName] = useState("John Doe");
  const [authorBio, setAuthorBio] = useState("Microsoft Azure MVP with over 10 years of experience in cloud technologies, specializing in Azure solutions, Microsoft 365 implementations, and DevOps practices. Passionate about sharing knowledge and helping others succeed in the Microsoft ecosystem.");
  const [authorAvatar, setAuthorAvatar] = useState("https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop");

  const handleSiteSettingsSave = (e) => {
    e.preventDefault();
    toast.success("Site settings saved successfully");
  };

  const handleAuthorSettingsSave = (e) => {
    e.preventDefault();
    toast.success("Author settings saved successfully");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="site">
        <TabsList className="mb-6">
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="author">Author</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>
                Manage your site details and metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSiteSettingsSave} className="space-y-4">
                <div>
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input 
                    id="siteTitle"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea 
                    id="siteDescription"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="author">
          <Card>
            <CardHeader>
              <CardTitle>Author Profile</CardTitle>
              <CardDescription>
                Update your personal information that appears on the site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuthorSettingsSave} className="space-y-4">
                <div>
                  <Label htmlFor="authorName">Name</Label>
                  <Input 
                    id="authorName"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="authorBio">Bio</Label>
                  <Textarea 
                    id="authorBio"
                    value={authorBio}
                    onChange={(e) => setAuthorBio(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="authorAvatar">Avatar URL</Label>
                  <Input 
                    id="authorAvatar"
                    value={authorAvatar}
                    onChange={(e) => setAuthorAvatar(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Profile</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Manage API keys and integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-muted-foreground mb-4">
                  To enable all features, connect your Lovable project to Supabase for database and authentication. 
                  Click the green Supabase button at the top right of the interface to get started.
                </p>
              </div>
              
              {/* Placeholder for API settings that would be implemented after Supabase connection */}
              <div className="bg-slate-50 border rounded-md p-6 text-center text-muted-foreground">
                <p>Connect to Supabase first to manage API keys</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
