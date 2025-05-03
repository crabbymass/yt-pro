
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">This page isn't available. Sorry about that.</p>
        <p className="text-gray-500 mb-6">Try searching for something else.</p>
        <Link to="/">
          <Button className="bg-youtube-red hover:bg-red-700 text-white flex items-center gap-2">
            <Home className="h-4 w-4" />
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
