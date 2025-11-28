import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold font-bangla mb-4">পোস্ট পাওয়া যায়নি</h2>
          <p className="text-muted-foreground font-bangla mb-4">
            দুঃখিত, এই পোস্টটি খুঁজে পাওয়া যায়নি।
          </p>
          <Button onClick={() => navigate(-1)} className="font-bangla">
            <ArrowLeft className="w-4 h-4 mr-2" />
            ফিরে যান
          </Button>
        </Card>
      </div>
    );
  }

  const basePath = post.category === 'storage' ? '/storage-advice' : '/crop-protection';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero py-8 shadow-soft">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate(basePath)}
            className="mb-4 text-white hover:bg-white/20 font-bangla"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ফিরে যান
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="animate-fade-in">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge variant="secondary" className="font-bangla">
              <Tag className="w-3 h-3 mr-1" />
              {post.tag}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-bangla">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold font-bangla text-foreground mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground font-bangla leading-relaxed mb-8 pb-8 border-b">
            {post.description}
          </p>

          {/* Content */}
          <Card className="p-8 shadow-card">
            <div className="prose prose-lg max-w-none">
              <div
                className="font-bangla leading-relaxed space-y-4 text-foreground"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .split('\n')
                    .map(line => {
                      if (line.startsWith('# ')) {
                        return `<h2 class="text-2xl font-bold mt-8 mb-4">${line.slice(2)}</h2>`;
                      }
                      if (line.startsWith('## ')) {
                        return `<h3 class="text-xl font-bold mt-6 mb-3">${line.slice(3)}</h3>`;
                      }
                      if (line.startsWith('### ')) {
                        return `<h4 class="text-lg font-semibold mt-4 mb-2">${line.slice(4)}</h4>`;
                      }
                      if (line.startsWith('- ')) {
                        return `<li class="ml-6">${line.slice(2)}</li>`;
                      }
                      if (line.match(/^\d+\./)) {
                        return `<li class="ml-6">${line.replace(/^\d+\.\s*/, '')}</li>`;
                      }
                      if (line.trim() === '') {
                        return '<br />';
                      }
                      return `<p class="leading-relaxed">${line}</p>`;
                    })
                    .join('')
                }}
              />
            </div>
          </Card>

          {/* Related Posts CTA */}
          <div className="mt-8 p-6 bg-muted rounded-xl text-center">
            <h3 className="text-xl font-bold font-bangla text-foreground mb-2">
              আরও পড়ুন
            </h3>
            <p className="text-muted-foreground font-bangla mb-4">
              {post.category === 'storage' 
                ? 'সংরক্ষণ সম্পর্কিত আরও পরামর্শ দেখুন'
                : 'ফসল রক্ষা সম্পর্কিত আরও তথ্য জানুন'
              }
            </p>
            <Button onClick={() => navigate(basePath)} className="font-bangla">
              সব পোস্ট দেখুন
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
