import { Shield } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BlogCard from "@/components/BlogCard";
import { protectionPosts } from "@/data/blogPosts";

const CropProtection = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="ফসল রক্ষা"
        subtitle="ক্ষতি প্রতিরোধ"
        icon={<Shield className="w-8 h-8 text-white" />}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Introduction */}
        <div className="mb-8 animate-fade-in">
          <p className="text-lg text-muted-foreground font-bangla leading-relaxed">
            ফসলের রোগ ও কীটপতঙ্গ থেকে রক্ষা পাওয়ার কার্যকর উপায়। জানুন বৈজ্ঞানিক পদ্ধতি এবং প্রাকৃতিক সমাধান।
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protectionPosts.map((post, index) => (
            <div
              key={post.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard post={post} basePath="/crop-protection" />
            </div>
          ))}
        </div>

        {/* Emergency Tips */}
        <div className="mt-12 p-8 bg-destructive/5 rounded-xl border border-destructive/20 animate-fade-in">
          <h3 className="text-2xl font-bold font-bangla text-foreground mb-4">
            জরুরি পরিস্থিতিতে করণীয়
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-semibold font-bangla text-foreground mb-1">
                  হঠাৎ বৃষ্টি
                </h4>
                <p className="text-sm text-muted-foreground font-bangla">
                  দ্রুত ফসল ঢেকে ফেলুন এবং পানি জমতে দেবেন না
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌡️</span>
              <div>
                <h4 className="font-semibold font-bangla text-foreground mb-1">
                  অতিরিক্ত গরম
                </h4>
                <p className="text-sm text-muted-foreground font-bangla">
                  ছায়ায় শুকান এবং ঘন ঘন পানি দিন
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🦠</span>
              <div>
                <h4 className="font-semibold font-bangla text-foreground mb-1">
                  রোগ দেখা দিলে
                </h4>
                <p className="text-sm text-muted-foreground font-bangla">
                  আক্রান্ত অংশ আলাদা করুন এবং বিশেষজ্ঞের পরামর্শ নিন
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🐛</span>
              <div>
                <h4 className="font-semibold font-bangla text-foreground mb-1">
                  পোকার আক্রমণ
                </h4>
                <p className="text-sm text-muted-foreground font-bangla">
                  প্রাকৃতিক কীটনাশক ব্যবহার করুন
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 p-6 bg-card rounded-xl shadow-card text-center animate-fade-in">
          <h3 className="text-xl font-bold font-bangla text-foreground mb-2">
            সাহায্য প্রয়োজন?
          </h3>
          <p className="text-muted-foreground font-bangla">
            কৃষি বিশেষজ্ঞের সাথে যোগাযোগ করুন এবং সঠিক পরামর্শ পান
          </p>
        </div>
      </div>
    </div>
  );
};

export default CropProtection;
