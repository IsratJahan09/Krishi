import { AlertTriangle, TrendingDown, Truck } from "lucide-react";

const ProblemSection = () => {
  return (
    <section id="problem" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-bangla">
              সমস্যা
            </h2>
            <p className="text-xl text-muted-foreground font-bangla leading-relaxed">
              বাংলাদেশে প্রতি বছর কী পরিমাণ খাদ্য নষ্ট হয়?
            </p>
          </div>

          {/* Main Statistic */}
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-soft mb-12 border-l-4 border-destructive animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-12 h-12 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-4xl md:text-6xl font-bold text-destructive mb-4 font-bangla">
                  ৪.৫ মিলিয়ন টন
                </h3>
                <p className="text-lg md:text-xl text-card-foreground font-bangla leading-relaxed">
                  বাংলাদেশে বছরে <strong>৪.৫ মিলিয়ন মেট্রিক টন খাদ্য নষ্ট হয়</strong>—সংরক্ষণ, পরিবহন এবং ব্যবস্থাপনার দুর্বলতার কারণে।
                </p>
              </div>
            </div>
          </div>

          {/* Problem Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-destructive" />
              </div>
              <h4 className="font-semibold text-lg text-card-foreground mb-2 font-bangla">দুর্বল সংরক্ষণ</h4>
              <p className="text-sm text-muted-foreground font-bangla leading-relaxed">
                সঠিক সংরক্ষণ ব্যবস্থার অভাবে ফসল পচে যায় এবং পোকামাকড়ের আক্রমণ হয়
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <h4 className="font-semibold text-lg text-card-foreground mb-2 font-bangla">ভুল পরিচালনা</h4>
              <p className="text-sm text-muted-foreground font-bangla leading-relaxed">
                ফসল কাটা, শুকানো এবং মজুত করার সময় ভুল পদ্ধতি অনুসরণ করা হয়
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-destructive" />
              </div>
              <h4 className="font-semibold text-lg text-card-foreground mb-2 font-bangla">পরিবহন সমস্যা</h4>
              <p className="text-sm text-muted-foreground font-bangla leading-relaxed">
                পরিবহনের সময় অসাবধানতা এবং দীর্ঘ সময় ধরে রাখার ফলে ক্ষতি
              </p>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="mt-12 p-6 bg-muted rounded-xl animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-center text-lg text-muted-foreground font-bangla leading-relaxed">
              এই ক্ষতি <strong>কৃষকদের আয় কমায়</strong>, <strong>খাদ্য নিরাপত্তা হুমকির মুখে ফেলে</strong> এবং <strong>দেশের অর্থনীতিতে নেতিবাচক প্রভাব ফেলে</strong>।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Icon component for Package
const Package = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

export default ProblemSection;
