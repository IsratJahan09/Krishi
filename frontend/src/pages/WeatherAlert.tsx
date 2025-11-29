import { useState, useEffect } from "react";
import { CloudRain, AlertCircle, Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ForecastCard from "@/components/ForecastCard";
import AutoGrainRiskAssessment from "@/components/AutoGrainRiskAssessment";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getWeatherAdviceMessage } from "@/utils/formatWeather";
import { toast } from "sonner";

interface WeatherData {
  date: Date;
  temperature: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  condition: string;
}

const WeatherAlert = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [adviceMessage, setAdviceMessage] = useState("");

  // Load cached data on mount
  useEffect(() => {
    const cached = localStorage.getItem("krishi_weather_alert_cache");
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { data: WeatherData[]; location: string };
        setWeatherData(parsed.data.map(d => ({ ...d, date: new Date(d.date) })));
        setLocation(parsed.location);
        if (parsed.data.length > 0) {
          const advice = getWeatherAdviceMessage(
            parsed.data[0].temperature,
            parsed.data[0].humidity,
            parsed.data[0].rainProbability
          );
          setAdviceMessage(advice);
        }
      } catch (e) {
        console.error("Failed to parse cached data", e);
      }
    }
  }, []);

  const fetchWeather = async () => {
    if (!location.trim()) {
      toast.error("অনুগ্রহ করে স্থানের নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
      
      console.log('[Weather] Fetching from backend:', `${API_BASE_URL}/weather/?location=${location}`);
      
      // Call backend API
      const response = await fetch(
        `${API_BASE_URL}/weather/?location=${encodeURIComponent(location)}`
      );

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('[Weather] Backend response:', data);
      
      // Process forecast data from backend
      const forecast: WeatherData[] = data.forecast.map((item: any) => ({
        date: new Date(item.date),
        temperature: item.temperature,
        humidity: item.humidity,
        rainProbability: item.rainProbability,
        windSpeed: item.windSpeed,
        condition: item.condition,
      }));

      setWeatherData(forecast);
      
      if (forecast.length > 0) {
        const advice = getWeatherAdviceMessage(
          forecast[0].temperature,
          forecast[0].humidity,
          forecast[0].rainProbability
        );
        setAdviceMessage(advice);
      }

      // Cache the data
      localStorage.setItem(
        "krishi_weather_alert_cache",
        JSON.stringify({ location, data: forecast, timestamp: Date.now() })
      );

      toast.success(`${location} এর আবহাওয়া তথ্য পাওয়া গেছে`);
      
    } catch (error) {
      console.error("Weather fetch error:", error);
      
      // Fallback to demo data
      const demoData: WeatherData[] = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
          date,
          temperature: 28 + Math.floor(Math.random() * 8),
          humidity: 65 + Math.floor(Math.random() * 20),
          rainProbability: Math.floor(Math.random() * 100),
          windSpeed: 10 + Math.floor(Math.random() * 15),
          condition: i % 3 === 0 ? 'rain' : i % 2 === 0 ? 'clouds' : 'clear'
        };
      });

      setWeatherData(demoData);
      
      const advice = getWeatherAdviceMessage(
        demoData[0].temperature,
        demoData[0].humidity,
        demoData[0].rainProbability
      );
      setAdviceMessage(advice);

      toast.error("ব্যাকএন্ড API সংযুক্ত নয়। ডেমো ডেটা দেখানো হচ্ছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="আবহাওয়া সতর্কতা"
        subtitle="৫ দিনের পূর্বাভাস"
        icon={<CloudRain className="w-8 h-8 text-white" />}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Section */}
        <Card className="shadow-card mb-8 animate-fade-in">
          <CardContent className="pt-6">
            <label className="block text-sm font-medium mb-2 font-bangla text-foreground">
              আপনার এলাকার নাম লিখুন
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="উদাহরণ: ঢাকা, চট্টগ্রাম, রাজশাহী"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
                className="font-bangla"
                disabled={loading}
              />
              <Button
                onClick={fetchWeather}
                disabled={loading}
                className="gradient-hero text-white hover:opacity-90 font-bangla"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "খুঁজুন"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advisory Message */}
        {adviceMessage && (
          <Card className="p-6 bg-primary/5 border-primary/20 mb-8 shadow-card animate-slide-up">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 font-bangla text-foreground">
                  আজকের পরামর্শ
                </h3>
                <p className="text-muted-foreground font-bangla leading-relaxed">
                  {adviceMessage}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* 5-Day Forecast */}
        {weatherData.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold font-bangla text-foreground mb-6">
              পরবর্তী ৫ দিনের পূর্বাভাস
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
              {weatherData.map((day, index) => (
                <div
                  key={index}
                  className="snap-start"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ForecastCard
                    date={day.date}
                    temperature={day.temperature}
                    humidity={day.humidity}
                    rainProbability={day.rainProbability}
                    windSpeed={day.windSpeed}
                    condition={day.condition}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Card className="p-12 text-center shadow-card">
            <CloudRain className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2 font-bangla text-foreground">
              আবহাওয়া তথ্য খুঁজুন
            </h3>
            <p className="text-muted-foreground font-bangla">
              আপনার এলাকার নাম লিখে আবহাওয়া পূর্বাভাস দেখুন
            </p>
          </Card>
        )}

        {/* Auto Grain Risk Assessment - NEW SECTION */}
        {weatherData.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold font-bangla text-foreground mb-4">
              ৫ দিনের আবহাওয়া অনুযায়ী সংরক্ষণ ঝুঁকি বিশ্লেষণ (স্বয়ংক্রিয়)
            </h2>
            <AutoGrainRiskAssessment weatherData={weatherData} />
          </div>
        )}

        {/* Additional Tips */}
        {weatherData.length > 0 && (
          <Card className="mt-8 p-6 shadow-card animate-fade-in">
            <h3 className="text-xl font-bold font-bangla text-foreground mb-4">
              সাধারণ পরামর্শ
            </h3>
            <ul className="space-y-2 text-muted-foreground font-bangla">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>প্রতিদিন সকালে আবহাওয়া পূর্বাভাস দেখুন</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>বৃষ্টির সম্ভাবনা ৬০% এর বেশি হলে ফসল ঢেকে রাখুন</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>তাপমাত্রা ৩৫°C এর বেশি হলে দুপুরে কাজ এড়িয়ে চলুন</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>আর্দ্রতা ৮০% এর বেশি হলে ফসলে ছত্রাকের ঝুঁকি বাড়ে</span>
              </li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WeatherAlert;
