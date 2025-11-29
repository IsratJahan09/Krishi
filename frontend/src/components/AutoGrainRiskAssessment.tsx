import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, CheckCircle, TrendingUp, TrendingDown } from "lucide-react";
import { toBanglaNumber } from "@/utils/banglaNumber";

interface WeatherForecast {
  date: Date;
  temperature: number;
  humidity: number;
  rainProbability: number;
}

interface RiskAnalysis {
  riskLevel: "Low" | "Medium" | "High";
  etcl: number;
  weatherImpact: string;
  recommendation: string;
  riskColor: string;
  riskBangla: string;
  riskFactors: string[];
}

interface AutoGrainRiskAssessmentProps {
  weatherData?: WeatherForecast[];
}

const AutoGrainRiskAssessment = ({ weatherData: propWeatherData }: AutoGrainRiskAssessmentProps) => {
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);

  // Update when prop changes
  useEffect(() => {
    if (propWeatherData && propWeatherData.length > 0) {
      console.log('[AutoRisk] Received weather data from props', propWeatherData);
      setWeatherData(propWeatherData);
      
      // Auto-calculate risk
      const analysis = calculateRiskFromWeather(propWeatherData);
      setRiskAnalysis(analysis);
      
      console.log('[AutoRisk] Risk calculated', {
        days: propWeatherData.length,
        riskLevel: analysis.riskLevel,
        etcl: analysis.etcl
      });
    }
  }, [propWeatherData]);

  // Fallback: Load from localStorage if no prop provided
  useEffect(() => {
    if (!propWeatherData || propWeatherData.length === 0) {
      const loadWeatherData = () => {
        const cached = localStorage.getItem("krishi_weather_alert_cache");
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (parsed.data && Array.isArray(parsed.data)) {
              const weather = parsed.data.map((d: any) => ({
                ...d,
                date: new Date(d.date),
              }));
              setWeatherData(weather);
              
              // Auto-calculate risk
              const analysis = calculateRiskFromWeather(weather);
              setRiskAnalysis(analysis);
              
              console.log('[AutoRisk] Weather data loaded from cache', {
                days: weather.length,
                riskLevel: analysis.riskLevel,
                etcl: analysis.etcl
              });
            }
          } catch (e) {
            console.error("Failed to load weather data", e);
          }
        }
      };

      loadWeatherData();
    }
  }, [propWeatherData]);

  const calculateRiskFromWeather = (weather: WeatherForecast[]): RiskAnalysis => {
    if (weather.length === 0) {
      return getDefaultRisk();
    }

    // YOUR EXACT FORMULA
    // Use assumed standard grain storage conditions
    const grain_moisture = 13; // Assumed safe moisture level (%)
    const temperature = 30; // Assumed average storage temperature (°C)

    // Base ETCL: 120 hours (safe default)
    let etcl = 120;
    const riskFactors: string[] = [];

    // YOUR FORMULA: High moisture penalty
    if (grain_moisture > 14) {
      const moisturePenalty = (grain_moisture - 14) * 8;
      etcl -= moisturePenalty;
      riskFactors.push(`শস্যের আর্দ্রতা উচ্চ (${grain_moisture}%) - ${moisturePenalty} ঘণ্টা কমেছে`);
    }

    // YOUR FORMULA: High temperature penalty
    if (temperature > 32) {
      const tempPenalty = (temperature - 32) * 5;
      etcl -= tempPenalty;
      riskFactors.push(`তাপমাত্রা উচ্চ (${temperature}°C) - ${tempPenalty} ঘণ্টা কমেছে`);
    }

    // YOUR FORMULA: Low moisture bonus
    if (grain_moisture < 11) {
      etcl += 20;
      riskFactors.push(`✓ শস্য খুব শুষ্ক (${grain_moisture}%) - +২০ ঘণ্টা বোনাস`);
    }

    // Analyze weather patterns for additional context
    let highHumidityDays = 0;
    let highRainDays = 0;
    let highTempDays = 0;
    let avgTemp = 0;
    let avgHumidity = 0;
    let totalRainProb = 0;

    weather.forEach((day) => {
      if (day.humidity > 70) highHumidityDays++;
      if (day.rainProbability > 60) highRainDays++;
      if (day.temperature > 32) highTempDays++;
      avgTemp += day.temperature;
      avgHumidity += day.humidity;
      totalRainProb += day.rainProbability;
    });

    avgTemp /= weather.length;
    avgHumidity /= weather.length;
    const avgRainProb = totalRainProb / weather.length;

    // Additional weather-based adjustments (optional - can be removed if you want only your formula)
    if (highHumidityDays >= 3) {
      const humidityPenalty = 10 + (highHumidityDays * 5);
      etcl -= humidityPenalty;
      riskFactors.push(`${highHumidityDays} দিন উচ্চ আর্দ্রতা (>৭০%) - ${humidityPenalty} ঘণ্টা কমেছে`);
    }

    if (highRainDays >= 2) {
      const rainPenalty = 10 + (highRainDays * 5);
      etcl -= rainPenalty;
      riskFactors.push(`${highRainDays} দিন বৃষ্টির সম্ভাবনা - ${rainPenalty} ঘণ্টা কমেছে`);
    }

    // Bonus for good weather conditions
    if (avgHumidity < 60 && avgRainProb < 30 && avgTemp < 30) {
      etcl += 10;
      riskFactors.push("✓ অনুকূল আবহাওয়া (শুষ্ক ও শীতল) - +১০ ঘণ্টা বোনাস");
    }

    // Ensure ETCL doesn't go below 24 hours
    etcl = Math.max(24, etcl);

    // Determine risk level
    let riskLevel: "Low" | "Medium" | "High";
    let riskColor: string;
    let riskBangla: string;

    if (etcl >= 96) {
      riskLevel = "Low";
      riskColor = "text-green-600 bg-green-50 border-green-200";
      riskBangla = "নিম্ন ঝুঁকি";
    } else if (etcl >= 60) {
      riskLevel = "Medium";
      riskColor = "text-yellow-600 bg-yellow-50 border-yellow-200";
      riskBangla = "মাঝারি ঝুঁকি";
    } else {
      riskLevel = "High";
      riskColor = "text-red-600 bg-red-50 border-red-200";
      riskBangla = "উচ্চ ঝুঁকি";
    }

    // Generate weather impact summary
    let weatherImpact = `পরবর্তী ৫ দিনে গড় তাপমাত্রা ${Math.round(avgTemp)}°C, গড় আর্দ্রতা ${Math.round(avgHumidity)}%, এবং বৃষ্টির সম্ভাবনা ${Math.round(avgRainProb)}%। `;

    if (highHumidityDays >= 2 || highRainDays >= 2) {
      weatherImpact += "বাইরে শস্য শুকানো ঝুঁকিপূর্ণ। ঘরের ভিতরে বায়ুচলাচল সহ সংরক্ষণ করুন।";
    } else if (highTempDays >= 2) {
      weatherImpact += "উচ্চ তাপমাত্রার কারণে ছত্রাক বৃদ্ধির ঝুঁকি। শীতল স্থানে সংরক্ষণ করুন।";
    } else {
      weatherImpact += "আবহাওয়া তুলনামূলক অনুকূল। সতর্কতার সাথে সংরক্ষণ চালিয়ে যান।";
    }

    // Generate recommendation
    let recommendation = "";
    
    if (riskLevel === "High") {
      recommendation = "🚨 জরুরি পদক্ষেপ প্রয়োজন: ";
      recommendation += "শস্য অবিলম্বে ঘরের ভিতরে সরান। ";
      recommendation += "বায়ুচলাচল বাড়ান এবং প্রতিদিন পরীক্ষা করুন। ";
      recommendation += "আর্দ্রতা ১৪% এর নিচে রাখুন। ";
      recommendation += "ছত্রাক ও পোকামাকড়ের জন্য নিয়মিত পরীক্ষা করুন।";
    } else if (riskLevel === "Medium") {
      recommendation = "⚠️ সতর্কতা অবলম্বন করুন: ";
      recommendation += "শস্য শুষ্ক ও শীতল স্থানে রাখুন। ";
      recommendation += "বৃষ্টির সময় ঢেকে রাখুন। ";
      recommendation += "প্রতি ২-৩ দিন পর পরীক্ষা করুন। ";
      recommendation += "ভালো বায়ুচলাচল নিশ্চিত করুন।";
    } else {
      recommendation = "✅ নিরাপদ অবস্থা: ";
      recommendation += "বর্তমান সংরক্ষণ পদ্ধতি চালিয়ে যান। ";
      recommendation += "সাপ্তাহিক পর্যবেক্ষণ করুন। ";
      recommendation += "শুষ্ক ও পরিষ্কার স্থানে রাখুন। ";
      recommendation += "আবহাওয়ার পরিবর্তন পর্যবেক্ষণ করুন।";
    }

    return {
      riskLevel,
      etcl: Math.round(etcl),
      weatherImpact,
      recommendation,
      riskColor,
      riskBangla,
      riskFactors,
    };
  };

  const getDefaultRisk = (): RiskAnalysis => {
    return {
      riskLevel: "Medium",
      etcl: 96,
      weatherImpact: "আবহাওয়া তথ্য লোড করুন সঠিক বিশ্লেষণের জন্য।",
      recommendation: "আবহাওয়া পূর্বাভাস দেখে সংরক্ষণ পরিকল্পনা করুন।",
      riskColor: "text-gray-600 bg-gray-50 border-gray-200",
      riskBangla: "তথ্য প্রয়োজন",
      riskFactors: [],
    };
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low":
        return <CheckCircle className="w-8 h-8" />;
      case "Medium":
        return <Info className="w-8 h-8" />;
      case "High":
        return <AlertTriangle className="w-8 h-8" />;
      default:
        return <Info className="w-8 h-8" />;
    }
  };

  const getRiskTrend = (etcl: number) => {
    if (etcl >= 96) {
      return { icon: <TrendingUp className="w-5 h-5 text-green-600" />, text: "স্থিতিশীল" };
    } else if (etcl >= 60) {
      return { icon: <TrendingDown className="w-5 h-5 text-yellow-600" />, text: "পর্যবেক্ষণ প্রয়োজন" };
    } else {
      return { icon: <TrendingDown className="w-5 h-5 text-red-600" />, text: "দ্রুত অবনতি" };
    }
  };

  if (!riskAnalysis) {
    return null;
  }

  const trend = getRiskTrend(riskAnalysis.etcl);

  return (
    <div className="space-y-6">
      {/* Main Risk Card */}
      <Card className={`shadow-card border-2 ${riskAnalysis.riskColor} animate-fade-in`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={riskAnalysis.riskColor}>
                {getRiskIcon(riskAnalysis.riskLevel)}
              </div>
              <div>
                <CardTitle className="font-bangla text-2xl">
                  {riskAnalysis.riskBangla}
                </CardTitle>
                <p className="text-sm font-bangla opacity-80">
                  শস্য সংরক্ষণ ঝুঁকি মূল্যায়ন (স্বয়ংক্রিয়)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {trend.icon}
              <span className="text-sm font-bangla">{trend.text}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ETCL Display */}
          <div className="p-4 bg-white rounded-lg border-2 border-current">
            <div className="text-center">
              <p className="text-sm font-bangla mb-1 opacity-80">
                ETCL (Expected Time to Critical Loss)
              </p>
              <p className="text-4xl font-bold font-bangla">
                {toBanglaNumber(riskAnalysis.etcl)} ঘণ্টা
              </p>
              <p className="text-xs font-bangla mt-1 opacity-70">
                ≈ {toBanglaNumber(Math.round(riskAnalysis.etcl / 24))} দিন
              </p>
            </div>
          </div>

          {/* Risk Factors */}
          {riskAnalysis.riskFactors.length > 0 && (
            <div>
              <h3 className="font-semibold font-bangla mb-2 flex items-center gap-2">
                <span className="text-lg">📊</span>
                ঝুঁকির কারণসমূহ
              </h3>
              <ul className="space-y-2">
                {riskAnalysis.riskFactors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm font-bangla">
                    <span className="mt-1">{factor.startsWith("✓") ? "✓" : "•"}</span>
                    <span className={factor.startsWith("✓") ? "text-green-700" : ""}>
                      {factor.replace("✓ ", "")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Weather Impact */}
          <div>
            <h3 className="font-semibold font-bangla mb-2 flex items-center gap-2">
              <span className="text-lg">🌦️</span>
              আবহাওয়ার প্রভাব
            </h3>
            <p className="text-sm font-bangla leading-relaxed text-muted-foreground">
              {riskAnalysis.weatherImpact}
            </p>
          </div>

          {/* Recommendation */}
          <div>
            <h3 className="font-semibold font-bangla mb-2 flex items-center gap-2">
              <span className="text-lg">💡</span>
              সুপারিশকৃত পদক্ষেপ
            </h3>
            <p className="text-sm font-bangla leading-relaxed text-muted-foreground">
              {riskAnalysis.recommendation}
            </p>
          </div>

          {/* Weather Summary */}
          {weatherData.length > 0 && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold font-bangla mb-3">৫ দিনের আবহাওয়া সারসংক্ষেপ:</h3>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="p-3 bg-background rounded-lg">
                  <p className="font-bangla text-muted-foreground">গড় তাপমাত্রা</p>
                  <p className="font-bold font-bangla text-lg">
                    {toBanglaNumber(Math.round(weatherData.reduce((sum, d) => sum + d.temperature, 0) / weatherData.length))}°C
                  </p>
                </div>
                <div className="p-3 bg-background rounded-lg">
                  <p className="font-bangla text-muted-foreground">গড় আর্দ্রতা</p>
                  <p className="font-bold font-bangla text-lg">
                    {toBanglaNumber(Math.round(weatherData.reduce((sum, d) => sum + d.humidity, 0) / weatherData.length))}%
                  </p>
                </div>
                <div className="p-3 bg-background rounded-lg">
                  <p className="font-bangla text-muted-foreground">বৃষ্টির সম্ভাবনা</p>
                  <p className="font-bold font-bangla text-lg">
                    {toBanglaNumber(Math.round(weatherData.reduce((sum, d) => sum + d.rainProbability, 0) / weatherData.length))}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Note */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-bangla text-blue-800">
              📝 <strong>দ্রষ্টব্য:</strong> এই বিশ্লেষণ আবহাওয়া পূর্বাভাসের উপর ভিত্তি করে স্বয়ংক্রিয়ভাবে তৈরি। 
              সঠিক ফলাফলের জন্য নিয়মিত আবহাওয়া আপডেট করুন এবং শস্যের অবস্থা পরীক্ষা করুন।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoGrainRiskAssessment;
