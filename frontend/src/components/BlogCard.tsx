import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
  basePath: string;
}

const BlogCard = ({ post, basePath }: BlogCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-soft transition-smooth animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="font-bangla text-xs">
            {post.tag}
          </Badge>
          <span className="text-xs text-muted-foreground font-bangla">
            {post.date}
          </span>
        </div>
        <CardTitle className="text-xl font-bangla leading-relaxed">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground font-bangla leading-relaxed mb-4">
          {post.description}
        </p>
        <Link to={`${basePath}/${post.slug}`}>
          <Button variant="outline" className="w-full font-bangla group">
            বিস্তারিত পড়ুন
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
