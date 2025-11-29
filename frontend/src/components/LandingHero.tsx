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
          <div className="w-full max-w-7xl mx-auto mt-12 px-2 sm:px-4 lg:px-6">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              navigation={{
                enabled: true,
              }}
              pagination={{ 
                clickable: true, 
                dynamicBullets: true,
                dynamicMainBullets: 3
              }}
              loop={true}
              speed={600}
              centeredSlides={false}
              breakpoints={{
                480: {
                  slidesPerView: 1.2,
                  spaceBetween: 16,
                  centeredSlides: true,
                },
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                  centeredSlides: true,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                  centeredSlides: false,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                  centeredSlides: false,
                },
              }}
              className="feature-swiper !pb-12"
            >
              <SwiperSlide className="h-auto">
                <Link to="/weather-alert" className="block h-full">
                  <div className="bg-card rounded-2xl p-4 sm:p-5 lg:p-6 shadow-card transition-all duration-300 hover:shadow-soft hover:scale-105 hover:border-primary border-2 border-transparent cursor-pointer h-full flex flex-col group">
                    <div className="w-full aspect-square sm:aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-3 sm:mb-4 flex items-center justify-center overflow-hidden relative">
                      <CloudRain className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="inline-block bg-blue-100 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium font-bangla mb-3 w-fit">
                      আবহাওয়া
                    </span>
                    <h3 className="font-semibold text-card-foreground mb-2 font-bangla text-base sm:text-lg">আবহাওয়া সতর্কতা</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-bangla mb-4 flex-grow leading-relaxed">৫ দিনের পূর্বাভাস এবং রিয়েল-টাইম আবহাওয়া আপডেট পান</p>
                    <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center -rotate-45 group-hover:rotate-0 ml-auto">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </Link>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <Link to="/storage-advice" className="block h-full">
                  <div className="bg-card rounded-2xl p-4 sm:p-5 lg:p-6 shadow-card transition-all duration-300 hover:shadow-soft hover:scale-105 hover:border-primary border-2 border-transparent cursor-pointer h-full flex flex-col group">
                    <div className="w-full aspect-square sm:aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-xl mb-3 sm:mb-4 flex items-center justify-center overflow-hidden relative">
                      <Package className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="inline-block bg-green-100 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium font-bangla mb-3 w-fit">
                      সংরক্ষণ
                    </span>
                    <h3 className="font-semibold text-card-foreground mb-2 font-bangla text-base sm:text-lg">সংরক্ষণ পরামর্শ</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-bangla mb-4 flex-grow leading-relaxed">স্থানীয় পরামর্শ এবং ফসল সংরক্ষণের সেরা পদ্ধতি</p>
                    <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center -rotate-45 group-hover:rotate-0 ml-auto">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </Link>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <Link to="/crop-protection" className="block h-full">
                  <div className="bg-card rounded-2xl p-4 sm:p-5 lg:p-6 shadow-card transition-all duration-300 hover:shadow-soft hover:scale-105 hover:border-primary border-2 border-transparent cursor-pointer h-full flex flex-col group">
                    <div className="w-full aspect-square sm:aspect-video bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl mb-3 sm:mb-4 flex items-center justify-center overflow-hidden relative">
                      <Sprout className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="inline-block bg-yellow-100 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium font-bangla mb-3 w-fit">
                      সুরক্ষা
                    </span>
                    <h3 className="font-semibold text-card-foreground mb-2 font-bangla text-base sm:text-lg">ফসল রক্ষা</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-bangla mb-4 flex-grow leading-relaxed">ক্ষতি প্রতিরোধ এবং ফসল সুরক্ষার কার্যকর উপায়</p>
                    <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center -rotate-45 group-hover:rotate-0 ml-auto">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </Link>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <Link to="/crop-health-scan" className="block h-full">
                  <div className="bg-card rounded-2xl p-4 sm:p-5 lg:p-6 shadow-card transition-all duration-300 hover:shadow-soft hover:scale-105 hover:border-primary border-2 border-transparent cursor-pointer h-full flex flex-col group">
                    <div className="w-full aspect-square sm:aspect-video bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl mb-3 sm:mb-4 flex items-center justify-center overflow-hidden relative">
                      <Leaf className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="inline-block bg-emerald-100 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium font-bangla mb-3 w-fit">
                      স্ক্যানার
                    </span>
                    <h3 className="font-semibold text-card-foreground mb-2 font-bangla text-base sm:text-lg">স্বাস্থ্য স্ক্যানার</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-bangla mb-4 flex-grow leading-relaxed">এআই বিশ্লেষণ দিয়ে ফসলের স্বাস্থ্য পরীক্ষা করুন</p>
                    <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center -rotate-45 group-hover:rotate-0 ml-auto">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mt-12">
            <Link to="/scan">
              <Button 
                size="lg" 
                className="gradient-hero text-white hover:opacity-90 hover:scale-105 transition-all duration-300 ease-out shadow-soft hover:shadow-lg text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 h-auto min-h-[52px] sm:min-h-[56px] font-bangla font-semibold animate-pulse-subtle w-full sm:w-auto"
              >
                <Leaf className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                স্ক্যান করুন
              </Button>
            </Link>
            <a href="#problem">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-out shadow-card hover:shadow-soft text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 h-auto min-h-[52px] sm:min-h-[56px] font-bangla font-semibold w-full sm:w-auto"
              >
                আরও জানুন
              </Button>
            </a>
          </div>
          
          {/* Quick Links */}
          <div className="mt-8">
            <Button
              variant="ghost"
              onClick={handleDashboardClick}
              className="text-muted-foreground hover:text-primary hover:scale-105 transition-all duration-300 ease-out font-bangla text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 h-auto min-h-[44px] sm:min-h-[48px] font-medium hover:bg-primary/5"
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
