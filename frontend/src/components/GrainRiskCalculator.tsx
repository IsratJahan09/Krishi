import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Info, CheckCircle, Loader2 } from "lucide-react";
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
}

const GrainRiskCalculator = () => {
  const [grainMoisture, setGrainMoisture] = useState<number>(12);
  const [grainTemp, setGrainTemp] = useState<number>(30);
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  // Load weather data from cache
  useEffect(() => {
    const cached = localStorage.getItem("krishi_weather_alert_cache");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.data && Array.isArray(parsed.data)) {
          setWeatherData(
            parsed.data.map((d: any) => ({
              ...d,
              date: new Date(d.date),
            }))
          );
        }
      } catch (e) {
        console.error("Failed to load weather data", e);
      }
    }
  }, []);

  const calculateETCL = (): RiskAnalysis => {
    let etcl = 120; // Base ETCL: 120 hours (5 days)

    // Rule 1: High moisture penalty
    if (grainMoisture > 14) {
      const moisturePenalty = (grainMoisture - 14) * 8;
      etcl -= moisturePenalty;
    }

    // Rule 2: Low moisture bonus
    if (grainMoisture < 11) {
      etcl += 20;
    }

    // Rule 3: High temperature penalty
    if (grainTemp > 32) {
      const tempPenalty = (grainTemp - 32) * 5;
      etcl -= tempPenalty;
    }

    // Rule 4: Weather forecast analysis
    let highHumidityDays = 0;
    let highRainDays = 0;
    let avgTemp = 0;
    let avgHumidity = 0;

    if (weatherData.length > 0) {
      weatherData.forEach((day) => {
        if (day.humidity > 70) highHumidityDays++;
        if (day.rainProbability > 60) highRainDays++;
        avgTemp += day.temperature;
        avgHumidity += day.humidity;
      });

      avgTemp /= weatherData.length;
      avgHumidity /= weatherData.length;

      // High humidity penalty
      if (highHumidityDays >= 3) {
        etcl -= 25;
      } else if (highHumidityDays >= 2) {
        etcl -= 15;
      } else if (highHumidityDays >= 1) {
        etcl -= 10;
      }

      // High rainfall penalty
      if (highRainDays >= 2) {
        etcl -= 15;
      } else if (highRainDays >= 1) {
        etcl -= 10;
      }
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
    let weatherImpact = "";
    if (weatherData.length > 0) {
      const conditions = [];
      
      if (avgHumidity > 70) {
        conditions.push(`উচ্চ আর্দ্রতা (গড় ${Math.round(avgHumidity)}%)`);
      }
      
      if (highRainDays > 0) {
        conditions.push(`${highRainDays} দিন বৃষ্টির সম্ভাবনা`);
      }
      
      if (avgTemp > 32) {
        conditions.push(`উচ্চ তাপমাত্রা (গড় ${Math.round(avgTemp)}°C)`);
      }

      if (conditions.length > 0) {
        weatherImpact = `পরবর্তী ৫ দিনে ${conditions.join(", ")} প্রত্যাশিত। `;
      } else {
        weatherImpact = "পরবর্তী ৫ দিনে আবহাওয়া অনুকূল। ";
      }

      if (highHumidityDays >= 2 || highRainDays >= 1) {
        weatherImpact += "বাইরে শুকানো ঝুঁকিপূর্ণ — ঘরের ভিতরে বায়ুচলাচল সুপারিশ করা হয়।";
      } else {
        weatherImpact += "বাইরে শুকানো নিরাপদ, তবে সতর্ক থাকুন।";
      }
    } else {
      weatherImpact = "আবহাওয়া তথ্য উপলব্ধ নেই। আবহাওয়া সতর্কতা পেজ থেকে তথ্য সংগ্রহ করুন।";
    }

    // Generate recommendation
    let recommendation = "";
    
    if (riskLevel === "High") {
      recommendation = "জরুরি পদক্ষেপ: ";
      if (grainMoisture > 14) {
        recommendation += "অবিলম্বে শস্য শুকান (লক্ষ্য: ১৪% এর নিচে)। ";
      }
      if (grainTemp > 32) {
        recommendation += "শস্যের তাপমাত্রা কমান (বায়ুচলাচল বাড়ান)। ";
      }
      recommendation += "ছত্রাক প্রতিরোধে নিয়মিত পরীক্ষা করুন। ঘরের ভিতরে সংরক্ষণ করুন।";
    } else if (riskLevel === "Medium") {
      recommendation = "সতর্কতা: ";
      if (grainMoisture > 12) {
        recommendation += "শস্যের আর্দ্রতা কমানোর চেষ্টা করুন। ";
      }
      recommendation += "প্রতিদিন শস্য পরীক্ষা করুন। বৃষ্টি থেকে রক্ষা করুন। ভালো বায়ুচলাচল নিশ্চিত করুন।";
    } else {
      recommendation = "নিরাপদ অবস্থা: ";
      recommendation += "বর্তমান সংরক্ষণ পদ্ধতি চালিয়ে যান। নিয়মিত পর্যবেক্ষণ করুন। শুষ্ক ও শীতল স্থানে রাখুন।";
    }

    return {
      riskLevel,
      etcl: Math.round(etcl),
      weatherImpact,
      recommendation,
      riskColor,
      riskBangla,
    };
  };

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const analysis = calculateETCL();
      setRiskAnalysis(analysis);
      setLoading(false);
    }, 500);
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

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-bangla text-foreground">
            শস্য সংরক্ষণ ঝুঁকি বিশ্লেষণ (ETCL গণনা)
          </CardTitle>
          <p className="text-sm text-muted-foreground font-bangla">
            আপনার সংরক্ষিত শস্যের তথ্য দিন
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="moisture" className="font-bangla">
                শস্যের আর্দ্রতা (%)
              </Label>
              <Input
                id="moisture"
                type="number"
                min="8"
                max="25"
                step="0.1"
                value={grainMoisture}
                onChange={(e) => setGrainMoisture(parseFloat(e.target.value))}
                className="font-bangla"
              />
              <p className="text-xs text-muted-foreground font-bangla">
                নিরাপদ সীমা: ১৪% এর নিচে
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature" className="font-bangla">
                শস্যের তাপমাত্রা (°C)
              </Label>
              <Input
                id="temperature"
                type="number"
                min="20"
                max="45"
                step="0.5"
                value={grainTemp}
                onChange={(e) => setGrainTemp(parseFloat(e.target.value))}
                className="font-bangla"
              />
              <p className="text-xs text-muted-foreground font-bangla">
                নিরাপদ সীমা: ৩২°C এর নিচে
              </p>
            </div>
          </div>

          {weatherData.length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-bangla text-blue-800">
                ✓ আবহাওয়া তথ্য লোড হয়েছে ({weatherData.length} দিনের পূর্বাভাস)
              </p>
            </div>
          )}

          {weatherData.length === 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-bangla text-yellow-800">
                ⚠ আবহাওয়া তথ্য পাওয়া যায়নি। সঠিক বিশ্লেষণের জন্য "আবহাওয়া সতর্কতা" পেজ থেকে তথ্য সংগ্রহ করুন।
              </p>
            </div>
          )}

          <Button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full gradient-hero text-white hover:opacity-90 font-bangla"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                গণনা করা হচ্ছে...
              </>
            ) : (
              "ঝুঁকি বিশ্লেষণ করুন"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Risk Analysis Result */}
      {riskAnalysis && (
        <Card className={`shadow-card border-2 ${riskAnalysis.riskColor} animate-fade-in`}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={riskAnalysis.riskColor}>
                {getRiskIcon(riskAnalysis.riskLevel)}
              </div>
              <div>
                <CardTitle className="font-bangla text-2xl">
                  {riskAnalysis.riskBangla}
                </CardTitle>
                <p className="text-sm font-bangla opacity-80">
                  {riskAnalysis.riskLevel} Risk of Aflatoxin/Mold
                </p>
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
                কৃষকের জন্য সুপারিশ
              </h3>
              <p className="text-sm font-bangla leading-relaxed text-muted-foreground">
                {riskAnalysis.recommendation}
              </p>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold font-bangla mb-3">বর্তমান অবস্থা:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-background rounded-lg">
                  <p className="font-bangla text-muted-foreground">শস্যের আর্দ্রতা</p>
                  <p className="font-bold font-bangla text-lg">
                    {toBanglaNumber(grainMoisture)}%
                  </p>
                </div>
                <div className="p-3 bg-background rounded-lg">
                  <p className="font-bangla text-muted-foreground">শস্যের তাপমাত্রা</p>
                  <p className="font-bold font-bangla text-lg">
                    {toBanglaNumber(grainTemp)}°C
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GrainRiskCalculator;
