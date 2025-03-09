import { Search } from "lucide-react";
import { Input } from "./ui/input";

export const SearchBar = () => {
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="search"
        placeholder="Search articles..."
        className="pl-10 w-full h-12 glass-card"
      />
    </div>
  );
};