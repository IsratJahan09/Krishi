import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, CloudRain, Package, Leaf } from "lucide-react";
import UserMenu from "./UserMenu";
import { getUser } from "@/lib/api";

const LandingHero = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      navigate('/farmer/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-earth">
      {/* User Menu - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <UserMenu />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-harvest-green animate-float" />
        <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-golden-harvest animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-leaf-green animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center shadow-soft">
              <Sprout className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground font-bangla leading-tight">
            কৃষি
            <span className="block text-2xl md:text-3xl mt-2 text-muted-foreground font-medium">
              আপনার ফসল রক্ষা করুন
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-bangla leading-relaxed">
            আবহাওয়া পূর্বাভাস এবং সংরক্ষণ পরামর্শের মাধ্যমে ফসলের ক্ষতি রোধ করুন
          </p>

          {/* Feature icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
            <Link to="/weather-alert" className="block">
              <div className="bg-card rounded-xl p-6 shadow-card transition-smooth hover:shadow-soft hover:-translate-y-1 cursor-pointer">
                <CloudRain className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-card-foreground mb-2 font-bangla">আবহাওয়া সতর্কতা</h3>
                <p className="text-sm text-muted-foreground font-bangla">৫ দিনের পূর্বাভাস</p>
              </div>
            </Link>
            <Link to="/storage-advice" className="block">
              <div className="bg-card rounded-xl p-6 shadow-card transition-smooth hover:shadow-soft hover:-translate-y-1 cursor-pointer">
                <Package className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-card-foreground mb-2 font-bangla">সংরক্ষণ পরামর্শ</h3>
                <p className="text-sm text-muted-foreground font-bangla">স্থানীয় পরামর্শ</p>
              </div>
            </Link>
            <Link to="/crop-protection" className="block">
              <div className="bg-card rounded-xl p-6 shadow-card transition-smooth hover:shadow-soft hover:-translate-y-1 cursor-pointer">
                <Sprout className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-card-foreground mb-2 font-bangla">ফসল রক্ষা</h3>
                <p className="text-sm text-muted-foreground font-bangla">ক্ষতি প্রতিরোধ</p>
              </div>
            </Link>
            <Link to="/crop-health-scan" className="block">
              <div className="bg-card rounded-xl p-6 shadow-card transition-smooth hover:shadow-soft hover:-translate-y-1 cursor-pointer">
                <Leaf className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-card-foreground mb-2 font-bangla">স্বাস্থ্য স্ক্যানার</h3>
                <p className="text-sm text-muted-foreground font-bangla">এআই বিশ্লেষণ</p>
              </div>
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link to="/scan">
              <Button size="lg" className="gradient-hero text-white hover:opacity-90 transition-smooth shadow-soft text-lg px-8 font-bangla">
                <Leaf className="mr-2 h-5 w-5" />
                স্ক্যান করুন
              </Button>
            </Link>
            <a href="#problem">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth text-lg px-8 font-bangla">
                আরও জানুন
              </Button>
            </a>
          </div>
          
          {/* Quick Links */}
          <div className="mt-8 text-sm text-muted-foreground">
            <a 
              href="/farmer/profile" 
              onClick={handleDashboardClick}
              className="hover:text-primary transition-colors font-bangla cursor-pointer"
            >
              কৃষক ড্যাশবোর্ড
            </a>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-background" style={{
        clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)'
      }} />
    </section>
  );
};

export default LandingHero;
