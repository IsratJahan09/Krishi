import { ArrowRight, Database, Bell, CheckCircle, Shield } from "lucide-react";

const SolutionFlow = () => {
  return (
    <section className="py-20 gradient-earth">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-bangla">
              সমাধান
            </h2>
            <p className="text-xl text-muted-foreground font-bangla leading-relaxed max-w-2xl mx-auto">
              কৃষি একটি ডিজিটাল সমাধান যা আপনার ফসল রক্ষা করতে সাহায্য করে
            </p>
          </div>

          {/* Solution Flow */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary/20 -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Step 1: Data */}
              <div className="relative animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-soft transition-smooth">
                  <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                    <Database className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-card-foreground mb-2 font-bangla">
                    তথ্য সংগ্রহ
                  </h3>
                  <p className="text-sm text-center text-muted-foreground font-bangla leading-relaxed">
                    স্থানীয় আবহাওয়া ও ফসলের ডেটা সংগ্রহ করে
                  </p>
                </div>
                <div className="md:absolute md:top-1/2 md:-right-3 md:-translate-y-1/2 flex justify-center my-4 md:my-0">
                  <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
                </div>
              </div>

              {/* Step 2: Warning */}
              <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-soft transition-smooth">
                  <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-card-foreground mb-2 font-bangla">
                    সতর্কতা
                  </h3>
                  <p className="text-sm text-center text-muted-foreground font-bangla leading-relaxed">
                    আবহাওয়া পরিবর্তনের সময় সতর্ক বার্তা পাঠায়
                  </p>
                </div>
                <div className="md:absolute md:top-1/2 md:-right-3 md:-translate-y-1/2 flex justify-center my-4 md:my-0">
                  <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
                </div>
              </div>

              {/* Step 3: Action */}
              <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-soft transition-smooth">
                  <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-card-foreground mb-2 font-bangla">
                    পদক্ষেপ
                  </h3>
                  <p className="text-sm text-center text-muted-foreground font-bangla leading-relaxed">
                    সঠিক সময়ে সঠিক পরামর্শ পান
                  </p>
                </div>
                <div className="md:absolute md:top-1/2 md:-right-3 md:-translate-y-1/2 flex justify-center my-4 md:my-0">
                  <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
                </div>
              </div>

              {/* Step 4: Saved Food */}
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-soft transition-smooth">
                  <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-card-foreground mb-2 font-bangla">
                    ফসল রক্ষা
                  </h3>
                  <p className="text-sm text-center text-muted-foreground font-bangla leading-relaxed">
                    ফসলের ক্ষতি রোধ এবং আয় বৃদ্ধি
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-16 bg-card rounded-2xl p-8 shadow-soft animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-2xl font-bold text-center text-card-foreground mb-8 font-bangla">
              কৃষি দিয়ে পাবেন
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2 font-bangla">৯৫%</div>
                <p className="text-sm text-muted-foreground font-bangla">নির্ভুল পূর্বাভাস</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2 font-bangla">২৪/৭</div>
                <p className="text-sm text-muted-foreground font-bangla">সতর্কতা ব্যবস্থা</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2 font-bangla">৩০%</div>
                <p className="text-sm text-muted-foreground font-bangla">ক্ষতি হ্রাস</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionFlow;
