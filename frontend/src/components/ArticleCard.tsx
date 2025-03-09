import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const ArticleCard = ({ title, excerpt, author, date, readTime, tags }: ArticleCardProps) => {
  return (
    <Card className="glass-card hover:shadow-lg transition-shadow duration-300 fade-in">
      <CardHeader>
        <div className="flex items-center space-x-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>{author}</span>
        <div className="flex items-center space-x-2">
          <span>{date}</span>
          <span>·</span>
          <span>{readTime} read</span>
        </div>
      </CardFooter>
    </Card>
  );
};