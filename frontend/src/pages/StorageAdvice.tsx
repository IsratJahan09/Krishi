import { Package } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BlogCard from "@/components/BlogCard";
import { storagePosts } from "@/data/blogPosts";

const StorageAdvice = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="সংরক্ষণ পরামর্শ"
        subtitle="স্থানীয় পরামর্শ"
        icon={<Package className="w-8 h-8 text-white" />}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Introduction */}
        <div className="mb-8 animate-fade-in">
          <p className="text-lg text-muted-foreground font-bangla leading-relaxed">
            ফসল সংরক্ষণের সঠিক পদ্ধতি জানুন এবং ক্ষতি রোধ করুন। এখানে রয়েছে বিশেষজ্ঞদের পরামর্শ এবং স্থানীয় কৃষকদের অভিজ্ঞতা।
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storagePosts.map((post, index) => (
            <div
              key={post.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard post={post} basePath="/storage-advice" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 p-8 bg-primary/5 rounded-xl border border-primary/20 text-center animate-fade-in">
          <h3 className="text-2xl font-bold font-bangla text-foreground mb-3">
            আরও জানতে চান?
          </h3>
          <p className="text-muted-foreground font-bangla mb-4">
            আপনার নিজস্ব অভিজ্ঞতা শেয়ার করুন এবং অন্য কৃষকদের সাহায্য করুন
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorageAdvice;
