import { useEffect, useRef, useState } from "react";
import { ArrowRight, Database, Bell, CheckCircle, Shield } from "lucide-react";

const SolutionFlow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Solution steps data
  const steps = [
    {
      icon: Database,
      title: "তথ্য সংগ্রহ",
      description: "স্থানীয় আবহাওয়া ও ফসলের ডেটা সংগ্রহ করে",
      delay: "0.1s",
    },
    {
      icon: Bell,
      title: "সতর্কতা",
      description: "আবহাওয়া পরিবর্তনের সময় সতর্ক বার্তা পাঠায়",
      delay: "0.2s",
    },
    {
      icon: CheckCircle,
      title: "পদক্ষেপ",
      description: "সঠিক সময়ে সঠিক পরামর্শ পান",
      delay: "0.3s",
    },
    {
      icon: Shield,
      title: "ফসল রক্ষা",
      description: "ফসলের ক্ষতি রোধ এবং আয় বৃদ্ধি",
      delay: "0.4s",
    },
  ];

  // Benefits data
  const benefits = [
    { value: "৯৫%", label: "নির্ভুল পূর্বাভাস", delay: "0.6s" },
    { value: "২৪/৭", label: "সতর্কতা ব্যবস্থা", delay: "0.7s" },
    { value: "৩০%", label: "ক্ষতি হ্রাস", delay: "0.8s" },
  ];

  return (
    <section className="py-20 gradient-earth relative overflow-hidden" ref={sectionRef}>
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 right-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-harvest-green rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-bangla">
              সমাধান
            </h2>
            <p className="text-xl text-muted-foreground font-bangla leading-relaxed max-w-2xl mx-auto">
              কৃষি একটি ডিজিটাল সমাধান যা আপনার ফসল রক্ষা করতে সাহায্য করে
            </p>
          </div>

          {/* Solution Flow */}
          <div className="relative">
            {/* Animated Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary/10 -translate-y-1/2 overflow-hidden rounded-full">
              <div 
                className={`h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 transition-all ease-out ${isVisible ? 'w-full' : 'w-0'}`}
                style={{ transitionDelay: "0.4s", transitionDuration: "2500ms" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <div 
                    key={index}
                    className="relative group"
                  >
                    <div 
                      className={`bg-card rounded-xl p-6 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lg h-full flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                      style={{ transitionDelay: step.delay }}
                    >
                      {/* Icon with glow effect */}
                      <div className="relative w-14 h-14 mx-auto mb-4 flex-shrink-0">
                        <div className="absolute inset-0 gradient-hero rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                        <div className="relative w-14 h-14 rounded-full gradient-hero flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                          <Icon className="w-7 h-7 text-white transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-center text-card-foreground mb-2 font-bangla transition-colors duration-300 group-hover:text-primary min-h-[28px] flex items-center justify-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-center text-muted-foreground font-bangla leading-relaxed flex-grow">
                        {step.description}
                      </p>
                    </div>

                    {/* Animated Arrow */}
                    {!isLast && (
                      <div className="md:absolute md:top-1/2 md:-right-3 md:-translate-y-1/2 flex justify-center my-4 md:my-0 z-10">
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: `${0.2 + index * 0.15}s` }}>
                          <ArrowRight className="w-6 h-6 text-primary hidden md:block animate-pulse-soft" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits Section */}
          <div 
            className={`mt-16 bg-card rounded-2xl p-8 shadow-soft border border-primary/10 transition-all duration-500 hover:shadow-lg hover:border-primary/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: "0.6s" }}
          >
            <h3 className="text-2xl font-bold text-center text-card-foreground mb-8 font-bangla">
              কৃষি দিয়ে পাবেন
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`text-center group transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  style={{ transitionDelay: benefit.delay }}
                >
                  <div className="relative inline-block mb-3">
                    {/* Glow effect behind number */}
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative text-4xl md:text-5xl font-bold text-primary mb-2 font-bangla transition-all duration-500 group-hover:scale-110 tabular-nums">
                      {benefit.value}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-bangla transition-colors duration-300 group-hover:text-card-foreground">
                    {benefit.label}
                  </p>
                  {/* Decorative underline */}
                  <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mt-3 transition-all duration-500 group-hover:w-20 group-hover:bg-primary/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionFlow;
