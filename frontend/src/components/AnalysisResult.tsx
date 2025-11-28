import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScanResult } from "@/pages/Index";

interface AnalysisResultProps {
  result: ScanResult;
}

const AnalysisResult = ({ result }: AnalysisResultProps) => {
  const isFresh = result.status === "fresh";

  return (
    <Card className={`p-6 border-2 ${isFresh ? "border-green-500/50 bg-green-50 dark:bg-green-950/20" : "border-red-500/50 bg-red-50 dark:bg-red-950/20"} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className="flex items-start gap-4">
        <div className={`rounded-full p-3 ${isFresh ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
          {isFresh ? (
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          ) : (
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          )}
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">
              ফসলের অবস্থা: {" "}
              <span className={isFresh ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                {result.status === "fresh" ? "সতেজ" : "পচা"}
              </span>
            </h3>
            <p className="text-muted-foreground">
              {isFresh 
                ? "আপনার ফসল সুস্থ এবং সতেজ দেখাচ্ছে। নিয়মিত যত্ন চালিয়ে যান।"
                : "সতর্কতা: ফসলে অবনতির লক্ষণ দেখা যাচ্ছে। অবিলম্বে পদক্ষেপ নিন।"}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                আত্মবিশ্বাসের মাত্রা
              </span>
              <span className="font-semibold">{result.confidence.toFixed(1)}%</span>
            </div>
            <Progress 
              value={result.confidence} 
              className={`h-2 ${isFresh ? "[&>div]:bg-green-500" : "[&>div]:bg-red-500"}`}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              বিশ্লেষণ সম্পন্ন হয়েছে {result.timestamp.toLocaleTimeString("bn-BD")} এ
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AnalysisResult;
