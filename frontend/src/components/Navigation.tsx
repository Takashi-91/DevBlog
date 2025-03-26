import { useState } from "react";
import { Menu, Search, X, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { CgProfile } from "react-icons/cg";
import { SearchBar } from "./SearchBar";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);



  return (
    <nav className="fixed top-0 w-full z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-semibold">
              DevBlog
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            
           
            <SearchBar/>
            <Button variant="ghost" >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
            <a href="/profile" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              <CgProfile className="h-5 w-5 mr-2" />
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/blogs" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Blogs
            </a>
            <a href="/write" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Write
            </a>
            <a href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Dashboard
            </a>
            <Button variant="ghost" className="w-full justify-start" >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};