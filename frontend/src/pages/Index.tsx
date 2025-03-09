import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedPost } from "@/components/FeaturedPost";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryFilter } from "@/components/CategoryFilter";

const MOCK_CATEGORIES = ["All", "Technology", "Design", "Development", "Career"];

const MOCK_ARTICLES = [
  {
    title: "Building Beautiful User Interfaces",
    excerpt: "Learn the principles of creating stunning and functional UIs that users will love.",
    author: "Sarah Chen",
    date: "Mar 15, 2024",
    readTime: "5 min",
    tags: ["Design", "UI/UX"],
  },
  {
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies that will shape the web development landscape.",
    author: "Michael Rodriguez",
    date: "Mar 14, 2024",
    readTime: "8 min",
    tags: ["Development", "Technology"],
  },
  {
    title: "Mastering TypeScript",
    excerpt: "A comprehensive guide to leveraging TypeScript in your projects.",
    author: "Emma Wilson",
    date: "Mar 13, 2024",
    readTime: "10 min",
    tags: ["Development", "TypeScript"],
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="py-12">
          <FeaturedPost
            title="The Art of Clean Code"
            excerpt="Discover the principles and practices that lead to maintainable, elegant code."
            author="David Mitchell"
            coverImage="/placeholder.svg"
          />
        </div>

        <div className="py-8">
          <SearchBar />
        </div>

        <div className="py-8">
          <CategoryFilter
            categories={MOCK_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {MOCK_ARTICLES.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;