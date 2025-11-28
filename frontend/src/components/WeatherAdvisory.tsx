import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, CloudRain, Droplets, Thermometer, Wind, Calendar, Loader2, AlertCircle } from "lucide-react";
import { toBanglaNumber, formatBanglaNumber } from "@/utils/banglaNumber";
import { getWeatherAdvice, getBanglaDayName, getBanglaMonthName } from "@/utils/weatherAdvice";
import { useToast } from "@/hooks/use-toast";

interface WeatherData {
  date: Date;
  temperature: number;
  humidity: number;
  rainProbability: number;
  description: string;
}

const WeatherAdvisory = () => {
  const [upazila, setUpazila] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentAdvice, setCurrentAdvice] = useState("");
  const { toast } = useToast();

  // Load cached data on mount
  useEffect(() => {
    const cached = localStorage.getItem("krishi_weather_cache");
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { data: WeatherData[]; upazila: string };
        setWeatherData(parsed.data.map((d) => ({ ...d, date: new Date(d.date) })));
        setUpazila(parsed.upazila);
        if (parsed.data.length > 0) {
          setCurrentAdvice(getWeatherAdvice(parsed.data[0]));
        }
      } catch (e) {
        console.error("Failed to parse cached data", e);
      }
    }
  }, []);

  const fetchWeather = async () => {
    if (!upazila.trim()) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে উপজেলার নাম লিখুন",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // OpenWeatherMap API call
      const API_KEY = "YOUR_API_KEY_HERE"; // User should add their key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${upazila},BD&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Weather data not found");
      }

      const data = await response.json();
      
      // Process 5-day forecast (taking one reading per day at noon)
      const forecast: WeatherData[] = [];
      const processedDays = new Set();
      
      data.list.forEach((item: {
        dt: number;
        main: { temp: number; humidity: number };
        pop: number;
        weather: Array<{ description: string }>;
      }) => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        if (!processedDays.has(dayKey) && forecast.length < 5) {
          processedDays.add(dayKey);
          forecast.push({
            date,
            temperature: Math.round(item.main.temp),
            humidity: item.main.humidity,
            rainProbability: item.pop * 100,
            description: item.weather[0].description,
          });
        }
      });

      setWeatherData(forecast);
      if (forecast.length > 0) {
        const advice = getWeatherAdvice(forecast[0]);
        setCurrentAdvice(advice);
      }

      // Cache the data
      localStorage.setItem(
        "krishi_weather_cache",
        JSON.stringify({ upazila, data: forecast, timestamp: Date.now() })
      );

      toast({
        title: "সফল",
        description: `${upazila} এর আবহাওয়া তথ্য পাওয়া গেছে`,
      });
    } catch (error) {
      // Use demo data for demonstration
      const demoData: WeatherData[] = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
          date,
          temperature: 28 + Math.floor(Math.random() * 10),
          humidity: 60 + Math.floor(Math.random() * 25),
          rainProbability: Math.floor(Math.random() * 100),
          description: "Partly cloudy",
        };
      });

      setWeatherData(demoData);
      setCurrentAdvice(getWeatherAdvice(demoData[0]));

      toast({
        title: "ডেমো মোড",
        description: "API কী যুক্ত করুন বাস্তব ডেটার জন্য। এখন ডেমো ডেটা দেখানো হচ্ছে।",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero py-6 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <CloudRain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-bangla">আবহাওয়া পরামর্শ</h1>
                <p className="text-sm text-white/80 font-bangla">স্থানীয় পূর্বাভাস</p>
              </div>
            </div>
            <a href="/">
              <Button variant="secondary" size="sm" className="font-bangla">
                হোম
              </Button>
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Search Section */}
        <Card className="p-6 shadow-card mb-8">
          <label className="block text-sm font-medium mb-2 font-bangla text-foreground">
            আপনার উপজেলার নাম লিখুন
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="উদাহরণ: ঢাকা, চট্টগ্রাম"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
              className="font-bangla"
              disabled={loading}
            />
            <Button 
              onClick={fetchWeather} 
              disabled={loading}
              className="gradient-hero text-white hover:opacity-90"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  <span className="font-bangla">খুঁজুন</span>
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Current Advisory */}
        {currentAdvice && (
          <Card className="p-6 bg-primary/5 border-primary/20 mb-8 shadow-card animate-fade-in">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 font-bangla text-foreground">আজকের পরামর্শ</h3>
                <p className="text-muted-foreground font-bangla leading-relaxed">{currentAdvice}</p>
              </div>
            </div>
          </Card>
        )}

        {/* 5-Day Forecast */}
        {weatherData.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-bangla text-foreground mb-4">
              পরবর্তী {toBanglaNumber(5)} দিনের পূর্বাভাস
            </h2>
            
            {weatherData.map((day, index) => (
              <Card 
                key={index} 
                className="p-5 shadow-card hover:shadow-soft transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Date */}
                  <div className="flex items-center gap-3 min-w-[140px]">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold font-bangla text-card-foreground">
                        {getBanglaDayName(day.date)}
                      </div>
                      <div className="text-sm text-muted-foreground font-bangla">
                        {toBanglaNumber(day.date.getDate())} {getBanglaMonthName(day.date)}
                      </div>
                    </div>
                  </div>

                  {/* Weather Stats */}
                  <div className="grid grid-cols-3 gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-destructive" />
                      <div>
                        <div className="text-xs text-muted-foreground font-bangla">তাপমাত্রা</div>
                        <div className="font-semibold font-bangla text-card-foreground">
                          {formatBanglaNumber(day.temperature)}°C
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground font-bangla">আর্দ্রতা</div>
                        <div className="font-semibold font-bangla text-card-foreground">
                          {formatBanglaNumber(day.humidity)}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CloudRain className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-xs text-muted-foreground font-bangla">বৃষ্টি</div>
                        <div className="font-semibold font-bangla text-card-foreground">
                          {formatBanglaNumber(Math.round(day.rainProbability))}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {weatherData.length === 0 && !loading && (
          <Card className="p-12 text-center shadow-card">
            <Wind className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2 font-bangla text-foreground">
              আবহাওয়া তথ্য খুঁজুন
            </h3>
            <p className="text-muted-foreground font-bangla">
              আপনার উপজেলার নাম লিখে আবহাওয়া পূর্বাভাস দেখুন
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WeatherAdvisory;
