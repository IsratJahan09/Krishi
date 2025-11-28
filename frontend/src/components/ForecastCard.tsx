import { Card, CardContent } from "@/components/ui/card";
import { CloudRain, Droplets, Thermometer, Wind } from "lucide-react";
import { formatBanglaNumber, toBanglaNumber } from "@/utils/banglaNumber";
import { getBanglaDay, getBanglaWeatherCondition } from "@/utils/formatWeather";

interface ForecastCardProps {
  date: Date;
  temperature: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  condition: string;
}

const ForecastCard = ({
  date,
  temperature,
  humidity,
  rainProbability,
  windSpeed,
  condition
}: ForecastCardProps) => {
  const getWeatherIcon = () => {
    if (condition.toLowerCase().includes('rain')) {
      return <CloudRain className="w-12 h-12 text-blue-500" />;
    }
    return <CloudRain className="w-12 h-12 text-primary" />;
  };

  return (
    <Card className="shadow-card hover:shadow-soft transition-smooth min-w-[280px] flex-shrink-0">
      <CardContent className="pt-6">
        {/* Date */}
        <div className="text-center mb-4">
          <p className="text-lg font-semibold font-bangla text-foreground">
            {getBanglaDay(date)}
          </p>
          <p className="text-sm text-muted-foreground font-bangla">
            {toBanglaNumber(date.getDate())} {getBanglaDay(date).slice(0, 3)}
          </p>
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center mb-4">
          {getWeatherIcon()}
        </div>

        {/* Condition */}
        <p className="text-center font-bangla text-sm text-muted-foreground mb-4">
          {getBanglaWeatherCondition(condition)}
        </p>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-destructive" />
              <span className="text-sm font-bangla text-muted-foreground">তাপমাত্রা</span>
            </div>
            <span className="font-semibold font-bangla">
              {formatBanglaNumber(temperature)}°C
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-primary" />
              <span className="text-sm font-bangla text-muted-foreground">আর্দ্রতা</span>
            </div>
            <span className="font-semibold font-bangla">
              {formatBanglaNumber(humidity)}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-bangla text-muted-foreground">বৃষ্টি</span>
            </div>
            <span className="font-semibold font-bangla">
              {formatBanglaNumber(Math.round(rainProbability))}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-bangla text-muted-foreground">বাতাস</span>
            </div>
            <span className="font-semibold font-bangla">
              {formatBanglaNumber(windSpeed)} km/h
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
