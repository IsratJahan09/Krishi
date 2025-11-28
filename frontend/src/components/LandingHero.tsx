import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, CloudRain, Package, Leaf, ArrowRight } from "lucide-react";
import UserMenu from "./UserMenu";
import { getUser } from "@/lib/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
        <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
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

          {/* Feature icons - Swiper Carousel */}
          <div className="max-w-6xl mx-auto mt-8 px-4">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={40}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true, dynamicBullets: true }}
              loop={true}
              speed={700}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="feature-swiper"
            >
              <SwiperSlide>
                <Link to="/weather-alert" className="block h-full">
                  <div className="bg-card rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-soft hover:border-primary border-2 border-transparent cursor-pointer h-full flex flex-col">
                    <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                      <CloudRain className="w-16 h-16 text-primary" />
                    </div>
                    <span className="inline-block bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-medium font-bangla mb-4 w-fit">
                      আবহাওয়া
                    </span>
                    <h3 className="font-semibold text-card-foreground mb-2 font-bangla text-lg">আবহাওয়া সতর্কতা</h3>
                    <p className="text-sm text-muted-foreground font-bangla mb-4 flex-grow">৫ দিনের পূর্বাভাস এবং রিয়েল-টাইম আবহাওয়া আপডেট পান</p>
                    <button className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center -rotate-45">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link to="/storage-advice" className="block h-full">
                  <div className="bg-card rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-soft hover:border-primary border-2 border-transparent cursor-pointer h-full flex flex-col">
                    <div className="w-full aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                      <Package className="w-16 h-16 text-primary" />
                    </div>
                    <span className="inline-block bg-green-100 text-primary px-4 py-2 rounded-full text-sm font-medium font-bangla mb-4 w-fit">
                      সংরক্ষণ
                    </span>
                    <h3 className="font-semibold text-card-foreground mb-2 font-bangla text-lg">সংরক্ষণ পরামর্শ</h3>
                    <p className="text-sm text-muted-foreground font-bangla mb-4 flex-grow">স্থানীয় পরামর্শ এবং ফসল সংরক্ষণের সেরা পদ্ধতি</p>
                    <button className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center -rotate-45">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link to="/crop-protection" className="block h-full">
                  <div className="bg-card rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-soft hover:border-primary border-2 border-transparent cursor-pointer h-full flex flex-col">
                    <div className="w-full aspect-video bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg mb-4 flex items-center justify-center">
                      <Sprout className="w-16 h-16 text-primary" />
                    </div>
                    <span className="inline-block bg-yellow-100 text-primary px-4 py-2 rounded-full text-sm font-medium font-bangla mb-4 w-fit">
                      সুরক্ষা
                    </span>
                    <h3 className="font-semibold text-card-foreground mb-2 font-bangla text-lg">ফসল রক্ষা</h3>
                    <p className="text-sm text-muted-foreground font-bangla mb-4 flex-grow">ক্ষতি প্রতিরোধ এবং ফসল সুরক্ষার কার্যকর উপায়</p>
                    <button className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center -rotate-45">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link to="/crop-health-scan" className="block h-full">
                  <div className="bg-card rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-soft hover:border-primary border-2 border-transparent cursor-pointer h-full flex flex-col">
                    <div className="w-full aspect-video bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg mb-4 flex items-center justify-center">
                      <Leaf className="w-16 h-16 text-primary" />
                    </div>
                    <span className="inline-block bg-emerald-100 text-primary px-4 py-2 rounded-full text-sm font-medium font-bangla mb-4 w-fit">
                      স্ক্যানার
                    </span>
                    <h3 className="font-semibold text-card-foreground mb-2 font-bangla text-lg">স্বাস্থ্য স্ক্যানার</h3>
                    <p className="text-sm text-muted-foreground font-bangla mb-4 flex-grow">এআই বিশ্লেষণ দিয়ে ফসলের স্বাস্থ্য পরীক্ষা করুন</p>
                    <button className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center -rotate-45">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </Link>
              </SwiperSlide>
            </Swiper>
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
          <div className="mt-8">
            <Button
              variant="ghost"
              onClick={handleDashboardClick}
              className="text-muted-foreground hover:text-primary transition-colors font-bangla"
            >
              কৃষক ড্যাশবোর্ড
            </Button>
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
