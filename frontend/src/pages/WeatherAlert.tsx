import { useState, useEffect } from "react";
import { CloudRain, AlertCircle, Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ForecastCard from "@/components/ForecastCard";
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

interface WeatherForecast7DayData {
  day: number;
  date: string;
  temp: number;
  humidity: number;
  rain_prob: number;
}

interface RiskPredictionResponse {
  batch_id: string;
  location: string;
  etcl_hours: number;
  risk_category: string;
  weather_forecast_7d: WeatherForecast7DayData[];
  advisory_bangla: {
    summary: string;
    why_risk: string;
    action: string;
    warning: string;
  };
  input_moisture?: number;
  input_temperature?: number;
}

const WeatherAlert = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [adviceMessage, setAdviceMessage] = useState("");
  const [sevenDayForecast, setSevenDayForecast] = useState<RiskPredictionResponse | null>(null);
  const [inputMoisture, setInputMoisture] = useState<number>(14);
  const [inputTemperature, setInputTemperature] = useState<number>(30);

  const fetch7DayForecast = async (loc: string, temp: number, humidity: number) => {
    console.log("🔄 Fetching 7-day forecast for:", loc, "temp:", temp, "humidity:", humidity);
    try {
      // Use average humidity as moisture estimate (simplified)
      const estimatedMoisture = humidity > 80 ? 16 : humidity > 70 ? 14 : humidity > 60 ? 12 : 10;
      console.log("📊 Estimated moisture:", estimatedMoisture);

      const response = await fetch("/api/risk-prediction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moisture: estimatedMoisture,
          temperature: temp,
          location: loc,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: RiskPredictionResponse = await response.json();
      console.log("✅ 7-day forecast received:", data);
      
      // Store the input values in state
      setInputMoisture(estimatedMoisture);
      setInputTemperature(temp);
      setSevenDayForecast(data);
    } catch (error) {
      console.error("❌ 7-day forecast fetch error:", error);
      // Silently fail - user can still see 5-day forecast
    }
  };

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
          
          // Also fetch 7-day forecast for cached data
          fetch7DayForecast(parsed.location, parsed.data[0].temperature, parsed.data[0].humidity);
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
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      
      if (!API_KEY) {
        // Fallback to demo data if no API key
        console.warn("OpenWeatherMap API key not found. Using demo data.");
        throw new Error("API key not configured");
      }

      // Real OpenWeatherMap API call
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location},BD&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Process 5-day forecast (one reading per day)
      const forecast: WeatherData[] = [];
      const processedDays = new Set();
      
      data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        // Take one reading per day (preferably around noon)
        if (!processedDays.has(dayKey) && forecast.length < 5) {
          processedDays.add(dayKey);
          forecast.push({
            date,
            temperature: Math.round(item.main.temp),
            humidity: item.main.humidity,
            rainProbability: (item.pop || 0) * 100,
            windSpeed: Math.round(item.wind.speed * 3.6), // m/s to km/h
            condition: item.weather[0].main.toLowerCase(),
          });
        }
      });

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

      // Automatically fetch 7-day forecast from backend
      fetch7DayForecast(location, forecast[0].temperature, forecast[0].humidity);

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

      // Automatically fetch 7-day forecast from backend with demo data
      fetch7DayForecast(location, demoData[0].temperature, demoData[0].humidity);

      toast.error("আবহাওয়া API সংযুক্ত নয়। ডেমো ডেটা দেখানো হচ্ছে। .env ফাইলে VITE_OPENWEATHER_API_KEY যোগ করুন।");
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
                onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
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

        

        {/* 7-Day Weather Forecast from Risk Prediction */}
        {sevenDayForecast && (
          <WeatherForecast7Day 
            forecastData={sevenDayForecast} 
            inputMoisture={inputMoisture}
            inputTemperature={inputTemperature}
          />
        )}
      </div>
    </div>
  );
};

