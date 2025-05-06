
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PostNotFound = () => {
  return (
    <>
      <Navbar />
      <main className="container py-16">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-3xl font-bold">Post Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, the post you're looking for doesn't seem to exist.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:underline"
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PostNotFound;
