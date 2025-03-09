interface FeaturedPostProps {
  title: string;
  excerpt: string;
  author: string;
  coverImage: string;
}

export const FeaturedPost = ({ title, excerpt, author, coverImage }: FeaturedPostProps) => {
  return (
    <div className="relative h-[500px] rounded-xl overflow-hidden glass-card">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-200 mb-4">{excerpt}</p>
        <p className="text-gray-300">By {author}</p>
      </div>
    </div>
  );
};