// Component for 7-day weather forecast from backend
const WeatherForecast7Day = ({ 
  forecastData, 
  inputMoisture, 
  inputTemperature 
}: { 
  forecastData: RiskPredictionResponse;
  inputMoisture: number;
  inputTemperature: number;
}) => {
  return (
    <div id="seven-day-forecast" className="mt-8 scroll-mt-8">
      <Card className="p-6 shadow-card animate-fade-in">
        <h3 className="text-2xl font-bold font-bangla text-foreground mb-4">
          ৭ দিনের আবহাওয়া পূর্বাভাস (ঝুঁকি বিশ্লেষণ সহ)
        </h3>
        <p className="text-muted-foreground font-bangla mb-6">
          {forecastData.location} এলাকার জন্য স্বয়ংক্রিয় ঝুঁকি বিশ্লেষণ
        </p>

        {/* Forecast Results */}
        {forecastData && (
          <div className="mt-8 space-y-6">
            {/* Risk Summary */}
            <Card className={`p-6 ${
              forecastData.risk_category === "Critical Risk"
                ? "bg-red-50 border-red-200"
                : forecastData.risk_category === "High Risk"
                ? "bg-orange-50 border-orange-200"
                : forecastData.risk_category === "Moderate Risk"
                ? "bg-yellow-50 border-yellow-200"
                : "bg-green-50 border-green-200"
            }`}>
              <div className="flex items-start gap-4">
                <AlertCircle className={`w-8 h-8 flex-shrink-0 mt-1 ${
                  forecastData.risk_category === "Critical Risk"
                    ? "text-red-600"
                    : forecastData.risk_category === "High Risk"
                    ? "text-orange-600"
                    : forecastData.risk_category === "Moderate Risk"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`} />
                <div className="flex-1">
                  <h4 className="text-xl font-bold font-bangla mb-2">
                    {forecastData.risk_category} - ETCL: {forecastData.etcl_hours} ঘণ্টা
                  </h4>
                  <p className="font-bangla text-lg mb-3">{forecastData.advisory_bangla.summary}</p>
                  <p className="font-bangla mb-2">{forecastData.advisory_bangla.why_risk}</p>
                  <p className="font-bangla mb-2">{forecastData.advisory_bangla.action}</p>
                  {forecastData.advisory_bangla.warning && (
                    <p className="font-bangla font-semibold mt-3 text-red-700">
                      {forecastData.advisory_bangla.warning}
                    </p>
                  )}
                </div>
              </div>
            </Card>

           

            {/* Crop Storage Risk Analysis Section */}
            <div className="mt-8">
              <h4 className="text-2xl font-bold font-bangla text-foreground mb-6">
                শস্য সংরক্ষণ ঝুঁকি বিশ্লেষণ
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Low Risk Card */}
                <Card className="p-6 bg-green-50 border-green-200 shadow-card">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h5 className="font-bold text-lg font-bangla text-green-900">নিম্ন ঝুঁকি</h5>
                  </div>
                  <p className="text-sm text-green-700 font-bangla">নিম্ন ঝুঁকি - অনুকূল অবস্থা</p>
                </Card>

                {/* ETCL Card */}
                <Card className="p-6 bg-blue-50 border-blue-200 shadow-card">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="w-8 h-8 text-blue-600" />
                    <h5 className="font-bold text-lg font-bangla text-blue-900">
                      ETCL (সংকটজনক ক্ষতির প্রত্যাশিত সময়)
                    </h5>
                  </div>
                  <p className="text-4xl font-bold text-blue-900 font-bangla my-3">
                    {Math.round(forecastData.etcl_hours)} <span className="text-2xl">ঘণ্টা</span>
                  </p>
                  <p className="text-sm text-blue-700 font-bangla">
                    আনুমানিক ৫ দিন পরে বিশেষ সংরক্ষণ সতর্কতা
                  </p>
                  <p className="text-xs text-blue-600 font-bangla mt-2">
                    * সাধারণ সংরক্ষণ অবস্থায় ভিত্তি করে ({inputMoisture}% আর্দ্রতা, {inputTemperature}°C তাপমাত্রা)
                  </p>
                </Card>

                {/* 5-Day Weather Impact Card */}
                <Card className="p-6 bg-amber-50 border-amber-200 shadow-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CloudRain className="w-8 h-8 text-amber-600" />
                    <h5 className="font-bold text-lg font-bangla text-amber-900">
                      ৫ দিনের আবহাওয়া প্রভাব
                    </h5>
                  </div>
                  <p className="text-sm text-amber-700 font-bangla">
                    আবহাওয়া শস্য সংরক্ষণের জন্য অনুকূল।
                  </p>
                </Card>
              </div>
            </div>

            {/* Storage Alert Section 2 */}
            <Card className="mt-6 p-6 bg-green-50 border-green-200 shadow-card">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2 font-bangla text-green-900">
                    ফসলের জন্য মূল্যবান
                  </h4>
                  <p className="text-green-800 font-bangla leading-relaxed mb-4">
                    আগামী ৭ দিনের আবহাওয়া অনুযায়ী আপনার ফসল সংরক্ষণের জন্য বিশেষ পরামর্শ। গড় তাপমাত্রা {Math.round(forecastData.weather_forecast_7d.reduce((sum, d) => sum + d.temp, 0) / 7)}°C এবং আর্দ্রতা {Math.round(forecastData.weather_forecast_7d.reduce((sum, d) => sum + d.humidity, 0) / 7)}% থাকবে। ফসল শুকনো ও ঠান্ডা স্থানে সংরক্ষণ করুন।
                  </p>
                </div>
              </div>
            </Card>

            {/* General Advisory Section */}
            <Card className="mt-6 p-6 shadow-card">
              <h4 className="text-xl font-bold font-bangla text-foreground mb-4">
                সাধারণ পরামর্শ
              </h4>
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
          </div>
        )}
      </Card>
    </div>
  );
};

export default WeatherAlert;