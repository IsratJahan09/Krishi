import { useEffect, useState, useRef } from "react";
import { AlertTriangle, TrendingDown, Truck } from "lucide-react";

// Reusable Bangla number converter
const toBanglaNumber = (num: number, decimals: number = 1): string => {
  const banglaDigits: Record<string, string> = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯", ".": ".",
  };
  return num
    .toFixed(decimals)
    .split("")
    .map((ch) => banglaDigits[ch] ?? ch)
    .join("");
};

// Smooth easing function for natural animation
const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

// Icon component for Package
const Package = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const ProblemSection = () => {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for triggering animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Improved count-up with requestAnimationFrame for smoother animation
  useEffect(() => {
    if (!isVisible) return;

    const target = 4.5;
    const duration = 2500;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easeOutQuart(progress);
      setValue(target * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible]);

  const banglaNumber = toBanglaNumber(value);

  // Problem cards data for cleaner mapping
  const problemCards = [
    {
      icon: Package,
      title: "দুর্বল সংরক্ষণ",
      description: "সঠিক সংরক্ষণ ব্যবস্থার অভাবে ফসল পচে যায় এবং পোকামাকড়ের আক্রমণ হয়",
      delay: "0.2s",
      gradient: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
    },
    {
      icon: TrendingDown,
      title: "ভুল পরিচালনা",
      description: "ফসল কাটা, শুকানো এবং মজুত করার সময় ভুল পদ্ধতি অনুসরণ করা হয়",
      delay: "0.3s",
      gradient: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20",
    },
    {
      icon: Truck,
      title: "পরিবহন সমস্যা",
      description: "পরিবহনের সময় অসাবধানতা এবং দীর্ঘ সময় ধরে রাখার ফলে ক্ষতি",
      delay: "0.4s",
      gradient: "from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20",
    },
  ];

  return (
    <section id="problem" className="py-20 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Subtle agriculture-themed background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-harvest-green rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-golden-harvest rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-leaf-green rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-destructive to-transparent rounded-full" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-bangla">
              সমস্যা
            </h2>
            <p className="text-xl text-muted-foreground font-bangla leading-relaxed">
              বাংলাদেশে প্রতি বছর কী পরিমাণ খাদ্য নষ্ট হয়?
            </p>
          </div>

          {/* Main Statistic Card */}
          <div
            className="bg-card rounded-2xl p-8 md:p-12 shadow-soft mb-12 border-l-4 border-destructive animate-slide-up transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:border-l-8 group relative overflow-hidden"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Subtle grain texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)] pointer-events-none" />
            
            <div className="flex items-start gap-4 md:gap-6 relative z-10">
              <div className="relative">
                <AlertTriangle className="w-12 h-12 md:w-14 md:h-14 text-destructive flex-shrink-0 mt-1 animate-pulse-soft transition-transform duration-300 group-hover:scale-110" />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-4xl md:text-6xl font-bold text-destructive mb-4 font-bangla animate-number-pop tabular-nums">
                  {banglaNumber} মিলিয়ন টন
                </h3>
                <p className="text-lg md:text-xl text-card-foreground font-bangla leading-relaxed">
                  বাংলাদেশে বছরে{" "}
                  <strong className="text-destructive">{banglaNumber} মিলিয়ন মেট্রিক টন খাদ্য নষ্ট হয়</strong>
                  —সংরক্ষণ, পরিবহন এবং ব্যবস্থাপনার দুর্বলতার কারণে।
                </p>
              </div>
            </div>
          </div>

          {/* Problem Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problemCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-card animate-slide-up transition-all duration-500 hover:-translate-y-3 hover:shadow-lg hover:rotate-1 group relative overflow-hidden"
                  style={{ animationDelay: card.delay }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-destructive/20 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-6 h-6 text-destructive transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h4 className="font-semibold text-lg text-card-foreground mb-2 font-bangla transition-colors duration-300 group-hover:text-destructive">
                      {card.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-bangla leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-harvest-green/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              );
            })}
          </div>

          {/* Impact Statement */}
          <div
            className="mt-12 p-6 md:p-8 bg-gradient-to-br from-muted to-muted/50 rounded-xl animate-slide-up relative overflow-hidden group transition-all duration-500 hover:shadow-md border border-transparent hover:border-destructive/20"
            style={{ animationDelay: "0.5s" }}
          >
            {/* Animated highlight bar */}
            <span className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-destructive/20 via-destructive/10 to-transparent animate-impact-bar" />
            
            {/* Subtle leaf decoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-5 pointer-events-none">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-harvest-green">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.66-1.89C8 14 10 6 17 8zm3.71-2.71a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l9-9a1 1 0 0 0 0-1.42z" />
              </svg>
            </div>

            <p className="relative text-center text-lg md:text-xl text-muted-foreground font-bangla leading-relaxed">
              এই ক্ষতি{" "}
              <strong className="text-destructive transition-all duration-300 group-hover:text-destructive/90 relative inline-block group-hover:scale-105">
                কৃষকদের আয় কমায়
              </strong>
              ,{" "}
              <strong className="text-destructive transition-all duration-300 group-hover:text-destructive/90 relative inline-block group-hover:scale-105">
                খাদ্য নিরাপত্তা হুমকির মুখে ফেলে
              </strong>{" "}
              এবং{" "}
              <strong className="text-destructive transition-all duration-300 group-hover:text-destructive/90 relative inline-block group-hover:scale-105">
                দেশের অর্থনীতিতে নেতিবাচক প্রভাব ফেলে
              </strong>
              ।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
