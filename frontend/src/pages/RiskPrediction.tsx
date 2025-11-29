import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CloudRain, Droplets, Thermometer, Clock, TrendingUp, Wind } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import ForecastCard from "@/components/ForecastCard";

interface WeatherDay {
  day: number;
  date: string;
  temp: number;
  humidity: number;
  rain_prob: number;
}

interface RiskPrediction {
  batch_id: string;
  location: string;
  etcl_hours: number;
  risk_category: string;
  weather_forecast_7d: WeatherDay[];
  advisory_bangla: {
    summary: string;
    why_risk: string;
    action: string;
    warning: string;
  };
  calculated_at: string;
}

const districts = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Sylhet",
  "Barisal",
  "Rangpur",
  "Mymensingh",
];

const RiskPrediction = () => {
  const [moisture, setMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [location, setLocation] = useState("Dhaka");
  const [batchId, setBatchId] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [prediction, setPrediction] = useState<RiskPrediction | null>(null);
  const { toast } = useToast();

  const calculateRisk = async () => {
    if (!moisture || !temperature) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে সকল তথ্য পূরণ করুন",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    try {
      const response = await fetch("/api/risk-prediction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moisture: parseFloat(moisture),
          temperature: parseFloat(temperature),
          location: location,
          batch_id: batchId || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Risk calculation failed");
      }

      const data = await response.json();
      setPrediction(data);

      toast({
        title: "গণনা সম্পন্ন",
        description: "ঝুঁকি বিশ্লেষণ সফলভাবে সম্পন্ন হয়েছে",
      });
    } catch (error) {
      console.error("Error calculating risk:", error);
      toast({
        title: "ত্রুটি",
        description: "ঝুঁকি গণনা করতে ব্যর্থ হয়েছে",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const getRiskColor = (category: string) => {
    switch (category) {
      case "Critical Risk":
        return "bg-red-500";
      case "High Risk":
        return "bg-orange-500";
      case "Moderate Risk":
        return "bg-yellow-500";
      case "Low Risk":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRiskBangla = (category: string) => {
    switch (category) {
      case "Critical Risk":
        return "জরুরি ঝুঁকি";
      case "High Risk":
        return "উচ্চ ঝুঁকি";
      case "Moderate Risk":
        return "মাঝারি ঝুঁকি";
      case "Low Risk":
        return "কম ঝুঁকি";
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="আবহাওয়া সতর্কতা"
        subtitle="৭ দিনের পূর্বাভাস"
        icon={<CloudRain className="w-8 h-8 text-white" />}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Input Form */}
        <Card className="shadow-card mb-8 animate-fade-in">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 font-bangla">ফসলের তথ্য লিখুন</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="moisture">আর্দ্রতা (%)</Label>
              <div className="relative">
                <Droplets className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="moisture"
                  type="number"
                  placeholder="যেমন: 15.5"
                  value={moisture}
                  onChange={(e) => setMoisture(e.target.value)}
                  className="pl-10"
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="temperature">তাপমাত্রা (°C)</Label>
              <div className="relative">
                <Thermometer className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="temperature"
                  type="number"
                  placeholder="যেমন: 34"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="pl-10"
                  step="0.1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">জেলা</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="batchId">ব্যাচ আইডি (ঐচ্ছিক)</Label>
              <Input
                id="batchId"
                type="text"
                placeholder="যেমন: BATCH-001"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
              />
            </div>
          </div>

            <Button
              onClick={calculateRisk}
              disabled={isCalculating}
              className="w-full mt-6 gradient-hero text-white hover:opacity-90 font-bangla"
              size="lg"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2" />
                  গণনা করা হচ্ছে...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-5 w-5" />
                  ঝুঁকি বিশ্লেষণ করুন
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {prediction && (
          <div className="space-y-6">
            {/* Risk Summary */}
            <Card className="p-6 bg-primary/5 border-primary/20 shadow-card animate-slide-up">
              <div className="flex gap-4">
                <div
                  className={`rounded-full p-3 flex-shrink-0 ${getRiskColor(
                    prediction.risk_category
                  )}`}
                >
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold font-bangla">
                      {getRiskBangla(prediction.risk_category)}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-bangla ${getRiskColor(
                        prediction.risk_category
                      )}`}
                    >
                      ETCL: {prediction.etcl_hours} ঘণ্টা
                    </span>
                  </div>
                  <p className="text-lg mb-4 font-bangla leading-relaxed">
                    {prediction.advisory_bangla.summary}
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                      <p className="font-bangla">{prediction.advisory_bangla.why_risk}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                      <p className="font-medium font-bangla">
                        {prediction.advisory_bangla.action}
                      </p>
                    </div>
                    {prediction.advisory_bangla.warning && (
                      <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                        <AlertCircle className="w-4 h-4 mt-1 text-yellow-600 flex-shrink-0" />
                        <p className="text-yellow-800 dark:text-yellow-200 font-bangla">
                          {prediction.advisory_bangla.warning}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Weather Forecast */}
            <div>
              <h2 className="text-2xl font-bold font-bangla text-foreground mb-6">
                পরবর্তী ৭ দিনের পূর্বাভাস
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {prediction.weather_forecast_7d.map((day, index) => {
                  const date = new Date(day.date);
                  return (
                    <div
                      key={day.day}
                      className="snap-start"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ForecastCard
                        date={date}
                        temperature={day.temp}
                        humidity={day.humidity}
                        rainProbability={day.rain_prob}
                        windSpeed={0}
                        condition="clear"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Batch Info */}
            <Card className="p-4 bg-muted/50 shadow-card">
              <div className="flex flex-wrap gap-4 justify-between text-sm text-muted-foreground font-bangla">
                <span>ব্যাচ: {prediction.batch_id}</span>
                <span>স্থান: {prediction.location}</span>
                <span>
                  সময়:{" "}
                  {new Date(prediction.calculated_at).toLocaleString("bn-BD")}
                </span>
              </div>
            </Card>
          </div>
        )}

        {/* General Advisory Section - Always visible */}
        <Card className="mt-8 p-6 shadow-card animate-fade-in">
          <h3 className="text-xl font-bold font-bangla text-foreground mb-4">
            সাধারণ পরামর্শ
          </h3>
          <ul className="space-y-2 text-muted-foreground font-bangla">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>
                ফসলের সঠিক আর্দ্রতা বজায় রাখতে নিয়মিত পরীক্ষা করুন
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>
                বৃষ্টির সম্ভাবনা ৬০% এর বেশি হলে ঘরে শুকানোর ব্যবস্থা করুন
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>
                তাপমাত্রা ৩২°C এর বেশি হলে ঠান্ডা স্থানে সংরক্ষণ করুন
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>
                আর্দ্রতা ৮০% এর বেশি হলে ইনডোর এয়ারেশন ব্যবহার করুন
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default RiskPrediction;
