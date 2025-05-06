
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Tag, Calendar } from "lucide-react";
import { postService } from "@/services/post";
import { formatDistance } from "date-fns";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    categories: [],
    recentPosts: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch all posts
        const posts = await postService.getAllPosts();
        
        // Calculate stats
        const totalPosts = posts.length;
        const uniqueCategories = [...new Set(posts.map(post => post.category))];
        
        // Get recent posts (sorted by date)
        const sortedPosts = [...posts].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const recentPosts = sortedPosts.slice(0, 3);
        
        setStats({
          totalPosts,
          categories: uniqueCategories,
          recentPosts
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Calculate last post date for display
  const lastPostDate = stats.recentPosts[0]?.date 
    ? new Date(stats.recentPosts[0].date) 
    : null;
  
  const lastPostRelative = lastPostDate 
    ? formatDistance(lastPostDate, new Date(), { addSuffix: true }) 
    : 'No posts yet';

  const lastPostFormatted = lastPostDate 
    ? lastPostDate.toLocaleDateString('en-US') 
    : 'N/A';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPosts}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalPosts > 0 ? 'Posts in database' : 'No posts yet'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Post Views</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">Analytics not enabled</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.categories.length}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.categories.length > 0 
                    ? stats.categories.slice(0, 3).join(', ') + (stats.categories.length > 3 ? '...' : '')
                    : 'No categories yet'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Last Post</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lastPostRelative}</div>
                <p className="text-xs text-muted-foreground">{lastPostFormatted}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentPosts.length > 0 ? (
                    stats.recentPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-muted-foreground">{post.category}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(post.date).toLocaleDateString('en-US')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No posts yet. Create your first post to see it here.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
